<?php
/*
Template Name: Ajax Request
*/
?>
<?php
	$post = get_post($_REQUEST['pid']);
	if ($post): setup_postdata($post); 
	
		$return['pid'] = $post->ID;
		$return['title'] = get_post_meta($post->ID, 'project_title',true);
		$return['desc'] = get_post_meta($post->ID, 'project_description',true);
		//images
		$images = get_post_meta($post->ID, 'project_images',true);
		foreach($images as $key => $image):
			if(!empty($image)) $return['images'][$key] = array('src'=>$image,'alt'=>$return['title']);
		endforeach;

		
		echo json_encode($return);

	endif; 
?>