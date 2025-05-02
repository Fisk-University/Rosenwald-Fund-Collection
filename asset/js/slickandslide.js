/**
 * JavaScript for initializing the Slick carousel for media display
 */
(function($) {
    'use strict';

    $(document).ready(function() {
        // Initialize Slick carousel
        $('.slicked-items').slick({
            dots: true,
            infinite: true,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 900,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        dots: true
                    }
                },
                {
                    breakpoint: 600,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,
                        infinite: false
                    }
                }
            ]
        });
        
        // Make sure the carousel is visible
        $('.slicked-items').css('opacity', '1');
    });

})(jQuery);