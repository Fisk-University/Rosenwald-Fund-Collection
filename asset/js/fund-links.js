// asset/js/fund-links.js
document.addEventListener('DOMContentLoaded', function() {
  // Get the current base path dynamically
  const currentPath = window.location.pathname;
  const pageIndex = currentPath.indexOf('/page/');
  
  // Extract base path
  const basePath = pageIndex !== -1 ? currentPath.substring(0, pageIndex) : '';
  
  // Define custom URL mapping
  const fundUrlMapping = {
    'School Fund': `${basePath}/page/school-fund`,
    'Fellowship Fund': `${basePath}/page/fellowship-fund`,
    'Administrative': `${basePath}/page/administrative`,
    'Photographs and Clippings': `${basePath}/page/photographs-clippings`,
    'Studies and Publications': `${basePath}/page/studies-publications`,
    'Rosenwald Family': `${basePath}/page/rosenwald-family`,
  };

  // Find all ItemSet showcase items
  const itemSets = document.querySelectorAll('.item-set.resource');
  
  itemSets.forEach(item => {
    const titleLink = item.querySelector('a:nth-child(2)');
    const caption = item.querySelector('.caption');
    
    if (titleLink && caption) {
      const fundName = titleLink.textContent.trim();
      const customUrl = fundUrlMapping[fundName] || '/';

      // create view link
      const viewLink = document.createElement('a');
      viewLink.href = customUrl;
      viewLink.className = 'view-fund-link';
      viewLink.innerHTML = `<span>View ${fundName}</span> →`;
      
      caption.appendChild(viewLink);
    }
  });
});