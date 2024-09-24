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

    for (let i = 3; i <= lenProjects; i++) {
      const card = document.createElement('li');
      card.className = 'projects__list--row flex wrap space-between';
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
    
    const listLabels = project.labels.split(',')[0];    

    const skillsArray = Object.entries(project.skills.split(',')).slice(0, 3);   
    const listTech = skillsArray.map(skill => `<span><p class="header__text">${skill[1].trim()}</p></span>`).join('');   
    
    return `     
      <div class="projects__list--col flex space-between align-center wrap">
          <p class="header__text">${project.title}</p> <span>-</span> <p class="header__text">${listLabels}</p>
      </div>
      <div class="projects__list--col flex space-between wrap">    
      ${listTech}      
      </div>       
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
      card.className = 'projects__card flex wrap space-between';
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
  const renderCard = (project,images) => { 

    const labelsArray = project.labels.split(',');
    const listLabels = labelsArray.map(skill => `<li class="projects__tech-item body__text"><p>${skill.trim()},</p></li>`).join('');
    
    const skillsArray = project.skills.split(',');
    
    const listTech = skillsArray.map(skill => `<li class="projects__tech-item body__text"><p>${skill.trim()},</p></li>`).join('');
    const listImages = images.map(img => `
      <div class="projects__thumbnail">
        <img src="${img}" alt="Thumbnail Image" class="projects__image">
      </div>
    `).join('');

    return ` 
    <div class="projects__container flex">
      <div class="row">          
          <div class="projects__background">
              <img src="${images[0]}" alt="Project Image" class="projects__image">
          </div> 
          
      </div> 
      <div class="row flex wrap">
          <div class="col col-1">
              <div class="projects__title">
                  <h1 class="title__text">${project.title}</h1>
              </div>
          </div>
          <div class="col col-3">
              <div class="projects__tech flex center">                  
                  <ul class="projects__tech-list flex wrap">
                    ${listLabels}
                  </ul>
              </div>
          </div>
          <div class="col col-2">                                 
              <div class="projects__summary">              
              <p class="body__text">${project.description}</p>
              </div>
          </div>                                     
          <div class="col col-3">
              <div class="projects__tech flex center">
                  <ul class="projects__tech-list flex wrap">
                      ${listTech}
                  </ul>
              </div>
          </div>
      </div>
    </div>                    
    <div class="projects__container flex">        
        <div class="row flex">
            <div class="col col-5">
                <div class="projects__link">
                    <a href="${project.link_project}" target="_blank" rel="noopener noreferrer">View Example →</a>
                </div>
            </div>
            <div class="col col-6">
                <div class="projects__link">
                    <a href="${project.link_github}" target="_blank" rel="noopener noreferrer"><i class="fa-brands fa-github" aria-hidden="true"></i> View Code</a>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col col-4">
                <div class="projects__thumbnails flex wrap">
                    ${listImages}                                               
                </div>   
            </div> 
        </div>
    </div>    
    `;
  };  

  return {      
      renderProjectsCards,
      renderProjectsList,
  };
})();
  
  