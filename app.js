import { DataFetcher, backupDataImages } from './modules/FetchModule.js';
import { ProjectRender } from './modules/ProjectsModule.js'
import { ProjectDetailRender } from './modules/ProjectDetailModule.js'
import { startAnimations } from './modules/AnimationsModule.js'
import { validateForm } from './modules/ContactFormModule.js'
import { gradientLiquidAnimation } from './modules/GradientLiquidModule.js'
import { ScrollAnimations } from './modules/ScrollEventsModule.js'
import { clickEventAnimations } from './modules/clickEventsModule.js'


document.addEventListener('DOMContentLoaded', async () => {   
  startAnimations.init();

  // ScrollAnimations.init();

  ScrollAnimations.init()

  DataFetcher.getData();
  const url = 'https://tomasgarrido-portfolio-dashboard.onrender.com';  
  const data = await DataFetcher.getData(url);    
  // Initialize the project list render
  ProjectRender.renderProjectsList(data); 
  ProjectRender.renderProjectsCards(data,backupDataImages);  
  // Initialize the project details renderer
  ProjectDetailRender.init(data, backupDataImages);

  // const clickEvents = clickEventAnimations();
  clickEventAnimations.init(); 

  const liquidMotionEffect = gradientLiquidAnimation();
  liquidMotionEffect.init();


  const formSubmit = validateForm();
  formSubmit.init();  
});

