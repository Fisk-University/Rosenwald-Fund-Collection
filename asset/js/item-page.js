/**
 * Item Page JavaScript
 * Handles metadata tabs organization and map heading
 */

document.addEventListener('DOMContentLoaded', function() {
    // Find the first dl in resource-media (the one with properties)
    const resourceMedia = document.querySelector('.resource-media');
    if (!resourceMedia) return;
    
    const propertyDL = resourceMedia.querySelector('dl:first-of-type');
    if (!propertyDL || propertyDL.classList.contains('item-sets')) return;
    
    // Define which properties go in each tab
    const basicInfoProperties = ['Title', 'Description', 'Date', 'State', 'County'];
    
    // Get all property divs
    const allProperties = propertyDL.querySelectorAll('.property');
    const basicProperties = [];
    const moreProperties = [];
    
    allProperties.forEach(prop => {
        const dt = prop.querySelector('dt');
        if (dt) {
            const label = dt.textContent.trim();
            if (basicInfoProperties.includes(label)) {
                basicProperties.push(prop);
            } else {
                moreProperties.push(prop);
            }
        }
    });
    
    // Create tabs section
    const tabsSection = document.createElement('section');
    tabsSection.className = 'metadata-tabs-section';
    tabsSection.innerHTML = `
        <div class="tabs-container">
            <h2 class="section-title">Information and Background</h2>
            <div class="tabs-wrapper">
                <nav class="tab-nav">
                    <button class="tab-button active" onclick="showTab('basic', this)" type="button">
                        BASIC INFORMATION
                    </button>
                    <button class="tab-button" onclick="showTab('details', this)" type="button">
                        MORE DETAILS
                    </button>
                </nav>
                <div class="tab-content">
                    <div class="tab-panel" id="basic-panel">
                        <dl id="basic-dl"></dl>
                    </div>
                    <div class="tab-panel" id="details-panel" style="display:none;">
                        <dl id="details-dl"></dl>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    // Insert tabs before the original dl
    propertyDL.parentNode.insertBefore(tabsSection, propertyDL);
    
    // Move properties to appropriate tabs
    const basicDL = tabsSection.querySelector('#basic-dl');
    const detailsDL = tabsSection.querySelector('#details-dl');
    
    basicProperties.forEach(prop => {
        basicDL.appendChild(prop.cloneNode(true));
    });
    
    moreProperties.forEach(prop => {
        detailsDL.appendChild(prop.cloneNode(true));
    });
    
    // Remove original dl
    propertyDL.remove();
    
    // Hide Item Sets section
    const itemSetsDL = document.querySelector('dl.item-sets');
    if (itemSetsDL) {
        itemSetsDL.style.display = 'none';
    }
    
    // Hide Site Pages section
    const sitePagesDL = document.querySelector('dl.site-pages');
    if (sitePagesDL) {
        sitePagesDL.style.display = 'none';
    }

    // Add Map heading before the mapping section
    const mappingSection = document.getElementById('mapping-section');
    if (mappingSection) {
        // Create map heading
        const mapHeading = document.createElement('section');
        mapHeading.className = 'map-heading-section';
        mapHeading.innerHTML = '<h2 class="section-title">Map View</h2>';
        
        // Insert heading before map
        mappingSection.parentNode.insertBefore(mapHeading, mappingSection);
    }
});

// Tab switching function - make it global so onclick can access it
window.showTab = function(tabName, button) {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.style.display = 'none';
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Show selected panel
    if (tabName === 'basic') {
        document.getElementById('basic-panel').style.display = 'block';
    } else {
        document.getElementById('details-panel').style.display = 'block';
    }
    
    // Add active class to clicked button
    button.classList.add('active');
}