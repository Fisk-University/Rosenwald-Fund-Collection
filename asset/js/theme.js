/**
 * Rosenwald Fund Collection Theme JavaScript
 */
(function($) {
    'use strict';

    // Execute when the document is ready
    $(document).ready(function() {
        setupMobileMenu();
        initSearchForm();
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

})(jQuery);