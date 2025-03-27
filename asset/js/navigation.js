/**
 * Enhanced dropdown accessibility for Omeka S navigation
 */
(function() {
    document.addEventListener('DOMContentLoaded', function() {
        // Add keyboard support for dropdown menus
        const menuItems = document.querySelectorAll('.main-nav .navigation .has-children > a');
        
        menuItems.forEach(item => {
            item.addEventListener('keydown', function(e) {
                if (e.code === 'Space' || e.code === 'Enter') {
                    e.preventDefault();
                    const parentLi = this.parentNode;
                    const dropdown = parentLi.querySelector('ul');
                    
                    // Toggle the dropdown
                    if (dropdown.style.display === 'block') {
                        dropdown.style.display = '';
                        parentLi.classList.remove('open');
                    } else {
                        // Close all other dropdowns first
                        document.querySelectorAll('.main-nav .navigation .has-children').forEach(menu => {
                            menu.classList.remove('open');
                            const submenu = menu.querySelector('ul');
                            if (submenu) submenu.style.display = '';
                        });
                        
                        dropdown.style.display = 'block';
                        parentLi.classList.add('open');
                    }
                }
            });
        });
        
        // Close dropdowns when clicking outside
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.main-nav .navigation .has-children')) {
                document.querySelectorAll('.main-nav .navigation .has-children').forEach(menu => {
                    menu.classList.remove('open');
                    const submenu = menu.querySelector('ul');
                    if (submenu) submenu.style.display = '';
                });
            }
        });
    });
})();