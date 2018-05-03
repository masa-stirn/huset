const btnTemplate = document.querySelector("#btn-template").content;
const btnVenues = document.querySelector("#btn-venues");

const concTemplate = document.querySelector("#concert-template").content;
const concVenues = document.querySelector("#concert-venues");

function fetchVenues() {
        //make request
        let urlParams = new URLSearchParams(window.location.search)
        let cat = urlParams.get("category");
        if(!cat){
            cat="33,56,49";
        }
        fetch("http://test.masawudesign.dk/wp-json/wp/v2/venues?_embed&categories="+cat)
            //respons back, expect json
            .then(e => e.json())
            //now we have the venue data, we can do with it whatever we want
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

    //CONCERT BUTTONS ON THE TOP OF CONCERT VENUE PAGE
    if(aVenue.acf.concert===true){
        //console.log(aVenue.acf.concert)
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
    //THEATRE BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.theatre===true){
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
    //BIOGRAF BUTTONS ON THE TOP OF THEATRE VENUE PAGE
    if(aVenue.acf.cinema===true){
        clone.querySelector(".venue-text").textContent=venText.toUpperCase();
}
//    if (clone.querySelector(".venue-text").classList.contains("white")){
//        clone.querySelector(".venue-text").classList.remove("white")
//            }
//    clone.querySelector(".venue-text").addEventListener("click", (e)=>{
//        //console.log(aVenue.slug)
//        //console.log(aVenue.title.rendered)
//        e.target.parentElement.classList.toggle("highlited");
//        e.target.classList.toggle("white")
//    })
    //take each clone and added it to the html
     btnVenues.appendChild(clone);




    //fetch the content for each venue
    // make the copy of the template
    let clone2 = concTemplate.cloneNode(true);
    let venImgs = aVenue._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;

    clone2.querySelector("h1").textContent = aVenue.title.rendered;
    clone2.querySelector(".desciption").innerHTML = aVenue.content.rendered;
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
    clone2.querySelector(".performer-evt-btn").href="performer-events.html?tags="+aVenue.tags;

    console.log(aVenue.tags)




//    clone.querySelector(".venue-text").addEventListener("click", (e)=>{
//        if (aVenue.slug.toUpperCase() == aVenue.title.rendered){
//             //console.log(aVenue.slug.toUpperCase() == aVenue.title.rendered)
//      clone2.querySelector(".concert-modal").classList.add("hide")
//         }
//
//    })

    concVenues.appendChild(clone2);
    //call the function here to avoid set timeout, don't its in the loop, executed multiple time
    //btnLoop();
    //btnHighlite();


}
fetchVenues();

setTimeout(btnLoop, 1000)
// make user click on the buttons(.venue-text) and it displays only that venue

function btnLoop() {
    let filterBtn = document.querySelectorAll(".venue-text")
   filterBtn.forEach((x)=>{
    x.addEventListener("click", filterVenue)
  //console.log(x)
//        x.classList.remove("white");
//       x.parentElement.classList.remove("highlited")


       function filterVenue(e){
           let section = e.target.parentElement.parentElement.parentElement;
           //console.log(section.childElementCount)
           //console.log(section.children[i=0; i < section.childElementCount; i++].children[0])

          var children = Array.from(section.children);
           var child;
           for (child in children){
               //let buttons = children[child].getElementsByTagName("button")
               console.log(children[child].getElementsByTagName("button")[0].childNodes[1])
               console.log(children[child].getElementsByTagName("button")[0])

             children[child].getElementsByTagName("button")[0].classList.remove("highlited");
             children[child].getElementsByTagName("button")[0].childNodes[1].classList.remove("white");


           }

       // console.log(e.target.textContent)
        let article = document.querySelectorAll("article")
        article.forEach((a)=>{

        if (e.target.textContent == a.querySelector('h1').textContent) {
            //console.log(e.currentTarget)

//            console.log("true")
            e.target.classList.toggle("white")
       e.target.parentElement.classList.toggle("highlited");
            a.classList.remove("hide");
        }
        else{
                a.classList.add("hide")
            }
     })
    }






   })
}






