<?php
	/* Define the custom box */
	
	// WP 3.0+
	add_action('add_meta_boxes', 'ed2012_add_custom_box');
	
	// backwards compatible
	add_action('admin_init', 'ed2012_add_custom_box', 1);
	
	/* Do something with the data entered */
	add_action('save_post', 'ed2012_save_postdata');
	
	/* Adds a box to the main column on the Post and Page edit screens */
	function ed2012_add_custom_box() { 
		
		add_meta_box( 
			'ed2012_page_upload',
			__( 'Page Images', 'ed2012_page_upload' ),
			'ed2012_page_upload',
			'page',
			'advanced',
			'core',
			array( 'field_name' => 'page_uploads')	
		);
		add_meta_box( 
			'ed2012_page_additionaltext',
			__( 'Additional Text', 'ed2012_page_additionaltext' ),
			'ed2012_page_additionaltext',
			'page',
			'advanced',
			'core'
		);
	}
	function ed2012_page_scripts() {
		wp_enqueue_script('common');
		wp_enqueue_script('wp-lists');
		wp_enqueue_script('postbox');
	}
	add_action('admin_print_scripts', 'my_admin_scripts');
	function ed2012_page_additionaltext(){
		wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
		$current_value = get_post_meta($post->ID, $field_name, true);
		echo '<textarea class="wp-editor-area" name="additionaltext">'.$current_value.'</textarea>';
		echo '<script type="text/javascript">
                jQuery(document).ready( function () {
                    if ( typeof( tinyMCE ) == "object" && typeof( tinyMCE.execCommand ) == "function" ) {
 
                        tinyMCE.execCommand("mceAddControl", true, "additionaltext");
 
                    }
                });
        </script>';
	}
	function ed2012_page_upload( $post, $metabox ) {
		wp_nonce_field( basename( __FILE__ ), 'ed2012_noncename' );
		$field_name = $metabox['args']['field_name'];
		$current_value = get_post_meta($post->ID, $field_name,true);
		print_r($field_name);
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
	/* When the post is saved, saves our custom data */
	function ed2012_save_postdata( $post_id ) {
	  // verify this came from the our screen and with proper authorization,
	  // because save_post can be triggered at other times
	
	 
	
	  // verify if this is an auto save routine. 
	  // If it is our form has not been submitted, so we dont want to do anything
	  if ( defined('DOING_AUTOSAVE') && DOING_AUTOSAVE ) 
		  return $post_id;
	
	  
	  // Check permissions
	  if ( 'page' == $_POST['post_type'] ) 
	  {
		if ( !current_user_can( 'edit_page', $post_id ) )
			return $post_id;
	  }
	  else
	  {
		if ( !current_user_can( 'edit_post', $post_id ) )
			return $post_id;
	  }
	
	  // OK, we're authenticated: we need to find and save the data
	  foreach($_POST as $key => $value){
		  update_post_meta($post_id, $key, $value);
	  }
	
	   return $mydata;
	}
?>