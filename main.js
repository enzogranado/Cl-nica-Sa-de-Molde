/**
 * Studio Deise Lash - Global Script
 * Manages UI interactions, navigation, and animations.
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileMenu();
  initActiveNavLink();
  initScrollReveal();
});

/**
 * Adds 'scrolled' class to the header when the user scrolls past 50px
 */
function initNavbarScroll() {
  const header = document.querySelector('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Run on page load in case the page is already scrolled
  handleScroll();
  window.addEventListener('scroll', handleScroll);
}

/**
 * Manages mobile hamburger menu toggle and menu closing on click
 */
function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  if (!hamburger || !navMenu) return;

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    // Prevent scrolling when mobile menu is open
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu when clicking on links
  const navLinks = navMenu.querySelectorAll('a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
}

/**
 * Highlights the active link in the navigation menu based on current page URL
 */
function initActiveNavLink() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-menu a, .footer-links a');
  
  navLinks.forEach(link => {
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    // Normalize paths to check matches
    const isHome = currentPath === '/' || currentPath.endsWith('index.html') || currentPath === '';
    
    if (isHome && (linkHref === 'index.html' || linkHref === '/')) {
      link.classList.add('active');
    } else if (!isHome && linkHref !== 'index.html' && currentPath.includes(linkHref)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/**
 * Initializes viewport animations using Intersection Observer
 */
function initScrollReveal() {
  const revealElements = document.querySelectorAll('.reveal');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          // Once it animates, we don't need to observe it anymore
          observer.unobserve(entry.target);
        }
      });
    }, {
      root: null, // viewport
      threshold: 0.1, // trigger when 10% of element is visible
      rootMargin: '0px 0px -50px 0px' // offset slightly for better feel
    });

    revealElements.forEach(el => observer.observe(el));
  } else {
    // Fallback for browsers that don't support IntersectionObserver
    revealElements.forEach(el => el.classList.add('active'));
  }
}
