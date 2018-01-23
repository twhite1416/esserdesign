<?php
//echo dirname(_FILE_);
/*******| DEFINE DIRECTORIES |*******/
define ('CLASSES', TEMPLATEPATH . '/classes');
define ('EXTENSIONS', TEMPLATEPATH . '/extensions');
define ('POSTTYPES', TEMPLATEPATH . '/posttypes');

/*******| INCLUDE EXTENSION SETS |*******/
include_once(EXTENSIONS.'/functions.php');
include_once(EXTENSIONS.'/sidebars.php');
include_once(EXTENSIONS.'/page.php');
include_once(EXTENSIONS.'/contact.php');
include_once(EXTENSIONS.'/walkers.php');
include_once(EXTENSIONS.'/theme-options.php');
include_once(EXTENSIONS.'/posttype-handling.php');

/*******| INCLUDE POST TYPE SETS |*******/
//include_once(POSTTYPES.'/portfolio-pieces.php');
include_once(POSTTYPES.'/projects.php');
include_once(POSTTYPES.'/projects-admin.php');

/*******| SET PARAMETERS |*******/
register_nav_menu( 'primary-nav', 'Primary Nav' );
add_theme_support( 'post-thumbnails', array('post','page','principals','ed_portfolio_piece' ) );
add_theme_support( 'post-formats', array( 'gallery', 'image' ) );

remove_action( 'wp_head', 'feed_links_extra', 3 ); // Display the links to the extra feeds such as category feeds
remove_action( 'wp_head', 'feed_links', 2 ); // Display the links to the general feeds: Post and Comment Feed
remove_action( 'wp_head', 'rsd_link' ); // Display the link to the Really Simple Discovery service endpoint, EditURI link
remove_action( 'wp_head', 'wlwmanifest_link' ); // Display the link to the Windows Live Writer manifest file.
remove_action( 'wp_head', 'index_rel_link' ); // index link
remove_action( 'wp_head', 'parent_post_rel_link', 10, 0 ); // prev link
remove_action( 'wp_head', 'start_post_rel_link', 10, 0 ); // start link
remove_action( 'wp_head', 'adjacent_posts_rel_link', 10, 0 ); // Display relational links for the posts adjacent to the current post.
remove_action( 'wp_head', 'wp_generator' ); // Display the XHTML generator that is generated on the wp_head hook, WP version

?>