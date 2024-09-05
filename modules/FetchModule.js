export const DataFetcher = (() => {

    const backupData = [
        {
            "id": 1,
            "title": "Football Players Chart",
            "skills": "Python,Django Rest Framework,Flask,Pandas,JSON web token,BS4,Javascript",
            "description": `Developed a RESTful API with security & authentication protocols using JWT for authentication
            and authorization during data storage.
            ● Automated collecting and cleaning of 16,080 daily data points using Pandas, streamlining data
            management.
            ● Developed a web service that enabled users to explore and comprehend data seamlessly
            through interactive graphs and tables to elevate user engagement`,
        },
        {
            "id": 2,
            "title": "Ruins of Versailles",
            "skills": "Python,Django Rest Framework,Javascript",
            "description": `Developed a RESTful API for a shop's e-commerce platform.
            ● Implemented multi-currency functionality, dynamically displaying product values in Argentine
            pesos and US dollars, keeping the product values updated.
            ● Worked with PayPal API for secure and convenient transactions.
            `,
        },
        {
            "id": 3,
            "title": "Inflation Calculator",
            "skills": "Python,Redis,Django,Websockets,Celery",
            "description": `app that allows the user to calculate the accumulated inflation over two periods of time, based the consumer price index (CPI). Only Argentina’s inflation data are available.`,
        },
        {
            "id": 4,
            "title": "Email Center API",
            "skills": "Python,Redis,Django,Websockets,Celery",
            "description": `Implemented an Identity and Access Management System for a task management platform.
            ● Implemented tasks asynchronously with Redis and Celery, improving background task
            optimization.
            ● Worked with WebSockets to implement chats in live time, improving user communication`,
        }
    ] 
  
    // Función que envuelve el fetch con un timeout
    const fetchDataWithTimeout = async (url, timeout = 5000) => {
      const fetchPromise = fetch(url).then(response => {
        if (!response.ok) {
          throw new Error('Server response error.');
        }
        return response.json();
      });
  
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Waiting time exceeded.')), timeout)
      );
  
      try {
        const data = await Promise.race([fetchPromise, timeoutPromise]);
        return data;
      } catch (error) {
        console.warn('Using backup data due to:', error.message);
        return backupData;
      }
    };
  
    return {
      init: () => {
        console.log('DataFetcher iniciado');
      },
      getData: fetchDataWithTimeout,
    };
  })();


export const backupDataImages = {
    "1":["https://raw.githubusercontent.com/Garridot/tomasgarrido-/main/static/media/project__1.jpg",],
    "2":[        
            "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project/raw/main/project_images/image__1.png",            
            "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project/raw/main/project_images/image__2.png",
            "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project/raw/main/project_images/image__3.png",
            "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project/raw/main/project_images/image__5.png",
        ],
    "3": ["https://raw.githubusercontent.com/Garridot/tomasgarrido-/main/static/media/project__3.jpg"],
    "4": ["https://raw.githubusercontent.com/Garridot/tomasgarrido-/main/static/media/project__4.jpg"],

}  