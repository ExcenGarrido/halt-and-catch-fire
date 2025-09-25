document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM Content Loaded!'); // Added for debugging

  // Test if any element can be found
  const testElement = document.querySelector('body');
  console.log('Test element (body):', testElement); // Debugging

  // Carousel functionality
  document.querySelectorAll('.carousel').forEach(carousel => {
    const slidesContainer = carousel.querySelector('.slides');
    const slides = Array.from(slidesContainer.children);
    let index = 0;

    const showSlide = i => {
      slides.forEach(slide => slide.classList.remove('active')); // Quita la clase 'active' de todas
      slides[i].classList.add('active'); // Añade la clase 'active' a la actual
    }

    showSlide(index);

    carousel.querySelector('.prev').addEventListener('click', () => {
      index = (index - 1 + slides.length) % slides.length;
      showSlide(index);
    });

    carousel.querySelector('.next').addEventListener('click', () => {
      index = (index + 1) % slides.length;
      showSlide(index);
    });

    // No es necesario un listener de resize para showSlide, ya que el CSS se encarga del tamaño
  });

  // Lightbox functionality
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.querySelector('.lightbox-content');
  const lightboxCaption = document.querySelector('.lightbox-caption');
  const closeBtn = document.querySelector('.close-btn');

  if (lightbox && lightboxImg && lightboxCaption && closeBtn) {
    document.querySelectorAll('.expand-btn').forEach(button => {
      button.addEventListener('click', function() {
        const imgSrc = this.dataset.src;
        const imgAlt = this.previousElementSibling.alt; // Get alt from the image
        const imgDescription = this.dataset.description; // Get description from data-description attribute

        lightbox.style.display = 'block';
        lightboxImg.src = imgSrc;
        lightboxCaption.innerHTML = imgAlt; // Always use alt for image lightbox
      });
    });

    closeBtn.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });

    lightbox.addEventListener('click', function(event) {
      if (event.target === this) {
        lightbox.style.display = 'none';
      }
    });
  }

  // New Description Modal functionality
  const newDescriptionModal = document.getElementById('new-description-modal');
  const newDescriptionTitle = document.getElementById('new-description-title');
  const newDescriptionText = document.getElementById('new-description-text');
  const closeModalBtn = document.querySelector('.close-modal-btn');

  if (newDescriptionModal && newDescriptionTitle && newDescriptionText && closeModalBtn) {
    document.querySelectorAll('.description-btn').forEach(button => {
      button.addEventListener('click', function() {
        const description = this.dataset.description;
        const parentElement = this.closest('.episode-list') || this.closest('.character-gallery');
        let title = '';

        if (parentElement && parentElement.classList.contains('episode-list')) {
          // For episode synopses, try to get the episode title
          const episodeListItem = this.closest('li');
          if (episodeListItem) {
            title = episodeListItem.textContent.split('Ver Sinopsis')[0].trim();
          }
          newDescriptionTitle.textContent = `Sinopsis: ${title}`;
        } else if (parentElement && parentElement.classList.contains('character-gallery')) {
          // For character descriptions, try to get the character name
          const characterNameElement = parentElement.querySelector('h2');
          if (characterNameElement) {
            title = characterNameElement.textContent.trim();
          }
          newDescriptionTitle.textContent = `Descripción: ${title}`;
        } else {
          newDescriptionTitle.textContent = 'Descripción'; // Default title
        }
        
        newDescriptionText.innerHTML = description;
        newDescriptionModal.classList.add('active'); // Use class to show and center
      });
    });

    closeModalBtn.addEventListener('click', () => {
      newDescriptionModal.classList.remove('active'); // Use class to hide
    });

    newDescriptionModal.addEventListener('click', function(event) {
      if (event.target === this) {
        newDescriptionModal.classList.remove('active'); // Use class to hide
      }
    });
  }

  

  // Typewriter effect for hero section
  const typingTextElement = document.getElementById('typing-text');
  const typingSubtitleElement = document.getElementById('typing-subtitle');

  const textToType = "Halt and Catch Fire";
  const subtitleToType = "Una serie sobre la revolución tecnológica de los 80 y 90.";

  function typeWriter(element, text, speed, callback) {
    let i = 0;
    element.innerHTML = '';
    function type() {
      if (i < text.length) {
        element.innerHTML += text.charAt(i);
        i++;
        setTimeout(type, speed);
      } else if (callback) {
        setTimeout(callback, 1000); // Pause after typing
      }
    }
    type();
  }

  function eraseWriter(element, speed, callback) {
    let i = element.innerHTML.length;
    function erase() {
      if (i >= 0) {
        element.innerHTML = element.innerHTML.substring(0, i);
        i--;
        setTimeout(erase, speed);
      } else if (callback) {
        setTimeout(callback, 500); // Pause after erasing
      }
    }
    erase();
  }

  if (typingTextElement && typingSubtitleElement) {
    const sequence = () => {
      typeWriter(typingTextElement, textToType, 100, () => {
        eraseWriter(typingTextElement, 50, () => {
          typeWriter(typingSubtitleElement, subtitleToType, 50, () => {
            eraseWriter(typingSubtitleElement, 25, () => {
              setTimeout(sequence, 1000); // Restart sequence after a delay
            });
          });
        });
      });
    };
    sequence(); // Start the sequence
  }

  // Hamburger menu functionality
  const hamburger = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    nav.classList.toggle('active');
  });
});