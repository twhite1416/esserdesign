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
			baseURL: window.location.protocol + "://" + window.location.host,
			page: new Object,
			mainHeight: 0,
			currentMain: 1,
			spanInt: 0,
			colors: new Array('192,162,4','96,134,159','217,83,30','238,177,17','148,155,80')
        }
        var site = this,$element = $(element),element = element;
		site.settings = {}
        /**************|PUBLIC METHODS|**************/
		site.test = function(){
			alert('test');
		}
		site.init = function(){
			site.windowControls();
			//Collect Settings & Defaults
			site.settings = $.extend({}, defaults, options);
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
				console.log('single page');
				page.main = 1;
				offset = $('#'+page.hasharr[0]).offset();
			}
			if(page.hasharr[0] == 'home'){
				offset = 0;
			}
			page.y = parseInt(offset.top-$('#header').height());
			if(page.main == 2){
				site.settings.currentMain = 2;
				$('#scroller').animate({left:-($(window).width())},400,function(){
					$(window).scrollTo(page.y,400,{
						axis:'y',
						onAfter:function(){
							//IF YOU HAVE A PROJECT ID USE IT
							if(page.hasharr[2]){
								$('#projects-'+page.hasharr[1]).data('projectGrid').show(page.hasharr[2]);
							}
							//IF THE PREVIOUS PAGE WAS THE PARENT PROJECT CATEGORY - JUST CLOSE THE GALLERY
							if(site.settings.page.hasharr[2] == undefined && site.settings.page.hasharr[1] == page.hasharr[1]){
								$('#projects-'+page.hasharr[1]).data('projectGrid').hide();
							}
						}
					});
				});
			}else{
				console.log(page.y);
				site.settings.currentMain = 1;
				var scrollerPos = $('#scroller').position();
				if(scrollerPos.left < 0){
					$('#scroller').animate({left:0},400,function(){
						$(window).scrollTo(page.y,400,{axis:'y'});
					});	
				}else{
					$(window).scrollTo(page.y,400,{axis:'y'});
				}
			}
			site.settings.page = page;
		}
		//Navigation
		site.navigation = function(){
			//ANCHOR NAV
			$('#header h1 a').click(function(){
				updateHash('#!/home');
				return false;
			});
		
			$('#header li a, .article h1 a').click(function(){
				$('#main .article').each(function(){
					if($(this).hasClass('active')){
						$(this).removeClass('active');	
					}							  
				});
				//
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
					window.location.hash = '#!/home';
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
						console.log(cat);
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
				updateHash('#!/projects/'+cat+'/'+pid);
			});
			//
			$('.discipline-list a').click(function(){
				updateHash($(this).attr('href'));
				return false;
			});	
		}
		//
		site.windowControls = function(){
			//SCROLL
			$(window).bind("scroll", function(){});
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
				loadMap();
			});
			//HASH UPDATE
			$(window).bind('hashchange', function(event) {
				site.pageControl();
				event.preventDefault();
			});
		}
		/**************|PRIVATE METHODS|**************/
		var updateHash = function(uri){
			if(window.location.hash != uri){
				window.location.hash = uri;
				if (!Modernizr.hashchange){
				   $(window).data('edSite').pageControl();
				}
				console.log(uri);
			}
		}
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
			//$('#main').height(site.settings.mainHeight+45+($(window).height()-lastchild.outerHeight(true)-$('#header').outerHeight(true)));
			//$('#main').height( site.settings.mainHeight+( $(window).height()-130-lastchild.outerHeight(true)-$('#base').height() ) );
		}
		//POSITION HEADER
		var positionHeader = function(){
			$('#header').css({left:($(window).width()-$('#header').width())/2});	
		}
		//POSITION MAINS
		var positionMains = function(){
			$('#main,#main2').css({width:$(window).width()});
			$('#scroller').css({width:($(window).width())*2});
			if(site.settings.currentMain ==2){
				$('#scroller').css({left:-($(window).width())});
					
			}
			$('#main2').css({left:$(window).width()});
		}
		//LOAD MAP
		var loadMap = function(){
			var center = new Array(33.507166,-112.031869);
			var bounds = new Array(33.505300,-112.034765,33.509750,-112.029400);
			GoogleMap('map_canvas',center,'/wp-content/themes/ed2012/images/map-overlay.gif',bounds);
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