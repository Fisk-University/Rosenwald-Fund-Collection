/**
 * Standalone Carousel Thumbnails Module
 * Can be included on any page to add thumbnail navigation to existing Slick carousels
 * 
 * Usage:
 * 1. Include this file after jQuery and Slick
 * 2. Call: CarouselThumbnails.init(selector, options)
 * 
 * Example:
 * CarouselThumbnails.init('.slicked-items', {
 *     position: 'below',
 *     containerClass: 'my-custom-thumbnails'
 * });
 */

var CarouselThumbnails = (function($) {
    'use strict';
    
    // Default configuration
    var defaults = {
        position: 'below', // 'below', 'above', or selector for custom container
        thumbnailClass: 'carousel-thumbnails',
        autoGenerate: true,
        maxThumbnails: 10,
        thumbnailWidth: 100,
        thumbnailHeight: 65,
        showDots: true, // Keep original dots or hide them
        responsive: true
    };
    
    /**
     * Initialize thumbnails for a carousel
     * @param {string} carouselSelector - Selector for the Slick carousel
     * @param {object} options - Configuration options
     */
    function init(carouselSelector, options) {
        var settings = $.extend({}, defaults, options);
        var $carousel = $(carouselSelector);
        
        if ($carousel.length === 0) {
            console.warn('CarouselThumbnails: No carousel found with selector:', carouselSelector);
            return;
        }
        
        // Wait for Slick to initialize if not already
        if (!$carousel.hasClass('slick-initialized')) {
            $carousel.on('init', function() {
                createThumbnails($carousel, settings);
            });
        } else {
            createThumbnails($carousel, settings);
        }
    }
    
    /**
     * Create thumbnail navigation
     */
    function createThumbnails($carousel, settings) {
        var $slides = $carousel.find('.slick-slide:not(.slick-cloned)');
        var slideCount = $slides.length;
        
        // Only create thumbnails if there are multiple slides
        if (slideCount <= 1) {
            return;
        }
        
        // Add class to parent container
        var $parent = $carousel.closest('.carousel-block, .media-embeds');
        if ($parent.length) {
            $parent.addClass('has-multiple-images');
        }
        
        // Check if thumbnails already exist
        if ($('.' + settings.thumbnailClass).length > 0) {
            return;
        }
        
        // Generate HTML structure
        var thumbnailsHTML = generateThumbnailHTML($slides, settings);
        
        // Insert thumbnails based on position setting
        insertThumbnails($carousel, thumbnailsHTML, settings);
        
        // Set up event handlers
        setupEventHandlers($carousel, settings);
        
        // Hide dots if requested
        if (!settings.showDots) {
            $carousel.find('.slick-dots').hide();
        }
        
        // Make responsive if enabled
        if (settings.responsive) {
            makeResponsive(settings);
        }
    }
    
    /**
     * Generate thumbnail HTML
     */
    function generateThumbnailHTML($slides, settings) {
        var html = '<div class="' + settings.thumbnailClass + '">';
        html += '<div class="thumbnail-preview">';
        
        $slides.each(function(index) {
            if (index >= settings.maxThumbnails) return false;
            
            var $slide = $(this);
            var $img = $slide.find('img').first();
            
            if ($img.length > 0) {
                var imgSrc = $img.attr('src');
                var imgAlt = $img.attr('alt') || 'Slide ' + (index + 1);
                
                html += '<div class="thumb-item" data-slide="' + index + '">';
                html += '<img src="' + imgSrc + '" alt="' + imgAlt + '" ';
                html += 'width="' + settings.thumbnailWidth + '" ';
                html += 'height="' + settings.thumbnailHeight + '" />';
                html += '</div>';
            }
        });
        
        html += '</div>';
        html += '</div>';
        
        return html;
    }
    
    /**
     * Insert thumbnails into DOM
     */
    function insertThumbnails($carousel, html, settings) {
        var $thumbnails = $(html);
        
        if (settings.position === 'below') {
            // Insert after carousel's parent container
            var $container = $carousel.closest('.carousel-block, .media-embeds');
            if ($container.length) {
                $container.append($thumbnails);
            } else {
                $carousel.parent().append($thumbnails);
            }
        } else if (settings.position === 'above') {
            // Insert before carousel
            var $container = $carousel.closest('.carousel-block, .media-embeds');
            if ($container.length) {
                $container.prepend($thumbnails);
            } else {
                $carousel.parent().prepend($thumbnails);
            }
        } else if (typeof settings.position === 'string') {
            // Custom container selector
            $(settings.position).append($thumbnails);
        }
        
        // Mark first thumbnail as active
        $thumbnails.find('.thumb-item').first().addClass('active');
    }
    
    /**
     * Set up event handlers
     */
    function setupEventHandlers($carousel, settings) {
        var $thumbnails = $('.' + settings.thumbnailClass);
        
        // Thumbnail click handler
        $thumbnails.on('click', '.thumb-item', function() {
            var slideIndex = $(this).data('slide');
            $carousel.slick('slickGoTo', slideIndex);
        });
        
        // Update active thumbnail on slide change
        $carousel.on('afterChange', function(event, slick, currentSlide) {
            updateActiveThumbnail(currentSlide, settings);
        });
        
        // Optional: Update on before change for smoother transition
        $carousel.on('beforeChange', function(event, slick, currentSlide, nextSlide) {
            updateActiveThumbnail(nextSlide, settings);
        });
    }
    
    /**
     * Update active thumbnail
     */
    function updateActiveThumbnail(index, settings) {
        var $thumbnails = $('.' + settings.thumbnailClass);
        var $items = $thumbnails.find('.thumb-item');
        
        $items.removeClass('active');
        $items.filter('[data-slide="' + index + '"]').addClass('active');
        
        // Optional: Scroll thumbnail into view if many thumbnails
        scrollThumbnailIntoView(index, settings);
    }
    
    /**
     * Scroll active thumbnail into view
     */
    function scrollThumbnailIntoView(index, settings) {
        var $container = $('.' + settings.thumbnailClass + ' .thumbnail-preview');
        var $activeThumb = $container.find('[data-slide="' + index + '"]');
        
        if ($activeThumb.length && $container[0].scrollWidth > $container[0].clientWidth) {
            var scrollLeft = $activeThumb.position().left + $container.scrollLeft() - 
                           ($container.width() / 2) + ($activeThumb.width() / 2);
            
            $container.animate({ scrollLeft: scrollLeft }, 300);
        }
    }
    
    /**
     * Make thumbnails responsive
     */
    function makeResponsive(settings) {
        function adjustThumbnails() {
            var $thumbnails = $('.' + settings.thumbnailClass);
            var windowWidth = $(window).width();
            
            if (windowWidth < 576) {
                $thumbnails.find('.thumb-item img').attr({
                    width: 70,
                    height: 45
                });
            } else if (windowWidth < 768) {
                $thumbnails.find('.thumb-item img').attr({
                    width: 85,
                    height: 55
                });
            } else if (windowWidth < 992) {
                $thumbnails.find('.thumb-item img').attr({
                    width: settings.thumbnailWidth,
                    height: settings.thumbnailHeight
                });
            } else {
                $thumbnails.find('.thumb-item img').attr({
                    width: 120,
                    height: 78
                });
            }
        }
        
        // Adjust on load and resize
        adjustThumbnails();
        $(window).on('resize', debounce(adjustThumbnails, 250));
    }
    
    /**
     * Utility: Debounce function
     */
    function debounce(func, wait) {
        var timeout;
        return function() {
            var context = this, args = arguments;
            clearTimeout(timeout);
            timeout = setTimeout(function() {
                func.apply(context, args);
            }, wait);
        };
    }
    
    /**
     * Remove thumbnails
     */
    function destroy(carouselSelector) {
        var $carousel = $(carouselSelector);
        $('.' + defaults.thumbnailClass).remove();
        $carousel.off('afterChange beforeChange');
        
        var $parent = $carousel.closest('.carousel-block, .media-embeds');
        if ($parent.length) {
            $parent.removeClass('has-multiple-images');
        }
    }
    
    /**
     * Refresh thumbnails (useful for dynamic content)
     */
    function refresh(carouselSelector, options) {
        destroy(carouselSelector);
        init(carouselSelector, options);
    }
    
    // Public API
    return {
        init: init,
        destroy: destroy,
        refresh: refresh
    };
    
})(jQuery);

/**
 * Auto-initialize on document ready
 * Looks for carousels with data-thumbnails attribute
 */
$(document).ready(function() {
    // Auto-init for carousels with data attribute
    $('[data-thumbnails="true"]').each(function() {
        var $carousel = $(this);
        var options = {
            position: $carousel.data('thumbnail-position') || 'below',
            showDots: $carousel.data('show-dots') !== false
        };
        
        CarouselThumbnails.init($carousel, options);
    });
    
    // Or manually initialize for specific carousel
    // Example: Initialize for your specific carousel
    if ($('.slicked-items').length > 0) {
        CarouselThumbnails.init('.slicked-items', {
            position: 'below',
            thumbnailClass: 'carousel-thumbnails',
            showDots: true,
            maxThumbnails: 10
        });
    }
});