const btnTemplate = document.querySelector("#btn-template").content;
const btnVenues = document.querySelector("#btn-venues");

const concTemplate = document.querySelector("#concert-template").content;
const concVenues = document.querySelector("#concert-venues");

function fetchVenues() {
        //make request
        fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues?_embed")
            //respons back
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(showVenues)
    }

function showVenues(data) {
        //console.log(data)
        data.forEach(showSingleVenue);
    }

function showSingleVenue(aVenue) {

    //fetch content for the top 3 buttons of the concert venues
    let clone = btnTemplate.cloneNode(true);

    let venText = aVenue.slug;
     let venImgs = aVenue._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    //button img
    if(aVenue.acf.concert===true){

        clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();

    if(aVenue.slug==="musikcafeen"){
        clone.querySelector(".venue-text").textContent=venText.toUpperCase().substring(0,5);
        const cafeen = document.createElement("div");
        cafeen.textContent=venText.toUpperCase().substring(5,11);
        clone.querySelector(".venue-text").append(cafeen);
    }
}
    btnVenues.appendChild(clone);

    //fetch the content for each venue

       let clone2 = concTemplate.cloneNode(true);

    clone2.querySelector("h1").textContent = aVenue.title.rendered;
    clone2.querySelector(".desciption").innerHTML = aVenue.content.rendered;

    console.log(aVenue)

    clone2.querySelector(".conc-img").setAttribute("src", venImgs);
     clone2.querySelector("div span").textContent = " " + aVenue.acf.rental_cost;
    clone2.querySelector(".floor").textContent = "Floor: " + aVenue.acf.floor;
    clone2.querySelector(".usage").textContent = "Usage: " + aVenue.acf.usage;
    clone2.querySelector(".facilitates").textContent = "Facilities: " +aVenue.acf.facilitates_on_the_venue;
    ;
    if (aVenue.acf.catering===true){
        clone2.querySelector(".catering").textContent = "Catering: " + "yes";
    }
    else {
        clone2.querySelector(".catering").textContent = "Catering: " + "no";
    }
    clone2.querySelector(".cleaning").textContent = "Cleaning: " + aVenue.acf.cleaning;
    clone2.querySelector(".capacity").textContent = "Capacity: " + aVenue.acf.capacity;
    if (aVenue.acf.concert===true && aVenue.acf.theatre===true){
        clone2.querySelector(".venue").textContent = "Venue: " + "concert & theatre";
    }
    else if (aVenue.acf.theatre===true){
        clone2.querySelector(".venue").textContent = "Venue: " + "theatre";
    }
    else if (aVenue.acf.cinema===true){
        clone2.querySelector(".venue").textContent = "Venue: " + "cinema";
    }
    else if (aVenue.acf.concert===true){
        clone2.querySelector(".venue").textContent = "Venue: " + "concert";
    }

    concVenues.appendChild(clone2);
 }
fetchVenues();
