<?php

/*
CUSTOM STYLES
*/
if ( ! function_exists( 'ed2012TinyMCE' ) ) :
function ed2012TinyMCE($init) {
	$init['theme_advanced_buttons2_add_before'] = 'styleselect'; // Adds the buttons at the begining. (theme_advanced_buttons2_add adds them at the end)
	$init['theme_advanced_styles'] = 'Color: Mustard=c1,Color: Blue=c2,Color: Orange=c3,Color: Yellow=c4,Color: Green=c5,Color: Teal=c6,Color: Purple=c7,Color: Dark Grey=c8,Color: Medium Grey=c9,Color: Light Grey=c10,Background: Mustard=b1,Background: Blue=b2,Background: Orange=b3,Background: Yellow=b4,Background: Green=b5,Background: Teal=b6,Background: Purple=b7,Background: Dark Grey=b8,Background: Medium Grey=b9,Background: Light Grey=b10';
	/*
	Mustard: (192,162,4) 		- 1
	Blue: (96,134,159) 			- 2
	Orange: (217,83,30) 		- 3
	Yellow: (238,177,17) 		- 4
	Green: (148,155,80) 		- 5
	Teal: (115,175,182) 		- 6
	Purple: (148,106,141) 		- 7
	Dark Grey: (168,168,168) 	- 8
	Medium Grey: (194,194,194) 	- 9
	Light Grey: (240,240,240) 	- 10
	*/
	return $init;
	}
	endif;
	add_filter('tiny_mce_before_init', 'ed2012TinyMCE' );
	add_editor_style('color.css');
	// incluiding the Custom CSS on our theme.
	function mycustomStyles(){
	wp_enqueue_style( 'myCustomStyles', get_bloginfo('stylesheet_directory').'/color.css', '','','all' ); /*adjust this path if you place “mycustomstyles.css” in a different folder than the theme's root.*/
}
add_action('admin_init', 'mycustomStyles');
/*
Trim String
*/
function trim_src($text, $length, $excerpt='&hellip;', $type='word') {
	$text = str_replace(']]>', ']]&gt;', $text);
	$text = preg_replace('@<script[^>]*?>.*?</script>@si', '', $text);
	$text = strip_tags($text);
	$text = preg_replace(" (\[.*?\])",'',$text);
	$text = trim(preg_replace( '/\s+/', ' ', $text));  
	$excerpt_length = $length;
	if($type == 'word'){
		$words = explode(' ', $text, $excerpt_length + 1);
		if (count($words) > $excerpt_length) {
			$excerpt_more = $excerpt;
			array_pop($words);
			array_push($words, $excerpt_more);
			$text = implode(' ', $words);
		}
	}else{
		$excerpt_more = (strlen($text) > $excerpt_length) ? $excerpt : '';
		$text = substr($text,0,$excerpt_length).$excerpt_more;	
	}
	return $text;
}
/*
Trim Excerpts
*/
function improved_trim_excerpt($text) {
	global $post;
	if ( '' == $text ) {
		$text = get_the_content('');
		$text = apply_filters('the_content', $text);
		$text = str_replace(']]>', ']]&gt;', $text);
		$text = preg_replace('@<script[^>]*?>.*?</script>@si', '', $text);
		$text = strip_tags($text);
		$text = preg_replace(" (\[.*?\])",'',$text);
		$text = trim(preg_replace( '/\s+/', ' ', $text));  
		$excerpt_length = apply_filters('excerpt_length', 55);
		$words = explode(' ', $text, $excerpt_length + 1);
		if (count($words) > $excerpt_length) {
			$excerpt_more = apply_filters('excerpt_more', '[...]');
			array_pop($words);
			array_push($words, $excerpt_more);
			$text = implode(' ', $words);
		}
	}
	return $text;
}
remove_filter('get_the_excerpt', 'wp_trim_excerpt');
add_filter('get_the_excerpt', 'improved_trim_excerpt');

?>