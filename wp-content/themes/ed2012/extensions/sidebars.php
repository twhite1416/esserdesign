<?php

function ed2012_widgets_init() {
	register_sidebar(array(
		'name' => 'news',
		'description' => 'Areas of Homepage News',
		'before_title'  => '<h1 class="widgettitle">',
		'after_title'   => '</h1>',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget' => '<div class="clear"></div></section>'
	));
	register_sidebar(array(
		'name' => 'base',
		'description' => 'Areas of Base',
		'before_title'  => '<h1 class="widgettitle">',
		'after_title'   => '</h1>',
		'before_widget' => '<section id="%1$s" class="widget %2$s">',
		'after_widget' => '<div class="clear"></div></section>'
	));

}
/** Register sidebars by running ed2012_widgets_init() on the widgets_init hook. */
add_action( 'widgets_init', 'ed2012_widgets_init' );

?>