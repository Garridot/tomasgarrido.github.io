import { animateDividers, animateTextElements  } from './AnimationsModule.js'

/**
 * Module for controlling page animations triggered by clicking.
 */
 export const clickEventAnimations = (() => {
    // State object to centralize the current state of the module
    const state = {
        isMenuVisible: false,
        isDefaultTheme: true,
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
        selectors.menu.style.transform = state.isMenuVisible ? "translateY(0%)" : "translateY(100%)";
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
        const elementsToStyle = document.querySelectorAll(
            "h1, h2, h3, h4, h5, h6, p, a, input[type='button'], li, label"
        );
        const svgPath = document.querySelector("path");
        const submitButton = document.querySelector(".contact__form input[type='submit']");

        const themeConfig = state.isDefaultTheme
            ? {
                buttonLabel: "light mode",
                backgroundColor: "var(--color-secondary)",
                textColor: "var(--color-primary)",
                svgStroke: "var(--color-primary)",
            }
            : {
                buttonLabel: "dark mode",
                backgroundColor: "var(--color-primary)",
                textColor: "var(--color-secondary)",
                svgStroke: "var(--color-secondary)",
            };

        applyTheme(themeConfig, elementsToStyle, svgPath, submitButton);
        state.isDefaultTheme = !state.isDefaultTheme;
    };

    /**
     * Applies the specified theme styles to the page elements.
     * Centralized to avoid repetition.
     */
    const applyTheme = (theme, elements, svgPath, submitButton) => {
        selectors.darkModeButton.value = theme.buttonLabel;
        [selectors.body, selectors.header, selectors.menu].forEach(el => {
            el.style.background = theme.backgroundColor;
        });
        selectors.dividers.forEach(divider => divider.style.background = theme.textColor);
        document.querySelectorAll(".project__selected").forEach(item => {
            item.style.background = theme.backgroundColor;
        });
        elements.forEach(el => el.style.color = theme.textColor);
        svgPath.style.stroke = theme.svgStroke;
        styleSubmitButton(submitButton, theme.textColor, theme.backgroundColor);
    };

    const styleSubmitButton = (button, backgroundColor, textColor) => {
        button.style.background = backgroundColor;
        button.style.color = textColor;
    };

    /**
     * Handles the display animation for the project detail item.
     */
    const applyDisplayItem = () => {
        const projectItem = document.querySelector(".project__selected");
        const itemStrings = projectItem.querySelectorAll(".project__selected--col:nth-child(1)");
        const itemMainText = projectItem.querySelectorAll("h1, p");
        const itemExtraText = projectItem.querySelectorAll("h6, input, a"); 
        const itemImage = projectItem.querySelector(".project__selected--col:nth-child(2)");

        projectItem.style.transform = "translate3d(0%, 0px, 0px)";

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
     * Initializes click event listeners for menu, dark mode, and project cards.
     */
    const init = () => {
        selectors.darkModeButton.addEventListener("click", updateTheme);
        selectors.menuButton.addEventListener("click", toggleMenuDisplay);
        selectors.menuLinks.forEach(link => link.addEventListener("click", toggleMenuDisplay));

        const projectItems = [
            ...selectors.projectCardsContainer.querySelectorAll(".projects__cards--card"),
            ...selectors.projectListsContainer.querySelectorAll(".project__item"),
        ];
        projectItems.forEach(item => {
            item.addEventListener("click", () => setTimeout(applyDisplayItem, 300));
        });
    };

    // Public API
    return { init };
})();
