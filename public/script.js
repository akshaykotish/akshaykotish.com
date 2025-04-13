// Enhanced Smooth Scrolling
document.addEventListener('DOMContentLoaded', function() {
    // Select all links with hash
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        
        // Skip if it's just "#"
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
          // Get the header height for offset
          const headerHeight = document.querySelector('nav').offsetHeight;
          
          // Calculate the element's position
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerHeight - 20; // Extra 20px padding
          
          // Scroll smoothly
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          
          // Update URL without page jump
          history.pushState(null, null, targetId);
          
          // Add active class to navigation link
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
          });
          
          this.classList.add('active');
        }
      });
    });
    
    // Update active menu based on scroll position
    window.addEventListener('scroll', function() {
      const scrollPosition = window.scrollY;
      
      // Get all sections
      const sections = document.querySelectorAll('section[id]');
      
      // Loop through sections to find the one in view
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 100; // Offset by 100px
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          // Find the corresponding nav link and set it active
          document.querySelectorAll('.nav-link').forEach(link => {
            link.classList.remove('active');
            
            if (link.getAttribute('href') === `#${sectionId}`) {
              link.classList.add('active');
            }
          });
        }
      });
      
      // Change nav background on scroll
      const nav = document.querySelector('nav');
      if (scrollPosition > 50) {
        nav.classList.add('scrolled');
      } else {
        nav.classList.remove('scrolled');
      }
    });
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    if (mobileMenuBtn) {
      const mobileMenu = document.querySelector('.mobile-menu');
      
      mobileMenuBtn.addEventListener('click', function() {
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('menu-open'); // Prevents scrolling when menu is open
      });
      
      // Close mobile menu when clicking on a link
      document.querySelectorAll('.mobile-menu .nav-link').forEach(link => {
        link.addEventListener('click', function() {
          mobileMenu.classList.remove('active');
          document.body.classList.remove('menu-open');
        });
      });
    }
    
    // Animate elements on scroll using Intersection Observer
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    
    if (animateElements.length > 0) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animated');
            observer.unobserve(entry.target); // Only animate once
          }
        });
      }, { threshold: 0.1 });
      
      animateElements.forEach(element => {
        observer.observe(element);
      });
    }
  });
  
  // Add smooth parallax effect to hero section
  function parallaxHero() {
    const hero = document.querySelector('.hero');
    if (hero) {
      window.addEventListener('scroll', function() {
        const scrollPosition = window.scrollY;
        const heroHeight = hero.offsetHeight;
        
        if (scrollPosition < heroHeight) {
          // Move background elements at different speeds
          const parallaxElements = hero.querySelectorAll('.floating-element');
          parallaxElements.forEach((el, index) => {
            const speed = 0.1 + (index * 0.05);
            el.style.transform = `translateY(${scrollPosition * speed}px)`;
          });
        }
      });
    }
  }
  
  // Initialize parallax effect
  parallaxHero();