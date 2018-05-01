 //advance filters
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues/"+ id)
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(showVenues)

    function showVenues(someData){
        console.log(someData.title.rendered)
        document.querySelector(".header-text2").textContent=someData.title.rendered

        document.querySelector("#btn").href="booked.html?venue="+someData.title.rendered;
        }
