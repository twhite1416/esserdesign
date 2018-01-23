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
            page: {},
            mainHeight: 0,
            currentMain: 1,
            spanInt: 0,
            colors: new Array('217,83,30', '96,134,159')

        };

        var site = this, $element = $(element), element = element;
        site.settings = {};

        /**************|PUBLIC METHODS|**************/
        site.init = function() {

            // Detect IE 10 and put a class on the body tag - IE 10 does not support conditional HTML comments
            if(jQuery.browser.msie && jQuery.browser.version.indexOf('10.') == 0) {// && jQuery.browser.version == '10') {
                jQuery('body').addClass('browser-ie10');
            }

            site.windowControls();
            //Collect Settings & Defaults
            site.settings = $.extend({}, defaults, options);

            //Make primary nav hashable
            $('#navigation a').each(function() {
                var static_url = $(this).attr('href');
                if(static_url.indexOf('http') == -1) {
                    $(this).attr('href', '#!/' + static_url.substr(1));
                }
            });

            //Hide Images
            $('#masthead img, #main .grid img').each(function() {
                var src = $(this).attr('src');
                $(this).attr('src', site.settings.assetsURL + '/images/spaceball.gif');
                $(this).attr('data-original', src);
            });

            //Animate Strip
            if(Modernizr.canvas) {
                $('#strip').chipAnimation({method: 'randomize', reverse: false});
                $('#strip').on("chipAnimationComplete", function(event) {
                    //Init Methods
                    site.navigation();
                    site.homepage();
                    site.projects();
                    site.contactForm();
                });
            } else {
                //Init Methods
                site.navigation();
                site.homepage();
                site.projects();
                site.contactForm();
            }
        };

        site.pageControl = function(uri) {
            var page = {};
            page.href = window.location.href;
            if(uri == undefined) {
                page.hash = window.location.hash;
            } else {
                page.hash = uri;
            }
            page.hasharr = page.hash.split('/');
            page.base = page.href.toString().split('#!/')[1];
            page.id = '#' + page.base;

            page.hasharr.shift();
            if(page.hasharr[page.hasharr.length] == '') page.hasharr.pop();

            var offset;
            if(page.hasharr.length == 3) {
                page.main = 3;
                offset = $('#main3 #samples').offset();
            } else if(page.hasharr.length == 2) {
                page.main = 2;
                offset = $('#projects-' + page.hasharr[1]).offset();
            } else if(page.hasharr.length == 1) {
                if(page.hasharr[0] == 'home') {
                    //clog('home page');
                    page.main = 1;
                    offset = {};
                    offset.top = 0;
                } else {
                    //clog('single page');
                    page.main = 1;
                    offset = $('#' + page.hasharr[0]).offset();
                }
            }

            if(offset && offset.top != 0) {
                // Base the offset on #strip instead of #header. The way it is laid out, #header's contents don't expand the height of #header.
                var jqel_strip = $('#strip');
                // When the page is scrolled down any, the strip offset has to be adjusted for the scroll position.
                var stripOffset = jqel_strip.offset().top - jQuery(window).scrollTop();
                page.y = parseInt(offset.top - (jqel_strip.height() + stripOffset));
            } else {
                page.y = 0;
            }

            // This is required because the .scrollTo() plugin chokes hard on negative scroll values (as in you can no longer navigate to anything using it)
            if(page.y < 0) {
                page.y = 0;
            }

            // Always hide the samples navigation if we navigate to any other section
            if(page.main != 3) $('#samples > header,#samples > .pieceHeader').fadeOut(300);

            if(page.main == 3) {
                if(site.settings.currentMain != 3) {
                    site.settings.currentMain = 3;

                    // On page refresh, the #main2 section isn't necessarily loaded yet. So we have to wait
                    // till it's loaded before we call showPieceSamples.
                    $(function() {
                        var h = page.hash.split('/'),
                            pid = h[h.length - 1],
                            $s = $(['#main2 div[pid="', pid, '"]'].join(''));
                        showPieceSamples($s);
                    });
                }
            } else if(page.main == 2) {
                site.settings.currentMain = 2;
                $('#scroller').animate({left: -($(window).width())}, 400, function() {
                    $(window).scrollTo(page.y, 400, {
                        axis: 'y',
                        onAfter: function() {
                            // ** This needs to stay commented. It's for the old style of displaying project
                            //    details. It is no longer used, but I don't want to lose the code since we don't
                            //    have source control.
                            //    Joel Flint 03/05/2013
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
            } else {
                site.settings.currentMain = 1;
                var scrollerPos = $('#scroller').offset();
                if(scrollerPos.left < 0) {
                    $('#scroller').animate({left: 0}, 400, function() {
                        $(window).scrollTo(page.y, 400, {axis: 'y'});
                    });
                } else {
                    $(window).scrollTo(page.y, 400, {axis: 'y'});
                }
                setScrollHeight();
            }
            site.settings.page = page;
        };

        //Navigation
        site.navigation = function() {
            //ANCHOR NAV
            $('#header h1 a').on('click',function(e) {
                e.preventDefault();
                updateHash('#!/home');
                return false;
            });

            $('#header li a, .article h1 a').on('click',function(e) {
                e.preventDefault();
                $('#main .article').each(function() {
                    if($(this).hasClass('active')) {
                        $(this).removeClass('active');
                    }
                });
                updateHash($(this).attr('href'));

                return false;
            });
        };

        //Homepage
        site.homepage = function() {
            //Animate the rest
            $('#container').css({height: 'auto', overflow: 'none'});
            $('#hgroup').animate({top: 0}, 600);
            $('#frame').css({opacity: 1.0});
            $('#frame').animate({marginTop: 0}, 600,function() {
                if(window.location.hash == '') {
                    updateHash('#!/home');
                } else {
                    site.pageControl();
                }
            }).delay(600);
            //Loading
            $("#masthead img").lazyload({effect: "fadeIn", threshold: 1500});
            $("#projects img").lazyload({effect: "fadeIn"});
            //Masthead Gallery
            $('#masthead .gallery').cycle({
                timeout: 8000,
                speed: 1000,
                before: animateSpan
            });
        };

        //Forms
        site.contactForm = function() {
            $('#contact input').focus(function() {
                $(this).parent().addClass('focus');
            }).blur(function() {
                    $(this).parent().removeClass('focus');
                });
        };

        //Projects
        site.projects = function() {
            //Project Controls
            $('.grid .item').click(function(e) {
                e.preventDefault();
                showPieceSamples($(this));
            });

            $('.discipline-list a').each(function() {
                var href = $(this).attr('href');
                $(this).attr('href', '#!' + href);
            });
            $('.discipline-list a').click(function(e) {
                e.preventDefault();
                updateHash($(this).attr('href'));
                return false;
            });

            //ANIMATED NAVIGATION
            $('.projects-animated-nav a').click(function(e) {
                //clog('animated navigation', e, jQuery(this).attr('href'));
                e.preventDefault();
                updateHash($(this).attr('href'));
                return false;
            });
        };

        var showPieceSamples = function($$) {
            var cat = $$.attr('cat'),
                pid = $$.attr('pid'),
                perm = $$.attr('data-view'),

                ww = $(window).width(),
                cm = site.settings.currentMain,
                isM = (cm == 1);

            // Show the loading

            // Ajax the content into main3
            $.ajax({
                url: perm,
                dataType: 'html',
                error: function(xhr, status, error) {
                    //clog(xhr);
                    //clog(status);
                    //clog(error);
                },
                success: function(data) {
                    var d = $('#samples', $(data)),
                        sm2 = function(cb) {
                            $('#scroller').animate({left: -(ww)}, 400, function() {
                                if(cb) cb();
                            });
                        },
                        st = function(cb) {
                            $(window).scrollTo(0, 400, {
                                axis: 'y',
                                onAfter: function() {
                                    if(cb) cb();
                                }
                            });
                        },
                        sm3 = function(cb) {
                            $('#scroller').animate({left: -(ww * 2)}, 400, function() {
                                site.settings.currentMain = 3;
                                setScrollHeight();
                                updateHash('#!/projects/' + cat + '/' + pid);
                                setupUpDownArrows();
                                setupPreviousNext();
                                if(cb) cb();
                            });
                        },
                        smSuccess = function() {
                            $('#samples > header,#samples > .pieceHeader').fadeIn(300);
                            $('#samples > header a').click(function(e) {
                                e.preventDefault();
                                $('#main .article').each(function() {
                                    if($(this).hasClass('active')) {
                                        $(this).removeClass('active');
                                    }
                                });
                                updateHash($(this).attr('href'));

                                return false;
                            });
                        };

                    $('#main3').empty().append(d).ready(function() {
                        positionMains();
                        if(isM) {
                            sm2(function() {
                                setTimeout(function() {
                                    st(function() {
                                        setTimeout(function() {
                                            sm3(function() {
                                                smSuccess();
                                            });
                                        }, 400);
                                    });
                                }, 400);
                            });
                        } else {
                            st(function() {
                                setTimeout(function() {
                                    sm3(function() {
                                        smSuccess();
                                    });
                                }, 400);
                            });
                        }

                        // Hide the loading
                    });
                }
            });
        };

        site.windowControls = function() {
            //SCROLL
            $(window).bind("scroll", function() {
            });
            //RESIZE
            $(window).bind("resize", function() {
                positionHeader();
                setScrollHeight();
                positionMains();
                positionProjectNav();
            });
            //LOAD
            $(window).bind("load", function() {
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
        };

        /**************|PRIVATE METHODS|**************/
        var updateHash = function(uri) {
            console.log(uri);
            var url = window.location.href;
            var request = url.substr(site.settings.baseURL.length);
            if(request.indexOf('#') == -1) {
                uri = '/#!' + request;
                window.location.href = site.settings.baseURL + uri;
                console.log(uri);
            } else {
                if(window.location.hash != uri) {
                    window.location.hash = uri;
                    console.log('2');
                    if(!Modernizr.hashchange) {
                        $(window).data('edSite').pageControl();
                        console.log('3');
                    }
                }
            }
        };

        var setupUpDownArrows = function() {
            $('#samples .down-arrow').click(function(e) {
                e.preventDefault();

                var $$ = $(this),
                    $p = $$.parents('section'),
                    $n = $p.next();
                if(!$n) return;

                $('html, body').animate({
                    scrollTop: $n.offset().top - 265
                }, 500);
            });

            $('#samples .up-arrow').click(function(e) {
                e.preventDefault();

                var $$ = $(this),
                    $p = $$.parents('section'),
                    $n = $p.prev();
                if(!$n) return;

                $('html, body').animate({
                    scrollTop: $n.offset().top - 265
                }, 500);
            });
        };

        var setupPreviousNext = function() {

            var $nav = $('#samples aside nav'),
                $p = $('.prev-arrow', $nav),
                $n = $('.next-arrow', $nav),
                $cp = $('.current-page', $nav),
                $tp = $('.total-pages', $nav),
                type = $nav.data('type'),
                $art = $(['#main2 article[cat="', type.slug, '"]'].join('')),
                $divs = $('.grid > div:not(.blank,.clear)', $art),
                dl = $divs.length,

                hash = window.location.hash.split('/'),
                pid = hash[hash.length - 1],
                $cur = $(['div[pid="', pid, '"]'].join(''), $art),
                ind = $(['div[pid="', pid, '"]'].join(''), $art).index();

            $cp.html(ind + 1);
            $tp.html(dl);

            if(ind == 0) $p.fadeOut(200); else $p.fadeIn(200);
            if(ind == dl - 1) $n.fadeOut(200); else $n.fadeIn(200);

            // :nth-child is 1 based, not 0 based...we have to +1.
            $nav.data('index', ind + 1);
            $p.unbind().click(function(e) {
                e.preventDefault();
                var jqel = jQuery(this).parents('nav').first();
                var currentNavIndex = parseInt(jqel.data('index'));

                var jqel_section = $art;
                var jqel_currentArticle = jqel_section.find('.grid .item[data-index="'+currentNavIndex+'"]');
                var minNavIndex = 1;
                var previousNavIndex = currentNavIndex - 1;
                if(previousNavIndex < minNavIndex) {
                    previousNavIndex = jqel_currentArticle.data('max');
                }
                var jqel_previousArticle = jqel_section.find('.grid .item[data-index="'+previousNavIndex+'"]');
                var previousArticleId = jqel_previousArticle.attr('pid');
                loadPieceSample(jqel_previousArticle, previousArticleId, hash);
            });
            $n.unbind().click(function(e) {
                e.preventDefault();
                var jqel = jQuery(this).parents('nav').first();
                var currentNavIndex = parseInt(jqel.data('index'));

                var jqel_section = $art;
                var jqel_currentArticle = jqel_section.find('.grid .item[data-index="'+currentNavIndex+'"]');
                var maxNavIndex = jqel_currentArticle.data('max');
                var nextNavIndex = currentNavIndex + 1;
                if(nextNavIndex > maxNavIndex) {
                    nextNavIndex = 1;
                }
                var jqel_nextArticle = jqel_section.find('.grid .item[data-index="'+nextNavIndex+'"]');
                var nextArticleId = jqel_nextArticle.attr('pid');
                loadPieceSample(jqel_nextArticle, nextArticleId, hash);
            });
        };

        // Loads the sample content into the details page without reloading the entire
        // section. This only gets the content, not the header. The header gets updated
        // manually so that it doesn't have a flash. The content should fade out, append,
        // then fade back in.
        var loadPieceSample = function($pd, pid, hash) {
            var url = $pd.attr('data-view');
            $.ajax({
                url: url,
                dataType: 'html',
                error: function(xhr, status, error) {
                    //clog(xhr);
                    //clog(status);
                    //clog(error);
                },
                success: function(data) {
                    var s = $('#samples', $(data)),
                        $d = $('> section', s),
                        $m3 = $('#main3'),
                        $s = $('#samples', $m3),
                        $h = $('#main3 #samples aside h1'),
                        $c = $('section', $s),
                        t = $('.pieceHeader aside h1', s).text(),
                        cl = $c.length,
                        cnt = 0;
                    $h.text(t);

                    $d.hide();
                    $c.fadeOut(400, function() {
                        if(++cnt == cl) {
                            $c.remove();

                            // Set window scrollTop back to 0
                            jQuery(window).scrollTop(0);

                            $s.append($d);

                            var dl = $d.length;
                            cnt = 0;
                            $d.fadeIn(function() {
                                if(++cnt == dl) {
                                    // Update the hash
                                    hash[hash.length - 1] = pid;
                                    updateHash(hash.join('/'));
                                    setupUpDownArrows();
                                    setupPreviousNext();

                                    // Trigger window resize to adjust page layout as needed
                                    jQuery(window).trigger('resize');
                                }
                            });
                        }
                    });
                }
            });
        };

        // ANIMATE SPAN COLOR - This animates the color of the span in the header to match the image color as it rotates.
        var animateSpan = function() {
            $('#masthead h2 span').animate({color: 'rgb(' + site.settings.colors[site.settings.spanInt] + ')'}, 1000, function() {
                if(site.settings.spanInt < site.settings.colors.length - 1) {
                    site.settings.spanInt++;
                } else {
                    site.settings.spanInt = 0;
                }
            });
        };

        // SCROLL HEIGHT - When the section changes, this handles resetting the height of the scrollable element (main, main2, or main3).
        var setScrollHeight = function() {
            var cm = site.settings.currentMain,
                ms = (cm >= 2) ?['#main', cm].join(''): '#main',
                h = $(ms).outerHeight();
            $('#frame').css({height: h});

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
        };

        // POSITION HEADER - This centers the header in the window. I don't think we need this, but we'll leave it and see.
        var positionHeader = function() {
            var $h = $('#header'),
                l = ($(window).width() - $h.width()) / 2;
            $h.css({left: l});
        };

        // POSITION MAINS - This executes on window resize and controls the widths of each of the main sections.
        var positionMains = function() {
            var jqel_main = $('#main');
            var jqel_main2 = $('#main2');
            var jqel_main3 = $('#main3');
            var jqel_scroller = $('#scroller');
            var windowWidth = $(window).innerWidth();
            var currentMain = site.settings.currentMain;

            var effectiveScreenWidth = Math.max(windowWidth, 800); // 800 is the minimum width of a section

            jqel_main.css({width: effectiveScreenWidth});

            jqel_main2.css({
                width: effectiveScreenWidth,
                left: effectiveScreenWidth
            });

            jqel_main3.css({
                width: effectiveScreenWidth,
                left: effectiveScreenWidth * 2
            });

            // Calculate the new left position of the scroller based on the new content widths and which one is the current main.
            // Left position of scroller needs to be a negative offset.
            var newScrollerLeft = -(effectiveScreenWidth * (currentMain - 1)); //Math.min(-currentMain, -(windowWidth * (currentMain - 1)));
            jqel_scroller.css({
                left: newScrollerLeft,
                width: effectiveScreenWidth * 3
            });
        };

        //POSITION PROJECT NAV - This is no longer needed. The positioning is fully CSS based now.
        var positionProjectNav = function() {
            //var offset = $('.projects .section').offset();
            //clog(offset.left);
            //$('.projects .header').css({marginLeft:offset.left});
        };

        //LOAD MAP - Google Maps for the contact section.
        var loadMap = function() {
            var center = new Array(33.507166, -112.031869);
            var bounds = new Array(33.503600, -112.037520, 33.51075, -112.02625); //Bottom,Left,X,Right
            //GoogleMap('map_canvas', center, site.settings.assetsURL + '/images/map-overlay.png', bounds);
        };

        /**************|INIT|**************/
        site.init();
    };

    $.fn.edSite = function(options) {
        return this.each(function() {
            if(undefined == $(this).data('edSite')) {
                var site = new $.edSite(this, options);
                $(this).data('edSite', site);
            }
        });
    }
})(jQuery);
/***********************/
$(function() {
    $(window).edSite();
});