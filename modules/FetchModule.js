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
          "description": `The project involves extracting, cleaning, visualizing, and saving data on athletes' performance. It consists of APIs that carry out operations independently and communicate with one another. Data extraction is performed using BeautifulSoup and Pandas, API, and authentication are handled with Django Rest, and the frontend is developed using JavaScript and graph.js.`,
          "link_project": "https://football-players-charts.onrender.com/",
          "link_github": "https://github.com/Garridot/football-players-stats-api",
      },
      {
          "id": 2,
          "title": "Ruins of Versailles",
          "skills": "Python,Django Rest Framework,Javascript",
          "labels": "API/Web Services Development, E-commerce Project",
          "description": `Developed a RESTful API for an e-commerce platform of a store, implementing multi-currency functionality to dynamically display product values in Argentine pesos and US dollars, and keeping the product values updated. Transactions are processed using PayPal.
          `,
          "link_project": "https://ruins-of-versailles-7rbc.onrender.com/",
          "link_github": "https://github.com/Garridot/Ruins-of-Versailles_Ecommerce-Project",
      },
      {
          "id": 3,
          "title": "Inflation Calculator",
          "skills": "Python,Redis,Django,Websockets,Celery",
          "labels": "API/Web Services Development,",
          "description": `The app enables users to calculate accumulated inflation based on the consumer price index (CPI) for Argentina only.`,
          "link_github": "https://github.com/Garridot/inflation_calculator",
      },
      {
          "id": 4,
          "title": "IAM System Project",
          "skills": "Python,Redis,Django,Websockets,Celery",
          "labels": "API Services Development,",
          "description": `The project aimed to create a robust Identity and Access Management (IAM) system using Django. This system would offer strong user authentication, authorization, and security features for a task management platform. The IAM system would handle tasks asynchronously with Redis and Celery and use WebSockets to enable real-time chats.`,
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
      "./media/project1%231.jpg",
      "./media/project1%232.png",
      "./media/project1%233.png",      
    ],
    "2":[        
      "./media/project2%231.png",            
      "./media/project2%232.png",
      "./media/project2%233.png",
      ],
}  