// JavaScript Document
$(function() {
	//alert('IE...yay!');	
	var $i = $('.grid .item'),
		_s = 300,
		_e = 'easeOutQuad';
	
	$i.each(function() {
		var $$ = $(this),
			$b = $('.back',$$),
			$f = $('.front',$$),
			w = $f.width();
		$$.css('overflow','hidden');
		$b.css('left',-(w));
	});
	
	$i.hover(function() {
		slide($(this),true);
	},function() {
		slide($(this),false);
	});
	
	function slide($$, show) {
		var $b = $('.back',$$),
			$f = $('.front', $$),
			
			// For efficiency, I'm only checking the width of
			// one of the sides. I'm assuming they are equal.
			w = $f.width(),
			bl = (show) ? 0 : -(w),
			fl = (show) ? w : 0;
		$b.stop().animate({'left':bl},_s,_e);
		$f.stop().animate({'left':fl},_s,_e);
	}
});
