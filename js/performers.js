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
    // make the copy of the template
    let clone = btnTemplate.cloneNode(true);

    let venText = aVenue.slug;
    let venImgs = aVenue._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    //CONCERT BUTTONS ON THE TOP OF CONCERT VENUE PAGE
    if(aVenue.acf.concert===true){

        //clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();

//if(aVenue.slug==="musikcafeen"){
//
//
//        clone.querySelector(".venue-text").textContent=venText.toUpperCase().substring(0,5);
//        const cafeen = document.createElement("div");
//        cafeen.textContent=venText.toUpperCase().substring(5,11);
//
//
//        clone.querySelector(".venue-text").append(cafeen);
//    }
}
    //THEATRE BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.theatre===true){

        //clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
    //BIOGRAF BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.cinema===true){

      //  clone.querySelector(".venue-imgs").setAttribute("src", venImgs)
    //button text
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
    //take each clone and added it to the html
     btnVenues.appendChild(clone);




    //fetch the content for each venue

    let clone2 = concTemplate.cloneNode(true);
    clone2.querySelector("h1").textContent = aVenue.title.rendered;
    clone2.querySelector(".desciption").innerHTML = aVenue.content.rendered;

    //console.log(aVenue)

    clone2.querySelector(".conc-img").setAttribute("src", venImgs);
     clone2.querySelector(".price").textContent = aVenue.acf.rental_cost;
    clone2.querySelector(".floor").textContent = aVenue.acf.floor;
    clone2.querySelector(".usage").textContent = aVenue.acf.usage;
    clone2.querySelector(".facilitates").textContent = aVenue.acf.facilitates_on_the_venue;
    ;
    if (aVenue.acf.catering===true){
        clone2.querySelector(".catering").textContent = "yes";
    }
    else {
        clone2.querySelector(".catering").textContent = "no";
    }
    clone2.querySelector(".cleaning").textContent = aVenue.acf.cleaning;
    clone2.querySelector(".capacity").textContent = aVenue.acf.capacity;
    if (aVenue.acf.concert===true && aVenue.acf.theatre===true){
        clone2.querySelector(".venue").textContent = "concert & theatre";
    }
    else if (aVenue.acf.theatre===true){
        clone2.querySelector(".venue").textContent = "theatre";
    }
    else if (aVenue.acf.cinema===true){
        clone2.querySelector(".venue").textContent = "cinema";

    }
    else if (aVenue.acf.concert===true){
        clone2.querySelector(".venue").textContent = "concert";
    }

    clone2.querySelector(".readmore a").href="form.html?id=" + aVenue.id;
    clone2.querySelector(".evt-btn a").textContent= venText.toUpperCase() + " EVENTS";
    concVenues.appendChild(clone2);
    //call the function here to avoid set timeout
    btnLoop();

}
fetchVenues();

//setTimeout(btnLoop, 2000)
// make user click on the buttons(.venue-text) and it displays only that venue

function btnLoop() {
    let filterBtn = document.querySelectorAll(".venue-box")
   filterBtn.forEach((x)=>{
    x.addEventListener("click", filterVenue)
   })
}
    function filterVenue(e){
       // console.log(e.target.textContent)



        let article = document.querySelectorAll("article")

        article.forEach((a)=>{

        if (e.target.textContent == a.querySelector('h1').textContent) {
            console.log(e.currentTarget)
            console.log(e.target)
            e.target.classList.toggle("white")
        e.target.parentElement.classList.toggle("highlited");


            a.classList.remove("hide");

        }
        else{
                a.classList.add("hide")
            }

     })

    }



////change button color and filter content on the click
//let filterBtn = document.querySelector(".readmore")
//
//filterBtn.addEventListener("click", ()=>{
//    filterBtn.classList.add("highlited");
//    if(filterBtn.classList.contains("highlited")==){
//
//    }
//
//
//})

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
