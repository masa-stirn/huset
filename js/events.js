let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector('template').content;
let main = document.querySelector('main');
let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='
let alert = document.querySelector('.alert');




/*loader handler*/
$(window).ready(() => {
    $('.loader-wrapper').addClass('hide');
})

/*REST API*/

function fetchEvents() {
    console.log('im fetching')
    fetch(evtPath).then(e => e.json()).then(showEvents)
}

function showEvents(evt) {
    evt.forEach((e) => {
        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium
        console.log(e.id)
        clone.querySelector('section a').href="eSubpage.html?id="+e.id;




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

        /*modal handling

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
        }*/


        main.appendChild(clone)



    })
}


fetchEvents()



/*filter*/

let count = 0;

function Filter(genre, filter) {
    console.log('yo')
    count = 0;
    alert.style.cssText = "display:none;";
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

                alert.style.cssText = "display:block;"



            }
        }
    })

}



$('.genreFilter').on('click', () => {
    if ($('.genreFilter').hasClass('highlighted') == false) {
        $('.genreFilter').addClass('highlighted')
    }else {$('.genreFilter').removeClass('highlighted')}
    if ($('.venueFilter').hasClass('highlighted')) {
        $('.venueFilter').removeClass('highlighted')
    }

    if ($('.venueNav').hasClass('slideMe')) {
        $('.venueNav').removeClass('slideMe')
    }
    if ($('.genreNav').hasClass('slideMe')) {
        $('.genreNav').removeClass('slideMe')
    } else {
        $('.genreNav').addClass('slideMe')
    }

    $('.genreNav').on('click', () => {
        $('.genreNav').removeClass('slideMe')
    })
    document.querySelectorAll('.gFilter').forEach((g) => {
        g.addEventListener('click', () => {
            $('.genreFilter').removeClass('highlighted')
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
    if ($('.venueFilter').hasClass('highlighted') == false) {
        $('.venueFilter').addClass('highlighted') }else {$('.venueFilter').removeClass('highlighted')}

    if ($('.genreFilter').hasClass('highlighted')) {
        $('.genreFilter').removeClass('highlighted')
    }
    if ($('.genreNav').hasClass('slideMe')) {
        $('.genreNav').removeClass('slideMe')
    }
    if ($('.venueNav').hasClass('slideMe')) {
        $('.venueNav').removeClass('slideMe')
    } else {
        $('.venueNav').addClass('slideMe')
    }

    $('.venueNav').on('click', () => {
        $('.venueNav').removeClass('slideMe')

    })
    document.querySelectorAll('.vFilter').forEach((v) => {
        v.addEventListener('click', () => {
            $('.venueFilter').removeClass('highlighted')
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

/*menu*/

$('.burger').on('click', () => {
    $('.mainNav').addClass('slideMeRight')

})

$('.close').on('click', () => {
    $('.mainNav').removeClass('slideMeRight')
})
