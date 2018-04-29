let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug='

/*loader handler*/
$(window).ready(() => {
    $('.loader-wrapper').addClass('hide');
})
/*menu*/

$('.burger').on('click', () => {
    $('.mainNav').addClass('slideMeRight')

})

$('.close').on('click', () => {
    $('.mainNav').removeClass('slideMeRight')
})

/*subpage rest api*/

  let urlParams = new URLSearchParams(window.location.search);
  let id= urlParams.get("id");

console.log(id)


 fetch("http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events/"+id).then(e=>e.json()).then(showPost);

function showPost(e){

        console.log(e)
        let picPath = e.acf.event_picture.sizes.medium


        console.log('im cloning')
        document.querySelector('h1').textContent = e.title.rendered;
        document.querySelector('.day').textContent = e.acf.date.substring(6, 8);
        document.querySelector('.month').textContent = e.acf.date.substring(4, 6);
        document.querySelector('.year').textContent = e.acf.date.substring(0, 4);
        /*use sub string for presentation*/
        document.querySelector('.time').textContent = e.acf.event_time;
        document.querySelector('.artist').setAttribute('src', picPath)
        document.querySelector('.venue').textContent = e.acf.venue;
        document.querySelector('.genre').textContent = e.acf.genre;

        if (e.acf.free_event == false) {
            document.querySelector('.price').textContent = e.acf.event_price;
        } else {
            $('.button').addClass('hide');
            document.querySelector('.free').textContent = "FREE";
        }
  document.querySelector('.moreInfo').innerHTML= e.content.rendered
}



















