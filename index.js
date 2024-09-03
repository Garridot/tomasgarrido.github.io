const body = document.querySelector("body");

//// HEADER FUNTIONS ////
const header = document.querySelector("header");
var darkMode = header.querySelector("#dark-button");
var menubtn = header.querySelector("#menu-button");
var menu = document.querySelector(".menu"); 

darkMode.addEventListener("click", updateTheme);
menubtn.addEventListener("click", menuDisplay)

var isMenuDisplay = false

function menuDisplay () {
    if (!isMenuDisplay) {
        menu.style.display = "block";
        isMenuDisplay = true
    } 
    else {
        menu.style.display = "none";
        isMenuDisplay = false;
    }
}

const sectionProjects = document.querySelector('.projects');
const projectsCards = document.querySelector(".projects__cards");

function renderCard (project) {    
    return `         
    <div class="card_description">
        <span>
            <h1 class="card__title">${project.title}</h1>
            <p class="card__text">${project.description.slice(0, 150)}...</p>
        </span>
    </div>
    <div class="card__bottom"> 
        <input type="button" value="+">       
    </div>         
    `
} 

function displayProject (project, img) {

    const skillsArray = project.skills.split(",");
    let listItems = "";   
    for (let i = 0; i < skillsArray.length; i++) {
        listItems += `<li class="">${skillsArray[i]}</li>`;
    }

    return ` 
    <div class="projects__item--col">
        <div class="projects__item--row">
            <input type="button" class="projects__item-return" value="← Return">
        </div>
    </div>
    <div class="projects__item--col">
        <div class="projects__item--row">
            <h1 class="projects__item--title">${project.title}</h1>
        </div>
    </div>
    <div class="projects__item--col">
        <div class="projects__item--row">     
            <div class="projects__item--description">  
                <h6 class="projects__item--subtitle">description</h6>
                <p class="projects__item--text">${project.description}</p>
            </div>     
        </div>
        <div class="projects__item--row">   
            <div class="projects__item--description">  
                <h6 class="projects__item--subtitle">tech</h6>
                <ul class="projects__item--list">${listItems}</ul>
            </div>          
        </div>
        <div class="projects__item--row">     
            <div class="projects__item--description">  
                <h6 class="projects__item--subtitle">links</h6>
                <a class="projects__item--link" href="" target="_blank">${project.url}</a>
                <a class="projects__item--link" href="" target="_blank">${project.url}</a>
            </div>                    
        </div>
    </div>
    <div class="projects__item--col">
    <div class="projects__item--row"> 
        <div class="projects__item--main-image">  
            <img src="${img[0]}" class="projects__item--img" alt="">     
        </div
    </div>
</div>
    `
}

function renderProjList(PROJECTS_IMAGENES){

    let lenProjects = Object.keys(PROJECTS_IMAGENES).length;

    for(let i = 1; i < lenProjects + 1; i++){

        var card       = document.createElement("div"); 
        card.className = "projects__card";
        card.id        = i ;
        card.innerHTML = renderCard(PROJECTS[i - 1])        
        card.style.height  =  (100 / lenProjects) + "%";  

        projectsCards.appendChild(card);
    }
} 

renderProjList(PROJECTS_IMAGENES);

function addProjectItem(event) {

    scrollToSection(event, '.projects__cards')

    const clickedCard = event.currentTarget;       
    
    cards.forEach(card => {
        if (card === clickedCard) { 
            const project = PROJECTS[card.id - 1];
            const projectImage = PROJECTS_IMAGENES[card.id];

            var element = document.createElement("div");
            element.className = "projects__item";
            element.id        = PROJECTS[card.id - 1];

            console.log(projectImage)
            element.innerHTML = displayProject(project,projectImage);

            projectsCards.appendChild(element)
        } 
    });

    let cardReturn = document.querySelector(".projects__item-return");
    if (cardReturn) {
        cardReturn.addEventListener("click", removeProjectItem);
    }
}
function removeProjectItem() {
    const element = document.querySelector(".projects__item"); 
    if (element) { element.remove()}
}

let cards = document.querySelectorAll('.projects__card');
cards.forEach(card => {
    card.addEventListener('click', addProjectItem);   
});


function scrollToSection(event, sectionId) {    
    event.preventDefault();        
    const targetSection = document.querySelector(sectionId);        
    if (targetSection) {
        targetSection.scrollIntoView({
            behavior: 'smooth', 
            block: 'start'
        });
    }
}

function handleScroll() {
    const currentScrollY = window.scrollY;   
    
}
window.addEventListener('scroll', handleScroll);


const strings = document.querySelectorAll("h1, h2, h3, h4, h5, h6, p, a, input[type='button'], li, label");
var defaultTheme = true;
function updateTheme() {   

    if (defaultTheme) {

        darkMode.value = "light mode";

        body.style.background = "var(--color-secondary)";
        header.style.background = "var(--color-secondary)";
        strings.forEach(str => {
            str.style.color = "#fcf0ec";       
        })
        
        document.querySelector("path").style.stroke = "#fcf0ec";

        document.querySelector(".contact__form input[type='submit']").style.background = "var(--color-primary)";
        document.querySelector(".contact__form input[type='submit']").style.color = "var(--color-secondary)";

        defaultTheme = false;

    } else {

        darkMode.value = "dark mode";

        header.style.background = "#fcf0ec";
        body.style.background = "#fcf0ec";
        strings.forEach(str => {
            str.style.color = "var(--color-secondary)";
        })

        document.querySelector("path").style.stroke = "var(--color-secondary)";

        document.querySelector(".contact__form input[type='submit']").style.background = "var(--color-secondary)";
        document.querySelector(".contact__form input[type='submit']").style.color = "var(--color-primary)";

        defaultTheme = true;
    }  
}
