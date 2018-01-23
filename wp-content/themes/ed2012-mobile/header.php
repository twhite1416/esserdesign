<!doctype html>
    <head>
    	<title><?php wp_title('&laquo;', true, 'right'); ?> <?php bloginfo('name'); ?></title>
        <meta name="description" content="<?php bloginfo('tagline'); ?>">
        <meta name="viewport" content="user-scalable=no, width=device-width, minimum-scale=1.0, maximum-scale=1.0" /> 
        <meta http-equiv="imagetoolbar" content="false" /> 
        <meta name="apple-touch-fullscreen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" /> 
        <meta name="apple-mobile-web-app-status-bar-style" content="black" /> 
        <link rel="apple-touch-icon" sizes="57x57" href="ios57.png" /> 
		<link rel="apple-touch-icon" sizes="72x72" href="ios72.png" /> 
		<link rel="apple-touch-icon" sizes="114x114" href="ios114.png" />
        <link rel="shortcut icon" href="ios57.png">
        <link rel="stylesheet" href="<?php bloginfo('stylesheet_url'); ?>">
        <link rel="stylesheet" href="/wp-content/themes/ed2012/color.css">
        <script type="text/javascript" src="http://use.typekit.com/krt5jyn.js"></script>
        <script type="text/javascript">try{Typekit.load();}catch(e){}</script>
        <?php wp_head(); ?>
	</head>
    <body <?php body_class(); ?>>
    	