// modules/ProjectDetailRenderer.js
import { scrollToSection } from './AnimationsModule.js'

/**
 * Module to handle displaying detailed information about a project.
 */
export const ProjectDetailRender = (() => {
    let cards;
    let items;

    // Inicializar eventos
    const init = (projectsData, imagesData) => {
      cards = document.querySelectorAll('.projects__cards--card');
      items = document.querySelectorAll(".project__item");
      cards.forEach(card => {
        card.addEventListener('click', (event) => addProjectSelected(event, projectsData, imagesData));
      }); 
      items.forEach(item => {
        item.addEventListener('click', (event) => addProjectSelected(event, projectsData, imagesData));
      });      
    };
  
    /**
     * Adds a new div with detailed information about the selected project.
     *
     * @param {Event} event - The click event on a project card.
     * @param {Array} projects - List of available projects.
     * @param {Array} images - List of image URLs corresponding to the projects.     
     */
    const addProjectSelected = (event, projects, images) => {
      scrollToSection(event, '.projects');
  
      const clickedCard = event.currentTarget;
      const cardIndex = parseInt(clickedCard.id, 10) - 1;  
      
      const project = projects[cardIndex];
      const projectImage = images[cardIndex + 1];
  
      const element = document.createElement('div');
      element.className = 'project__selected flex space-between';
      element.innerHTML = displayProject(project, projectImage);

      // Define the background element's theme color. If the "theme" button is in "light mode," then the page is set to dark mode.
      let theme = document.querySelector(".header__button").value;
      if (theme === 'light mode'){
        element.style.background = "var(--color-secondary)";
        element.querySelectorAll("h1,h6,p,li,a,input").forEach(i=> i.style.color = "var(--color-primary)");
      }         
  
      const projectsCards = document.querySelector('.projects');
      if (projectsCards) {
        projectsCards.appendChild(element);
      } else {
        console.error('.projects not found.');
      }
  
      const cardReturn = element.querySelector('.project__selected-return');
      if (cardReturn) {
        cardReturn.addEventListener('click', removeProjectSelected);
      }

      const listImages = document.querySelectorAll(".project__selected--list-image img");
      listImages.forEach(img => { img.addEventListener("click", (event) => updateMainImage(event)) })
    };
  
    /**
     * Removes the project detail div.
     */
    const removeProjectSelected = () => {
      const element = document.querySelector('.project__selected');
      if (element) {
        setTimeout(()=> {element.remove();}, "1500")        
      }
    };

    /**
     * Generates the HTML to display the details of a project.
     *
     * @param {Object} project - The project data to display.
     * @param {string} project.title - The title of the project.
     * @param {string} project.description - The full description of the project.
     * @param {string} project.url - The project's URL.
     * @param {string} project.skills - List of skills related to the project.
     * @param {string[]} img - Array of image URLs for the project.
     * @returns {string} The HTML for the project detail view.
     */
    const displayProject = (project, images) => {
      const skillsArray = project.skills.split(',');
      const listTech = skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('');

      const listImages = images.map(img => `
            <div class="project__selected--list-image">
              <img src="${img}" class="project__selected--img" alt="">
            </div>
      `).join('');
        
      return `      
        <div class="project__selected--col">
          <div class="project__selected--row">
            <input type="button" class="project__selected-return header__text" value="← Return">
          </div>        
          <div class="project__selected--row">
            <h1 class="project__selected--title title__text">${project.title}</h1>
          </div>        
          <div class="project__selected--row">
            <div class="project__selected--description grid">
              <h6 class="project__selected--subtitle header__text">Description</h6>
              <p class="project__selected--text">${project.description}</p>
            </div>
          </div>
          <div class="project__selected--row">
            <div class="project__selected--description grid ">
              <h6 class="project__selected--subtitle header__text">Tech</h6>
              <ul class="project__selected--list flex wrap">${listTech}</ul>
            </div>
          </div>
          <div class="project__selected--row">
            <div class="project__selected--description grid">
              <h6 class="project__selected--subtitle header__text">Links</h6>
              <a class="project__selected--link" href="${project.url}" target="_blank">${project.url}</a>
            </div>
          </div>
        </div>
        <div class="project__selected--col">
          <div class="project__selected--row">
            <div class="project__selected--main-image">
              <img src="${images[0]}" class="project__selected--img" alt="">
            </div>
          </div>
          <div class="project__selected--row flex space-between">
            ${listImages}
          </div>
        </div>
      `;
    };

    /**
     * Allow change of the main image.
     * @param {object} imageSelected - The image selected to view in grand size.
     * @param {NodeList} listImages - The list of images to select.
     * @param {object} mainImage - The current image is set in grand size.
     */ 
    const updateMainImage = (event) => {

      let imageSelected = event.currentTarget;
      const listImages = document.querySelectorAll(".project__selected--list-image img"); 
      const mainImage = document.querySelector(".project__selected--main-image img");

      listImages.forEach(img => {
        img.style.filter = "contrast(1)";
        if (img = imageSelected) {
            img.style.filter = "contrast(0.3)";
            mainImage.src = imageSelected.src;
        }
    })
    }
  
    return {
      init,
    };
  })();
  