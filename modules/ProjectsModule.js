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
      const card = document.createElement('div');
      card.className = 'projects__card';
      card.id = i;
      card.innerHTML = renderCard(data[i - 1]);
      card.style.height = (100 / lenProjects) + '%';
      fragment.appendChild(card); 

      const divider = document.createElement("span");
      divider.className = "divider";
      fragment.appendChild(divider);
    }

    // Container where the cards will be appended.
    const projectsCards = document.querySelector('.projects__cards'); 
      if (projectsCards) {        
        projectsCards.appendChild(fragment);
      } else {
        console.error('.projectsCards not found.');
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
    const renderCard = (project) => {      
      return `      
        <div class="card__description">
          <span>
            <h1 class="card__title">${project.title}</h1>
            <p class="card__text">${project.description.slice(0, 150)}...</p>
          </span>
        </div>
        <div class="card__bottom"> 
          <input type="button" value="+">       
        </div>        
      `;
    };
  
    return {
        renderProjectsList,
    };
  })();
  
  