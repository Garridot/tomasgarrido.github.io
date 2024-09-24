/**
 * Module responsible for initiating the first animations once the page has fully loaded.
 */
export const startAnimations = (() => {    
    // Animation timings configuration
    const timings = {        
        headerDelay: 1000, // Delay before animating the header
        dividerDelay: 2000, // Delay before animating dividers
    };

    // Selectors for elements to animate
    const selectors = {        
        headerStrings: "header a, header input",
        mainStrings: ".main h1, .main p, .main a",
        dividers: "header .divider, .main .main__divider",
    };

    /**
     * Generic function to animate text or dividers in a section.
     * 
     * @param {string} selector - The CSS selector for the elements to animate.
     * @param {function} animationFn - The animation function to apply (animateTextElements or animateDividers).
     */
    const animateElements = (selector, animationFn) => {        
        const elements = document.querySelectorAll(selector);
        if (elements.length) {            
            animationFn(elements);
        }
    };

    /**
     * Initializes all animations with appropriate delays.
     */
    const init = () => {        
        animateElements(selectors.mainStrings, animateTextElements);
        setTimeout(() => {
            animateElements(selectors.headerStrings, animateTextElements);
        }, timings.headerDelay);
        setTimeout(() => {
            animateElements(selectors.dividers, animateDividers);
        }, timings.dividerDelay);
        setTimeout(()=> {
            document.querySelector("#animated-path").style.animation = "draw .6s linear forwards"
        }, timings.dividerDelay)
    };

    // Public API
    return { init };
})();

/**
 * Animates the divider elements by making them visible and expanding their width.
 * @param {NodeListOf<HTMLElement>} dividers - List of divider elements to animate.
 */
 export const animateDividers = (dividers) => {        
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
export const animateTextElements = (elements) => {
    elements.forEach((element) => {
        element.style.opacity = 1;
        element.style.transitionDuration = "1s";
        element.style.transform = "none";
    });
};
