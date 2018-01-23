<?php
/*
HOMEPAGE PAGE LISTING
*/

/* Helper function for recursively applying the sub-domain to sub-directory conversion
function getFixedValue($value) {
    if(is_array($value)) {
        foreach($value as $key => $subValue) {
            $value[$key] = getFixedValue($subValue);
        }
        return $value;
    } else if(strpos($value, 'http://assets.esserdesign.com') !== false) {
        return str_replace('http://assets.esserdesign.com', '/assets', $value);
    } else {
        return $value;
    }
}
*/

class Homepage_Page_Walker extends Walker_Nav_Menu {

	function start_el(&$output, $item, $depth, $args) {
		global $wp_query, $_customHasFixedItVariableHere, $wpdb;

/* Fix sub-domains to sub-directories in serialized post meta data
if($_GET['fixit'] && !$_customHasFixedItVariableHere) {
    $_customHasFixedItVariableHere = true;
    //$archive_query = new WP_Query('showposts=1000');

    $sql = <<<SQL
SELECT * FROM wp_postmeta where meta_value LIKE '%http://assets.esserdesign.com/%'
SQL;


    $results = $wpdb->get_results($sql);
    #print_r($results);
    #exit;

    foreach($results as $result) {
        $result->meta_value = str_replace('\r\n', "\r\n", $result->meta_value);
        $deserialized = unserialize($result->meta_value);
        if(is_array($deserialized)) {
            $tmpSql = 'update wp_postmeta set meta_value = "'.addslashes(serialize(getFixedValue($deserialized))).'" where meta_id = "'.$result->meta_id.'";';
            echo $tmpSql.PHP_EOL;
        } else if(is_string($result->meta_value) && $result->meta_value) {
            $tmpSql = 'update wp_postmeta set meta_value = "'.addslashes(getFixedValue($result->meta_value)).'" where meta_id = "'.$result->meta_id.'";';
            echo $tmpSql.PHP_EOL;
        }
    }

    echo "Done!";
    exit;
}
*/

		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		
		$post = get_post($item->object_id);
		setup_postdata($post);
		
		$output .= '<article id="'.$post->post_name.'" class="article page_section '.$post->post_name.'">';
		$item_output = '<header class="header"><h1>'.$item->title.'</h1></header>';
		$item_output .= '<section class="section page_wrapper">';
		
		$images = get_post_meta($post->ID, 'page_uploads', true);
		
		/* Projects */
		if($post->ID == 19):
			ob_start(); // start buffer
			include_once(TEMPLATEPATH.'/methods/feature-projects.php');
			$content = ob_get_contents(); // assign buffer contents to variable
			ob_end_clean(); // end buffer and remove buffer contents
			$item_output .= $content;
			
		/* Profile */
		elseif($post->ID == 24):
			$item_output  = '<section class="section page_wrapper">';
			$item_output .= '<header><hgroup>';
				$item_output .= '<h1>'.$item->title.'</h1>';
				$item_output .= '<h2>'.do_shortcode( get_the_content() ).'</h2>';
			$item_output .= '</hgroup></header>';

			$item_output .= '<aside><img src="'.$images[1].'" /></aside>';
			
			$item_output .= '<section>';

			$my_wp_query = new WP_Query();
			$all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'orderby' => 'menu_order', 'order' => 'ASC', 'posts_per_page' => -1));
			$profile_children = get_page_children($post->ID, $all_wp_pages);
			$odd = true;
			foreach($profile_children as $child):
				setup_postdata($child);
				$images = get_post_meta($child->ID, 'page_uploads', true);
				$text = get_post_meta($child->ID, 'additionaltext', true);
				$item_output_class = ($odd) ? ' class="odd"' : '';
				$item_output .= '<article'.$item_output_class.'>';
					$item_output .= '<h3>'.$child->post_title.'</h3>';
					$item_output .= do_shortcode( get_the_content() );
				$item_output .= '</article>';
				$odd = !$odd;
			endforeach;
			
			$item_output .= '</section>';
			
		/* Services */
		elseif($post->ID == 394):
			$item_output  = '<section class="section page_wrapper">';
			$item_output .= '<header><hgroup>';
				$item_output .= '<h1>'.$item->title.'</h1>';
				$item_output .= '<h2>'.do_shortcode( get_the_content() ).'</h2>';
			$item_output .= '</hgroup></header>';

			$item_output .= '<aside><img src="'.$images[1].'" /></aside>';
			
			$item_output .= '<section>';

			$my_wp_query = new WP_Query();
			$all_wp_pages = $my_wp_query->query(array('post_type' => 'page', 'orderby' => 'menu_order', 'order' => 'ASC', 'posts_per_page' => -1));
			$profile_children = get_page_children($post->ID, $all_wp_pages);
			$halfChildren = ceil(count($profile_children) / 2);
			$childCount = 0;
			
			$item_output .= '<div>';
			foreach($profile_children as $child):
				setup_postdata($child);
				$images = get_post_meta($child->ID, 'page_uploads', true);
				$text = get_post_meta($child->ID, 'additionaltext', true);
				if ($halfChildren == $childCount++) {
					$item_output .= '</div><div>';
				}
				
				$item_output .= '<article>';
					$item_output .= '<h3>'.$child->post_title.'</h3>';
					$item_output .= do_shortcode( get_the_content() );
				$item_output .= '</article>';
			endforeach;
			
			$item_output .= '</div></section>';

		/* Contact Us */		
		elseif($post->ID == 26):
			$item_output .= do_shortcode( get_the_content() );
		
		else:
			$item_output .= do_shortcode( get_the_content() );
		endif;
		
		$item_output .= '</section>';
		$item_output .= '</article>';

		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
	}
}

?>