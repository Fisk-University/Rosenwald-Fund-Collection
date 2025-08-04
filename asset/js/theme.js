/**
 * Rosenwald Fund Collection Theme JavaScript
 */
(function($) {
    'use strict';

    // Execute when the document is ready
    $(document).ready(function() {
        setupMobileMenu();
        initSearchForm();
        injectMapTooltips();
    });

    /**
     * Set up mobile menu toggle
     */
    function setupMobileMenu() {
        // Toggle mobile menu when button is clicked
        $('.menu-toggle').on('click', function() {
            var $mainNav = $('.main-nav');
            $mainNav.toggleClass('active');
            
            // Update ARIA attributes
            var isExpanded = $mainNav.hasClass('active');
            $(this).attr('aria-expanded', isExpanded);
        });
        
        // Close mobile menu when clicking outside
        $(document).on('click', function(e) {
            if (!$(e.target).closest('.header-container').length) {
                $('.main-nav').removeClass('active');
                $('.menu-toggle').attr('aria-expanded', false);
            }
        });
        
        // Prevent document click from closing menu when clicking on the menu
        $('.main-nav').on('click', function(e) {
            e.stopPropagation();
        });
    }

    /**
     * Initialize search form functionality
     */
    function initSearchForm() {
        // Focus search input when icon clicked with empty input
        $('.search-submit').on('click', function(e) {
            var $input = $(this).siblings('input[type="text"]');
            if ($input.val().trim() === '') {
                e.preventDefault();
                $input.focus();
            }
        });
    }

    /**
     * Inject map tooltips into Omeka map blocks (Homepage only)
     */
    function injectMapTooltips() {
        // Only run on homepage
        if (!$('body').hasClass('home') && !$('.homepage').length) {
            return;
        }
        
        // Find all map blocks
        $('.block-mappingMapQuery .mapping-block').each(function() {
            var $mapBlock = $(this);
            
            // Check if tooltip already exists
            if (!$mapBlock.find('.map-tooltip-trigger').length) {
                // Add the trigger link with tooltip
                var tooltipHTML = 
                    '<div class="map-tooltip-wrapper">' +
                        '<a href="#" class="map-tooltip-trigger"><i class="fa fa-info-circle"></i> How do I use this map?</a>' +
                        '<div class="map-tooltip-content">' +
                            '<div class="tooltip-header">' +
                                '<h3>Map Instruction Tooltips</h3>' +
                                '<span class="close-visual">Close x</span>' +
                            '</div>' +
                            '<div class="tooltip-body">' +
                                '<p>In order to identify a school:</p>' +
                                '<ol>' +
                                    '<li>Zoom into the region of interest by pressing the plus button on the top left. If you are using a mouse, scroll up. Touchpad users can zoom in by pushing 2 fingers away from eachother.</li>' +
                                    '<li>Continue to zoom in to a region until a blue location pin appears. Click into the blue location pin, which will take you to a school located in the area</li>' +
                                    '<li>Press and drag to move the map to the desired area</li>' +
                                '</ol>' +
                            '</div>' +
                        '</div>' +
                    '</div>';
                $mapBlock.find('.mapping-map').after(tooltipHTML);
            }
        });
        
        // Prevent default click behavior
        $(document).on('click', '.map-tooltip-trigger', function(e) {
            e.preventDefault();
        });
    }

})(jQuery);