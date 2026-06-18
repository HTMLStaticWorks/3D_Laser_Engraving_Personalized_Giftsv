document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initRtl();
  initNavbar();
  initMobileMenu();
  initScrollAnimations();
  initLightbox();
  initPasswordToggle();
  initBeforeAfterSlider();
  initForms();
  highlightActiveLink();
  initQuoteTabs();
});

/* ==========================================================================
   Theme Management
   ========================================================================== */
function initTheme() {
  const themeToggles = document.querySelectorAll('.theme-toggle');
  
  // Check default or saved theme
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  if (savedTheme === 'light') {
    document.documentElement.classList.remove('dark');
  } else if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    // Default to dark mode for luxury aesthetic
    document.documentElement.classList.add('dark');
  }
  
  // Toggle theme click events
  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      if (document.documentElement.classList.contains('dark')) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      }
      updateThemeIcons();
    });
  });
  
  updateThemeIcons();
}

function updateThemeIcons() {
  const themeIcons = document.querySelectorAll('.theme-icon');
  const isDark = document.documentElement.classList.contains('dark');
  
  themeIcons.forEach(icon => {
    if (isDark) {
      // Moon icon (Dark Mode) -> Show Sun icon representation
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
      </svg>`;
    } else {
      // Sun icon (Light Mode) -> Show Moon icon representation
      icon.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
      </svg>`;
    }
  });
}

/* ==========================================================================
   RTL Layout Management
   ========================================================================== */
function initRtl() {
  const rtlToggles = document.querySelectorAll('.rtl-toggle');
  
  const savedRtl = localStorage.getItem('rtl');
  if (savedRtl === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
  } else {
    document.documentElement.setAttribute('dir', 'ltr');
  }
  
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
      if (isRtl) {
        document.documentElement.setAttribute('dir', 'ltr');
        localStorage.setItem('rtl', 'false');
      } else {
        document.documentElement.setAttribute('dir', 'rtl');
        localStorage.setItem('rtl', 'true');
      }
      updateRtlLabels();
    });
  });
  
  updateRtlLabels();
}

function updateRtlLabels() {
  const rtlLabels = document.querySelectorAll('.rtl-label');
  const isRtl = document.documentElement.getAttribute('dir') === 'rtl';
  
  rtlLabels.forEach(label => {
    label.textContent = isRtl ? 'LTR' : 'RTL';
  });
}

/* ==========================================================================
   Navbar Styling & Active Highlighting
   ========================================================================== */
function initNavbar() {
  const navbar = document.getElementById('navbar');
  if (!navbar) return;
  
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-lg');
      navbar.classList.add('bg-luxuryBlack/90', 'backdrop-blur-md', 'border-b', 'border-luxuryGold/10');
      
      // Adapt bg for light mode dynamically (using Tailwind's dark class toggle)
      if (!document.documentElement.classList.contains('dark')) {
        navbar.classList.remove('bg-luxuryBlack/90');
        navbar.classList.add('bg-white/95', 'border-luxuryGold/20');
      } else {
        navbar.classList.remove('bg-white/95', 'border-luxuryGold/20');
        navbar.classList.add('bg-luxuryBlack/90');
      }
    } else {
      navbar.classList.remove('shadow-lg', 'bg-luxuryBlack/90', 'bg-white/95', 'backdrop-blur-md', 'border-b', 'border-luxuryGold/10', 'border-luxuryGold/20');
    }
  });
}

function highlightActiveLink() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');
  
  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath) {
      link.classList.add('active', 'text-luxuryGold');
      link.classList.remove('text-gray-400', 'text-gray-600', 'dark:text-gray-300');
    } else {
      link.classList.remove('active', 'text-luxuryGold');
    }
  });
}

/* ==========================================================================
   Mobile Menu Navigation
   ========================================================================== */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!menuBtn || !mobileMenu) return;
  
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
    
    // Toggle menu button representation (Hamburger vs Close)
    const isHidden = mobileMenu.classList.contains('hidden');
    menuBtn.innerHTML = isHidden 
      ? `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"/></svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"/></svg>`;
  });
}

/* ==========================================================================
   Scroll Reveal Animations
   ========================================================================== */
function initScrollAnimations() {
  const anims = document.querySelectorAll('.scroll-animate');
  if (anims.length === 0) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  anims.forEach(anim => observer.observe(anim));
}

/* ==========================================================================
   Lightbox Gallery Viewer
   ========================================================================== */
function initLightbox() {
  const images = document.querySelectorAll('[data-lightbox]');
  if (images.length === 0) return;
  
  // Create Lightbox DOM structure dynamically if not present
  let lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) {
    lightbox = document.createElement('div');
    lightbox.id = 'lightbox-modal';
    lightbox.className = 'lightbox-modal hidden flex items-center justify-center p-4';
    lightbox.innerHTML = `
      <span class="absolute top-6 right-6 text-white text-4xl cursor-pointer hover:text-luxuryGold transition">&times;</span>
      <div class="max-w-4xl max-h-[85vh] relative flex flex-col items-center">
        <img id="lightbox-img" class="max-w-full max-h-[80vh] object-contain rounded-lg border border-luxuryGold/20" src="" alt="">
        <p id="lightbox-caption" class="text-white font-serif mt-4 text-center text-lg tracking-wide"></p>
      </div>
    `;
    document.body.appendChild(lightbox);
  }
  
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const closeBtn = lightbox.querySelector('span');
  
  images.forEach(img => {
    img.style.cursor = 'pointer';
    img.addEventListener('click', (e) => {
      const src = e.currentTarget.getAttribute('src') || e.currentTarget.getAttribute('data-lightbox-src');
      const caption = e.currentTarget.getAttribute('data-lightbox-caption') || e.currentTarget.getAttribute('alt') || '';
      
      if (src) {
        lightboxImg.src = src;
        lightboxCaption.textContent = caption;
        lightbox.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });
  
  const closeLightbox = () => {
    lightbox.classList.add('hidden');
    document.body.classList.remove('overflow-hidden');
  };
  
  closeBtn.addEventListener('click', closeLightbox);
  lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
  
  // Keyboard Escape listener
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
      closeLightbox();
    }
  });
}

/* ==========================================================================
   Password Visibility Eye Toggle
   ========================================================================== */
function initPasswordToggle() {
  const toggleBtns = document.querySelectorAll('.password-toggle-btn');
  
  toggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('input');
      if (!input) return;
      
      const isPassword = input.type === 'password';
      input.type = isPassword ? 'text' : 'password';
      
      // Update eye icon SVG
      if (isPassword) {
        // Eye closed representation
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hover:text-luxuryGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.542 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </svg>`;
      } else {
        // Eye open representation
        btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400 hover:text-luxuryGold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>`;
      }
    });
  });
}

/* ==========================================================================
   Before/After Photo Compare Slider
   ========================================================================== */
function initBeforeAfterSlider() {
  const container = document.querySelector('.slider-container');
  if (!container) return;
  
  const handle = container.querySelector('.slider-handle');
  const resizer = container.querySelector('.resize-container');
  const resizerImg = resizer.querySelector('img');
  
  // Update resizer image width on load & window resize to ensure correct alignment
  const updateDimensions = () => {
    const width = container.offsetWidth;
    resizerImg.style.width = width + 'px';
  };
  
  window.addEventListener('resize', updateDimensions);
  updateDimensions();
  // Call it a bit later just in case images are loading
  setTimeout(updateDimensions, 500);
  
  const moveSlider = (clientX) => {
    const rect = container.getBoundingClientRect();
    const position = clientX - rect.left;
    let percentage = (position / rect.width) * 100;
    
    if (percentage < 0) percentage = 0;
    if (percentage > 100) percentage = 100;
    
    // Adjust handle and clip widths
    handle.style.left = percentage + '%';
    resizer.style.width = percentage + '%';
  };
  
  const onMouseMove = (e) => {
    moveSlider(e.clientX);
  };
  
  const onTouchMove = (e) => {
    if (e.touches && e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
  };
  
  container.addEventListener('mousedown', (e) => {
    moveSlider(e.clientX);
    container.addEventListener('mousemove', onMouseMove);
  });
  
  window.addEventListener('mouseup', () => {
    container.removeEventListener('mousemove', onMouseMove);
  });
  
  container.addEventListener('touchstart', (e) => {
    if (e.touches && e.touches.length > 0) {
      moveSlider(e.touches[0].clientX);
    }
    container.addEventListener('touchmove', onTouchMove);
  });
  
  window.addEventListener('touchend', () => {
    container.removeEventListener('touchmove', onTouchMove);
  });
}

/* ==========================================================================
   Luxury Form Handlers & Notifications
   ========================================================================== */
function showNotification(message) {
  const existingAlert = document.querySelector('.luxury-notification');
  if (existingAlert) {
    existingAlert.remove();
  }

  const alertMsg = document.createElement('div');
  alertMsg.className = 'luxury-notification fixed bottom-8 left-1/2 -translate-x-1/2 z-50 px-6 py-4 rounded-lg shadow-2xl glass-card text-center text-luxuryGold font-serif text-lg border-2 border-luxuryGold scroll-animate show';
  alertMsg.innerHTML = `
    <div class="flex items-center space-x-3 justify-center">
      <svg class="h-6 w-6 text-luxuryGold animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span>${message}</span>
    </div>
  `;
  document.body.appendChild(alertMsg);
  
  setTimeout(() => {
    alertMsg.classList.remove('show');
    setTimeout(() => alertMsg.remove(), 800);
  }, 4000);
}

function initForms() {
  const forms = document.querySelectorAll('form');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      
      let hasError = false;
      const inputs = form.querySelectorAll('input[required], textarea[required], select[required]');
      
      inputs.forEach(input => {
        if (!input.value.trim()) {
          input.classList.add('border-red-500');
          hasError = true;
        } else {
          input.classList.remove('border-red-500');
        }
      });
      
      if (hasError) return;
      
      // Password match validation for signup form
      const passwordInput = form.querySelector('#signup-password');
      const confirmInput = form.querySelector('#signup-confirm-password');
      
      if (passwordInput && confirmInput) {
        if (passwordInput.value !== confirmInput.value) {
          passwordInput.classList.add('border-red-500');
          confirmInput.classList.add('border-red-500');
          showNotification('Passwords do not match. Please verify.');
          return;
        } else {
          passwordInput.classList.remove('border-red-500');
          confirmInput.classList.remove('border-red-500');
        }
      }
      
      showNotification('Request Received! We will get back to you shortly.');
      form.reset();
    });
  });
}

/* ==========================================================================
   Quote Inspiration Tab Switcher & Copy Handler
   ========================================================================== */
function initQuoteTabs() {
  const tabBtns = document.querySelectorAll('.quote-tab-btn');
  const tabContents = document.querySelectorAll('.quote-tab-content');
  const copyBtns = document.querySelectorAll('.copy-quote-btn');
  
  if (tabBtns.length === 0) return;
  
  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');
      
      // Update active button classes
      tabBtns.forEach(b => {
        b.classList.remove('bg-luxuryGold', 'text-luxuryCharcoal');
        b.classList.add('border-luxuryGold/20', 'text-luxuryGold');
      });
      btn.classList.remove('border-luxuryGold/20', 'text-luxuryGold');
      btn.classList.add('bg-luxuryGold', 'text-luxuryCharcoal');
      
      // Update active content visibility
      tabContents.forEach(content => {
        if (content.getAttribute('id') === `quote-cat-${category}`) {
          content.classList.remove('hidden');
          content.classList.add('grid');
        } else {
          content.classList.add('hidden');
          content.classList.remove('grid');
        }
      });
    });
  });
  
  // Copy button handler
  copyBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const quoteText = btn.parentElement.parentElement.querySelector('.quote-text').textContent.trim();
      const cleanQuote = quoteText.replace(/^"|"$/g, '');
      
      navigator.clipboard.writeText(cleanQuote).then(() => {
        showNotification('Quote copied! Ready to paste on custom order.');
      }).catch(err => {
        // Fallback for security contexts without navigator.clipboard
        const textArea = document.createElement('textarea');
        textArea.value = cleanQuote;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          document.execCommand('copy');
          showNotification('Quote copied! Ready to paste on custom order.');
        } catch (copyErr) {
          console.error('Fallback copy failed', copyErr);
        }
        document.body.removeChild(textArea);
      });
    });
  });
}
