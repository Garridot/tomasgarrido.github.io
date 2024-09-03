var contactForm = document.querySelector(".contact__form form");

// Función para normalizar y verificar el formulario
function validateAndSanitizeForm(contactForm) {    
    const emailInput   = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message');
  
    const email = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    // Normalización: convertimos a minúsculas y eliminamos espacios innecesarios
    const normalizedEmail = email.toLowerCase();
    const normalizedMessage = message.replace(/\s+/g, ' ').trim();
  
    // Validación básica
    if (!validateEmail(normalizedEmail)) {
      alert('Please enter a valid email address.');
      return false;
    }
  
    if (normalizedMessage.length < 10) {
      alert('Message should be at least 10 characters long.');
      return false;
    }
  
    // Aplicar medidas de seguridad
    const sanitizedEmail = sanitizeInput(normalizedEmail);
    const sanitizedMessage = sanitizeInput(normalizedMessage);
  
    // Retornar valores sanitizados
    return {
      email: sanitizedEmail,
      message: sanitizedMessage,
    };

}
  
// Función para validar el correo electrónico
function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}
  
// Función para sanitizar entradas de texto
function sanitizeInput(input) {
    return input.replace(/<[^>]*>?/gm, ''); // Eliminar etiquetas HTML
}
  
  
contactForm.addEventListener('submit', function (event) {
    event.preventDefault(); 
    const sanitizedData = validateAndSanitizeForm(contactForm);
    if (sanitizedData) {
        contactForm.remove();

        var message = document.createElement("div");
        message.className = "contact__form-message";
        message.innerHTML = `<h5>Thanks for your message ${sanitizedData.email}! I will try to respond to you as soon as possible.</h5>`;
        
        document.querySelector(".contact__form").appendChild(message);        
    }
});
