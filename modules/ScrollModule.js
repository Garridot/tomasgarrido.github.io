// modules/ScrollModule.js
export const ScrollModule = (() => {  
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
  }
  return {
    init: () => {
      window.addEventListener('scroll', handleScroll);
    },
  };
})();


export const scrollToSection = (event, targetSelector) => {
  const targetElement = document.querySelector(targetSelector);
  if (targetElement) {
    targetElement.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error(`Elemento con el selector ${targetSelector} no encontrado.`);
  }
};