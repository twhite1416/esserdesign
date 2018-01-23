/*
	theme - ESSER DESIGN 2012
	scripts.js
	built by Esser Design - Jason Geiger (@jasonjgeiger)
	built on Javascript standards
	relies on jQuery 1.7
    
	Copyright 2012. All Rights Reserved.	
*/
var hash="";
(function(a){a.edSite=function(b,c){var d={baseURL:"http://"+window.location.host,page:new Object,mainHeight:0,currentMain:1,spanInt:0,colors:new Array("192,162,4","96,134,159","217,83,30","238,177,17","148,155,80")};var e=this,f=a(b),b=b;e.settings={};e.test=function(){alert("test")};e.init=function(){e.windowControls();e.settings=a.extend({},d,c);a("#navigation a").each(function(){var b=a(this).attr("href");if(b.indexOf("http")==-1){a(this).attr("href","#!/"+b.substr(1))}});a("#masthead img, #main .grid img").each(function(){var b=a(this).attr("src");a(this).attr("src","/assets/images/spaceball.gif");a(this).attr("data-original",b)});if(Modernizr.canvas){a("#strip").chipAnimation({method:"randomize",reverse:false});a("#strip").on("chipAnimationComplete",function(a){e.homepage();console.log("chips done now what")})}else{e.homepage()}};e.pageControl=function(b){var c=new Object;c.href=window.location.href;if(b==undefined){c.hash=window.location.hash}else{c.hash=b}c.hasharr=c.hash.split("/");c.base=c.href.toString().split("#!/")[1];c.id="#"+c.base;c.hasharr.shift();if(c.hasharr[c.hasharr.length]=="")c.hasharr.pop();var d;console.log(c.hasharr);if(c.hasharr.length>1){c.main=2;d=a("#projects-"+c.hasharr[1]).offset()}else if(c.hasharr.length==1){if(c.hasharr[0]=="home"){console.log("home page");c.main=1;d=new Object;d.top=0}else{console.log("single page");c.main=1;d=a("#"+c.hasharr[0]).offset()}}if(d.top!=0){c.y=parseInt(d.top-a("#header").height())}else{c.y=0}if(c.main==2){e.settings.currentMain=2;a("#scroller").animate({left:-a(window).width()},400,function(){a(window).scrollTo(c.y,400,{axis:"y",onAfter:function(){if(c.hasharr[2]){a("#projects-"+c.hasharr[1]).data("projectGrid").show(c.hasharr[2])}if(e.settings.page.hasharr[2]==undefined&&e.settings.page.hasharr[1]==c.hasharr[1]){a("#projects-"+c.hasharr[1]).data("projectGrid").hide()}}})})}else{console.log(c.y);e.settings.currentMain=1;var f=a("#scroller").position();if(f.left<0){a("#scroller").animate({left:0},400,function(){a(window).scrollTo(c.y,400,{axis:"y"})})}else{a(window).scrollTo(c.y,400,{axis:"y"})}}e.settings.page=c};e.homepage=function(){a("#container").css({height:"auto",overflow:"none"});a("#hgroup").animate({top:0},600);a("#frame").css({opacity:1});a("#frame").animate({marginTop:0},600).delay(600);a("#masthead img").lazyload({effect:"fadeIn",threshold:1500});a("#masthead .gallery").cycle({timeout:8e3,speed:1e3,before:h})};e.windowControls=function(){a(window).bind("scroll",function(){});a(window).bind("resize",function(){j();i();k()});a(window).bind("load",function(){e.settings.mainHeight=a("#main").height();i();k()});a(window).bind("hashchange",function(a){e.pageControl();a.preventDefault()})};var g=function(b){var c=window.location.href;var d=c.substr(e.settings.baseURL.length);console.log(d);if(d.indexOf("#")==-1){b="/#!"+d;window.location.href=e.settings.baseURL+b}else{if(window.location.hash!=b){window.location.hash=b;if(!Modernizr.hashchange){a(window).data("edSite").pageControl()}console.log(b)}}};var h=function(){a("#masthead h2 span").animate({color:"rgb("+e.settings.colors[e.settings.spanInt]+")"},1e3,function(){if(e.settings.spanInt<e.settings.colors.length-1){e.settings.spanInt++}else{e.settings.spanInt=0}})};var i=function(){var b=a("#main .article:last-child");a("#frame").css({height:a("#main2").height()})};var j=function(){a("#header").css({left:(a(window).width()-a("#header").width())/2})};var k=function(){a("#main,#main2").css({width:a(window).width()});a("#scroller").css({width:a(window).width()*2});if(e.settings.currentMain==2){a("#scroller").css({left:-a(window).width()})}a("#main2").css({left:a(window).width()})};e.init()};a.fn.edSite=function(b){return this.each(function(){if(undefined==a(this).data("edSite")){var c=new a.edSite(this,b);a(this).data("edSite",c)}})}})(jQuery);
/*****/
$(window).edSite();