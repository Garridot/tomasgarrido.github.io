export const validateForm = () => {
  /**
   * Element selectors
   */
  const selectors = {  
    contactForm : document.querySelector(".contact__form form"),
  };

  const init = () => {        
    var contactForm = selectors.contactForm;
    contactForm.addEventListener('submit', function (event) {            
      event.preventDefault();       
      const sanitizedData = validateForm(contactForm);
      if (sanitizedData) {        
        contactForm.remove(); 
        displayResponseMessage(sanitizedData);
      }
  });
  } 
  /**   
   * function that validates and sanitizes the inputs from the contact form  
   * @param {*} contactForm 
   * @returns Return the email and message sanitized 
   */
  const validateForm = (contactForm) => {   
    
    const emailInput   = contactForm.querySelector('#email');
    const messageInput = contactForm.querySelector('#message'); 
  
    const email   = emailInput.value.trim();
    const message = messageInput.value.trim();
  
    // Normalization: convert to lowercase and remove unnecessary spaces.
    const normalizedEmail = email.toLowerCase();
    const normalizedMessage = message.replace(/\s+/g, ' ').trim();
  
    // Basic validation 
    if (!validateEmail(normalizedEmail)) {
      alert('Please enter a valid email address.');
      return false;
    }  
    if (normalizedMessage.length < 10) {
      alert('Message should be at least 10 characters long.');
      return false;
    }
  
    const sanitizedEmail = sanitizeInput(normalizedEmail);
    const sanitizedMessage = sanitizeInput(normalizedMessage);
  
    return {
      email: sanitizedEmail,
      message: sanitizedMessage,
    };

  }
  /**  
   * Function to validate email
   * @param {*} email 
   * @returns Returns a boolean value indicates whether or not a valid email pattern exists in the input. 
  */
  const validateEmail = (email) => {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }
  /**
    * @param {*} input 
    * @returns Returns sanitized text entries removing possible HTML tags 
    */
  const sanitizeInput = (input) => {
    return input.replace(/<[^>]*>?/gm, ''); 
  }

  /**
   * Display a response message if the form is valid and the email was sent. 
   * @param {*} sanitizedData 
   */
  const displayResponseMessage = (sanitizedData) => {
    var message = document.createElement("div");
    message.className = "contact__form-message";
    message.innerHTML = `<h5 class="list__text">Thanks for your message ${sanitizedData.email}! I will try to respond to you as soon as possible.</h5>`;
    
    document.querySelector(".contact__form").appendChild(message); 
  } 

  return { init }
}