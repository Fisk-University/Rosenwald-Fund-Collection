/**
 * Mobile Navigation Handler
 * Handles mobile menu toggle and dropdown behavior
 */
(function() {
  'use strict';
  
  document.addEventListener('DOMContentLoaded', function() {
    
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const siteSearch = document.querySelector('.site-search');
    
    function isMobile() {
      return window.innerWidth <= 768;
    }
    
    // Toggle mobile menu
    if (mobileToggle) {
      mobileToggle.addEventListener('click', function() {
        mainNav.classList.toggle('mobile-nav-open');
        
        if (isMobile() && siteSearch) {
          siteSearch.style.display = mainNav.classList.contains('mobile-nav-open') ? 'block' : 'none';
        }
      });
    }
    
    // Handle dropdown clicks on mobile
    const hasSubmenuItems = document.querySelectorAll('.has-submenu');
    
    hasSubmenuItems.forEach(function(item) {
      const link = item.querySelector('.nav-link');
      
      link.addEventListener('click', function(e) {
        if (!isMobile()) return;
        
        // Get click position relative to the link
        const rect = this.getBoundingClientRect();
        const clickX = e.clientX - rect.left;
        const linkWidth = rect.width;
        
        // If click is in the right 60px area (where the arrow is)
        if (clickX > linkWidth - 60) {
          e.preventDefault();
          e.stopPropagation();
          
          // Store current state BEFORE any changes
          const wasOpen = item.classList.contains('open');
          
          // Close ALL dropdowns first
          hasSubmenuItems.forEach(function(otherItem) {
            otherItem.classList.remove('open');
          });
          
          // If it wasn't open before, open it now
          // If it was open, it stays closed (from the remove above)
          if (!wasOpen) {
            item.classList.add('open');
          }
        }
        // Otherwise, let the link navigate normally
      });
    });
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(function() {
        if (!isMobile()) {
          mainNav.classList.remove('mobile-nav-open');
          if (siteSearch) {
            siteSearch.style.display = '';
          }
          hasSubmenuItems.forEach(function(item) {
            item.classList.remove('open');
          });
        }
      }, 250);
    });
    
    // Contact link - open in new tab
    const navLinks = document.querySelectorAll('.main-nav .nav-link');
    navLinks.forEach(function(link) {
      if (link.textContent.trim() === 'Contact') {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener');
      }
    });
    
  });
})();