// modules/ProjectDetailRenderer.js
import { scrollToSection } from './AnimationsModule.js'

/**
 * Module to handle displaying detailed information about a project.
 */
export const ProjectDetailRender = (() => {
    let cards;

    // Inicializar eventos
    const init = (projectsData, imagesData) => {
      cards = document.querySelectorAll('.projects__card');
      cards.forEach(card => {
        card.addEventListener('click', (event) => addProjectItem(event, projectsData, imagesData));
      });
    };
  
    /**
     * Adds a new div with detailed information about the selected project.
     *
     * @param {Event} event - The click event on a project card.
     * @param {Array} projects - List of available projects.
     * @param {Array} images - List of image URLs corresponding to the projects.     
     */
    const addProjectItem = (event, projects, images) => {
      scrollToSection(event, '.projects__cards');
  
      const clickedCard = event.currentTarget;
      const cardIndex = parseInt(clickedCard.id, 10) - 1;  
      
      const project = projects[cardIndex];
      const projectImage = images[cardIndex + 1];
  
      const element = document.createElement('div');
      element.className = 'projects__item';
      element.innerHTML = displayProject(project, projectImage);
  
      const projectsCards = document.querySelector('.projects__cards');
      if (projectsCards) {
        projectsCards.appendChild(element);
      } else {
        console.error('.projects__card not found.');
      }
  
      const cardReturn = element.querySelector('.projects__item-return');
      if (cardReturn) {
        cardReturn.addEventListener('click', removeProjectItem);
      }
    };
  
    /**
     * Removes the project detail div.
     */
    const removeProjectItem = () => {
      const element = document.querySelector('.projects__item');
      if (element) {
        element.remove();
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
    const displayProject = (project, img) => {
      const skillsArray = project.skills.split(',');
      const listItems = skillsArray.map(skill => `<li>${skill.trim()}</li>`).join('');
  
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
              <h6 class="projects__item--subtitle">Description</h6>
              <p class="projects__item--text">${project.description}</p>
            </div>
          </div>
          <div class="projects__item--row">
            <div class="projects__item--description">
              <h6 class="projects__item--subtitle">Tech</h6>
              <ul class="projects__item--list">${listItems}</ul>
            </div>
          </div>
          <div class="projects__item--row">
            <div class="projects__item--description">
              <h6 class="projects__item--subtitle">Links</h6>
              <a class="projects__item--link" href="${project.url}" target="_blank">${project.url}</a>
            </div>
          </div>
        </div>
        <div class="projects__item--col">
          <div class="projects__item--row">
            <div class="projects__item--main-image">
              <img src="${img[0]}" class="projects__item--img" alt="">
            </div>
          </div>
        </div>
      `;
    };
  
    return {
      init,
    };
  })();
  