// modules/ProjectDetailRenderer.js
import { scrollToSection } from './ScrollModule.js'
export const ProjectDetailRender = (() => {
    let cards;

    // Inicializar eventos
    const init = (projectsData, imagesData) => {
      cards = document.querySelectorAll('.projects__card');
      cards.forEach(card => {
        card.addEventListener('click', (event) => addProjectItem(event, projectsData, imagesData));
      });
    };
  
    // Función para desplegar la información detallada del proyecto
    const addProjectItem = (event, projectsData, imagesData) => {
      scrollToSection(event, '.projects__cards');
  
      const clickedCard = event.currentTarget;
      const cardIndex = parseInt(clickedCard.id, 10) - 1;
  
      // Crear elemento con los detalles del proyecto
      const project = projectsData[cardIndex];
      const projectImage = imagesData[cardIndex + 1];
  
      const element = document.createElement('div');
      element.className = 'projects__item';
      element.innerHTML = displayProject(project, projectImage);
  
      const projectsCards = document.querySelector('.projects__cards');
      if (projectsCards) {
        projectsCards.appendChild(element);
      } else {
        console.error('Contenedor principal de tarjetas no encontrado.');
      }
  
      // Agregar evento para el botón de retorno
      const cardReturn = element.querySelector('.projects__item-return');
      if (cardReturn) {
        cardReturn.addEventListener('click', removeProjectItem);
      }
    };
  
    // Función para eliminar el detalle del proyecto
    const removeProjectItem = () => {
      const element = document.querySelector('.projects__item');
      if (element) {
        element.remove();
      }
    };
  
    // Función para generar el HTML detallado del proyecto
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
  