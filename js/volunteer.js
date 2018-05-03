const evtPath = "http://designki.dk/CMS/wordpress/wp-json/wp/v2/events?_embed"
let template = document.querySelector("#template-events").content;
let popup = document.querySelector(".popup");
let pList = 'http://ferrarigiada.com/kea/07-cms/wordpress/wp-json/wp/v2/events?slug=';
let section = document.querySelector(".entry-container");


function fetchEvents() {
    fetch(evtPath).then(e => e.json()).then(showEvents)
}

function showEvents(evt) {
    //    console.log(evt)
    evt.forEach((e) => {
        let clone = template.cloneNode(true);
        //        console.log(clone)
        //        console.log(template)
        clone.querySelector('h1').textContent = e.title.rendered;
        clone.querySelector('.time').textContent = e.acf.shift_hours;
        clone.querySelector('.volunteer-role').textContent = e.acf.volunteer_role;
        clone.querySelector(".location").textContent = e.acf.venue;
        let image = e.acf.event_picture.sizes.medium;
        clone.querySelector("img").setAttribute("src", image);
        clone.querySelector(".buttonModal").addEventListener("click", clickEvt => {
            //            console.log(e.acf.venue)
            clickEvt.target.classList.toggle("active");
            let popup = document.querySelector(".popup");
            let button = document.querySelector(".buttonModal");
            console.log('clicked')
            popup.classList.add('slideMe');
            window.onscroll = () => popup.classList.remove('slideMe');
            let iconX = document.querySelector(".closeModal");
            iconX.addEventListener("click", closeModal);

            function closeModal() {
                popup.classList.remove('slideMe');
            }
            popup.querySelector('.band').textContent = e.acf.bandcare_volunteer;
            popup.querySelector('.bar').textContent = e.acf.bartending_volunteer;
            popup.querySelector('.light').textContent = e.acf.sound_volunteer;
        })
        section.appendChild(clone);
    })
}
fetchEvents();












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
