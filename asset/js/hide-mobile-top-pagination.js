(function() {
  function bruteForcePagination() {
    const isMobile = window.innerWidth <= 767;
    const allPaginations = document.querySelectorAll('.pagination-wrapper');
    
    if (isMobile) {
      // Hide ALL paginations first
      allPaginations.forEach(p => {
        p.setAttribute('style', 'display: none !important;');
      });
      
      // Then show ONLY the last one
      if (allPaginations.length > 0) {
        const lastOne = allPaginations[allPaginations.length - 1];
        lastOne.setAttribute('style', 'display: flex !important;');
      }
    } else {
      // Desktop: remove all inline styles
      allPaginations.forEach(p => {
        p.removeAttribute('style');
      });
    }
  }
  
  // Run immediately and on various events
  bruteForcePagination();
  document.addEventListener('DOMContentLoaded', bruteForcePagination);
  window.addEventListener('load', bruteForcePagination);
  window.addEventListener('resize', bruteForcePagination);
  
  // Also run after a delay to catch any late-loading styles
  setTimeout(bruteForcePagination, 1000);
})();