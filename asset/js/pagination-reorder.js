document.addEventListener('DOMContentLoaded', function() {
    // Get all pagination wrappers (top and bottom)
    const paginationWrappers = document.querySelectorAll('.pagination-wrapper');
    
    paginationWrappers.forEach(wrapper => {
        // Find the elements
        const form = wrapper.querySelector('form');
        const paginationButtons = wrapper.querySelector('.pagination-buttons');
        
        if (form && paginationButtons) {
            // Get the prev and next buttons
            const prevButton = paginationButtons.querySelector('.previous.o-icon-prev.button');
            const nextButton = paginationButtons.querySelector('.next.o-icon-next.button');
            
            if (prevButton && nextButton) {
                // Clone the buttons to avoid reference issues
                const prevButtonClone = prevButton.cloneNode(true);
                const nextButtonClone = nextButton.cloneNode(true);
                
                // Insert prev button before the form within pagination-wrapper
                form.parentNode.insertBefore(prevButtonClone, form);
                
                // Insert next button after the form within pagination-wrapper
                form.parentNode.insertBefore(nextButtonClone, form.nextSibling);
                
                // Remove the original pagination-buttons div
                paginationButtons.remove();
            }
        }
    });
});