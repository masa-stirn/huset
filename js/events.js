let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector('template').content;
let main = document.querySelector('main');
let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='



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



/*filter*/

let count = 0;

function Filter(genre, filter) {
    console.log('yo')
    count = 0;
    document.querySelector('h3').textContent="";
    let sections = document.querySelectorAll('section');
    let length = sections.length;
    sections.forEach((s) => {
        s.classList.remove('hide');
        console.log(filter)
        if (s.querySelector('.' + filter).textContent != genre) {
            console.log(s.querySelector('.' + filter).textContent, genre)
            count++;
            s.classList.add('hide')
            console.log(s.querySelector('.genre'));
            console.log(count, length)

            if (length == count)

            {
                let alert = document.querySelector('h3');
                alert.textContent = "Sorry, there are no events available at the time that match your filter"



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
                Filter('cinema', 'genre');
            } else if (g.classList.contains('poetry')) {
                Filter('poetry', 'genre');
            } else if (g.classList.contains('rock_metal')) {
                Filter('rock_metal', 'genre')
            } else if (g.classList.contains('alternative')) {
                Filter('alternative', 'genre')
            } else if (g.classList.contains('open_mic')) {
                Filter('open mic', 'genre');
            }
        })

    })


})



$('.venueFilter').on('click', () => {
    $('.venueNav').css('width', '90vw')
    $('.venueNav').on('click', () => {
        $('.venueNav').css('width', '0vw')
    })
    document.querySelectorAll('.vFilter').forEach((v) => {
        v.addEventListener('click', () => {
            if (v.classList.contains('stardust')) {
                Filter('Stardust', 'venue');
            } else if (v.classList.contains('musikcafèen')) {
                Filter('Musikcafèen', 'venue');
            } else if (v.classList.contains('bastarden')) {
                Filter('Bastarden', 'venue');
            } else if (v.classList.contains('stage')) {
                Filter('Stage', 'venue');
            } else if (v.classList.contains('huset_biograf')) {
                Filter('Huset Biograf', 'venue');
            }
        })

    })


})
