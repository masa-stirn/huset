 //advance filters/ modal
    let urlParams = new URLSearchParams(window.location.search);
    let id = urlParams.get("id");

    fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues/"+ id)
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(showVenues)

    function showVenues(someData){
        console.log(someData)
        document.querySelector("h1").textContent=someData.title.rendered
        //fatch image and price?
        //write the for
    }
