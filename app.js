import { DataFetcher, backupDataImages } from './modules/FetchModule.js';
import { ProjectRender } from './modules/ProjectsModule.js'
import { ProjectDetailRender } from './modules/ProjectDetailModule.js'
import { ScrollAnimations, clickEventAnimations, startAnimations } from './modules/AnimationsModule.js'
import { validateForm } from './modules/ContactFormModule.js'


document.addEventListener('DOMContentLoaded', async () => {  
  startAnimations.init();

  const clickEvents = clickEventAnimations();
  clickEvents.init(); 

  ScrollAnimations.init();

  DataFetcher.getData();
  const url = 'https://tomasgarrido-portfolio-dashboard.onrender.com';  
  const data = await DataFetcher.getData(url);    
  // Initialize the project list render
  ProjectRender.renderProjectsList(data); 
  ProjectRender.renderProjectsCards(data,backupDataImages);  
  // Initialize the project details renderer
  ProjectDetailRender.init(data, backupDataImages);


  const formSubmit = validateForm();
  formSubmit.init();  
});

