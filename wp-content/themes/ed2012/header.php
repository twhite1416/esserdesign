    <!doctype html>
    <!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js ie6"> <![endif]-->
    <!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js ie7"> <![endif]-->
    <!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js ie8"> <![endif]-->
    <!--[if IE 9 ]>    <html <?php language_attributes(); ?> class="no-js ie9"> <![endif]-->
    <!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?> class="no-js"> <!--<![endif]-->
    <head>
        <meta charset="utf-8">
        <!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> -->
        <meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
        <!-- meta name="robots" content="noindex, nofollow" --> 
        <!-- ARCHIVED 2/29/2016: NOT SURE WHY THIS IS SET THIS WAY -->

        <title><?php wp_title(''); ?></title>
		<?php wp_head(); ?>
        <link rel="shortcut icon" href="/assets/favicon.png" />
        <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
		<script>!window.jQuery && document.write('<script src="/assets/js/jquery-1.7.min.js"><\/script>')</script>
        <script src="/assets/js/jquery.localScroll.min.js" type="text/javascript"></script>
		<link rel="stylesheet" type="text/css" href="/assets/reset.css" />
		<link rel="stylesheet" href="/assets/style.css" />
        <noscript>
        	<link rel="stylesheet" href="/assets/style-noscript.css">
        </noscript>
        <link rel="stylesheet" href="/assets/color.css">
        <!--[if lt IE 9]>
        <link rel="stylesheet" href="/assets/style-ie.css">
        <![endif]-->
        <!--[if lte IE 9]>
		<script src="/assets/js/ie-projects.js"></script>
        <![endif]-->

		<script>
		function display_alert()
		  {
		  alert("Hey, it's me, your browser... I'm really outdated. \n\nI can't properly display this site and many others on the internet today. \n\nYou should really consider updating me with a new version of Internet Explorer or replacing me with Google Chrome or Mozilla Firefox." );
		  }
		</script>
    </head>
   <!--[if lte IE 7]>
<body onload="display_alert()">>
<![endif]-->
 <body <?php body_class(); ?>>
        <div id="container">
            <header id="header">
                <hgroup id="hgroup" class="b9">
                	<div class="center">
                        <h1><a href="<?php bloginfo('url'); ?>"><?php bloginfo('name'); ?></a></h1>
                        <nav id="navigation">
                            <?php wp_nav_menu( array( 
                                'menu' => 'Main Menu',
                                'theme_location' => 'menu-1',
                                'sort_column' => 'menu_order',
                                'container_class' => 'menu-header', 
                            ) ); ?>
                        </nav>
                    </div>
				</hgroup>
                <div id="strip"></div>
            </header>
            <div id="frame">
            <div id="scroller">
            	<div id="main">