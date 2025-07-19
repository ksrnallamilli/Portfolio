// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggle = document.getElementById('theme-toggle');
    this.body = document.body;
    this.currentTheme = localStorage.getItem('theme') || 'light';
    
    this.init();
  }
  
  init() {
    this.setTheme(this.currentTheme);
    this.themeToggle.addEventListener('click', () => this.toggleTheme());
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }
  
  setTheme(theme) {
    this.currentTheme = theme;
    this.body.setAttribute('data-theme', theme);
    
    // Update icon
    const icon = this.themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    
    // Store preference
    localStorage.setItem('theme', theme);
  }
  
  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.navbar = document.querySelector('.navbar');
    this.navLinks = document.querySelectorAll('.nav-link');
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    
    this.init();
  }
  
  init() {
    // Smooth scrolling for navigation links
    this.navLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
          const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
          
          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
    });
    
    // Active link highlighting
    window.addEventListener('scroll', () => {
      this.updateActiveLink();
    });
    
    // Mobile menu toggle
    this.hamburger.addEventListener('click', () => {
      this.toggleMobileMenu();
    });
  }
  
  updateActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      const sectionId = section.getAttribute('id');
      const correspondingLink = document.querySelector(`a[href="#${sectionId}"]`);
      
      if (correspondingLink && scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        this.navLinks.forEach(link => link.classList.remove('active'));
        correspondingLink.classList.add('active');
      }
    });
  }
  
  toggleMobileMenu() {
    this.navMenu.classList.toggle('active');
    this.hamburger.classList.toggle('active');
  }
}

// Scroll Animation Manager
class ScrollAnimationManager {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.init();
  }
  
  init() {
    // Create intersection observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, this.observerOptions);
    
    // Observe elements
    const animateElements = document.querySelectorAll(
      '.timeline-content, .project-card, .education-item, .stat-item'
    );
    
    animateElements.forEach(el => {
      el.classList.add('animate-out');
      this.observer.observe(el);
    });
  }
}

// Type Writer Effect
class TypeWriter {
  constructor(element, words, wait = 3000) {
    this.txtElement = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }
  
  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];
    
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
    
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;
    
    let typeSpeed = 100;
    
    if (this.isDeleting) {
      typeSpeed /= 2;
    }
    
    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }
    
    setTimeout(() => this.type(), typeSpeed);
  }
}

// Smooth Counter Animation
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('.stat-number');
    this.init();
  }
  
  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    });
    
    this.counters.forEach(counter => observer.observe(counter));
  }
  
  animateCounter(element) {
    const target = element.textContent.replace(/[^\d.]/g, '');
    const isFloat = target.includes('.');
    const targetNumber = parseFloat(target);
    const suffix = element.textContent.replace(target, '');
    const duration = 2000;
    const increment = targetNumber / (duration / 16);
    
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      
      if (current >= targetNumber) {
        current = targetNumber;
        clearInterval(timer);
      }
      
      const displayValue = isFloat ? current.toFixed(2) : Math.floor(current);
      element.textContent = displayValue + suffix;
    }, 16);
  }
}

// Parallax Effect
class ParallaxManager {
  constructor() {
    this.parallaxElements = document.querySelectorAll('.hero-image, .profile-placeholder');
    this.init();
  }
  
  init() {
    window.addEventListener('scroll', () => {
      const scrolled = window.pageYOffset;
      
      this.parallaxElements.forEach(element => {
        const rate = scrolled * -0.1;
        element.style.transform = `translateY(${rate}px)`;
      });
    });
  }
}

// Skill Tags Interactive Effect
class SkillTagManager {
  constructor() {
    this.skillTags = document.querySelectorAll('.skill-tag, .tag');
    this.init();
  }
  
  init() {
    this.skillTags.forEach(tag => {
      tag.addEventListener('mouseenter', () => {
        this.highlightRelatedTags(tag.textContent.toLowerCase());
      });
      
      tag.addEventListener('mouseleave', () => {
        this.resetTagHighlights();
      });
    });
  }
  
  highlightRelatedTags(skill) {
    const relatedSkills = {
      'strategy': ['market research', 'competitive analysis', 'go-to-market strategy'],
      'product': ['ux design', 'data analysis', 'stakeholder research'],
      'financial': ['modeling', 'forecasting', 'analysis']
    };
    
    this.skillTags.forEach(tag => {
      const tagText = tag.textContent.toLowerCase();
      let isRelated = false;
      
      Object.keys(relatedSkills).forEach(category => {
        if (skill.includes(category) || tagText.includes(category)) {
          relatedSkills[category].forEach(relatedSkill => {
            if (tagText.includes(relatedSkill) || skill.includes(relatedSkill)) {
              isRelated = true;
            }
          });
        }
      });
      
      if (isRelated || tagText.includes(skill)) {
        tag.style.opacity = '1';
        tag.style.transform = 'scale(1.05)';
      } else {
        tag.style.opacity = '0.5';
      }
    });
  }
  
  resetTagHighlights() {
    this.skillTags.forEach(tag => {
      tag.style.opacity = '1';
      tag.style.transform = 'scale(1)';
    });
  }
}

// Loading Animation
class LoadingManager {
  constructor() {
    this.init();
  }
  
  init() {
    window.addEventListener('load', () => {
      document.body.classList.add('loaded');
      
      // Trigger initial animations
      setTimeout(() => {
        const heroElements = document.querySelectorAll('.hero-title, .hero-subtitle, .hero-description');
        heroElements.forEach((el, index) => {
          setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
          }, index * 200);
        });
      }, 300);
    });
  }
}

// Form Validation (for future contact form)
class FormValidator {
  constructor(form) {
    this.form = form;
    this.init();
  }
  
  init() {
    if (!this.form) return;
    
    this.form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.validateForm();
    });
  }
  
  validateForm() {
    const inputs = this.form.querySelectorAll('input, textarea');
    let isValid = true;
    
    inputs.forEach(input => {
      if (!this.validateInput(input)) {
        isValid = false;
      }
    });
    
    if (isValid) {
      this.submitForm();
    }
  }
  
  validateInput(input) {
    const value = input.value.trim();
    const type = input.type;
    
    if (!value) {
      this.showError(input, 'This field is required');
      return false;
    }
    
    if (type === 'email' && !this.isValidEmail(value)) {
      this.showError(input, 'Please enter a valid email address');
      return false;
    }
    
    this.clearError(input);
    return true;
  }
  
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  showError(input, message) {
    input.classList.add('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = message;
    }
  }
  
  clearError(input) {
    input.classList.remove('error');
    const errorElement = input.parentElement.querySelector('.error-message');
    if (errorElement) {
      errorElement.textContent = '';
    }
  }
  
  submitForm() {
    // Handle form submission
    console.log('Form submitted successfully');
  }
}

// Initialize all managers when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize core functionality
  new ThemeManager();
  new NavigationManager();
  new ScrollAnimationManager();
  new CounterAnimation();
  new ParallaxManager();
  new SkillTagManager();
  new LoadingManager();
  
  // Initialize typewriter effect for hero subtitle
  const typewriterElement = document.querySelector('.hero-subtitle');
  if (typewriterElement) {
    new TypeWriter(typewriterElement, [
      'Strategy & Product Management Professional',
      'Data-Driven Business Strategist',
      'Innovation & Growth Specialist',
      'Product Development Expert'
    ], 2000);
  }
  
  // Initialize form validator (if form exists)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    new FormValidator(contactForm);
  }
  
  // Add CSS for animations that need to be applied via JavaScript
  const style = document.createElement('style');
  style.textContent = `
    .animate-out {
      opacity: 0;
      transform: translateY(30px);
      transition: all 0.6s ease-out;
    }
    
    .animate-in {
      opacity: 1;
      transform: translateY(0);
    }
    
    .hero-title,
    .hero-subtitle,
    .hero-description {
      opacity: 0;
      transform: translateY(20px);
      transition: all 0.6s ease-out;
    }
    
    .loaded .hero-title,
    .loaded .hero-subtitle,
    .loaded .hero-description {
      opacity: 1;
      transform: translateY(0);
    }
    
    .skill-tag,
    .tag {
      transition: all 0.3s ease;
    }
    
    .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
      box-shadow: 0 2px 20px rgba(0, 0, 0, 0.1);
    }
    
    [data-theme="dark"] .navbar.scrolled {
      background: rgba(15, 23, 42, 0.98);
    }
    
    .nav-link.active {
      color: var(--primary-color);
    }
    
    .nav-link.active::after {
      width: 100%;
    }
    
    @media (max-width: 768px) {
      .nav-menu.active {
        display: flex;
        flex-direction: column;
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        background: var(--bg-primary);
        padding: 1rem;
        box-shadow: var(--card-shadow);
      }
      
      .hamburger.active span:nth-child(1) {
        transform: rotate(-45deg) translate(-5px, 6px);
      }
      
      .hamburger.active span:nth-child(2) {
        opacity: 0;
      }
      
      .hamburger.active span:nth-child(3) {
        transform: rotate(45deg) translate(-5px, -6px);
      }
    }
  `;
  document.head.appendChild(style);
});

// Utility functions
const utils = {
  // Debounce function for scroll events
  debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },
  
  // Throttle function for performance optimization
  throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },
  
  // Get element position
  getElementPosition(element) {
    const rect = element.getBoundingClientRect();
    return {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };
  }
};

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    NavigationManager,
    ScrollAnimationManager,
    TypeWriter,
    CounterAnimation,
    ParallaxManager,
    SkillTagManager,
    LoadingManager,
    FormValidator,
    utils
  };
