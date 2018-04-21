const BtnTemplate = document.querySelector("#btn-template").content;
let btnVenues = document.querySelector("#btn-venues");

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

    let clone = BtnTemplate.cloneNode(true);

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

    console.log(aVenue.slug)}

    btnVenues.appendChild(clone);

//        let clone = template.cloneNode(true);

    //.substring(0,5)
//
//        clone.querySelector("h1").textContent = aCar.title.rendered;
//        clone.querySelector(".desciption").innerHTML = aCar.content.rendered;
//        clone.querySelector("h2 span").textContent = aCar.acf.price;
//        clone.querySelector(".color").style.background = aCar.acf.color;
//
//        //select image
//        if(aCar.featured_media != 0){
//        let myimg = aCar._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url
//        console.log(myimg)
//        clone.querySelector("img").setAttribute("src", myimg);
//        clone.querySelector("img").setAttribute("alt", "my image");
//        }
//        else {//no image
//         clone.querySelector("img").remove;
//            console.log("smth")
//        }
//
//        carlist.appendChild(clone);
 }
fetchVenues();
