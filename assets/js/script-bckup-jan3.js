/*
	theme - ESSER DESIGN 2012
	scripts.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.7
    
	Copyright 2011. All Rights Reserved.	
*/
(function($) {
    $.edSite = function(element, options) {
        var defaults = {
			baseURL: window.location.protocol + "://" + window.location.host,
			mainHeight: 0,
			currentMain: 1,
			spanInt: 0,
			colors: new Array('192,162,4','96,134,159','217,83,30','238,177,17','148,155,80')
        }
        var site = this,$element = $(element),element = element;
		site.settings = {}
        /**************|PUBLIC METHODS|**************/
		site.init = function(){
			site.windowControls();
			//Collect Settings & Defaults
			site.settings = $.extend({}, defaults, options);
			//Animate Strip
			$('#strip').chipAnimation();
			$('#strip').on("chipAnimationComplete", function(event){
				//Init Methods
				site.navigation();
				site.homepage();
				site.projects();
				console.log('chips done now what');
			});
			//Load Direct URL
			if(window.location.toString().indexOf('/#!/') != -1){
				page_base = window.location.toString().split('/#!/')[1];
				var anchorId = '#'+page_base;
				$(window).scrollTo($(anchorId),700);
			}else{
				page_base = 'null';	
			}
		}		
		//Navigation
		site.navigation = function(){
			//ANCHOR NAV
			$('#header h1 a').click(function(){
				if(site.settings.currentMain == 1){
					site.settings.currentMain = 1;
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
				if($(this).attr('href').indexOf('/#!/') != -1){
					var page_base = $(this).attr('href').split('/#!/')[1];
					var anchorId = '#'+page_base;
					$(anchorId).addClass('active');
					var offset = $(anchorId).offset();
					var toPosition = offset.top-$('#header').height();
					var newHref = site.settings.baseURL+'/#!/'+page_base;
				}else{
					var toPosition = 0;
					var newHref = site.settings.baseURL;
				}
				console.log(newHref);
				if(site.settings.currentMain == 1){
					site.settings.currentMain = 1;
					$(window).scrollTo(toPosition,400,{axis:'y'},function(){
							window.location = newHref;
					});	
				}else{
					$('#scroller').animate({left:0},400,function(){
						$(window).scrollTo(toPosition,400,{axis:'y'},function(){
							window.location = newHref;
						});																														
					}); 
				}
				
				return false;
			});
		}
		//Homepage
		site.homepage = function(){
			//Animate the rest
			$('#container').css({height:'auto',overflow:'none'});
			$('#hgroup').animate({top:0},600);
			$('#strip').css({overflow:'hidden'});
			$('#strip').animate({height:130},600);
			$('#frame').css({opacity:1.0});
			$('#frame').animate({marginTop:0},600).delay(200);
			//Loading
			$("#masthead img").lazyload({effect : "fadeIn",threshold:1500});
			$("#projects img").lazyload({effect : "fadeIn"});
			//Masthead Gallery
			$('#masthead .gallery').cycle({ 
				timeout:  8000, 
				speed:  1000,
				before: animateSpan
			});	
			//Homepage Project Gallery
			$('#projects .item').mouseenter(function(){
				var $this = $(this);
				var child = -1;
				var tchild = $(this).children().length;
				var t= setInterval(fade,50);
				function fade(){
					if(child == tchild) clearInterval(t);
					child ++;
					$this.find('img:eq('+child+')').fadeOut(50);					
				}
			});
			$('#projects .item').mouseleave(function(){
				$(this).find('img').fadeIn(50);									 
			});
			//Project Controls
			$('#main .grid .item').click(function(){
				site.settings.currentMain = 2;
				var cat = $(this).attr('cat');
				var pid = $(this).attr('pid');
				if(pid != undefined){
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
				}
			});
		}
		//Projects
		site.projects = function(){
			$('#projects-brands').projectGrid({hiLite:'192,162,4'});
			$('#projects-identities').projectGrid({hiLite:'96,134,159'});
			$('.discipline-list a').click(function(){
				site.settings.currentMain = 2;
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
		}
		//
		site.windowControls = function(){
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
				site.settings.mainHeight = $('#main').height();
				setScrollHeight();
				positionMains();
			});	
		}
		/**************|PRIVATE METHODS|**************/
		//ANIMATE SPAN COLOR
		var animateSpan = function(){
			$('#masthead h2 span').animate({color:'rgb('+site.settings.colors[site.settings.spanInt]+')'},1000,function(){
				if(site.settings.spanInt < site.settings.colors.length-1){
					site.settings.spanInt++;
				}else{
					site.settings.spanInt = 0;
				}
			});
		}
		//SCROLL HEIGHT
		var setScrollHeight = function(){
			var lastchild = $('#main .article:last-child');
			$('#main').height(site.settings.mainHeight+45+($(window).height()-lastchild.outerHeight(true)-$('#header').outerHeight(true)));
		}
		//POSITION HEADER
		var positionHeader = function(){
			$('#header').css({left:($(window).width()-$('#header').width())/2});	
		}
		//POSITION MAINS
		var positionMains = function(){
			$('#main,#main2').css({width:$(window).width()});
			$('#scroller').css({width:($(window).width())*2});
			$('#main2').css({left:$(window).width()});
		}
		/**************|INIT|**************/
        site.init();
    }
	
    $.fn.edSite = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('edSite')) {
                var site = new $.edSite(this, options);
                $(this).data('edSite', site);
            }
        });
    }
})(jQuery);
$(window).edSite();
/***********************/