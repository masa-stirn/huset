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

