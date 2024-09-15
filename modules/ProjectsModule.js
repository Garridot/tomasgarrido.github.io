// modules/ProjectRenderer.js

/**
  * Module to handle rendering of HTML elements based on data.
  */
export const ProjectRender = (() => { 
  /**
   * Renders a list of projects by creating a card for each project.
   *
   * @param {Array} data - List of projects to render.   
   */  
   const renderProjectsList = (data) => {    

    if (!Array.isArray(data) || data.length === 0) {                    
      console.warn('Invalid or empty projects data.');
      return;
    }

    const lenProjects = data.length;
    const fragment = document.createDocumentFragment(); 

    for (let i = 1; i <= lenProjects; i++) {
      const card = document.createElement('li');
      card.className = 'project__item';
      card.id = i;
      card.innerHTML = renderItem(data[i - 1]);
      fragment.appendChild(card);    
      
      const divider = document.createElement('span');
      divider.className = "divider";
      fragment.appendChild(divider); 
    }

    // Container where the cards will be appended.
    const projectsList = document.querySelector('.projects__list'); 
      if (projectsList) {        
        projectsList.appendChild(fragment);
      } else {
        console.error('.projects__list not found.');
      }
    };  
  /**
   * Generates the HTML content for a project card.
   *
   * @param {Object} project - The project data to display on the card.
   * @param {string} project.title - The title of the project.   
   * @returns {string} The HTML for the project card.
   */    
  const renderItem = (project) => {      
    return ` 
    <p class="project__item--text list__text flex space-between">${project.title}<span></span>2024</p>         
    `;
  };
  /**
   * Renders a list of projects by creating a card for each project.
   *
   * @param {Array} data - List of projects to render.   
   */  
  const renderProjectsCards = (data,backupDataImages) => {    

    if (!Array.isArray(data) || data.length === 0) {                    
      console.warn('Invalid or empty projects data.');
      return;
    }

    // const lenProjects = data.length;
    const fragment = document.createDocumentFragment(); 

    for (let i = 1; i <= 2; i++) {
      const card = document.createElement('div');
      card.className = 'projects__cards--card flex space-between';
      card.id = i;
      const projectImage = backupDataImages[i];
      card.innerHTML = renderCard(data[i - 1],projectImage);
      fragment.appendChild(card);       
    }

    // Container where the cards will be appended.
    const projectsCards = document.querySelector('.projects__cards'); 
      if (projectsCards) {        
        projectsCards.appendChild(fragment);
      } else {
        console.error('.projects__cards not found.');
      }
    };  
  /**
   * Generates the HTML content for a project card.
   *
   * @param {Object} project - The project data to display on the card.
   * @param {string} project.title - The title of the project.
   * @param {string} project.description - The description of the project.
   * @returns {string} The HTML for the project card.
   */    
  const renderCard = (project,projectImage) => {      
    return ` 
    <div class="projects__cards--title">
        <p class="projects__card--text grid list__text">${project.title}<span></span>2023</p>
    </div>
    <div class="projects__cards--background">
        <img src="${projectImage[0]}" alt="" class="projects__cards--img">
    </div>        
    `;
  };  

  return {      
      renderProjectsCards,
      renderProjectsList,
  };
})();
  
  