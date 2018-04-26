const btnTemplate = document.querySelector("#btn-template").content;
const btnVenues = document.querySelector("#btn-venues");

//const headerTemplate = document.querySelector("#header-template").content;
//const headerVenues = document.querySelector("#header-venue");

const concTemplate = document.querySelector("#concert-template").content;
const concVenues = document.querySelector("#concert-venues");

function fetchVenues() {
        //make request
        let urlParams = new URLSearchParams(window.location.search)
        let cat = urlParams.get("category");
        fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues?_embed&categories="+cat)
            //respons back
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(showVenues)
    }

function showVenues(data) {
        //console.log(data)
        data.forEach(showSingleVenue);

    //header text
    let first = data[0]
    let headerTxt = first._embedded["wp:term"][0][0].name;
    document.querySelector(".header-text").textContent=headerTxt.toUpperCase() + " VENUES";
    }

function showSingleVenue(aVenue) {

    //fetch content for the top 3 buttons of the concert venues
    let clone = btnTemplate.cloneNode(true);

    let venText = aVenue.slug;
     let venImgs = aVenue._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    //CONCERT BUTTONS ON THE TOP OF CONCERT VENUE PAGE
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
    //THEATRE BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.theatre===true){

        clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
    //BIOGRAF BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.cinema===true){

        clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
     btnVenues.appendChild(clone);




    //fetch the content for each venue

    let clone2 = concTemplate.cloneNode(true);


    clone2.querySelector("h1").textContent = aVenue.title.rendered;
    clone2.querySelector(".desciption").innerHTML = aVenue.content.rendered;

    //console.log(aVenue)

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

    clone2.querySelector(".readmore a").href="form.html?id=" + aVenue.id;
    clone2.querySelector(".evt-btn a").textContent= venText.toUpperCase() + " EVENTS";
    concVenues.appendChild(clone2);


}

fetchVenues();

// make user click on the buttons(.venue-text) and it displays only that venue
    document.querySelector(".section").addEventListener("click", blabla)
    function blabla(){
        if (venText == aVenue.title) {
            document.querySelector(".concert-modal").classList.remove("hide");
        } else {
            document.querySelector(".concert-modal").classList.add("hide");
        }
     }


// burger menu
let burgerMenu = document.querySelector(".burger-menu");
let navItems = document.querySelector(".nav-items");
let navMenu = document.querySelector(".main-nav");
let closebtn = document.querySelector(".closebtn");
document.addEventListener('DOMcontentLoaded', hideMenu)

function hideMenu() {
    navMenu.classList.remove("open");
}
burgerMenu.addEventListener("click", openMenu)

function openMenu() {
    navMenu.classList.add("open");
    navMenu.classList.remove("close");
    navItems.classList.remove("hide");
    navMenu.style.transition = "0.5s";
}
closebtn.addEventListener("click", closeMenu)

function closeMenu() {
    navMenu.classList.remove("open");
    navMenu.classList.add("close");
    navItems.classList.add("hide");
    navMenu.style.transition = "0.5s";
}

//buttons animation

//if ($('.readmore').hasClass('highlighted') == false) {
//        $('.readmore').addClass('highlighted') }else {$('.readmore').removeClass('highlighted')}
//
//    if ($('.readmore').hasClass('highlighted')) {
//        $('.readmore').removeClass('highlighted')
//    }

//function filter(myFilter) {
//    document.querySelectorAll(".concert-modal").forEach(section => {
//        if (venText == aVenue.title) {
//            section.classList.remove("hide");
//        } else {
//            section.classList.add("hide");
//        }
//    })
//}
