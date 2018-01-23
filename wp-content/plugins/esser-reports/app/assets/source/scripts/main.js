( function () {

  $(document).ready(function($) {

    // Accordion
    $( '.accordion-header' ).click(function() {
      var accordion = $(this).parents( '.accordion' );
      var accordionContent = $(this).parents( '.accordion' ).find( '.accordion-content' );
      var dataAccordion = accordion.data( 'accordion' );

      $(this).parent().data( 'accordion', 'closed' );
      
      if ( dataAccordion == 'open') {
        accordionContent.slideUp();
        accordion.data( 'accordion', 'closed' );
        accordion.removeClass( 'open' );
        accordion.addClass( 'closed' );
      }

      if ( dataAccordion == 'closed') {
        accordionContent.slideDown();
        accordion.data( 'accordion', 'open' );
        accordion.removeClass( 'closed' );
        accordion.addClass( 'open' );
      }
    });

    // Counter

    $( '.testing.accordion .accordion-header' ).click(function(event) {

      $('.counter').each(function() {

        var $this = $(this),
            countTo = $this.data( 'number' );

        $({ Counter: 00 }).animate({ Counter: countTo }, {
          duration: 2000,
          easing: 'swing',
          step: function () {
            $this.text(
              ("0" + Math.ceil( this.Counter )).slice(-2)
            );
          }
        });
      });

    });

    $( '.updates' ).waypoint(function(direction) {

      if ( direction === 'down' ) {
        $( '.updates' ).addClass( 'animate' );
      }
      
    }, {
      offset: '0'
    });

    $( '.testing' ).waypoint(function(direction) {

      if ( direction === 'down' ) {
        $( '.testing' ).addClass( 'animate' );
      }
      
    }, {
      offset: '0'
    });

  }); // Document Ready

})(jQuery); // Fully reference jQuery after this point.