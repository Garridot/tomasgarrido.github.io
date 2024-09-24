/**
 * Module to handle fetching data from a server or using a local backup.
 */
export const DataFetcher = (() => {
  // Local backup data to use if fetch fails or takes too long
  const backupData = [
      {
          "id": 1,
          "title": "Football Players Chart",
          "skills": "Python,Django Rest Framework,Flask,Pandas,JSON Web Token,Beautiful Soup,Javascript",
          "labels": "API-Web Services Development,Data Analytics,Web Scraping",
          "description": `Developed a RESTful API with security & authentication protocols using JWT for authentication
          and authorization during data storage.
          ● Automated collecting and cleaning of 16,080 daily data points using Pandas, streamlining data
          management.`,
          "link_project": "https://football-players-charts.onrender.com/",
          "link_github": "https://github.com/Garridot/football-players-stats-api",
      },
      {
          "id": 2,
          "title": "Ruins of Versailles",
          "skills": "Python,Django Rest Framework,Javascript",
          "labels": "API/Web Services Development, E-commerce Project",
          "description": `Developed a RESTful API for a shop's e-commerce platform.
          ● Implemented multi-currency functionality, dynamically displaying product values in Argentine
          pesos and US dollars, keeping the product values updated.
          ● Worked with PayPal API for secure and convenient transactions.
          `,
          "link_project": "https://ruins-of-versailles-7rbc.onrender.com/",
          "link_github": "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project",
      },
      {
          "id": 3,
          "title": "Inflation Calculator",
          "skills": "Python,Redis,Django,Websockets,Celery",
          "labels": "API/Web Services Development,",
          "description": `app that allows the user to calculate the accumulated inflation over two periods of time, based the consumer price index (CPI). Only Argentina’s inflation data are available.`,
          "link_github": "https://github.com/Garridot/inflation_calculator",
      },
      {
          "id": 4,
          "title": "Email Center API",
          "skills": "Python,Redis,Django,Websockets,Celery",
          "labels": "API Services Development,",
          "description": `Implemented an Identity and Access Management System for a task management platform.
          ● Implemented tasks asynchronously with Redis and Celery, improving background task
          optimization.
          ● Worked with WebSockets to implement chats in live time, improving user communication`,
          "link_github": "https://github.com/Garridot/portfolio-email-center-api",
      }
  ] 

  /**
   * Performs a GET request to fetch data from a specified URL.
   * If the request takes longer than a specified time, uses local backup data.
   *
   * @param {string} url - The URL of the server to fetch data from.
   * @param {number} timeout - Maximum wait time in milliseconds before using backup data.
   * @returns {Promise<Array>} A promise that resolves with the fetched data.
   */  
  const getData = async (url, timeout = 5000) => {
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
    getData     
  };
})();


export const backupDataImages = {
    "1":[
      "/media/project1%231.jpg",
      "/media/project1%232.png",
      "/media/project1%233.png",      
    ],
    "2":[        
      "/media/project2%231.png",            
      "/media/project2%232.png",
      "/media/project2%233.png",
      ],
}  