<?php

	add_filter( 'manage_edit-projects_columns', 'ed2012_AddThumbColumn' );
	add_filter( 'manage_edit-projects_sortable_columns', 'ed2012_AddThumbColumn' );
	add_action( 'manage_projects_posts_custom_column', 'ed2012_AddThumbValue', 10, 2 );
 
	function ed2012_AddThumbColumn($cols) { 
		$cols['category'] = __('Category');
		$cols['sticky'] = __('Sticky Order');
		$cols['thumbnail'] = __('Thumbnail');
		return $cols;
	}
	function ed2012_ColumnsSortable( $columns ) {
		$cols['category'] = __('Category');
		$cols['sticky'] = __('Sticky Order');
		$cols['thumbnail'] = __('Thumbnail');
		return $cols;
	}
	function ed2012_AddThumbValue($column_name, $post_id) {
		$width = (int) 100;
		$height = (int) 100;
		if('category' == $column_name){
			$category_objs = wp_get_post_terms($post_id,'project_category');
			foreach($category_objs as $category){
				$categories[] = $category->name;	
			}
			echo $categories[0];	
		}
		if('sticky' == $column_name){
			$tag_objs = wp_get_post_terms($post_id,'project_tag');
			foreach($tag_objs as $tag){
				$tags[$tag->name] = 1;	
			}
			$sticky = get_post_meta($post_id, 'project_sticky_order',true);
			if(is_array($tags) && $tags['sticky'] == 1){
				if(strlen($sticky)>0){
					echo '<strong>Position: '.$sticky.'</strong>';
				}else{
					echo '<strong>Position: 0</strong>';
				}
			}else{
				echo 'Not Sticky';	
			}	
		}
		if ( 'thumbnail' == $column_name ) {
			$thumbnails = get_post_meta($post_id, 'project_thumbnails',true);
			echo '<img src="'.$thumbnails[1].'" height="100" width="100" />';
		}
	}
	
	

?>