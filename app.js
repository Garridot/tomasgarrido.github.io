import { DataFetcher, backupDataImages } from './modules/FetchModule.js';
import { ProjectRender } from './modules/ProjectsRender.js'
import { ProjectDetailRender } from './modules/ProjectDetailRender.js'
import { ScrollModule } from './modules/ScrollModule.js'



document.addEventListener('DOMContentLoaded', async () => {
    DataFetcher.init();
  
    const url = 'https://tomasgarrido-portfolio-dashboard.onrender.com';  
    const data = await DataFetcher.getData(url);    
    // Renderizar la lista de proyectos
    ProjectRender.renderProjectsList(data);  
    // Inicializar el renderizador de detalles del proyecto
    ProjectDetailRender.init(data, backupDataImages);

    ScrollModule.init()
  });

