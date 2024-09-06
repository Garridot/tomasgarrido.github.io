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
* Module for controlling page animations triggered by scrolling.
* Applies animations to various elements on the page, enhancing the
* user experience with smooth transitions and effects.
*/
export const ScrollAnimations = (() => {
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
   animateHeader();
   animateMain();
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