import { animateDividers, animateTextElements  } from './AnimationsModule.js'

/**
 * Module for controlling page animations triggered by clicking.
 */
 export const clickEventAnimations = (() => {
    // State object to centralize the current state of the module
    const state = {
        isMenuVisible: false,
        isDefaultTheme: false,
    };

    // Element selectors
    const selectors = {
        header: document.querySelector("header"),
        darkModeButton: document.querySelector("#dark-button"),
        menuButton: document.querySelector("#menu-button"),
        menu: document.querySelector(".menu"),
        menuLinks: document.querySelectorAll(".menu__link"),
        body: document.body,
        dividers: document.querySelectorAll(".divider"),
        projectCardsContainer: document.querySelector(".projects__cards"),
        projectListsContainer: document.querySelector(".projects__list"),
    };

    /**
     * Toggles the visibility of the menu by modifying its transform property.
     */
    const toggleMenuDisplay = () => {
        state.isMenuVisible = !state.isMenuVisible;
        selectors.menu.style.clipPath = state.isMenuVisible ? "circle(150% at 100% 0)" : "circle(0% at 100% 0)";
        if (state.isMenuVisible) {
            setTimeout(() => {
                animateTextElements(selectors.menu.querySelectorAll("h1, li, a"));
                animateDividers(selectors.menu.querySelectorAll(".divider"));
            }, 800);
        }
    };

    /**
     * Updates the theme between dark and light modes, modifying various styles.
     */
    const updateTheme = () => {   
        
        const lightColor = "#fcf0ec";
        const darkColor  = "#131519";

        const themeConfig = state.isDefaultTheme
            ? {
                buttonLabel: "light mode",
                backgroundColor: darkColor,
                textColor: lightColor,                
            }
            : {
                buttonLabel: "dark mode",
                backgroundColor: lightColor,
                textColor: darkColor,               
            };

        applyTheme(themeConfig);
        state.isDefaultTheme = !state.isDefaultTheme;
    };

    /**
     * Applies the specified theme styles to the page elements.
     * Centralized to avoid repetition.
     */
    const applyTheme = (theme) => {
        const root = document.documentElement;
        selectors.darkModeButton.value = theme.buttonLabel;
        root.style.setProperty('--color-background', theme.backgroundColor);
        root.style.setProperty('--color-text', theme.textColor);
        
    };

    /**
     * Handles the display animation for the project detail item.
     */
    const applyDisplayItem = () => {
        const projectItem = document.querySelector(".project__selected");
        const itemStrings = projectItem.querySelectorAll(".project__selected--col:nth-child(1)");
        const itemMainText = projectItem.querySelectorAll("h1, p");
        const itemExtraText = projectItem.querySelectorAll("h6, input, a"); 

        projectItem.style.transform = "translate3d(0%, 0px, 0px)";

        setTimeout(() => {
            animateTextElements(itemMainText);
            itemStrings.forEach(element => {
                element.style.transform = "translate3d(0%, 0px, 0px)";
                element.style.opacity = 1;
            });
        }, 1200);  

        // Additional text elements animation
        setTimeout(() => { 
            animateTextElements(itemExtraText); 
        }, 2500); 

        const cardReturn = document.querySelector('.project__selected-return');
        if (cardReturn) {
            cardReturn.addEventListener('click', applyRemoveItem);
        }
    };

    const applyRemoveItem = () => {
        const project = document.querySelector(".project__selected");
        const itemRows = document.querySelectorAll(".project__selected--row");        

        itemRows.forEach((col, index) => {
            col.style.transform = "translate3d(0px, -100%, 0px)"; 
            col.style.opacity = 0; 
            col.style.transitionDelay = `${index * 0.01}s`;
        });
        setTimeout(()=> {
            project.style.transform = "translate3d(0px, -100%, 0px)";
        },"500")
    };

    /**
     * Allow change of the main image.
     * @param {object} imageSelected - The image selected to view in grand size.
     * @param {NodeList} listImages - The list of images to select.
     * @param {object} mainImage - The current image is set in grand size.
     */ 
     const updateMainImage = (project,event) => {

        console.log(project,event.src)

        let imageSelected = event;
        const listImages  = project.querySelectorAll(".projects__thumbnail img");
        const mainImage  = project.querySelector(".projects__background img");
  
        listImages.forEach(img => {
          img.style.filter = "contrast(1)";
          if (img = imageSelected) {
              img.style.filter = "contrast(0.3)";
              mainImage.src = imageSelected.src;
          }
      })
      }

    /**
     * Initializes click event listeners for menu, dark mode, and project cards.
     */
    const init = () => {
        // selectors.darkModeButton.addEventListener("click", updateTheme);
        selectors.menuButton.addEventListener("click", toggleMenuDisplay);
        selectors.menuLinks.forEach(link => link.addEventListener("click", toggleMenuDisplay));

        const projectItems = [
            ...selectors.projectListsContainer.querySelectorAll(".projects__list--row"),
        ];
        projectItems.forEach(item => {
            item.addEventListener("click", () => setTimeout(applyDisplayItem, 300));
        });

        const projectCards = [
            ...selectors.projectCardsContainer.querySelectorAll(".projects__card"),
        ];

        projectCards.forEach(card => {
            card.querySelectorAll(".projects__thumbnail img").forEach(img => {
                img.addEventListener("click", () => updateMainImage(card,img))
            })              
        });

    };

    // Public API
    return { init };
})();
