<?php
// Register the post type for the project detail pages.
function create_portfolio_piece_post_type() {
	$labels = array(
		'name' => _x('Portfolio Pieces', 'post type general name'),
		'singular_name' => _x('Portfolio Piece', 'post type singular name'),
		'add_new' => _x('Add New', 'Portfolio Piece'),
		'add_new_item' => __('Add New Portfolio Piece'),
		'edit_item' => __('Edit Portfolio Piece'),
		'new_item' => __('New Portfolio Piece'),
		'view_item' => __('View Portfolio Piece'),
		'search_items' => __('Search Portfolio Pieces'),
		'title' => __('Portfolio Piece\'s Title'),
		'not_found' =>  __('No Portfolio Pieces Found'),
		'not_found_in_trash' => __('No Portfolio Pieces found in Trash'), 
		'parent_item_colon' => '',
		'menu_name' => 'Portfolio Pieces'
	);
	
	$args = array( 
		'labels' => $labels,
		'hierarchical' => true,
		'public' => true,
		'show_ui' => true, 
		'_builtin' => false,
		'show_in_menu' => true,
		'capability_type' => 'page',
		'has_archive' => true, 
		'menu_position' => 5,
		'supports' => array('title', 'editor', 'thumbnail', 'revisions', 'page-attributes', 'post-formats'),
		'rewrite' => array('slug' => 'portfolio-pieces')
	);
	
	register_post_type('ed_portfolio_piece',$args);
}
add_action( 'init', 'create_portfolio_piece_post_type' );

?>