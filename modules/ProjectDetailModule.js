/**
 * Module to handle displaying detailed information about a project.
 */
export const ProjectDetailRender = (() => {
    let cards;
    let items;

    // Inicializar eventos
    const init = (projectsData, imagesData) => {      
      items = document.querySelectorAll(".projects__list--row");      
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
  
      const clickedCard = event.currentTarget;
      const cardIndex = parseInt(clickedCard.id, 10) - 1;  
      
      const project = projects[cardIndex];
      const projectImage = images[cardIndex + 1];
  
      const element = document.createElement('div');
      element.className = 'project__selected flex space-between';
      element.innerHTML = displayProject(project, projectImage);  
  
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
      const labelsArray = project.labels.split(',');
      const listlabels = labelsArray.map(skill => `<li class="list__text">${skill.trim()}</li>`).join('');

      const skillsArray = project.skills.split(',');
      const listTech = skillsArray.map(skill => `<li class="list__text">${skill.trim()}</li>`).join('');
        
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
              <p class="project__selected--text body__text">${project.description}</p>
            </div>
          </div>
          <div class="project__selected--row">
            <div class="project__selected--description grid ">
              <h6 class="project__selected--subtitle header__text">Tech</h6>
              <ul class="project__selected--list flex wrap">${listTech}</ul>
            </div>
          </div>
          <div class="project__selected--row">
            <div class="project__selected--description grid ">
              <h6 class="project__selected--subtitle header__text">Labels</h6>
              <ul class="project__selected--list flex wrap">${listlabels}</ul>
            </div>
          </div>
          <div class="project__selected--row">
            <div class="project__selected--description grid">
              <h6 class="project__selected--subtitle header__text">Links</h6>
              <a class="project__selected--link list__text" href="${project.link_github}" target="_blank">View Github</a>
            </div>
          </div>
        </div>        
      `;
    };    
  
    return {
      init,
    };
  })();
  