export const gradientLiquidAnimation = () => {
    const gradientBackground = document.querySelector(".blurred-bg");

    // Initial position variables for radial-gradients.
    let x1 = 30, y1 = 30;
    let x2 = 70, y2 = 60;
    let x3 = 50, y3 = 90;

    let animationFrameId = null;

    /**
     * Function to generate a random position on the screen.
     * @param {*} min 
     * @param {*} max 
     * @returns 
     */
    const getRandomMovement = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    /**
     * Update the 'gradientBackground' style with new positions.
     */
    const liquidMotionEffect = () => {
        // Generate random movements for the three radial-gradients.
        x1 += getRandomMovement(-2, 2);
        y1 += getRandomMovement(-2, 2);
        
        x2 += getRandomMovement(-2, 2);
        y2 += getRandomMovement(-2, 2);
        
        x3 += getRandomMovement(-2, 2);
        y3 += getRandomMovement(-2, 2);
        
        // Limit the positions so that they do not leave the screen.
        x1 = Math.max(0, Math.min(100, x1));
        y1 = Math.max(0, Math.min(100, y1));
        
        x2 = Math.max(0, Math.min(100, x2));
        y2 = Math.max(0, Math.min(100, y2));
        
        x3 = Math.max(0, Math.min(100, x3));
        y3 = Math.max(0, Math.min(100, y3));

        gradientBackground.style.background = `
        radial-gradient(circle at ${x1}% ${y1}%, rgba(255, 192, 203), transparent),
        radial-gradient(circle at ${x2}% ${y2}%, rgba(144, 238, 144), transparent),
        radial-gradient(circle at ${x3}% ${y3}%, rgba(173, 216, 230), transparent)
        `;
    // Request the next frame if the element is still visible.
    animationFrameId = requestAnimationFrame(animateBackground);
    };

    /**
     * Function to constantly update the background.
     */
    const animateBackground = () => {
        liquidMotionEffect();
    };

    /**
     * Intersection Observer callback.
     */
    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stop the animation when the element is visible.
                if (animationFrameId) {
                    cancelAnimationFrame(animationFrameId);
                    animationFrameId = null; // Reset the animation frame id
                }

            } else {
                // Start the animation when the element is not visible.
                if (!animationFrameId) {
                    animateBackground();
                }

            }
        });
    };

    /**
     * Initialize the event with Intersection Observer.
     */
    const init = () => {
        const observerOptions = {
            root: null, // Use the viewport as the root
            threshold: 0.2 // Trigger when at least 10% of the element is visible
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        observer.observe(document.querySelector(".wrapper"));
    };

    return {init}
}