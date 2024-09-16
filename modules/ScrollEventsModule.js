import { animateDividers, animateTextElements  } from './AnimationsModule.js'

/**
 * Module for controlling page animations triggered by scrolling.
 * Applies animations to various elements on the page, enhancing the
 * user experience with smooth transitions and effects.
 */
export const ScrollAnimations = (() => {
    // External constants for configuration
    const SCROLL_THRESHOLD = 500;
    const MARQUEE_LIMITS = { left: 0, right: 1950 };

    // Generic function to animate text elements and dividers
    const applyAnimations = (section, textSelector, dividerSelector) => {        
        const textElements = section.querySelectorAll(textSelector);
        const dividers = section.querySelectorAll(dividerSelector);
        animateTextElements(textElements);
        animateDividers(dividers);
    };

    // Animates marquee effect with horizontal text scrolling
    const animateMarqueeEffect = () => {        
        const currentScrollY = window.scrollY;
        const marqueeText = document.querySelectorAll(".transition__text");

        const marquee = Math.max(MARQUEE_LIMITS.left, Math.min(currentScrollY * 0.2, MARQUEE_LIMITS.right));

        marqueeText.forEach((text, index) => {
            text.style.transform = `translate3d(${index === 1 ? -marquee : marquee}px, 0, 0)`;
        });
    };

    // Register sections with their respective animations
    const sections = [        
        {            
            element: document.querySelector(".transition"),
            textSelector: "h3",
            dividerSelector: ".divider",
            animate: (section) => applyAnimations(section, "h3", ".divider"),
        },
        {
            element: document.querySelector(".profile"),
            textSelector: "h1, h6, p",
            dividerSelector: ".divider",
            animate: (section) => applyAnimations(section, "h1, h6, p", ".divider"),
        },
        {
            element: document.querySelector(".projects"),
            textSelector: "h1, p",
            dividerSelector: ".divider",
            animate: (section) => applyAnimations(section, "h1, p", ".divider"),
        },
        {
            element: document.querySelector(".projects__cards"),
            textSelector: "h1, p",
            dividerSelector: ".divider",
            animate: (section) => applyAnimations(section, "h1, p", ".divider"),
        },
        {
            element: document.querySelector(".contact"),
            textSelector: "h1, p, label, input",
            dividerSelector: ".divider",
            animate: (section) => {
                applyAnimations(section, "h1, p, label, input",);
                const footer = document.querySelector("footer");
                if (footer) {
                    animateTextElements(footer.querySelectorAll("a"));
                }
            },
        }
    ];

    // Unified scroll event handler
    const handleScroll = () => {
        sections.forEach(({ element, animate }) => {
            if (isElementVisible(element, SCROLL_THRESHOLD)) {
                animate(element);
            }
        });
        animateMarqueeEffect();  // Marquee effect runs independently
    };

    // Initialization function
    const init = () => {
        window.addEventListener("scroll", handleScroll);
    };

    // Public API
    return {
        init,
    };
})();


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

