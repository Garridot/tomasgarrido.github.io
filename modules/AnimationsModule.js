/** 
* This function checks if an HTML element is visible in the browser's viewport based on a threshold.
* @param {HTMLElement} element - The HTML element to check.
* @param {number} threshold - The visibility threshold in pixels.
* @returns {boolean} Returns true if the element is visible; otherwise, it is false.
*/
export const isElementVisible = (element,threshold)=>{        
    const rect = element.getBoundingClientRect();
    return rect.top < threshold  
};

/**
 * Smoothly scrolls to the specified section in the document.
 *
 * @param {Event} event - The triggering event, often a click event.
 * @param {string} targetSelector - A CSS selector string that identifies the target element to scroll to.
 */
export const scrollToSection = (event, targetSelector) => {    
    const targetElement = document.querySelector(targetSelector);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    } else {
      console.error(`${targetSelector} not found.`);
    }
};

/**
 * Animates the divider elements by making them visible and expanding their width.
 * @param {NodeListOf<HTMLElement>} dividers - List of divider elements to animate.
 */
    const animateDividers = (dividers) => {        
    dividers.forEach((divider) => {
        divider.style.opacity = 1;
        divider.style.width = "100%";
        divider.style.transitionDuration = "2s";
    });
};

/**
 * Animates text elements by revealing them and removing their initial transformations.
 * @param {NodeListOf<HTMLElement>} elements - List of text elements to animate.
 */
const animateTextElements = (elements) => {
    elements.forEach((element) => {
        element.style.opacity = 1;
        element.style.transitionDuration = "1s";
        element.style.transform = "none";
    });
};

/**
* Module for controlling page animations triggered by scrolling.
* Applies animations to various elements on the page, enhancing the
* user experience with smooth transitions and effects.
*/
export const ScrollAnimations = (() => {  
    /**
     * Animates the marquee effect by moving text elements horizontally as the page scrolls.
     * The effect creates a moving text that shifts left and right based on scroll position.
     */
    const animateMarqueeEffect = () => {
        const limitBorderLeft = 0;
        const limitBorderRight = 1950;
        const currentScrollY = window.scrollY;
        const marqueeText = document.querySelectorAll(".transition__text");

        let marquee = Math.max(limitBorderLeft, Math.min(currentScrollY * 0.2, limitBorderRight));

        marqueeText.forEach((text, index) => {
            text.style.transform = `translate3d(${index === 1 ? -marquee : marquee}px, 0, 0)`;
        });
    };

    /**
     * Animates the transition section, including text and dividers,
     * if the section is visible within the specified threshold.
     */
    const animateTransition = () => {
        const transition = document.querySelector(".transition");
        if (isElementVisible(transition, 600)) {
            const transitionStrings = transition.querySelectorAll("h3");
            animateTextElements(transitionStrings);
            animateDividers(transition.querySelectorAll(".divider"));
        }
    };

    /**
     * Animates the profile section's text elements if the section is visible within the specified threshold.
     */
    const animateProfile = () => {
        const profile = document.querySelector(".profile");
        if (isElementVisible(profile, 500)) {
            const profileStrings = profile.querySelectorAll("h1, h6, p, li");
            animateTextElements(profileStrings);
        }
    };

    /**
     * Animates the introductory project section's text elements if the section is visible within the specified threshold.
     */
    const animateProjectsIntro = () => {
        const projectsIntro = document.querySelector(".projects__intro");
        if (isElementVisible(projectsIntro, 500)) {
            const projectStrings = projectsIntro.querySelectorAll("h1, p");
            animateTextElements(projectStrings);
        }
    };

    /**
     * Animates the project cards section, including text and dividers,
     * if the section is visible within the specified threshold.
     */
    const animateProjectsCard = () => {
        const projectCards = document.querySelector(".projects__cards");
        if (isElementVisible(projectCards, 500)) {
            const projectsStrings = projectCards.querySelectorAll("h1, p");
            animateTextElements(projectsStrings);
            animateDividers(projectCards.querySelectorAll(".divider"));
        }
    };

    /**
     * Animates the contact section's text elements if the section is visible within the specified threshold.
     */
    const animateContact = () => {
        const contact = document.querySelector(".contact");
        if (isElementVisible(contact, 500)) {
            const contactStrings = contact.querySelectorAll("h1, p, label");
            animateTextElements(contactStrings);
        }
    };

    /**
     * Initializes the scroll animations by triggering initial animations and setting up scroll event listeners.
     */
    const init = () => {
        window.addEventListener("scroll", animateProfile);
        window.addEventListener("scroll", animateMarqueeEffect);
        window.addEventListener("scroll", animateTransition);
        window.addEventListener("scroll", animateProjectsIntro);
        window.addEventListener("scroll", animateProjectsCard);
        window.addEventListener("scroll", animateContact);
    };

    // Public API
    return {
        init,
    };
})();

/**
 * Module for controlling page animations triggered by clicking.
 */
 export const clickEventAnimations = () => {         
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
    };

    let isMenuVisible = false;
    let isDefaultTheme = true;    

    /**
     * Toggles the visibility of the menu by modifying its transform property.
     */
    const toggleMenuDisplay = () => {        
        isMenuVisible = !isMenuVisible;
        selectors.menu.style.transform = isMenuVisible ? "translateY(0%)" : "translateY(100%)";
        if (isMenuVisible){
            setTimeout(()=>{
                animateTextElements(selectors.menu.querySelectorAll("h1, li, a"));
                animateDividers(selectors.menu.querySelectorAll(".divider"));        
            },"800")
            
        }
    };

    /**
     * Updates the theme between dark and light modes, modifying various styles.
     */
    const updateTheme = () => {        
        const elementsToStyle = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, a, input[type='button'], li, label"
        );
        const svgPath = document.querySelector("path");
        const submitButton = document.querySelector(".contact__form input[type='submit']");

        if (isDefaultTheme) {
            applyTheme({
                buttonLabel: "light mode",
                backgroundColor: "var(--color-secondary)",
                textColor: "var(--color-primary)",
                svgStroke: "var(--color-primary)",
            }, elementsToStyle, svgPath, submitButton);
        } else {            
            applyTheme({                
                buttonLabel: "dark mode",
                backgroundColor: "var(--color-primary)",
                textColor: "var(--color-secondary)",
                svgStroke: "var(--color-secondary)",
            }, elementsToStyle, svgPath, submitButton);
        }

        isDefaultTheme = !isDefaultTheme;
    };

    /**
     * Applies the specified theme styles to the page elements.
     * 
     * @param {Object} theme - Theme configuration object.
     * @param {string} theme.buttonLabel - Label for the theme toggle button.
     * @param {string} theme.backgroundColor - Background color for body and header.
     * @param {string} theme.textColor - Text color for page elements.
     * @param {string} theme.svgStroke - Stroke color for SVG elements.
     * @param {NodeListOf<HTMLElement>} elements - Elements to change color.
     * @param {SVGPathElement} svgPath - The SVG path to update stroke color.
     * @param {HTMLInputElement} submitButton - The submit button to style.
     */
    const applyTheme = (theme, elements, svgPath, submitButton) => {        
        selectors.darkModeButton.value = theme.buttonLabel;
        selectors.body.style.background = theme.backgroundColor;
        selectors.header.style.background = theme.backgroundColor;
        selectors.menu.style.background = theme.backgroundColor;

        selectors.dividers.forEach(divider => {
            divider.style.background = theme.textColor;
        });

        const projectItem = document.querySelector(".projects__item");
        if (projectItem) {
            projectItem.style.background = theme.backgroundColor;
        }

        elements.forEach(el => el.style.color = theme.textColor);
        svgPath.style.stroke = theme.svgStroke;
        styleSubmitButton(submitButton, theme.textColor, theme.backgroundColor);
    };

    /**
     * Styles the submit button with specified background and text colors.
     * 
     * @param {HTMLInputElement} button - The submit button element.
     * @param {string} backgroundColor - Background color for the button.
     * @param {string} textColor - Text color for the button.
     */
    const styleSubmitButton = (button, backgroundColor, textColor) => {
        button.style.background = backgroundColor;
        button.style.color = textColor;
    };

    /**
     * Handles the display animation for the project detail item.
     */
    const applyDisplayItem = () => {      
        const projectItem = document.querySelector(".projects__item");   
        const itemStrings = document.querySelectorAll(".projects__item--col:nth-child(1)");
        const itemImage = document.querySelector(".projects__item--col:nth-child(2)");
        const itemMainText = projectItem.querySelectorAll("h1, p");
        const itemExtraText = projectItem.querySelectorAll("h6, li, a"); 
        
        selectors.projectCardsContainer.querySelectorAll(".projects__card, .divider").forEach(i => i.style.filter = "opacity(0)");

        projectItem.style.transform = "translate3d(0%, 0px, 0px)";

        // Main item text and images animation
        setTimeout(() => {
            animateTextElements(itemMainText);
            itemStrings.forEach(element => {
                element.style.transform = "translate3d(0%, 0px, 0px)";
                element.style.opacity = 1;
            });
            itemImage.style.transform = "translate3d(0%, 0px, 0px)";
            itemImage.style.opacity = 1;
        }, 1200);  

        // Additional text elements animation
        setTimeout(() => { 
            animateTextElements(itemExtraText); 
        }, 2500);    

        const cardReturn = document.querySelector('.projects__item-return');
        if (cardReturn) {
            cardReturn.addEventListener('click', applyRemoveItem);
        }
    };

    /**
     * Handles the removal animation of the project detail item.
     */
    const applyRemoveItem = () => {
        const itemRows = document.querySelectorAll(".projects__item--row");        

        itemRows.forEach((col, index) => {
            col.style.transform = "translate3d(0px, -100%, 0px)"; 
            col.style.opacity = 0; 
            col.style.transitionDelay = `${index * 0.01}s`;
        });

        setTimeout(() => { 
            selectors.projectCardsContainer.querySelectorAll(".projects__card, .divider").forEach(i => i.style.filter = "opacity(1)"); 
        }, 1200);
    };    

    /**
     * Initializes click event listeners for menu, dark mode, and project cards.
     */
    const init = () => {
        selectors.darkModeButton.addEventListener("click", updateTheme);
        selectors.menuButton.addEventListener("click", toggleMenuDisplay);
        selectors.menuLinks.forEach(link => {
            link.addEventListener("click", toggleMenuDisplay);
        })

        selectors.projectCardsContainer.querySelectorAll(".projects__card").forEach(card => {
            card.addEventListener("click", () => { 
                setTimeout(applyDisplayItem, 300);
            });
        });        
    };

    // Public API
    return {
        init,
    };
};

/**
 * Module responsible for initiating the first animations once the page has fully loaded.
 */
export const startAnimations = (() => {  
    /**
     * Animates the header section by making its text elements visible.
     */
    const animateHeader = () => {
    const header = document.querySelector("header");
    const headerStrings = header.querySelectorAll("a, li");
    animateTextElements(headerStrings);
    };

    /**
     * Animates the main section's text elements by making them visible.
     */
    const animateMain = () => {
        const main = document.querySelector(".main");
        const mainStrings = main.querySelectorAll("p, a");
        animateTextElements(mainStrings);
    };

    const animateMainDividers = () => {
        const dividers = document.querySelectorAll("header .divider, .main .main__divider");
        animateDividers(dividers);
    }

    const init = () => {  
        animateMain();
        setTimeout(() => { animateHeader();  }, "1000");
        setTimeout(() => { animateMainDividers();  }, "2000");
    };

    // Public API
    return {
        init,
    };
})();
  