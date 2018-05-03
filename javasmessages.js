let page = 1;
let lookingForData = false;
let vltPath = "http://designki.dk/CMS/wordpress/wp-json/wp/v2/volunteers_profile?per_page=5&page=";
let messageTemplate = document.querySelector(".messageTemplate").content;
let messageSection = document.querySelector("#messagesMain")


function fetchMessages() {
    lookingForData = true;
    fetch(vltPath+page).then(g => g.json()).then(showMessages)
}

function showMessages(volunteers){
    //console.log(volunteers)
    lookingForData = false;
    volunteers.forEach((oneVolunteer) =>{
        //console.log(oneVolunteer)

    let clone = messageTemplate.cloneNode(true);
      // console.log(oneVolunteer.acf.date_message_recieved.substring(6,8))

        let year = oneVolunteer.acf.date_message_recieved.substring(0,4)
        let month = oneVolunteer.acf.date_message_recieved.substring(4,6)
        let day = oneVolunteer.acf.date_message_recieved.substring(6,8)

        let date = day + "/" + month + "/" + year;


        let imageSrc = oneVolunteer.acf.volunteers_picture.url;

        clone.querySelector(".profileMessages").setAttribute("src", imageSrc)

        clone.querySelector(".messagesName").textContent=oneVolunteer.title.rendered;
        clone.querySelector(".messagesText1").textContent=oneVolunteer.acf.text_message;

        console.log(oneVolunteer.acf.date_message_recieved.substring(6,8))

        clone.querySelector(".messagesDate").textContent= date;




        messageSection.appendChild(clone)

    })
}


fetchMessages();





//BURGER MENU
let mainImage = document.querySelector(".profile").setAttribute("src", "https://img.discogs.com/7OVpyqH6U-JaN-UuT3WVvpoVdwc=/fit-in/500x500/filters:strip_icc():format(jpeg):mode_rgb():quality(90)/discogs-images/R-8934094-1471778116-6059.jpeg.jpg")
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

////INFINITE SCROLL

setInterval(function(){
    if(bottomVisible() && lookingForData===false){
        page++;
        fetchMessages();
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
