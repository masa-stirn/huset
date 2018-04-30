 //advance filters
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues/"+ id)
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(showVenues)

    function showVenues(someData){
        console.log(someData)
        document.querySelector(".header-text2").textContent=someData.title.rendered

    }
var form =  document.querySelector('form');
if (typeof(form) != 'undefined' && form != null)
{
  let submit = document.querySelector("input.readmore")

    submit.addEventListener("click", ()=>{
    submit.href="booked.html"
        console.log("i rock")
})
}

