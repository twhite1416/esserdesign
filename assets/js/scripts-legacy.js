var Site = window.Site ||{};
var SiteVars = {
	mainHeight: 0,
	currentMain: 1,
	spanInt: 0,
	colors: new Array('192,162,4','96,134,159','217,83,30','238,177,17','148,155,80')
};
(function($){
    $("#masthead img").lazyload({effect : "fadeIn"});
	$("#projects img").lazyload({effect : "fadeIn"});
	/************************|OBJECT HANDLING|************************/
	positionHeader();
	$('#strip').chipAnimation();
	//HOMEPAGE GALLERY
	$('#masthead .gallery').cycle({ 
		timeout:  8000, 
		speed:  1000,
		before: animateSpan
	});
	//ANCHOR NAV
	$('#header h1 a').click(function(){
		if(SiteVars.currentMain == 1){
			SiteVars.currentMain = 1;
			$(window).scrollTo(0,700,{axis:'y'});	
		}else{
			$('#scroller').animate({left:0},400,function(){
				$(window).scrollTo(0,700,{axis:'y'});																												
			}); 
		}
		return false;
	});

	$('#header li a, .article h1 a').click(function(){
		$('#main .article').each(function(){
			if($(this).hasClass('active')){
				$(this).removeClass('active');	
			}							  
		});
		//
		var anchorId = $(this).attr('href');
		$(anchorId).addClass('active');
		var offset = $(anchorId).offset();
		var toPosition = offset.top-$('#header').height();
		if(SiteVars.currentMain == 1){
			SiteVars.currentMain = 1;
			$(window).scrollTo(toPosition,400,{axis:'y'});
		}else{
			$('#scroller').animate({left:0},400,function(){
				$(window).scrollTo(toPosition,400,{axis:'y'});																														
			}); 
		}
		return false;
	});
	//
	$('#projects .item').mouseenter(function(){
		var $this = $(this);
		var child = -1;
		var tchild = $(this).children().length;
		console.log(tchild);
		var t= setInterval(fade,50);
		function fade(){
			if(child == tchild) clearInterval(t);
			child ++;
			console.log(child);
			$this.find('img:eq('+child+')').fadeOut(50);					
		}
	});
	$('#projects .item').mouseleave(function(){
		$(this).find('img').fadeIn(50);									 
	});
	/************************|FUNCTIONS|************************/
	//ANIMATE SPAN COLOR
	function animateSpan(){
		$('#masthead h2 span').animate({color:'rgb('+SiteVars.colors[SiteVars.spanInt]+')'},1000,function(){
			if(SiteVars.spanInt < SiteVars.colors.length-1){
				SiteVars.spanInt++;
			}else{
				SiteVars.spanInt = 0;
			}
		});
	}
	//SCROLL HEIGHT
	function setScrollHeight(){
		var lastchild = $('#main .article:last-child');
		$('#main').height(SiteVars.mainHeight+45+($(window).height()-lastchild.outerHeight(true)-$('#header').outerHeight(true)));
	}
	//POSITION HEADER
	function positionHeader(){
		$('#header').css({left:($(window).width()-$('#header').width())/2});	
	}
	//POSITION MAINS
	function positionMains(){
		$('#main,#main2').css({width:$(window).width()});
		$('#scroller').css({width:($(window).width())*2});
		$('#main2').css({left:$(window).width()});
	}
	/************************|HANDLE PROJECTS|************************/
	$('#projects-brands').projectGrid({hiLite:'192,162,4'});
	$('#projects-identities').projectGrid({hiLite:'96,134,159'});
	$('#main .grid .item').click(function(){
		SiteVars.currentMain = 2;
		var cat = $(this).attr('cat');
		var pid = $(this).attr('pid');
		$('#scroller').animate({left:-($(window).width())},400,function(){
			var offset = $('#projects-'+cat).offset();
			var toPosition = parseInt(offset.top-$('#header').height());
			toPosition = (toPosition < 0) ? 0 : toPosition;
			$(window).scrollTo(toPosition,400,{
				axis:'y',
				onAfter:function(){
					console.log(cat);
					$('#projects-'+cat).data('projectGrid').show(pid);
				}
			});
		});  
	});
	$('.discipline-list a').click(function(){
		SiteVars.currentMain = 2;
		var cat = $(this).attr('href');
		$('#scroller').animate({left:-($(window).width())},400,function(){
			var offset = $('#'+cat).offset();
			var toPosition = parseInt(offset.top-$('#header').height());
			toPosition = (toPosition < 0) ? 0 : toPosition;
			$(window).scrollTo(toPosition,400,{
				axis:'y',
				onAfter:function(){
					console.log(cat);
				}
			});
		});
		return false;
	});
	$('#main2 .grid .item').click(function(){
		var cat = $(this).attr('cat');
		var pid = $(this).attr('pid');
		$('#projects-'+cat).data('projectGrid').show(pid);
	});
	/************************|WINDOW LISTENERS|************************/
	//SCROLL
	$(window).bind("scroll", function(){
		
	});
	//RESIZE
	$(window).bind("resize", function(){			  
		positionHeader();
		setScrollHeight();
		positionMains();
	});
	//LOAD
	$(window).bind("load", function(){
		SiteVars.mainHeight = $('#main').height();
		setScrollHeight();
		positionMains();
	});
})(jQuery);