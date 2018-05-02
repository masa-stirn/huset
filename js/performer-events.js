//declare performer evt template and section
const performerEvtTemplate = document.querySelector("#performer-evt-template").content;
const performerEvtSection = document.querySelector("#performer-evt-section");

let page = 1;
let lookingForData = false;
function fetchPerformerEvents(){
    lookingForData = true;
//fetch data from json
// fetch only the categories that match
    let urlParams = new URLSearchParams(window.location.search)
        let cat = urlParams.get("category");
        fetch("http://test.masawudesign.dk/wp-json/wp/v2/events?_embed&per_page=2&page="+page+"&categories="+cat)
        .then(e => e.json())
        .then(showAllEvents)
    }

function showAllEvents(getAllMatchingCatEventsArray){
    //console.log(getAllMatchingCatEventsArray)
 getAllMatchingCatEventsArray.forEach(showSingleCatEvent)
   //header text
   let headerTxt = getAllMatchingCatEventsArray[0].acf.venue
    document.querySelector(".header-text").textContent= headerTxt.toUpperCase() + " EVENTS"
    lookingForData = false;

}

function showSingleCatEvent(oneEvent){

    let clone = performerEvtTemplate.cloneNode(true);

    clone.querySelector(".event-name").textContent= oneEvent.title.rendered;
    clone.querySelector(".year").textContent= oneEvent.acf.date.substring(0,4);
    clone.querySelector(".month").textContent= oneEvent.acf.date.substring(4,6);
    clone.querySelector(".day").textContent= oneEvent.acf.date.substring(6,8);
    clone.querySelector(".time").textContent= oneEvent.acf.event_time;

    //only show the image if there is is the image to display, else remove the element from html
    if (oneEvent._embedded["wp:featuredmedia"]){
    let evtImg = oneEvent._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url;
    clone.querySelector(".event-img").setAttribute("src", evtImg);
        }
    else{
        clone.querySelector(".event-img").remove
    }
    clone.querySelector(".genre").textContent=oneEvent.acf.genre.toUpperCase();
    clone.querySelector(".venue").textContent=oneEvent.acf.venue;
clone.querySelector(".fee").textContent=oneEvent.acf.event_price + " DKK";

console.log(oneEvent)
    performerEvtSection.appendChild(clone);
}

fetchPerformerEvents();

setInterval(function(){
    if(bottomVisible() && lookingForData===false){
        page++;
        fetchPerformerEvents();
    }
},100);

// set up for endless/infinite scroll - Facebook does it; google is using pagination (next page...)
function bottomVisible(){
    const scrollY = window.scrollY;
    const visible = document.documentElement.clientHeight;
    const pageHeight = document.documentElement.scrollHeight;
    const bottomOfPage = visible + scrollY >= pageHeight;
    return bottomOfPage || pageHeight < visible;
}
