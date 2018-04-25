fetch("http://test.masawudesign.dk/wp-json/wp/v2/categories")
            //respons back
            .then(e => e.json())
            //now we have the data, we can do with it whatever we want
            .then(buildButtons)

function buildButtons(categories){
    let parentEl= document.querySelector(".menu")
    categories.forEach(aCategory =>{
        if(aCategory.parent===32){
            let button = document.createElement("button")
            let a = document.createElement("a")
            a.textContent= aCategory.name
            a.href="concert-venues.html?category=" + aCategory.id
            button.appendChild(a);
            parentEl.appendChild(button)
        }
    })
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
