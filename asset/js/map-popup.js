
// Style the Map Pop-up 
document.addEventListener('DOMContentLoaded', function() {
  function formatSchoolPopups() {
    const popupContainers = document.querySelectorAll('.leaflet-popup-content');
    
    popupContainers.forEach(container => {
      // Skip if already formatted
      if (container.querySelector('.school-popup-info')) return;
      
      const groupValueLink = container.querySelector('.group-value a');
      if (!groupValueLink) return;
      
      // Look for an image in the popup (usually after group-value span)
      const existingImage = container.querySelector('img');
      
      const text = groupValueLink.textContent.trim();
      const parts = text.split(' in ');
      
      if (parts.length >= 2) {
        const href = groupValueLink.getAttribute('href');
        
        // Create new structure
        const wrapper = document.createElement('div');
        wrapper.className = 'school-popup-info';
        
        // School name
        const schoolName = document.createElement('h3');
        schoolName.className = 'school-name';
        schoolName.textContent = parts[0];
        
        // Location
        const location = document.createElement('p');
        location.className = 'school-location';
        location.textContent = parts.slice(1).join(' in ');
        
        // View School link
        const viewLink = document.createElement('a');
        viewLink.href = href;
        viewLink.className = 'view-school-link';
        viewLink.innerHTML = '<span class="link-text">View School</span> <span class="arrow">→</span>';
        viewLink.target = '_blank';
        
        // Add elements to wrapper in order: name, location, link, then image
        wrapper.appendChild(schoolName);
        wrapper.appendChild(location);
        wrapper.appendChild(viewLink);
        
        // Add image last if it exists
        if (existingImage) {
          const imageWrapper = document.createElement('div');
          imageWrapper.className = 'school-image';
          imageWrapper.appendChild(existingImage.cloneNode(true));
          wrapper.appendChild(imageWrapper); // Append at the end
        }
        
        // Replace popup content
        container.innerHTML = '';
        container.appendChild(wrapper);
      }
    });
  }
  
  // Run formatter when clicking anywhere on the page
  document.addEventListener('click', function() {
    setTimeout(formatSchoolPopups, 300);
  });
  
  // Watch for new popups being added to the DOM
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      mutation.addedNodes.forEach(function(node) {
        if (node.nodeType === 1 && node.classList && node.classList.contains('leaflet-popup')) {
          setTimeout(formatSchoolPopups, 100);
        }
      });
    });
  });
  
  // Start observing
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});