<?php

/* Projects */
function ed2012_post_type_projects() {
	$labels = array(
    'name' => _x('Projects', 'post type general name'),
    'singular_name' => _x('Project', 'post type singular name'),
    'add_new' => _x('Add New', 'Project'),
    'add_new_item' => __('Add New Project'),
    'edit_item' => __('Edit Project'),
    'new_item' => __('New Project'),
    'view_item' => __('View Project'),
    'search_items' => __('Search Projects'),
	'title' => __('Project\'s Name'),
    'not_found' =>  __('No Projects Found'),
    'not_found_in_trash' => __('No Projects found in Trash'), 
    'parent_item_colon' => '',
    'menu_name' => 'Projects');
	
	$args = array( 
	'labels' => $labels,
	'hierarchical' => false,
	'public' => true,
    'publicly_queryable' => true,
    'show_ui' => true, 
	'_builtin' => false,
    'show_in_menu' => true,
    'query_var' => true,
    'capability_type' => 'post',
    'has_archive' => true, 
	'menu_position' => 4,
	'supports' => array('title'),
	'rewrite' => array('slug' => 'projects')
	);
	register_post_type('projects',$args);
}
function create_project_taxonomies(){
	register_taxonomy('project_category','projects',array('hierarchical'=>true,'label'=>'Project Type'));
	register_taxonomy('project_tag','projects',array('hierarchical'=>false,'label'=>'Project Tag'));
    //register_taxonomy_for_object_type('project_category', 'projects');
    //register_taxonomy_for_object_type('project_tag', 'projects');
}
function modify_form(){
echo  '<script type="text/javascript">
      jQuery("#post").attr("enctype", "multipart/form-data");
        </script>
  ';
}
function my_admin_scripts() {
	wp_enqueue_script('media-upload');
	wp_enqueue_script('thickbox');
	wp_enqueue_script('my-upload');
	wp_enqueue_script('common');
	wp_enqueue_script('wp-lists');
	wp_enqueue_script('postbox');
}
function my_admin_styles() {
	wp_enqueue_style('thickbox');
}
add_action('admin_print_scripts', 'my_admin_scripts');
add_action('admin_print_styles', 'my_admin_styles');
add_action('admin_footer','modify_form');
add_action('init','create_project_taxonomies');
$project_fields[] = array('name'=>'title','title'=>'Title/Client Name','type'=>'input');
$project_fields[] = array('name'=>'description','title'=>'Description','type'=>'input');
$project_fields[] = array('name'=>'thumbnails','title'=>'Project Thumbnails','type'=>'upload');
$project_fields[] = array('name'=>'images','title'=>'Project Images','type'=>'upload');
$project_fields[] = array('name'=>'url','title'=>'Project URL','type'=>'input');
$project_fields[] = array('name'=>'sticky_order','title'=>'Sticky Order #','type'=>'input');
function add_project_fields(){
	global $post, $project_fields;
	foreach($project_fields as $field){
		$field_name  = 'project_'.$field['name'];
		add_meta_box(
			$field_name,									// Unique ID
			esc_html__( $field['title'], 'example' ),		// Title
			'project_'.$field['type'],						// Callback function
			'projects',										// Admin page (or post type)
			'normal',										// Context
			'default',										// Priority
			array( 'field_name' => $field_name)				// Callback variables
		);		
		
	}
}
function project_input( $post, $metabox ) {
	wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
	$field_name = $metabox['args']['field_name'];
	$current_value = get_post_meta($post->ID, $field_name, true);
	echo '<input type="text" name="'.$field_name.'" value="'.$current_value.'" style="width:100%;"/>';
}
function project_textarea( $post, $metabox ) {
	wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
	$field_name = $metabox['args']['field_name'];
	$current_value = get_post_meta($post->ID, $field_name, true);
	echo '<textarea name="'.$field_name.'" style="height:200px; width:100%;">'.$current_value.'</textarea>';
}
function project_wysiwyg( $post, $metabox ) {
	wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
	$field_name = $metabox['args']['field_name'];
	$current_value = get_post_meta($post->ID, $field_name, true);
	echo '<textarea class="theEditor" name="'.$field_name.'">'.$current_value.'</textarea>';
}
function project_multiple( $post, $metabox ) {
	wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
	$field_name = $metabox['args']['field_name'];
	$current_value = get_post_meta($post->ID, $field_name, true);
	echo '<div class="fields">';
	if(is_array($current_value)){
		$field_count = count($current_value);
		foreach($current_value as $key => $value){
			echo '<input type="text" name="'.$field_name.'['.$key.']" value="'.$value.'" style="width:100%;"/>';
		}
		echo '<script type="text/javascript">var fieldInt = '.$field_count.';</script>';
	}else{
		echo '<input type="text" name="'.$field_name.'[1]" value="'.$value.'" style="width:100%;"/>';
		echo '<script type="text/javascript">var fieldInt = 1;</script>';
	}
	echo '</div>';
	echo '<input type="button" class="addField" value="Add Field" />';
	echo '<script type="text/javascript">
			jQuery(document).ready(function() {
				jQuery(".addField").click(function(){
					fieldInt++;
					jQuery(".fields").append(\'<input type="text" name="'.$field_name.'[\'+fieldInt+\']" value="" style="width:100%;"/>\');
				});
			});
		</script>';

}
function project_upload( $post, $metabox ) {
	wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
	$field_name = $metabox['args']['field_name'];
	$current_value = get_post_meta($post->ID, $field_name,true);
	?>
    <table>
        <tr valign="top">
            <th scope="row">Image 1</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'1'; ?>" type="text" size="36" name="<?php echo $field_name.'[1]'; ?>" value="<?php print($current_value[1]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'1'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'1'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 2</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'2'; ?>" type="text" size="36" name="<?php echo $field_name.'[2]'; ?>" value="<?php print($current_value[2]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'2'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'2'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 3</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'3'; ?>" type="text" size="36" name="<?php echo $field_name.'[3]'; ?>" value="<?php print($current_value[3]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'3'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'3'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 4</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'4'; ?>" type="text" size="36" name="<?php echo $field_name.'[4]'; ?>" value="<?php print($current_value[4]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'4'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'4'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 5</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'5'; ?>" type="text" size="36" name="<?php echo $field_name.'[5]'; ?>" value="<?php print($current_value[5]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'5'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'5'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 6</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'6'; ?>" type="text" size="36" name="<?php echo $field_name.'[6]'; ?>" value="<?php print($current_value[6]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'6'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'6'; ?>" />
            </label></td>
        </tr>
        <tr valign="top">
            <th scope="row">Image 7</th>
            <td><label for="upload_image">
            <input id="<?php echo $field_name.'7'; ?>" type="text" size="36" name="<?php echo $field_name.'[7]'; ?>" value="<?php print($current_value[7]); ?>" />
            <input class="upload_image_button" type="button" value="Upload Image" target="<?php echo $field_name.'7'; ?>" />
            <input class="remove_image_button" type="button" value="Remove Image" target="<?php echo $field_name.'7'; ?>" />
            </label></td>
        </tr>
    </table>
    When upload is complete, click "Insert into Post"
    <script type="text/javascript">
    jQuery(document).ready(function() {
        
        jQuery(".upload_image_button").click(function() {
            formfield = jQuery(this).attr("target");
            tb_show("","/wp-admin/media-upload.php?type=image&amp;post_id=<?php echo $post->ID; ?>&amp;TB_iframe=true");
            return false;
        });
        jQuery(".remove_image_button").click(function() {
            formfield = jQuery(this).attr("target");
            jQuery("#"+formfield).val("");
        });
        window.send_to_editor = function(html) {
            imgurl = jQuery("img",html).attr("src");
            jQuery("#"+formfield).val(imgurl);
            tb_remove();
        }
    
    });
    </script>
    <?php
}
//
function process_project_fields(){
	global $post, $project_fields;
	foreach($project_fields as $field){
		$field_name  = 'project_'.$field['name'];
		$value = $_POST[$field_name];
		//print_r($value);
		//delete_post_meta($post->ID, $field_name);
		if (isset($field_name) && !empty($field_name) && !empty($value)) {
			update_post_meta($post->ID, $field_name, $value);
		}
	}
}
add_action('init', 'ed2012_post_type_projects');
if($_GET['post_type'] == 'projects' || get_post_type($_GET['post']) == 'projects' || get_post_type($_POST['post_ID']) == 'projects'):
add_action('edit_form_advanced', 'add_project_fields');
//add_action('edit_page_form', 'add_project_fields');
add_action( 'add_meta_boxes', 'add_project_fields' );
add_action('edit_post', 'process_project_fields');
add_action('publish_post', 'process_project_fields');
add_action('save_post', 'process_project_fields');
add_action('edit_page_form', 'process_project_fields');
endif;

?>