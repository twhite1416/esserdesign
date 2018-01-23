//Add a console log function for older browsers
if (!console){
	 var console = new Object();
	 console.log = function(intext){/*alert(intext)*/};
}
/*
	Make Objects Sticky on Scroll
	jquery.stickyobject.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.4.2
	Copyright 2011. All Rights Reserved.	
*/
(function ($) {
    $.fn.stickyObject = function (options) {
		var obj = $(this);
		var scrolled = false;
        var settings = $.extend({
            threshold: 0,
			position: 0
        }, options);
		if(settings.destroy == true){
			$(window).unbind('scroll');
			obj.attr('style','');
			return this.each(function(){});
		}else{
			if(scrolled == false) scrolling();
			$(window).bind('scroll', function() {
				scrolling();
				scrolled = true;
			});
		}
		function scrolling(){
			if($(window).scrollTop() > settings.threshold) {
				obj.css({position:'fixed',top:settings.position});
			} else {
				obj.css({position:'absolute',top:0});
			}
		}
    }
})(jQuery);
/*
	ChipAnimation
	jquery.chipanimation.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.4.2
	Copyright 2011. All Rights Reserved.	
*/
(function($) {
    $.chipAnimation = function(element, options) {
        var defaults = {
			canvasHeight:130,
			canvasWidth: $(window).width()*2,
			speed: 100,
			colors: new Array('192,162,4','96,134,159','217,83,30','238,177,17','148,155,80','115,175,182','148,106,141'),
			chipArr: new Array(),
			callBackFnc: 'chipsComplete',
			method: 'randomize',
			reverse: false
        }
        var chips = this,$element = $(element),element = element,canvas = '',ctx = '';
		chips.settings = {}
        /**************|PUBLIC METHODS|**************/
		chips.init = function() {
			chips.settings = $.extend({}, defaults, options);
			var ccount=-1;
			ctx = E.canvas(chips.settings.canvasWidth, chips.settings.canvasHeight);
			canvas = new Canvas(ctx,{
			  clear:false
			});
			//collect chips
			for(var chipCount=-1; chipCount<(canvas.width/10); chipCount++){
				if(ccount < chips.settings.colors.length-1){
					ccount++;
				}else{
					ccount = 0;	
				}
				var rect 	= new Rectangle(10, 20);
				rect.x 		= chipCount*10;
				rect.y 		= -(Math.floor(Math.random()*100));
				rect.fill 	= 'rgb('+chips.settings.colors[ccount]+')';
				chips.settings.chipArr.push(rect);
			}
			//animate
			switch(chips.settings.method){
				case 'randomize':
					chips.randomize();
				break;
				case 'linear':
					chips.linear();
				break;
				case 'wave':
					chips.wave();
				break;
				default:
					chips.linear();
			}
			document.getElementById($element.attr('id')).appendChild(ctx);
		}
		chips.linear = function(){
			var i = 0;
			var chipArr = chips.settings.chipArr;
			if(chips.settings.reverse == true) chipArr.reverse();
			//
			canvas.every(10, function(){
				if(i < chipArr.length) {
					var rect = chipArr[i];
					rect.animateTo('height', (rect.y*-1)+canvas.height, chips.settings.speed);
					//rect.animateTo('y', canvas.height-20, chips.settings.speed);
					canvas.append(rect);
					i++;
				}else{
					chips.onComplete();
				}
			});
		}
		chips.wave = function(){
			var i = 0;
			var chipArr = chips.settings.chipArr;
			var middle = $(window).width()/10;
			var first = chipArr.slice(0,Math.ceil(middle/2));
			var second = chipArr.slice(Math.floor(middle/2),chipArr.length);
			//console.log(Math.floor(chipArr.length/2)+'/'+chipArr.length);
			if(chips.settings.reverse == true){
				first.reverse();
			}else{
				second.reverse();	
			}
			//
			canvas.every(5, function(){
				if(i < first.length) {
					//first
					var rect = first[i];
					rect.animateTo('y', canvas.height-20, chips.settings.speed);
					canvas.append(rect);
					//second
					var rect = second[i];
					rect.animateTo('y', canvas.height-20, chips.settings.speed);
					canvas.append(rect);
					i++;
				}else{
					chips.onComplete();
				}
			});
		}
		chips.randomize = function(){
			var i = 0;
			var chipArr = chips.settings.chipArr;
			chipArr.sort(function(){return Math.round(Math.random());});
			chipArr.sort(function(){return Math.round(Math.random());});
			//
			canvas.every(5, function() {
				if(i <= chipArr.length) {
				
					for(iN=0; iN<=10; iN++){
						iM = i+iN;
						var rect = chipArr[iM];
						if(typeof rect == 'object'){
							rect.animateTo('height', (rect.y*-1)+canvas.height, chips.settings.speed);
							//rect.animateTo('y', canvas.height-20, chips.settings.speed);
							canvas.append(rect);
						}
					}
					i = parseInt(i+10);
				}else{
					chips.onComplete();
				}
			});
		}
		chips.onComplete = function(){
			if(chips.settings.to == undefined){
				chips.settings.to = setTimeout(function(){
					$element.trigger("chipAnimationComplete");
					canvas.stop();
				},chips.settings.speed);	
			}
		}
        chips.init();
    }
    $.fn.chipAnimation = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('chipAnimation')) {
                var chips = new $.chipAnimation(this, options);
                $(this).data('chipAnimation', chips);
            }
        });
    }
})(jQuery);
/*
	ProjectGrid
	jquery.projectgrid.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.4.2
	Copyright 2011. All Rights Reserved.	
*/
(function($) {
    $.projectGrid = function(element, options) {
        var defaults = {
			currPos		: 0,
            currProject : 0,
			category	: '',
			projectArr  : new Array(),
			hiLite		: '194,194,194',
			storage: new Array()
        }
		var projects = this,$element = $(element),element = element;
        projects.settings = {}
        /**************|PUBLIC METHODS|**************/
		projects.init = function() {
            projects.settings = $.extend({}, defaults, options);
			//set array of projects
			var pos = 0;
			var arr = new Array();
			$element.find('.item').each(function(){
				if($(this).attr('pid')){
					pos++;
					$(this).attr('pos',pos);
					arr.push($(this).attr('pid'));
				}
			});
			projects.settings.projectArr = arr;
			projects.settings.galleryPos = 0;
            //attach loader
			$element.find('.loader').append('<img src="/assets/images/loader.gif"/>');
			$element.find('img').lazyload({effect : "fadeIn"});
			//return to grid
			$element.find('.refer').click(function(){
				projects.hide();								   
			});
			//thumbnail click
			$element.find('.item').click(function(){
				var cat = $(this).attr('cat');
				var pid = $(this).attr('pid');
				updateHash('projects/'+projects.settings.category+'/'+pid);
			}).mouseenter(function(){
				$(this).find('img.img').animate({opacity:0},100);	
			}).mouseleave(function(){
				$(this).find('img.img').animate({opacity:1.0},100);
			});
			//page through projects
			$element.find('.arrowr').click(function(){
				galleryCount = $element.find('div.gallery').children().length;
				projects.settings.galleryPos++;
				if(galleryCount > (projects.settings.galleryPos-1)) {
					$element.find('div.gallery').cycle(projects.settings.galleryPos-1); 
					$element.find('.count').html(projects.settings.galleryPos+' of '+galleryCount);
				}else{
					projects.settings.galleryPos = 0;
					nextProject();
				}
			});
			$element.find('.arrowl').click(function(){
				galleryCount = $element.find('div.gallery').children().length;
				projects.settings.galleryPos--;
				if((projects.settings.galleryPos) > 0) {
					$element.find('div.gallery').cycle(projects.settings.galleryPos-1); 
					$element.find('.count').html(projects.settings.galleryPos+' of '+galleryCount);
				}else{
					projects.settings.galleryPos = 0;
					prevProject();
				}
			});
        }
		projects.show = function( projectId ) {
			projects.settings.currProject = projectId;
			projects.settings.currPos = $element.find('div.item[pid='+projectId+']').attr('pos');
			projects.setcount(projectId);
			projects.get(projectId);
		}
		projects.hide = function( ) {
			//HIDE GALLERY
			$element.find('.featured').animate({left:'800px'},500);
			$element.find('div.item.active').each(function(){
				$(this).removeClass('active').animate({backgroundColor:'rgb(240,240,240)'},300);		  
			});
			updateHash('projects/'+projects.settings.category);
			//DUMP GALLERY
			$element.find('div.gallery').cycle('destroy');
		}
		projects.reveal = function(projectId){
			projects.settings.galleryPos = 1;
			console.log($element.find('div.gallery').children().length);
			//SETUP GALLERY
			$element.find('div.gallery').cycle({fx:'fade',speed:500});
			$element.find('div.gallery').cycle('pause'); 
			//SHOW GALLERY
			$element.find('div.featured').animate({left:'0px'},500);
			updateHash('projects/'+projects.settings.category+'/'+projectId);
			galleryCount = $element.find('div.gallery').children().length;
			$element.find('.count').html('1 of '+galleryCount);
		}
		projects.get = function( projectId ) {
			$element.find('.loader').animate({opacity:1.0},500);
			$element.find('.desc').animate({opacity:0.0},500);
			$element.find('.gallery').animate({opacity:0.0},500,function(){
				if(!projects.isStored(projectId)) {
					console.log('collect as new');
					$.ajax({
						type : 'POST',
						url : 'http://beta.esserdesign.com/ajax-request',
						dataType : 'json',
						data: {
							'pid' : projectId,
						},
						success : function(data){
							projects.store(data);
							projects.insert(data);
							projects.reveal(projectId);
						},
						error : function(XMLHttpRequest, textStatus, errorThrown) {
							alert('Something Happened. Please refresh the website');
						}
					});
				}else{
					console.log('retrieve from storage');
					var data = projects.getStored(projectId);
					projects.insert(data);
					projects.reveal(projectId);
				}
			});
			console.log(projects.settings.storage);
		}
		projects.insert = function( data ){
			//LOAD NEW CONTENT
			console.log(data.images);
			$element.find('.gallery').html('');
			for(var i in data.images){
				console.log(data.images[i]);
				$element.find('.gallery').append('<img src="'+data.images[i].src+'" alt="'+data.images[i].alt+'" height="470" width="790" />');
			}
			$element.find('.desc .title').html(data.title);
			$element.find('.desc .details').html(data.desc);
			//FADE IN NEW CONTENT
			$element.find('.loader').animate({opacity:0.0},500);
			$element.find('.desc').animate({opacity:1.0},500);
			$element.find('.gallery').animate({opacity:1.0},500);
		}
		projects.setcount = function( projectId ){
			//set numbers
			var posFormatted = (projects.settings.currPos.length < 2) ? '0'+projects.settings.currPos : projects.settings.currPos;
			var totalFormatted = (projects.settings.projectArr.length.toString().length < 2) ? '0'+projects.settings.projectArr.length.toString() : projects.settings.projectArr.length.toString();
			//$element.find('.count').html(posFormatted+' of '+totalFormatted);
			//hide all first
			$element.find('div.item.active').each(function(){
				$(this).removeClass('active').animate({backgroundColor:'rgb(240,240,240)'},300);		  
			});
			//reveal selected
			$element.find('div.item[pid='+projectId+']').addClass('active').animate({backgroundColor:'rgb(194,194,194)'},300);	
			//hide all first
			$element.find('.refer li.active').each(function(){
				$(this).removeClass('active').animate({backgroundColor:'rgb(168,168,168)'},300);		  
			});
			//reveal chip
			$element.find('.refer li:eq('+(projects.settings.currPos-1)+')').addClass('active').animate({backgroundColor:'rgb('+projects.settings.hiLite+')'},300);	
		}
		projects.store = function(data){
			projects.settings.storage.push(data);
		}
		projects.isStored = function( projectId ){
			found = false;
			$.each(projects.settings.storage, function(index) {
				if(projects.settings.storage[index].pid == projectId){
					found = true;	
				}
			});
			return found;
		}
		projects.getStored = function( projectId ){
			var pid;
			$.each(projects.settings.storage, function(index) {
				if(projects.settings.storage[index].pid == projectId){
					pid = index;
				}
			});
			return projects.settings.storage[pid];
		}
        projects.init();
		/****/
		var Project = function(){
			this.pid = 0;
			this.data = '';
			this.html = '';
		}
		var updateHash = function(uri){
			if(window.location.hash != uri){
				window.location.hash = uri;
				if (!Modernizr.hashchange){
				   $(window).data('edSite').pageControl();
				}
				console.log(uri);
			}
		}
		var nextProject = function(){
			var nPos,nId;
			if(projects.settings.currPos < projects.settings.projectArr.length){
				nPos = parseInt(projects.settings.currPos)+1;
				nId = $element.find('div.item[pos='+nPos+']').attr('pid');
				//projects.show(nId);
				updateHash('projects/'+projects.settings.category+'/'+nId);
				
			}else{
				projects.hide();
				var cat = $element.next().attr('cat');
				/*
				var pid = $element.next().find('.grid .item:first-child').attr('pid');
				window.location.hash = 'projects/'+cat+'/'+pid;
				*/
				updateHash('projects/'+cat);
				
			}	
		}
		var prevProject = function(){
			var pPos,pId;
			if(projects.settings.currPos < projects.settings.projectArr.length && projects.settings.currPos > 1){
				pPos = parseInt(projects.settings.currPos)-1;
				pId = $element.find('div.item[pos='+pPos+']').attr('pid');
				//projects.show(pId);
				updateHash('projects/'+projects.settings.category+'/'+pId);
			}else{
				projects.hide();
				var cat = $element.prev().attr('cat');
				/*
				var pid = $element.prev().find('.grid .item:first-child').attr('pid');
				window.location.hash = 'projects/'+cat+'/'+pid;
				*/
				updateHash('projects/'+cat);
			}	
		}
    }
    $.fn.projectGrid = function(options) {
        return this.each(function() {
            if (undefined == $(this).data('projectGrid')) {
                var projects = new $.projectGrid(this, options);
                $(this).data('projectGrid', projects);
            }
        });
    }
})(jQuery);
/*
	Google Maps API
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on Google Maps API 3	

function GoogleMap(holder,center,overlay,bounds) {
	// Create an array of styles.
	var monochromeStyles = [{
		featureType: "poi",
		stylers: [
			{ hue: "#0077ff" },
			{ saturation: -97 },
			{ visibility: "off" }
		]
	},{
		featureType: "landscape",
		stylers: [
			{ saturation: -97 }
		]
	},{
		featureType: "water",
		stylers: [
			{ saturation: -100 }
		]
	},{
		featureType: "road",
		stylers: [
			{ saturation: -96 },
			{ lightness: 26 }
		]
	}];
	
	var locationMap = new google.maps.StyledMapType(monochromeStyles,{name: "Esser Design"});
	var esserOffice = new google.maps.LatLng(center[0],center[1]);
	var imageBounds = new google.maps.LatLngBounds(new google.maps.LatLng(bounds[0],bounds[1]),new google.maps.LatLng(bounds[2],bounds[3]));		
	var mapOptions = {
		zoom: 16,
		center: esserOffice,
		mapTypeControl: false,
		panControl: false,
		streetViewControl: false,
		scrollwheel: false,
		disableDoubleClickZoom: true,
		zoomControl: true,
		zoomControlOptions: {
		  style: google.maps.ZoomControlStyle.SMALL,
		  position: google.maps.ControlPosition.TOP_RIGHT
		},
		scaleControl: false
	};
	var map = new google.maps.Map(document.getElementById(holder),mapOptions);
	map.mapTypes.set('edmap', locationMap);
	map.setMapTypeId('edmap');		
	//Overlay
	var animatedMap = new google.maps.GroundOverlay(overlay,imageBounds);
	animatedMap.setMap(map);
}
*/
/*
	CookieMonster
	jquery.cookiemonster.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.4.2
	Copyright 2011. All Rights Reserved.	
*/
var CookieMonster={
	setCookie:function(name,value,days){
		if(days){
			var date = new Date();
			date.setTime(date.getTime()+(days*24*60*60*1000));
			var expires = "; expires="+date.toGMTString();
		}
		else var expires = "";
		document.cookie = name+"="+value+expires+"; path=/";
	},
	getCookie:function(name){
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	deleteCookie:function(name){
		CookieMonster.setCookie(name,"",-1);
	}	
};
/*
 * jQuery.ScrollTo - Easy element scrolling using jQuery.
 * Copyright (c) 2007-2009 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 5/25/2009
 * @author Ariel Flesler
 * @version 1.4.2
 * http://flesler.blogspot.com/2007/10/jqueryscrollto.html
 */
(function(d){var k=d.scrollTo=function(a,i,e){d(window).scrollTo(a,i,e)};k.defaults={axis:'xy',duration:parseFloat(d.fn.jquery)>=1.3?0:1};k.window=function(a){return d(window)._scrollable()};d.fn._scrollable=function(){return this.map(function(){var a=this,i=!a.nodeName||d.inArray(a.nodeName.toLowerCase(),['iframe','#document','html','body'])!=-1;if(!i)return a;var e=(a.contentWindow||a).document||a.ownerDocument||a;return d.browser.safari||e.compatMode=='BackCompat'?e.body:e.documentElement})};d.fn.scrollTo=function(n,j,b){if(typeof j=='object'){b=j;j=0}if(typeof b=='function')b={onAfter:b};if(n=='max')n=9e9;b=d.extend({},k.defaults,b);j=j||b.speed||b.duration;b.queue=b.queue&&b.axis.length>1;if(b.queue)j/=2;b.offset=p(b.offset);b.over=p(b.over);return this._scrollable().each(function(){var q=this,r=d(q),f=n,s,g={},u=r.is('html,body');switch(typeof f){case'number':case'string':if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(f)){f=p(f);break}f=d(f,this);case'object':if(f.is||f.style)s=(f=d(f)).offset()}d.each(b.axis.split(''),function(a,i){var e=i=='x'?'Left':'Top',h=e.toLowerCase(),c='scroll'+e,l=q[c],m=k.max(q,i);if(s){g[c]=s[h]+(u?0:l-r.offset()[h]);if(b.margin){g[c]-=parseInt(f.css('margin'+e))||0;g[c]-=parseInt(f.css('border'+e+'Width'))||0}g[c]+=b.offset[h]||0;if(b.over[h])g[c]+=f[i=='x'?'width':'height']()*b.over[h]}else{var o=f[h];g[c]=o.slice&&o.slice(-1)=='%'?parseFloat(o)/100*m:o}if(/^\d+$/.test(g[c]))g[c]=g[c]<=0?0:Math.min(g[c],m);if(!a&&b.queue){if(l!=g[c])t(b.onAfterFirst);delete g[c]}});t(b.onAfter);function t(a){r.animate(g,j,b.easing,a&&function(){a.call(this,n,b)})}}).end()};k.max=function(a,i){var e=i=='x'?'Width':'Height',h='scroll'+e;if(!d(a).is('html,body'))return a[h]-d(a)[e.toLowerCase()]();var c='client'+e,l=a.ownerDocument.documentElement,m=a.ownerDocument.body;return Math.max(l[h],m[h])-Math.min(l[c],m[c])};function p(a){return typeof a=='object'?a:{top:a,left:a}}})(jQuery);
/*
 * jQuery[a] - Animated scrolling of series
 * Copyright (c) 2007-2008 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * Date: 3/20/2008
 * @author Ariel Flesler
 * @version 1.2.1
 * http://flesler.blogspot.com/2008/02/jqueryserialscroll.html
 */
;(function($){var a='serialScroll',b='.'+a,c='bind',C=$[a]=function(b){$.scrollTo.window()[a](b)};C.defaults={duration:1e3,axis:'x',event:'click',start:0,step:1,lock:1,cycle:1,constant:1};$.fn[a]=function(y){y=$.extend({},C.defaults,y);var z=y.event,A=y.step,B=y.lazy;return this.each(function(){var j=y.target?this:document,k=$(y.target||this,j),l=k[0],m=y.items,o=y.start,p=y.interval,q=y.navigation,r;if(!B)m=w();if(y.force)t({},o);$(y.prev||[],j)[c](z,-A,s);$(y.next||[],j)[c](z,A,s);if(!l.ssbound)k[c]('prev'+b,-A,s)[c]('next'+b,A,s)[c]('goto'+b,t);if(p)k[c]('start'+b,function(e){if(!p){v();p=1;u()}})[c]('stop'+b,function(){v();p=0});k[c]('notify'+b,function(e,a){var i=x(a);if(i>-1)o=i});l.ssbound=1;if(y.jump)(B?k:w())[c](z,function(e){t(e,x(e.target))});if(q)q=$(q,j)[c](z,function(e){e.data=Math.round(w().length/q.length)*q.index(this);t(e,this)});function s(e){e.data+=o;t(e,this)};function t(e,a){if(!isNaN(a)){e.data=a;a=l}var c=e.data,n,d=e.type,f=y.exclude?w().slice(0,-y.exclude):w(),g=f.length,h=f[c],i=y.duration;if(d)e.preventDefault();if(p){v();r=setTimeout(u,y.interval)}if(!h){n=c<0?0:n=g-1;if(o!=n)c=n;else if(!y.cycle)return;else c=g-n-1;h=f[c]}if(!h||d&&o==c||y.lock&&k.is(':animated')||d&&y.onBefore&&y.onBefore.call(a,e,h,k,w(),c)===!1)return;if(y.stop)k.queue('fx',[]).stop();if(y.constant)i=Math.abs(i/A*(o-c));k.scrollTo(h,i,y).trigger('notify'+b,[c])};function u(){k.trigger('next'+b)};function v(){clearTimeout(r)};function w(){return $(m,l)};function x(a){if(!isNaN(a))return a;var b=w(),i;while((i=b.index(a))==-1&&a!=l)a=a.parentNode;return i}})}})(jQuery);
/*
 * Monkey patch jQuery 1.3.1+ to add support for setting or animating CSS
 * 2009-2010 Zachary Johnson www.zachstronaut.com
 * Updated 2010.11.06
 */
(function(a){function b(a){var b=["transform","WebkitTransform","msTransform","MozTransform","OTransform"];var c;while(c=b.shift()){if(typeof a.style[c]!="undefined"){return c}}return"transform"}var c=null;var d=a.fn.css;a.fn.css=function(e,f){if(c===null){if(typeof a.cssProps!="undefined"){c=a.cssProps}else if(typeof a.props!="undefined"){c=a.props}else{c={}}}if(typeof c["transform"]=="undefined"&&(e=="transform"||typeof e=="object"&&typeof e["transform"]!="undefined")){c["transform"]=b(this.get(0))}if(c["transform"]!="transform"){if(e=="transform"){e=c["transform"];if(typeof f=="undefined"&&jQuery.style){return jQuery.style(this.get(0),e)}}else if(typeof e=="object"&&typeof e["transform"]!="undefined"){e[c["transform"]]=e["transform"];delete e["transform"]}}return d.apply(this,arguments)}})(jQuery);
(function(a){var b="deg";a.fn.rotate=function(c){var d=a(this).css("transform")||"none";if(typeof c=="undefined"){if(d){var e=d.match(/rotate\(([^)]+)\)/);if(e&&e[1]){return e[1]}}return 0}var e=c.toString().match(/^(-?\d+(\.\d+)?)(.+)?$/);if(e){if(e[3]){b=e[3]}a(this).css("transform",d.replace(/none|rotate\([^)]*\)/,"")+"rotate("+e[1]+b+")")}return this};a.fn.scale=function(b,c,d){var e=a(this).css("transform");if(typeof b=="undefined"){if(e){var f=e.match(/scale\(([^)]+)\)/);if(f&&f[1]){return f[1]}}return 1}a(this).css("transform",e.replace(/none|scale\([^)]*\)/,"")+"scale("+b+")");return this};var c=a.fx.prototype.cur;a.fx.prototype.cur=function(){if(this.prop=="rotate"){return parseFloat(a(this.elem).rotate())}else if(this.prop=="scale"){return parseFloat(a(this.elem).scale())}return c.apply(this,arguments)};a.fx.step.rotate=function(c){a(c.elem).rotate(c.now+b)};a.fx.step.scale=function(b){a(b.elem).scale(b.now)};var d=a.fn.animate;a.fn.animate=function(a){if(typeof a["rotate"]!="undefined"){var c=a["rotate"].toString().match(/^(([+-]=)?(-?\d+(\.\d+)?))(.+)?$/);if(c&&c[5]){b=c[5]}a["rotate"]=c[1]}return d.apply(this,arguments)}})(jQuery);
/*
 * Lazy Load - jQuery plugin for lazy loading images
 * Copyright (c) 2007-2011 Mika Tuupola
 * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
 * Project home: http://www.appelsiini.com/projects/lazyload
 * Version:  1.6.0-dev
 */
(function(a){a.fn.lazyload=function(b){var c={threshold:0,failure_limit:0,event:"scroll",effect:"show",container:window,skip_invisible:!0};b&&(null!==b.failurelimit&&(b.failure_limit=b.failurelimit,delete b.failurelimit),a.extend(c,b));var d=this;return 0==c.event.indexOf("scroll")&&a(c.container).bind(c.event,function(b){var e=0;d.each(function(){if(c.skip_invisible&&!a(this).is(":visible"))return;if(!a.abovethetop(this,c)&&!a.leftofbegin(this,c))if(!a.belowthefold(this,c)&&!a.rightoffold(this,c))a(this).trigger("appear");else if(++e>c.failure_limit)return!1});var f=a.grep(d,function(a){return!a.loaded});d=a(f)}),this.each(function(){var b=this;b.loaded=!1,a(b).one("appear",function(){this.loaded||a("<img />").bind("load",function(){a(b).hide().attr("src",a(b).data("original"))[c.effect](c.effectspeed),b.loaded=!0}).attr("src",a(b).data("original"))}),0!=c.event.indexOf("scroll")&&a(b).bind(c.event,function(c){b.loaded||a(b).trigger("appear")})}),a(c.container).trigger(c.event),this},a.belowthefold=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).height()+a(window).scrollTop();else var d=a(c.container).offset().top+a(c.container).height();return d<=a(b).offset().top-c.threshold},a.rightoffold=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).width()+a(window).scrollLeft();else var d=a(c.container).offset().left+a(c.container).width();return d<=a(b).offset().left-c.threshold},a.abovethetop=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).scrollTop();else var d=a(c.container).offset().top;return d>=a(b).offset().top+c.threshold+a(b).height()},a.leftofbegin=function(b,c){if(c.container===undefined||c.container===window)var d=a(window).scrollLeft();else var d=a(c.container).offset().left;return d>=a(b).offset().left+c.threshold+a(b).width()},a.extend(a.expr[":"],{"below-the-fold":function(b){return a.belowthefold(b,{threshold:0,container:window})},"above-the-fold":function(b){return!a.belowthefold(b,{threshold:0,container:window})},"right-of-fold":function(b){return a.rightoffold(b,{threshold:0,container:window})},"left-of-fold":function(b){return!a.rightoffold(b,{threshold:0,container:window})}})})(jQuery);
/*
 * jQuery Cycle Plugin v2.9999
 * http://malsup.com/jquery/cycle
 */
(function(a,b){function s(b){function e(b){for(;b&&b.nodeName.toLowerCase()!="html";b=b.parentNode){var d=a.css(b,"background-color");if(d&&d.indexOf("rgb")>=0){var e=d.match(/\d+/g);return"#"+c(e[0])+c(e[1])+c(e[2])}if(d&&d!="transparent")return d}return"#ffffff"}function c(a){a=parseInt(a,10).toString(16);return a.length<2?"0"+a:a}d("applying clearType background-color hack");b.each(function(){a(this).css("background-color",e(this))})}function r(b,c){var d=a(c.pager);a.each(b,function(e,f){a.fn.cycle.createPagerAnchor(e,f,d,b,c)});c.updateActivePagerLink(c.pager,c.startingSlide,c.activePagerClass)}function q(b,c){var d=c?1:-1;var e=b.elements;var f=b.$cont[0],g=f.cycleTimeout;if(g){clearTimeout(g);f.cycleTimeout=0}if(b.random&&d<0){b.randomIndex--;if(--b.randomIndex==-2)b.randomIndex=e.length-2;else if(b.randomIndex==-1)b.randomIndex=e.length-1;b.nextSlide=b.randomMap[b.randomIndex]}else if(b.random){b.nextSlide=b.randomMap[b.randomIndex]}else{b.nextSlide=b.currSlide+d;if(b.nextSlide<0){if(b.nowrap)return false;b.nextSlide=e.length-1}else if(b.nextSlide>=e.length){if(b.nowrap)return false;b.nextSlide=0}}var h=b.onPrevNextEvent||b.prevNextClick;if(a.isFunction(h))h(d>0,b.nextSlide,e[b.nextSlide]);n(e,b,1,c);return false}function o(a,b,c,e){if(c.timeoutFn){var f=c.timeoutFn.call(a,a,b,c,e);while(c.fx!="none"&&f-c.speed<250)f+=c.speed;d("calculated timeout: "+f+"; speed: "+c.speed);if(f!==false)return f}return c.timeout}function n(c,e,f,g){function q(){var a=0,b=e.timeout;if(e.timeout&&!e.continuous){a=o(c[e.currSlide],c[e.nextSlide],e,g);if(e.fx=="shuffle")a-=e.speedOut}else if(e.continuous&&h.cyclePause)a=10;if(a>0)h.cycleTimeout=setTimeout(function(){n(c,e,0,!e.backwards)},a)}if(f&&e.busy&&e.manualTrump){d("manualTrump in go(), stopping active transition");a(c).stop(true,true);e.busy=0}if(e.busy){d("transition active, ignoring new tx request");return}var h=e.$cont[0],i=c[e.currSlide],j=c[e.nextSlide];if(h.cycleStop!=e.stopCount||h.cycleTimeout===0&&!f)return;if(!f&&!h.cyclePause&&!e.bounce&&(e.autostop&&--e.countdown<=0||e.nowrap&&!e.random&&e.nextSlide<e.currSlide)){if(e.end)e.end(e);return}var k=false;if((f||!h.cyclePause)&&e.nextSlide!=e.currSlide){k=true;var l=e.fx;i.cycleH=i.cycleH||a(i).height();i.cycleW=i.cycleW||a(i).width();j.cycleH=j.cycleH||a(j).height();j.cycleW=j.cycleW||a(j).width();if(e.multiFx){if(g&&(e.lastFx==b||++e.lastFx>=e.fxs.length))e.lastFx=0;else if(!g&&(e.lastFx==b||--e.lastFx<0))e.lastFx=e.fxs.length-1;l=e.fxs[e.lastFx]}if(e.oneTimeFx){l=e.oneTimeFx;e.oneTimeFx=null}a.fn.cycle.resetState(e,l);if(e.before.length)a.each(e.before,function(a,b){if(h.cycleStop!=e.stopCount)return;b.apply(j,[i,j,e,g])});var m=function(){e.busy=0;a.each(e.after,function(a,b){if(h.cycleStop!=e.stopCount)return;b.apply(j,[i,j,e,g])});if(!h.cycleStop){q()}};d("tx firing("+l+"); currSlide: "+e.currSlide+"; nextSlide: "+e.nextSlide);e.busy=1;if(e.fxFn)e.fxFn(i,j,e,m,g,f&&e.fastOnEvent);else if(a.isFunction(a.fn.cycle[e.fx]))a.fn.cycle[e.fx](i,j,e,m,g,f&&e.fastOnEvent);else a.fn.cycle.custom(i,j,e,m,g,f&&e.fastOnEvent)}else{q()}if(k||e.nextSlide==e.currSlide){e.lastSlide=e.currSlide;if(e.random){e.currSlide=e.nextSlide;if(++e.randomIndex==c.length){e.randomIndex=0;e.randomMap.sort(function(a,b){return Math.random()-.5})}e.nextSlide=e.randomMap[e.randomIndex];if(e.nextSlide==e.currSlide)e.nextSlide=e.currSlide==e.slideCount-1?0:e.currSlide+1}else if(e.backwards){var p=e.nextSlide-1<0;if(p&&e.bounce){e.backwards=!e.backwards;e.nextSlide=1;e.currSlide=0}else{e.nextSlide=p?c.length-1:e.nextSlide-1;e.currSlide=p?0:e.nextSlide+1}}else{var p=e.nextSlide+1==c.length;if(p&&e.bounce){e.backwards=!e.backwards;e.nextSlide=c.length-2;e.currSlide=c.length-1}else{e.nextSlide=p?0:e.nextSlide+1;e.currSlide=p?c.length-1:e.nextSlide-1}}}if(k&&e.pager)e.updateActivePagerLink(e.pager,e.currSlide,e.activePagerClass)}function m(b,c){b.addSlide=function(d,e){var f=a(d),g=f[0];if(!b.autostopCount)b.countdown++;c[e?"unshift":"push"](g);if(b.els)b.els[e?"unshift":"push"](g);b.slideCount=c.length;if(b.random){b.randomMap.push(b.slideCount-1);b.randomMap.sort(function(a,b){return Math.random()-.5})}f.css("position","absolute");f[e?"prependTo":"appendTo"](b.$cont);if(e){b.currSlide++;b.nextSlide++}if(!a.support.opacity&&b.cleartype&&!b.cleartypeNoBg)s(f);if(b.fit&&b.width)f.width(b.width);if(b.fit&&b.height&&b.height!="auto")f.height(b.height);g.cycleH=b.fit&&b.height?b.height:f.height();g.cycleW=b.fit&&b.width?b.width:f.width();f.css(b.cssBefore);if(b.pager||b.pagerAnchorBuilder)a.fn.cycle.createPagerAnchor(c.length-1,g,a(b.pager),c,b);if(a.isFunction(b.onAddSlide))b.onAddSlide(f);else f.hide()}}function l(b){var c,f,g=a.fn.cycle.transitions;if(b.fx.indexOf(",")>0){b.multiFx=true;b.fxs=b.fx.replace(/\s*/g,"").split(",");for(c=0;c<b.fxs.length;c++){var h=b.fxs[c];f=g[h];if(!f||!g.hasOwnProperty(h)||!a.isFunction(f)){e("discarding unknown transition: ",h);b.fxs.splice(c,1);c--}}if(!b.fxs.length){e("No valid transitions named; slideshow terminating.");return false}}else if(b.fx=="all"){b.multiFx=true;b.fxs=[];for(p in g){f=g[p];if(g.hasOwnProperty(p)&&a.isFunction(f))b.fxs.push(p)}}if(b.multiFx&&b.randomizeEffects){var i=Math.floor(Math.random()*20)+30;for(c=0;c<i;c++){var j=Math.floor(Math.random()*b.fxs.length);b.fxs.push(b.fxs.splice(j,1)[0])}d("randomized fx sequence: ",b.fxs)}return true}function k(b){b.original={before:[],after:[]};b.original.cssBefore=a.extend({},b.cssBefore);b.original.cssAfter=a.extend({},b.cssAfter);b.original.animIn=a.extend({},b.animIn);b.original.animOut=a.extend({},b.animOut);a.each(b.before,function(){b.original.before.push(this)});a.each(b.after,function(){b.original.after.push(this)})}function j(c,d,g,i,j){var o;var p=a.extend({},a.fn.cycle.defaults,i||{},a.metadata?c.metadata():a.meta?c.data():{});var t=a.isFunction(c.data)?c.data(p.metaAttr):null;if(t)p=a.extend(p,t);if(p.autostop)p.countdown=p.autostopCount||g.length;var u=c[0];c.data("cycle.opts",p);p.$cont=c;p.stopCount=u.cycleStop;p.elements=g;p.before=p.before?[p.before]:[];p.after=p.after?[p.after]:[];if(!a.support.opacity&&p.cleartype)p.after.push(function(){h(this,p)});if(p.continuous)p.after.push(function(){n(g,p,0,!p.backwards)});k(p);if(!a.support.opacity&&p.cleartype&&!p.cleartypeNoBg)s(d);if(c.css("position")=="static")c.css("position","relative");if(p.width)c.width(p.width);if(p.height&&p.height!="auto")c.height(p.height);if(p.startingSlide!=b){p.startingSlide=parseInt(p.startingSlide,10);if(p.startingSlide>=g.length||p.startSlide<0)p.startingSlide=0;else o=true}else if(p.backwards)p.startingSlide=g.length-1;else p.startingSlide=0;if(p.random){p.randomMap=[];for(var v=0;v<g.length;v++)p.randomMap.push(v);p.randomMap.sort(function(a,b){return Math.random()-.5});if(o){for(var w=0;w<g.length;w++){if(p.startingSlide==p.randomMap[w]){p.randomIndex=w}}}else{p.randomIndex=1;p.startingSlide=p.randomMap[1]}}else if(p.startingSlide>=g.length)p.startingSlide=0;p.currSlide=p.startingSlide||0;var x=p.startingSlide;d.css({position:"absolute",top:0,left:0}).hide().each(function(b){var c;if(p.backwards)c=x?b<=x?g.length+(b-x):x-b:g.length-b;else c=x?b>=x?g.length-(b-x):x-b:g.length-b;a(this).css("z-index",c)});a(g[x]).css("opacity",1).show();h(g[x],p);if(p.fit){if(!p.aspect){if(p.width)d.width(p.width);if(p.height&&p.height!="auto")d.height(p.height)}else{d.each(function(){var b=a(this);var c=p.aspect===true?b.width()/b.height():p.aspect;if(p.width&&b.width()!=p.width){b.width(p.width);b.height(p.width/c)}if(p.height&&b.height()<p.height){b.height(p.height);b.width(p.height*c)}})}}if(p.center&&(!p.fit||p.aspect)){d.each(function(){var b=a(this);b.css({"margin-left":p.width?(p.width-b.width())/2+"px":0,"margin-top":p.height?(p.height-b.height())/2+"px":0})})}if(p.center&&!p.fit&&!p.slideResize){d.each(function(){var b=a(this);b.css({"margin-left":p.width?(p.width-b.width())/2+"px":0,"margin-top":p.height?(p.height-b.height())/2+"px":0})})}var y=p.containerResize&&!c.innerHeight();if(y){var z=0,A=0;for(var B=0;B<g.length;B++){var C=a(g[B]),D=C[0],E=C.outerWidth(),F=C.outerHeight();if(!E)E=D.offsetWidth||D.width||C.attr("width");if(!F)F=D.offsetHeight||D.height||C.attr("height");z=E>z?E:z;A=F>A?F:A}if(z>0&&A>0)c.css({width:z+"px",height:A+"px"})}var G=false;if(p.pause)c.hover(function(){G=true;this.cyclePause++;f(u,true)},function(){G&&this.cyclePause--;f(u,true)});if(l(p)===false)return false;var H=false;i.requeueAttempts=i.requeueAttempts||0;d.each(function(){var b=a(this);this.cycleH=p.fit&&p.height?p.height:b.height()||this.offsetHeight||this.height||b.attr("height")||0;this.cycleW=p.fit&&p.width?p.width:b.width()||this.offsetWidth||this.width||b.attr("width")||0;if(b.is("img")){var c=a.browser.msie&&this.cycleW==28&&this.cycleH==30&&!this.complete;var d=a.browser.mozilla&&this.cycleW==34&&this.cycleH==19&&!this.complete;var f=a.browser.opera&&(this.cycleW==42&&this.cycleH==19||this.cycleW==37&&this.cycleH==17)&&!this.complete;var g=this.cycleH==0&&this.cycleW==0&&!this.complete;if(c||d||f||g){if(j.s&&p.requeueOnImageNotLoaded&&++i.requeueAttempts<100){e(i.requeueAttempts," - img slide not loaded, requeuing slideshow: ",this.src,this.cycleW,this.cycleH);setTimeout(function(){a(j.s,j.c).cycle(i)},p.requeueTimeout);H=true;return false}else{e("could not determine size of image: "+this.src,this.cycleW,this.cycleH)}}}return true});if(H)return false;p.cssBefore=p.cssBefore||{};p.cssAfter=p.cssAfter||{};p.cssFirst=p.cssFirst||{};p.animIn=p.animIn||{};p.animOut=p.animOut||{};d.not(":eq("+x+")").css(p.cssBefore);a(d[x]).css(p.cssFirst);if(p.timeout){p.timeout=parseInt(p.timeout,10);if(p.speed.constructor==String)p.speed=a.fx.speeds[p.speed]||parseInt(p.speed,10);if(!p.sync)p.speed=p.speed/2;var I=p.fx=="none"?0:p.fx=="shuffle"?500:250;while(p.timeout-p.speed<I)p.timeout+=p.speed}if(p.easing)p.easeIn=p.easeOut=p.easing;if(!p.speedIn)p.speedIn=p.speed;if(!p.speedOut)p.speedOut=p.speed;p.slideCount=g.length;p.currSlide=p.lastSlide=x;if(p.random){if(++p.randomIndex==g.length)p.randomIndex=0;p.nextSlide=p.randomMap[p.randomIndex]}else if(p.backwards)p.nextSlide=p.startingSlide==0?g.length-1:p.startingSlide-1;else p.nextSlide=p.startingSlide>=g.length-1?0:p.startingSlide+1;if(!p.multiFx){var J=a.fn.cycle.transitions[p.fx];if(a.isFunction(J))J(c,d,p);else if(p.fx!="custom"&&!p.multiFx){e("unknown transition: "+p.fx,"; slideshow terminating");return false}}var K=d[x];if(!p.skipInitializationCallbacks){if(p.before.length)p.before[0].apply(K,[K,K,p,true]);if(p.after.length)p.after[0].apply(K,[K,K,p,true])}if(p.next)a(p.next).bind(p.prevNextEvent,function(){return q(p,1)});if(p.prev)a(p.prev).bind(p.prevNextEvent,function(){return q(p,0)});if(p.pager||p.pagerAnchorBuilder)r(g,p);m(p,g);return p}function i(b){if(b.next)a(b.next).unbind(b.prevNextEvent);if(b.prev)a(b.prev).unbind(b.prevNextEvent);if(b.pager||b.pagerAnchorBuilder)a.each(b.pagerAnchors||[],function(){this.unbind().remove()});b.pagerAnchors=null;if(b.destroy)b.destroy(b)}function h(b,c){if(!a.support.opacity&&c.cleartype&&b.style.filter){try{b.style.removeAttribute("filter")}catch(d){}}}function g(c,d,g){function k(b,c,d){if(!b&&c===true){var f=a(d).data("cycle.opts");if(!f){e("options not found, can not resume");return false}if(d.cycleTimeout){clearTimeout(d.cycleTimeout);d.cycleTimeout=0}n(f.elements,f,1,!f.backwards)}}if(c.cycleStop==b)c.cycleStop=0;if(d===b||d===null)d={};if(d.constructor==String){switch(d){case"destroy":case"stop":var h=a(c).data("cycle.opts");if(!h)return false;c.cycleStop++;if(c.cycleTimeout)clearTimeout(c.cycleTimeout);c.cycleTimeout=0;h.elements&&a(h.elements).stop();a(c).removeData("cycle.opts");if(d=="destroy")i(h);return false;case"toggle":c.cyclePause=c.cyclePause===1?0:1;k(c.cyclePause,g,c);f(c);return false;case"pause":c.cyclePause=1;f(c);return false;case"resume":c.cyclePause=0;k(false,g,c);f(c);return false;case"prev":case"next":var h=a(c).data("cycle.opts");if(!h){e('options not found, "prev/next" ignored');return false}a.fn.cycle[d](h);return false;default:d={fx:d}}return d}else if(d.constructor==Number){var j=d;d=a(c).data("cycle.opts");if(!d){e("options not found, can not advance slide");return false}if(j<0||j>=d.elements.length){e("invalid slide index: "+j);return false}d.nextSlide=j;if(c.cycleTimeout){clearTimeout(c.cycleTimeout);c.cycleTimeout=0}if(typeof g=="string")d.oneTimeFx=g;n(d.elements,d,1,j>=d.currSlide);return false}return d}function f(b,c,d){var e=a(b).data("cycle.opts");var f=!!b.cyclePause;if(f&&e.paused)e.paused(b,e,c,d);else if(!f&&e.resumed)e.resumed(b,e,c,d)}function e(){window.console&&console.log&&console.log("[cycle] "+Array.prototype.join.call(arguments," "))}function d(b){a.fn.cycle.debug&&e(b)}var c="2.9999";if(a.support==b){a.support={opacity:!a.browser.msie}}a.expr[":"].paused=function(a){return a.cyclePause};a.fn.cycle=function(b,c){var f={s:this.selector,c:this.context};if(this.length===0&&b!="stop"){if(!a.isReady&&f.s){e("DOM not ready, queuing slideshow");a(function(){a(f.s,f.c).cycle(b,c)});return this}e("terminating; zero elements found by selector"+(a.isReady?"":" (DOM not ready)"));return this}return this.each(function(){var h=g(this,b,c);if(h===false)return;h.updateActivePagerLink=h.updateActivePagerLink||a.fn.cycle.updateActivePagerLink;if(this.cycleTimeout)clearTimeout(this.cycleTimeout);this.cycleTimeout=this.cyclePause=0;var i=a(this);var k=h.slideExpr?a(h.slideExpr,this):i.children();var l=k.get();var m=j(i,k,l,h,f);if(m===false)return;if(l.length<2){e("terminating; too few slides: "+l.length);return}var p=m.continuous?10:o(l[m.currSlide],l[m.nextSlide],m,!m.backwards);if(p){p+=m.delay||0;if(p<10)p=10;d("first timeout: "+p);this.cycleTimeout=setTimeout(function(){n(l,m,0,!h.backwards)},p)}})};a.fn.cycle.resetState=function(b,c){c=c||b.fx;b.before=[];b.after=[];b.cssBefore=a.extend({},b.original.cssBefore);b.cssAfter=a.extend({},b.original.cssAfter);b.animIn=a.extend({},b.original.animIn);b.animOut=a.extend({},b.original.animOut);b.fxFn=null;a.each(b.original.before,function(){b.before.push(this)});a.each(b.original.after,function(){b.after.push(this)});var d=a.fn.cycle.transitions[c];if(a.isFunction(d))d(b.$cont,a(b.elements),b)};a.fn.cycle.updateActivePagerLink=function(b,c,d){a(b).each(function(){a(this).children().removeClass(d).eq(c).addClass(d)})};a.fn.cycle.next=function(a){q(a,1)};a.fn.cycle.prev=function(a){q(a,0)};a.fn.cycle.createPagerAnchor=function(b,c,e,g,h){var i;if(a.isFunction(h.pagerAnchorBuilder)){i=h.pagerAnchorBuilder(b,c);d("pagerAnchorBuilder("+b+", el) returned: "+i)}else i='<a href="#">'+(b+1)+"</a>";if(!i)return;var j=a(i);if(j.parents("body").length===0){var k=[];if(e.length>1){e.each(function(){var b=j.clone(true);a(this).append(b);k.push(b[0])});j=a(k)}else{j.appendTo(e)}}h.pagerAnchors=h.pagerAnchors||[];h.pagerAnchors.push(j);var l=function(c){c.preventDefault();h.nextSlide=b;var d=h.$cont[0],e=d.cycleTimeout;if(e){clearTimeout(e);d.cycleTimeout=0}var f=h.onPagerEvent||h.pagerClick;if(a.isFunction(f))f(h.nextSlide,g[h.nextSlide]);n(g,h,1,h.currSlide<b)};if(/mouseenter|mouseover/i.test(h.pagerEvent)){j.hover(l,function(){})}else{j.bind(h.pagerEvent,l)}if(!/^click/.test(h.pagerEvent)&&!h.allowPagerClickBubble)j.bind("click.cycle",function(){return false});var m=h.$cont[0];var o=false;if(h.pauseOnPagerHover){j.hover(function(){o=true;m.cyclePause++;f(m,true,true)},function(){o&&m.cyclePause--;f(m,true,true)})}};a.fn.cycle.hopsFromLast=function(a,b){var c,d=a.lastSlide,e=a.currSlide;if(b)c=e>d?e-d:a.slideCount-d;else c=e<d?d-e:d+a.slideCount-e;return c};a.fn.cycle.commonReset=function(b,c,d,e,f,g){a(d.elements).not(b).hide();if(typeof d.cssBefore.opacity=="undefined")d.cssBefore.opacity=1;d.cssBefore.display="block";if(d.slideResize&&e!==false&&c.cycleW>0)d.cssBefore.width=c.cycleW;if(d.slideResize&&f!==false&&c.cycleH>0)d.cssBefore.height=c.cycleH;d.cssAfter=d.cssAfter||{};d.cssAfter.display="none";a(b).css("zIndex",d.slideCount+(g===true?1:0));a(c).css("zIndex",d.slideCount+(g===true?0:1))};a.fn.cycle.custom=function(b,c,d,e,f,g){var h=a(b),i=a(c);var j=d.speedIn,k=d.speedOut,l=d.easeIn,m=d.easeOut;i.css(d.cssBefore);if(g){if(typeof g=="number")j=k=g;else j=k=1;l=m=null}var n=function(){i.animate(d.animIn,j,l,function(){e()})};h.animate(d.animOut,k,m,function(){h.css(d.cssAfter);if(!d.sync)n()});if(d.sync)n()};a.fn.cycle.transitions={fade:function(b,c,d){c.not(":eq("+d.currSlide+")").css("opacity",0);d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.cssBefore.opacity=0});d.animIn={opacity:1};d.animOut={opacity:0};d.cssBefore={top:0,left:0}}};a.fn.cycle.ver=function(){return c};a.fn.cycle.defaults={activePagerClass:"activeSlide",after:null,allowPagerClickBubble:false,animIn:null,animOut:null,aspect:false,autostop:0,autostopCount:0,backwards:false,before:null,center:null,cleartype:!a.support.opacity,cleartypeNoBg:false,containerResize:1,continuous:0,cssAfter:null,cssBefore:null,delay:0,easeIn:null,easeOut:null,easing:null,end:null,fastOnEvent:0,fit:0,fx:"fade",fxFn:null,height:"auto",manualTrump:true,metaAttr:"cycle",next:null,nowrap:0,onPagerEvent:null,onPrevNextEvent:null,pager:null,pagerAnchorBuilder:null,pagerEvent:"click.cycle",pause:0,pauseOnPagerHover:0,prev:null,prevNextEvent:"click.cycle",random:0,randomizeEffects:1,requeueOnImageNotLoaded:true,requeueTimeout:250,rev:0,shuffle:null,skipInitializationCallbacks:false,slideExpr:null,slideResize:1,speed:1e3,speedIn:null,speedOut:null,startingSlide:b,sync:1,timeout:4e3,timeoutFn:null,updateActivePagerLink:null,width:null}})(jQuery);(function(a){a.fn.cycle.transitions.none=function(b,c,d){d.fxFn=function(b,c,d,e){a(c).show();a(b).hide();e()}};a.fn.cycle.transitions.fadeout=function(b,c,d){c.not(":eq("+d.currSlide+")").css({display:"block",opacity:1});d.before.push(function(b,c,d,e,f,g){a(b).css("zIndex",d.slideCount+(!g===true?1:0));a(c).css("zIndex",d.slideCount+(!g===true?0:1))});d.animIn.opacity=1;d.animOut.opacity=0;d.cssBefore.opacity=1;d.cssBefore.display="block";d.cssAfter.zIndex=0};a.fn.cycle.transitions.scrollUp=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.height();d.cssBefore.top=e;d.cssBefore.left=0;d.cssFirst.top=0;d.animIn.top=0;d.animOut.top=-e};a.fn.cycle.transitions.scrollDown=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.height();d.cssFirst.top=0;d.cssBefore.top=-e;d.cssBefore.left=0;d.animIn.top=0;d.animOut.top=e};a.fn.cycle.transitions.scrollLeft=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.width();d.cssFirst.left=0;d.cssBefore.left=e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=0-e};a.fn.cycle.transitions.scrollRight=function(b,c,d){b.css("overflow","hidden");d.before.push(a.fn.cycle.commonReset);var e=b.width();d.cssFirst.left=0;d.cssBefore.left=-e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=e};a.fn.cycle.transitions.scrollHorz=function(b,c,d){b.css("overflow","hidden").width();d.before.push(function(b,c,d,e){if(d.rev)e=!e;a.fn.cycle.commonReset(b,c,d);d.cssBefore.left=e?c.cycleW-1:1-c.cycleW;d.animOut.left=e?-b.cycleW:b.cycleW});d.cssFirst.left=0;d.cssBefore.top=0;d.animIn.left=0;d.animOut.top=0};a.fn.cycle.transitions.scrollVert=function(b,c,d){b.css("overflow","hidden");d.before.push(function(b,c,d,e){if(d.rev)e=!e;a.fn.cycle.commonReset(b,c,d);d.cssBefore.top=e?1-c.cycleH:c.cycleH-1;d.animOut.top=e?b.cycleH:-b.cycleH});d.cssFirst.top=0;d.cssBefore.left=0;d.animIn.top=0;d.animOut.left=0};a.fn.cycle.transitions.slideX=function(b,c,d){d.before.push(function(b,c,d){a(d.elements).not(b).hide();a.fn.cycle.commonReset(b,c,d,false,true);d.animIn.width=c.cycleW});d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.width=0;d.animIn.width="show";d.animOut.width=0};a.fn.cycle.transitions.slideY=function(b,c,d){d.before.push(function(b,c,d){a(d.elements).not(b).hide();a.fn.cycle.commonReset(b,c,d,true,false);d.animIn.height=c.cycleH});d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.height=0;d.animIn.height="show";d.animOut.height=0};a.fn.cycle.transitions.shuffle=function(b,c,d){var e,f=b.css("overflow","visible").width();c.css({left:0,top:0});d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true)});if(!d.speedAdjusted){d.speed=d.speed/2;d.speedAdjusted=true}d.random=0;d.shuffle=d.shuffle||{left:-f,top:15};d.els=[];for(e=0;e<c.length;e++)d.els.push(c[e]);for(e=0;e<d.currSlide;e++)d.els.push(d.els.shift());d.fxFn=function(b,c,d,e,f){if(d.rev)f=!f;var g=f?a(b):a(c);a(c).css(d.cssBefore);var h=d.slideCount;g.animate(d.shuffle,d.speedIn,d.easeIn,function(){var c=a.fn.cycle.hopsFromLast(d,f);for(var i=0;i<c;i++)f?d.els.push(d.els.shift()):d.els.unshift(d.els.pop());if(f){for(var j=0,k=d.els.length;j<k;j++)a(d.els[j]).css("z-index",k-j+h)}else{var l=a(b).css("z-index");g.css("z-index",parseInt(l,10)+1+h)}g.animate({left:0,top:0},d.speedOut,d.easeOut,function(){a(f?this:b).hide();if(e)e()})})};a.extend(d.cssBefore,{display:"block",opacity:1,top:0,left:0})};a.fn.cycle.transitions.turnUp=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.cssBefore.top=c.cycleH;d.animIn.height=c.cycleH;d.animOut.width=c.cycleW});d.cssFirst.top=0;d.cssBefore.left=0;d.cssBefore.height=0;d.animIn.top=0;d.animOut.height=0};a.fn.cycle.transitions.turnDown=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssFirst.top=0;d.cssBefore.left=0;d.cssBefore.top=0;d.cssBefore.height=0;d.animOut.height=0};a.fn.cycle.transitions.turnLeft=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.cssBefore.left=c.cycleW;d.animIn.width=c.cycleW});d.cssBefore.top=0;d.cssBefore.width=0;d.animIn.left=0;d.animOut.width=0};a.fn.cycle.transitions.turnRight=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.animIn.width=c.cycleW;d.animOut.left=b.cycleW});a.extend(d.cssBefore,{top:0,left:0,width:0});d.animIn.left=0;d.animOut.width=0};a.fn.cycle.transitions.zoom=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,false,true);d.cssBefore.top=c.cycleH/2;d.cssBefore.left=c.cycleW/2;a.extend(d.animIn,{top:0,left:0,width:c.cycleW,height:c.cycleH});a.extend(d.animOut,{width:0,height:0,top:b.cycleH/2,left:b.cycleW/2})});d.cssFirst.top=0;d.cssFirst.left=0;d.cssBefore.width=0;d.cssBefore.height=0};a.fn.cycle.transitions.fadeZoom=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,false);d.cssBefore.left=c.cycleW/2;d.cssBefore.top=c.cycleH/2;a.extend(d.animIn,{top:0,left:0,width:c.cycleW,height:c.cycleH})});d.cssBefore.width=0;d.cssBefore.height=0;d.animOut.opacity=0};a.fn.cycle.transitions.blindX=function(b,c,d){var e=b.css("overflow","hidden").width();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.width=c.cycleW;d.animOut.left=b.cycleW});d.cssBefore.left=e;d.cssBefore.top=0;d.animIn.left=0;d.animOut.left=e};a.fn.cycle.transitions.blindY=function(b,c,d){var e=b.css("overflow","hidden").height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssBefore.top=e;d.cssBefore.left=0;d.animIn.top=0;d.animOut.top=e};a.fn.cycle.transitions.blindZ=function(b,c,d){var e=b.css("overflow","hidden").height();var f=b.width();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);d.animIn.height=c.cycleH;d.animOut.top=b.cycleH});d.cssBefore.top=e;d.cssBefore.left=f;d.animIn.top=0;d.animIn.left=0;d.animOut.top=e;d.animOut.left=f};a.fn.cycle.transitions.growX=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true);d.cssBefore.left=this.cycleW/2;d.animIn.left=0;d.animIn.width=this.cycleW;d.animOut.left=0});d.cssBefore.top=0;d.cssBefore.width=0};a.fn.cycle.transitions.growY=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false);d.cssBefore.top=this.cycleH/2;d.animIn.top=0;d.animIn.height=this.cycleH;d.animOut.top=0});d.cssBefore.height=0;d.cssBefore.left=0};a.fn.cycle.transitions.curtainX=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,false,true,true);d.cssBefore.left=c.cycleW/2;d.animIn.left=0;d.animIn.width=this.cycleW;d.animOut.left=b.cycleW/2;d.animOut.width=0});d.cssBefore.top=0;d.cssBefore.width=0};a.fn.cycle.transitions.curtainY=function(b,c,d){d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,false,true);d.cssBefore.top=c.cycleH/2;d.animIn.top=0;d.animIn.height=c.cycleH;d.animOut.top=b.cycleH/2;d.animOut.height=0});d.cssBefore.height=0;d.cssBefore.left=0};a.fn.cycle.transitions.cover=function(b,c,d){var e=d.direction||"left";var f=b.css("overflow","hidden").width();var g=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d);if(e=="right")d.cssBefore.left=-f;else if(e=="up")d.cssBefore.top=g;else if(e=="down")d.cssBefore.top=-g;else d.cssBefore.left=f});d.animIn.left=0;d.animIn.top=0;d.cssBefore.top=0;d.cssBefore.left=0};a.fn.cycle.transitions.uncover=function(b,c,d){var e=d.direction||"left";var f=b.css("overflow","hidden").width();var g=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true);if(e=="right")d.animOut.left=f;else if(e=="up")d.animOut.top=-g;else if(e=="down")d.animOut.top=g;else d.animOut.left=-f});d.animIn.left=0;d.animIn.top=0;d.cssBefore.top=0;d.cssBefore.left=0};a.fn.cycle.transitions.toss=function(b,c,d){var e=b.css("overflow","visible").width();var f=b.height();d.before.push(function(b,c,d){a.fn.cycle.commonReset(b,c,d,true,true,true);if(!d.animOut.left&&!d.animOut.top)a.extend(d.animOut,{left:e*2,top:-f/2,opacity:0});else d.animOut.opacity=0});d.cssBefore.left=0;d.cssBefore.top=0;d.animIn.left=0};a.fn.cycle.transitions.wipe=function(b,c,d){var e=b.css("overflow","hidden").width();var f=b.height();d.cssBefore=d.cssBefore||{};var g;if(d.clip){if(/l2r/.test(d.clip))g="rect(0px 0px "+f+"px 0px)";else if(/r2l/.test(d.clip))g="rect(0px "+e+"px "+f+"px "+e+"px)";else if(/t2b/.test(d.clip))g="rect(0px "+e+"px 0px 0px)";else if(/b2t/.test(d.clip))g="rect("+f+"px "+e+"px "+f+"px 0px)";else if(/zoom/.test(d.clip)){var h=parseInt(f/2,10);var i=parseInt(e/2,10);g="rect("+h+"px "+i+"px "+h+"px "+i+"px)"}}d.cssBefore.clip=d.cssBefore.clip||g||"rect(0px 0px 0px 0px)";var j=d.cssBefore.clip.match(/(\d+)/g);var k=parseInt(j[0],10),l=parseInt(j[1],10),m=parseInt(j[2],10),n=parseInt(j[3],10);d.before.push(function(b,c,d){if(b==c)return;var g=a(b),h=a(c);a.fn.cycle.commonReset(b,c,d,true,true,false);d.cssAfter.display="block";var i=1,j=parseInt(d.speedIn/13,10)-1;(function o(){var a=k?k-parseInt(i*(k/j),10):0;var b=n?n-parseInt(i*(n/j),10):0;var c=m<f?m+parseInt(i*((f-m)/j||1),10):f;var d=l<e?l+parseInt(i*((e-l)/j||1),10):e;h.css({clip:"rect("+a+"px "+d+"px "+c+"px "+b+"px)"});i++<=j?setTimeout(o,13):g.css("display","none")})()});a.extend(d.cssBefore,{display:"block",opacity:1,top:0,left:0});d.animIn={left:0};d.animOut={left:0}}})(jQuery);
/*
 * Color animation jQuery-plugin
 * http://www.bitstorm.org/jquery/color-animation/
 * Copyright 2011 Edwin Martin <edwin@bitstorm.org>
 * Released under the MIT and GPL licenses.
*/
(function(d){function i(){var b=d("script:first"),a=b.css("color"),c=false;if(/^rgba/.test(a))c=true;else try{c=a!=b.css("color","rgba(0, 0, 0, 0.5)").css("color");b.css("color",a)}catch(e){}return c}function g(b,a,c){var e="rgb"+(d.support.rgba?"a":"")+"("+parseInt(b[0]+c*(a[0]-b[0]),10)+","+parseInt(b[1]+c*(a[1]-b[1]),10)+","+parseInt(b[2]+c*(a[2]-b[2]),10);if(d.support.rgba)e+=","+(b&&a?parseFloat(b[3]+c*(a[3]-b[3])):1);e+=")";return e}function f(b){var a,c;if(a=/#([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})/.exec(b))c=
[parseInt(a[1],16),parseInt(a[2],16),parseInt(a[3],16),1];else if(a=/#([0-9a-fA-F])([0-9a-fA-F])([0-9a-fA-F])/.exec(b))c=[parseInt(a[1],16)*17,parseInt(a[2],16)*17,parseInt(a[3],16)*17,1];else if(a=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(b))c=[parseInt(a[1]),parseInt(a[2]),parseInt(a[3]),1];else if(a=/rgba\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9\.]*)\s*\)/.exec(b))c=[parseInt(a[1],10),parseInt(a[2],10),parseInt(a[3],10),parseFloat(a[4])];return c}
d.extend(true,d,{support:{rgba:i()}});var h=["color","backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","outlineColor"];d.each(h,function(b,a){d.fx.step[a]=function(c){if(!c.init){c.a=f(d(c.elem).css(a));c.end=f(c.end);c.init=true}c.elem.style[a]=g(c.a,c.end,c.pos)}});d.fx.step.borderColor=function(b){if(!b.init)b.end=f(b.end);var a=h.slice(2,6);d.each(a,function(c,e){b.init||(b[e]={a:f(d(b.elem).css(e))});b.elem.style[e]=g(b[e].a,b.end,b.pos)});b.init=true}})(jQuery);
/*
 * jQuery hashchange event - v1.3 - 7/21/2010
 * http://benalman.com/projects/jquery-hashchange-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
;(function($,e,b){var c="hashchange",h=document,f,g=$.event.special,i=h.documentMode,d="on"+c in e&&(i===b||i>7);function a(j){j=j||location.href;return"#"+j.replace(/^[^#]*#?(.*)$/,"$1")}$.fn[c]=function(j){return j?this.bind(c,j):this.trigger(c)};$.fn[c].delay=50;g[c]=$.extend(g[c],{setup:function(){if(d){return false}$(f.start)},teardown:function(){if(d){return false}$(f.stop)}});f=(function(){var j={},p,m=a(),k=function(q){return q},l=k,o=k;j.start=function(){p||n()};j.stop=function(){p&&clearTimeout(p);p=b};function n(){var r=a(),q=o(m);if(r!==m){l(m=r,q);$(e).trigger(c)}else{if(q!==m){location.href=location.href.replace(/#.*/,"")+q}}p=setTimeout(n,$.fn[c].delay)}$.browser.msie&&!d&&(function(){var q,r;j.start=function(){if(!q){r=$.fn[c].src;r=r&&r+a();q=$('<iframe tabindex="-1" title="empty"/>').hide().one("load",function(){r||l(a());n()}).attr("src",r||"javascript:0").insertAfter("body")[0].contentWindow;h.onpropertychange=function(){try{if(event.propertyName==="title"){q.document.title=h.title}}catch(s){}}}};j.stop=k;o=function(){return a(q.location.href)};l=function(v,s){var u=q.document,t=$.fn[c].domain;if(v!==s){u.title=h.title;u.open();t&&u.write('<script>document.domain="'+t+'"<\/script>');u.close();q.location.hash=v}}})();return j})()})(jQuery,this);

