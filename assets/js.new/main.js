  $(document).ready(function () {
	// load up the home logo, and start the animation
	var bgOffset = 0;
	var bgInterval;

	$('.img').click(function() {
        if(jQuery(this).hasClass('preventHomePageLinkage')) {
            return; // Do not load the home page when this image is clicked.
        }
	    window.location = '/';
	});

	/*
	$('.img').mouseenter(function() {
	    
		
		var name = $(this).attr('name'); 
  
		bgInterval = setInterval(shiftImage, 10);
	    function shiftImage() {
	        bgOffset-=150;
	        if(Math.abs(bgOffset) >= 2400) {
	            bgOffset = 0;
	        }
			
			
	        $(this).css('background-position', bgOffset);
			alert(name);
			
			
			

	    }
	});

	$('.img').mouseleave(function() {
	    clearInterval(bgInterval);
	   
		$(this).css('background-position', '0');
		alert(event.target.id);

	});
	*/
	
});