let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector('template').content;
let main = document.querySelector('main');


/*loader handler*/
$(window).ready(() => {
    $('.loader-wrapper').addClass('hide');
})


function fetchEvents() {
    console.log('im fetching')
    fetch(evtPath).then(e => e.json()).then(showEvents)
}

function showEvents(evt) {
    evt.forEach((e) => {
        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium
        let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='


        console.log('im cloning')
        clone.querySelector('h1').textContent = e.title.rendered;

        clone.querySelector('.day').textContent = e.acf.date.substring(6, 8);
        clone.querySelector('.month').textContent = e.acf.date.substring(4, 6);
        clone.querySelector('.year').textContent = e.acf.date.substring(0, 4);


        /*use sub string for presentation*/
        clone.querySelector('.time').textContent = e.acf.event_time;
        clone.querySelector('img').setAttribute('src', picPath)
        clone.querySelector('.venue').textContent = e.acf.venue;
        clone.querySelector('.genre').textContent = e.acf.genre;

        if (e.acf.free_event == false) {
            clone.querySelector('.price').textContent = e.acf.event_price;
        } else {
            $('.button').addClass('hide');
            clone.querySelector('.free').textContent = "FREE";
        }

        /*modal handling*/

        let modal = document.querySelector('.modal')

        clone.querySelector(".more").addEventListener('click', () => {
            modal.classList.remove('hide');
            fetch(pList + e.slug).then(result => result.json()).then(productID => showModal(productID, clone))
        });

        function showModal(p) {
            console.log(p)

            modal.querySelector('h2').textContent = p[0].title.rendered;

            modal.querySelector('.contentMe').innerHTML = p[0].content.rendered
            modal.addEventListener('click', () => modal.classList.add('hide'))
            window.onscroll = () => modal.classList.add('hide')
        }



        main.appendChild(clone)



    })
}


fetchEvents()



/*filters*/

let count=0;

function genreFilter(genre) {
    let sections = document.querySelectorAll('section');
    let length = sections.length;
    sections.forEach((s) => {
        s.classList.remove('hide');
        if (s.querySelector('.genre').textContent != genre) {
            count++;
            s.classList.add('hide')
            console.log(s.querySelector('.genre'));
            console.log(count, length)

            if (length == count)

     {     let alert =  document.createElement('h3');
                alert.textContent = "Sorry, there are no events available at the time that match your filter"

                main.appendChild(alert)



        }
        }
    })

}



$('.genreFilter').on('click', () => {
    $('.genreNav').css('width', '90vw')
    $('.genreNav').on('click', () => {
        $('.genreNav').css('width', '0vw')
    })
    document.querySelectorAll('.gFilter').forEach((g) => {
        g.addEventListener('click', () => {
            if (g.classList.contains('cinema')) {
                genreFilter('cinema');
            } else if (g.classList.contains('poetry')) {
                genreFilter('poetry');
            } else if (g.classList.contains('rock_metal')) {
                genreFilter('rock_metal')
            } else if (g.classList.contains('alternative')) {
                genreFilter('alternative')
            } else if (g.classList.contains('open_mic')) {
                genreFilter('open mic');
            }
        })

    })


})



$('.venueFilter').on('click', () => {
    $('.venueNav').css('width', '90vw')
    $('.venueNav').on('click', () => {
        $('.venueNav').css('width', '0vw')
    })
    document.querySelectorAll('.gFilter').forEach((g) => {
        g.addEventListener('click', () => {
            if (g.classList.contains('stadust')) {
                genreFilter('stardust');
            } else if (g.classList.contains('musikcafèen')) {
                genreFilter('musikcafèen');
            } else if (g.classList.contains('bastarden')) {
                genreFilter('bastarden')
            } else if (g.classList.contains('')) {
                genreFilter('')
            } else if (g.classList.contains('')) {
                genreFilter('');
            }
        })

    })


})
