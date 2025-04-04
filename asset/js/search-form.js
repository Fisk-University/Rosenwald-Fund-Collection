// Rosenwald-Fund-Collection/asset/js/search-form.js

document.addEventListener('DOMContentLoaded', function() {
    const stateSelect = document.getElementById('state');
    const countySelect = document.getElementById('county');
    
    if (!stateSelect || !countySelect) return;
    
    // The fetch URL should match the API endpoint provided by the UnitedSearch module
    const fetchCounties = async (state) => {
        try {
            const siteSlug = document.body.dataset.siteSlug || '';
            const response = await fetch(`/${siteSlug}/united-search/counties?state=${encodeURIComponent(state)}`);
            if (!response.ok) throw new Error('Network response was not ok');
            return await response.json();
        } catch (error) {
            console.error('Error fetching counties:', error);
            return [];
        }
    };
    
    stateSelect.addEventListener('change', async function() {
        const selectedState = this.value;
        
        // Clear current options except the first one
        while (countySelect.options.length > 1) {
            countySelect.remove(1);
        }
        
        if (!selectedState) return;
        
        // Fetch and add new options
        const counties = await fetchCounties(selectedState);
        counties.forEach(county => {
            const option = document.createElement('option');
            option.value = county;
            option.textContent = county;
            countySelect.appendChild(option);
        });
    });
});