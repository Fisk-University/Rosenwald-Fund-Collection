/**
 * Rosenwald Fund Collection Theme JavaScript
 */
(function($) {
    'use strict';

    // Execute when the document is ready
    $(document).ready(function() {
        setupMobileMenu();
        setupDropdownMenus();
        initSearchForm();
        initDateRangeSlider();
    });

    /**
     * Handle mobile menu toggling
     */
    function setupMobileMenu() {
        // Add mobile menu toggle button if it doesn't exist
        if ($('.menu-toggle').length === 0) {
            const $navContainer = $('.main-navigation .navigation').parent();
            $navContainer.addClass('navigation-container closed');
            $navContainer.prepend('<button class="menu-toggle" aria-label="Toggle menu"><span class="menu-icon">&#9776;</span></button>');
        }

        // Toggle menu on button click
        $('.menu-toggle').on('click', function() {
            const $container = $(this).closest('.navigation-container');
            $container.toggleClass('closed');
            
            // Update ARIA attributes
            const isExpanded = !$container.hasClass('closed');
            $(this).attr('aria-expanded', isExpanded);
        });
    }

    /**
     * Set up keyboard-accessible dropdown menus
     */
    function setupDropdownMenus() {
        // Add accessibility attributes
        $('.navigation li').each(function() {
            const $parentItem = $(this);
            const $subMenu = $parentItem.find('> ul');
            
            if ($subMenu.length) {
                const $link = $parentItem.find('> a');
                
                // Add dropdown indicator
                $link.append('<span class="dropdown-arrow" aria-hidden="true">▼</span>');
                
                // Add ARIA attributes
                $link.attr({
                    'aria-haspopup': true,
                    'aria-expanded': false
                });
                
                $subMenu.attr({
                    'role': 'menu',
                    'aria-hidden': true
                });
                
                // Toggle submenu on click for mobile
                $link.on('click', function(e) {
                    if (window.innerWidth <= 768) {
                        e.preventDefault();
                        
                        const isExpanded = $link.attr('aria-expanded') === 'true';
                        
                        // Close all other open menus
                        $('.navigation a[aria-expanded="true"]').not($link).each(function() {
                            $(this).attr('aria-expanded', false);
                            $(this).next('ul').attr('aria-hidden', true).hide();
                        });
                        
                        // Toggle this menu
                        $link.attr('aria-expanded', !isExpanded);
                        $subMenu.attr('aria-hidden', isExpanded);
                        
                        if (isExpanded) {
                            $subMenu.slideUp(200);
                        } else {
                            $subMenu.slideDown(200);
                        }
                    }
                });
                
                // Keyboard navigation
                $link.on('keydown', function(e) {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        $(this).click();
                    }
                });
            }
        });
    }

    /**
     * Initialize search form functionality
     */
    function initSearchForm() {
        // Focus search input on icon click
        $('.search-submit').on('click', function(e) {
            const $input = $(this).siblings('input[type="text"]');
            if ($input.val().trim() === '') {
                e.preventDefault();
                $input.focus();
            }
        });

        // Handle advanced search toggle
        $('.advanced-search-toggle').on('click', function(e) {
            e.preventDefault();
            $('.advanced-search-content').slideToggle(200);
            $(this).toggleClass('active');
            
            const isActive = $(this).hasClass('active');
            $(this).attr('aria-expanded', isActive);
            $('.advanced-search-content').attr('aria-hidden', !isActive);
        });
    }

    /**
     * Initialize the date range slider
     */
    function initDateRangeSlider() {
        const $minSlider = $('.date-range-min');
        const $maxSlider = $('.date-range-max');
        
        if ($minSlider.length && $maxSlider.length) {
            const $minDisplay = $('.date-min');
            const $maxDisplay = $('.date-max');
            
            // Update the date displays when sliders change
            function updateDateDisplay() {
                const minYear = parseInt($minSlider.val());
                const maxYear = parseInt($maxSlider.val());
                
                $minDisplay.text(minYear);
                $maxDisplay.text(maxYear);
                
                // Ensure min <= max
                if (minYear > maxYear) {
                    if (this === $minSlider[0]) {
                        $maxSlider.val(minYear);
                        $maxDisplay.text(minYear);
                    } else {
                        $minSlider.val(maxYear);
                        $minDisplay.text(maxYear);
                    }
                }
            }
            
            // Set up event listeners
            $minSlider.on('input', updateDateDisplay);
            $maxSlider.on('input', updateDateDisplay);
            
            // Initialize display
            updateDateDisplay();
        }
    }

})(jQuery);