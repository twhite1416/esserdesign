/*
	theme - ESSER DESIGN 2012
	scripts.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.7
    
	Copyright 2011. All Rights Reserved.	
*/
var hash = '';
(function($) {
    $.edSite = function(element, options) {
        var defaults = {
			baseURL: "http://" + window.location.host,
			assetsURL: '/assets',
			page: new Object,
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
			//Make primary nav hashable
			$('#navigation a').each(function(){
				var static_url = $(this).attr('href');
				if(static_url.indexOf('http') == -1){
					$(this).attr('href','#!/'+static_url.substr(1));
				}
			});
			//Hide Images
			$('#masthead img, #main .grid img').each(function(){
				var src = $(this).attr('src');
				$(this).attr('src',site.settings.assetsURL+'/images/spaceball.gif');
				$(this).attr('data-original', src);
			});
			//Animate Strip
			if (Modernizr.canvas){
				$('#strip').chipAnimation({method:'randomize',reverse:false});
				$('#strip').on("chipAnimationComplete", function(event){
					//Init Methods
					site.navigation();
					site.homepage();
					site.projects();
					site.contactForm();
					console.log('chips done now what');
				});
			}else{
				//Init Methods
				site.navigation();
				site.homepage();
				site.projects();
				site.contactForm();
			}
		}
		site.pageControl = function(uri){
			var page = new Object;
			page.href = window.location.href;
			if(uri == undefined){
				page.hash = window.location.hash;
			}else{
				page.hash = uri;
			}
			page.hasharr = page.hash.split('/');
			page.base = page.href.toString().split('#!/')[1];
			page.id = '#'+page.base;
			
			page.hasharr.shift();
			if(page.hasharr[page.hasharr.length] == '') page.hasharr.pop();
			
			var offset;
			console.log(page.hasharr);
			if(page.hasharr.length > 1){
				page.main = 2;
				offset = $('#projects-'+page.hasharr[1]).offset();	
			}else if(page.hasharr.length == 1){
				if(page.hasharr[0] == 'home'){
					console.log('home page');
					page.main = 1;
					offset = new Object();
					offset.top = 0;
				}else{
					console.log('single page');
					page.main = 1;
					offset = $('#'+page.hasharr[0]).offset();
				}
			}
			if(offset.top != 0){
				page.y = parseInt(offset.top-$('#header').height());
			}else{
				page.y = 0;	
			}
			if(page.main == 2){
				site.settings.currentMain = 2;
				$('#scroller').animate({left:-($(window).width())},400,function(){
					$(window).scrollTo(page.y,400,{
						axis:'y',
						onAfter:function(){
							//IF YOU HAVE A PROJECT ID USE IT
							/*
							if(page.hasharr[2]){
								$('#projects-'+page.hasharr[1]).data('projectGrid').show(page.hasharr[2]);
							}
							//IF THE PREVIOUS PAGE WAS THE PARENT PROJECT CATEGORY - JUST CLOSE THE GALLERY
							if(site.settings.page.hasharr[2] == undefined && site.settings.page.hasharr[1] == page.hasharr[1]){
								$('#projects-'+page.hasharr[1]).data('projectGrid').hide();
							}
							*/
						}
					});
				});
				setScrollHeight();
			}else{
				site.settings.currentMain = 1;
				var scrollerPos = $('#scroller').offset();
				if(scrollerPos.left < 0){
					$('#scroller').animate({left:0},400,function(){
						$(window).scrollTo(page.y,400,{axis:'y'});
					});	
				}else{
					$(window).scrollTo(page.y,400,{axis:'y'});
				}
				setScrollHeight();
			}
			site.settings.page = page;
		}
		//Navigation
		site.navigation = function(){
			//ANCHOR NAV
			$('#header h1 a').click(function(e){
				e.preventDefault();
				updateHash('#!/home');
				return false;
			});
		
			$('#header li a, .article h1 a').click(function(e){
				e.preventDefault();
				$('#main .article').each(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');	
					}							  
				});
				updateHash($(this).attr('href'));
				
				return false;
			});
		}
		//Homepage
		site.homepage = function(){
			//Animate the rest
			$('#container').css({height:'auto',overflow:'none'});
			$('#hgroup').animate({top:0},600);
			$('#frame').css({opacity:1.0});
			$('#frame').animate({marginTop:0},600,function(){
				if(window.location.hash == ''){
					updateHash('#!/home');
				}else{
					site.pageControl();	
				}
			}).delay(600);			
			//Loading
			$("#masthead img").lazyload({effect : "fadeIn",threshold:1500});
			$("#projects img").lazyload({effect : "fadeIn"});
			//Masthead Gallery
			$('#masthead .gallery').cycle({ 
				timeout:  8000, 
				speed:  1000,
				before: animateSpan
			});	
		}
		//Forms
		site.contactForm = function(){
			$('#contact input').focus(function(){
				$(this).parent().addClass('focus');								   
			}).blur(function(){
				$(this).parent().removeClass('focus');								   
			});
		}
		//Projects
		site.projects = function(){
			//Project Controls
			$('#main .grid .item').click(function(e){
				e.preventDefault();
				
				site.settings.currentMain = 2;
				var cat = $(this).attr('cat');
				var pid = $(this).attr('pid');
				if(pid != undefined){
					$('#scroller').animate({left:-($(window).innerWidth())},400,function(){
						console.log(cat);
						var offset = $('#projects-'+cat).offset();
						var toPosition = parseInt(offset.top-$('#header').height());
						toPosition = (toPosition < 0) ? 0 : toPosition;
						$(window).scrollTo(toPosition,400,{
							axis:'y',
							onAfter:function(){
								console.log(cat);
								//$('#projects-'+cat).data('projectGrid').show(pid);
							}
						});
					});
				}
				updateHash('#!/projects/'+cat);
			});
			
			$('#main .grid .item a').removeAttr('href');
			
			$('.discipline-list a').each(function(){
				var href = $(this).attr('href');									  
				$(this).attr('href','#!'+href);
			});
			$('.discipline-list a').click(function(e){
				e.preventDefault();
				updateHash($(this).attr('href'));
				return false;
			});
		
			//ANIMATED NAVIGATION
			$('.projects-animated-nav a').click(function(e){
				e.preventDefault();
				updateHash($(this).attr('href'));
				return false;										 
			});
		}
		
		site.windowControls = function(){
			//SCROLL
			$(window).bind("scroll", function(){});
			//RESIZE
			$(window).bind("resize", function(){			  
				positionHeader();
				setScrollHeight();
				positionMains();
				positionProjectNav();
			});
			//LOAD
			$(window).bind("load", function(){
				positionHeader();
				site.settings.mainHeight = $('#main').height();
				setScrollHeight();
				positionMains();
				positionProjectNav();
				loadMap();
			});
			//HASH UPDATE
			$(window).bind('hashchange', function(e) {
				site.pageControl();
				e.preventDefault();
			});
		}
		
		/**************|PRIVATE METHODS|**************/
		var updateHash = function(uri){
			var url = window.location.href;
			var request = url.substr(site.settings.baseURL.length);
			console.log(request);
			if(request.indexOf('#') == -1){
				uri = '/#!'+request;	
				window.location.href = site.settings.baseURL+uri;
			}else{
				if(window.location.hash != uri){
					window.location.hash = uri;
					if (!Modernizr.hashchange){
					   $(window).data('edSite').pageControl();
					}
					console.log(uri);
				}
			}
		}

		//ANIMATE SPAN COLOR - This animates the color of the span in the header to match the image color as it rotates.
		var animateSpan = function(){
			$('#masthead h2 span').animate({color:'rgb('+site.settings.colors[site.settings.spanInt]+')'},1000,function(){
				if(site.settings.spanInt < site.settings.colors.length-1){
					site.settings.spanInt++;
				}else{
					site.settings.spanInt = 0;
				}
			});
		}

		//SCROLL HEIGHT - When the section changes, this handles resetting the height of the scrollable element (main, main2, or main3).
		var setScrollHeight = function(){
			var cm = site.settings.currentMain,
				ms = (cm >= 2) ? ['#main',cm].join('') : '#main',
				h = $(ms).outerHeight();
			$('#frame').css({height:h});
			
			/*
			if(site.settings.currentMain == 2){
				$('#frame').css({height:$('#main2').outerHeight()});
			}else{
				$('#frame').css({height:$('#main').outerHeight()});
			}
			
			var lastchild = $('#main .article:last-child');
			//$('#main').height(site.settings.mainHeight+45+($(window).height()-lastchild.outerHeight(true)-$('#header').outerHeight(true)));
			//$('#main').height( site.settings.mainHeight+( $(window).height()-130-lastchild.outerHeight(true)-$('#base').height() ) );
			*/
		}
		
		//POSITION HEADER - This centers the header in the window. I don't think we need this, but we'll leave it and see.
		var positionHeader = function(){
			var $h = $('#header'),
				l = ($(window).width() - $h.width()) / 2;
			$h.css({left:l});	
		}
		
		//POSITION MAINS - This executes on window resize and controls the widths of each of the main sections.
		var positionMains = function(){
			var $m = $('#main'),
				$m2 = $('#main2'),
				$m3 = $('#main3'),
				$s = $('#scroller'),
				w = $(window).width(),
				cm = site.settings.currentMain,
				sl = (cm >= 2) ? (cm - 1) * w : 0;
			$m.css({width:w});
			$m2.css({width:w,left:w});
			$m3.css({width:w,left:w*2});
			$s.css({width:w*3,left:sl});
		}
		
		//POSITION PROJECT NAV - This is no longer needed. The positioning is fully CSS based now.
		var positionProjectNav = function(){
			//var offset = $('.projects .section').offset();
			//console.log(offset.left);
			//$('.projects .header').css({marginLeft:offset.left});	
		}
		
		//LOAD MAP - Google Maps for the contact section.
		var loadMap = function(){
			var center = new Array(33.507166,-112.031869);
			var bounds = new Array(33.503600,-112.037520,33.51075,-112.02625); //Bottom,Left,X,Right
			GoogleMap('map_canvas',center,site.settings.assetsURL+'/images/map-overlay.png',bounds);
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
/***********************/
$(window).edSite();