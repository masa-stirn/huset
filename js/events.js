let page = 1;
let lookingForData = false;
let evtPath = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed&per_page=5&page="
let template = document.querySelector('template').content;
let main = document.querySelector('main');
let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='
let alert = document.querySelector('.alert');
let evtPathAll = "http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?_embed&per_page=25"



/*loader handler*/
$(window).ready(() => {
    $('.loader-wrapper').addClass('hide');
})

/*REST API*/

function fetchEvents() {
    lookingForData = true;

    console.log('im fetching')
    fetch(evtPath+page).then(e => e.json()).then(showEvents)
}

function showEvents(evt) {
    lookingForData = false;
    evt.forEach((e) => {
        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium
        console.log(e.id)
        clone.querySelectorAll('section a').forEach((a)=>{a.href="eSubpage.html?id="+e.id;})

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

        main.appendChild(clone)

    })
}


fetchEvents()



/*filter*/

let count = 0;

function Filter(genre, filter) {
    console.log('yo')
    count = 0;
    alert.classList.add('hide');
    $('.backEvt').removeClass('hide');

    main.style.cssText = "margin-top:25vh;"


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

            {alert.classList.remove('hide')}
        }
    })
 $('.backEvt').on('click', ()=>{
            main.innerHTML = " ";
            main.style.cssText = "margin-top:15vh;"
            fetchEvents();
            console.log(this)
            $('.backEvt').addClass('hide');
            $('.alert').addClass('hide');
        });
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
            else if (g.classList.contains('foodie')) {
                Filter('foodie', 'genre');
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

/*date picker*/

let myDate = document.querySelector('input')

myDate.addEventListener('input', ()=>{

    console.log(myDate.value);

    fetch(evtPathAll).then(e => e.json()).then(filterEvents)

    function filterEvents(evt){

        main.innerHTML = " "
         $('.backEvt').removeClass('hide');
            main.style.cssText = "margin-top:25vh;"

        evt.forEach((e)=>{

            let eDate = e.acf.date.substring(0, 4) + "-" + e.acf.date.substring(4, 6)+ "-"+e.acf.date.substring(6, 8);


                            console.log(myDate.value +" = "+ eDate)

            if (myDate.value == eDate){
                console.log(myDate.value +" = "+ eDate)

                count++

        let clone = template.cloneNode(true);
        let picPath = e.acf.event_picture.sizes.medium
        console.log(e.id)
        clone.querySelector('section a').href="eSubpage.html?id="+e.id;

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


                main.appendChild(clone)




                $('.backEvt').on('click', ()=>{
            main.innerHTML = " ";
            main.style.cssText = "margin-top:15vh;"
            fetchEvents();
            console.log(this)
            $('.backEvt').addClass('hide')
        });

            }
       else {/*console.log(myDate.value +" not "+ eDate)
           */  }})
console.log(count)
          if (count==0)

            {

                alert.classList.remove('hide')



            }

    }




    ;})


 //problem is if I have no events when I filter fetchEvents is called
//infinite scroll
function loadMore(){

    //    if($('.alert').hasClass('hide')==false){}

    if(bottomVisible() && lookingForData===false && $('.alert').hasClass('hide')){
        page++
        fetchEvents()}
}

setInterval(loadMore,100)

if (bottomVisible()){clearInterval(loadMore, 100)};

function bottomVisible(){
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visible + scrollY >= pageHeight
    return bottomOfPage || pageHeight < visible;

}/**/
