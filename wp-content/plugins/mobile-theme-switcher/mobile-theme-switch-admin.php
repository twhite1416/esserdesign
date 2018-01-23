<?php 
if($_POST['form_hidden'] == 'Y') {
	//Form data sent
	$mobiletheme = $_POST['mobiletheme'];
	update_option('mobiletheme', $mobiletheme);
	?>
	<div class="updated"><p><strong><?php _e('Options saved.' ); ?></strong></p></div>
	<?php
} else {
	$mobiletheme = get_option('mobiletheme');
}	
?>

<div class="wrap">
	<?php    echo "<h2>" . __( 'Mobile theme switch', 'jv_mobiletheme' ) . "</h2>"; ?>
	<br />
	<form name="mobiletheme_form" method="post" action="<?php echo str_replace( '%7E', '~', $_SERVER['REQUEST_URI']); ?>">
<?php
  $themes = get_themes();
  $default_theme = get_current_theme();
  
  if (count($themes) >= 1) {
      $theme_names = array_keys($themes);
      natcasesort($theme_names); 
      $html = 'Mobile theme: <select name="mobiletheme">' . "\n";
      foreach ($theme_names as $theme_name) {              
          if (($mobiletheme == $theme_name) || (($mobiletheme == '') && ($theme_name == $default_theme))) {
              $html .= '<option value="' . $theme_name . '" selected="selected">' . htmlspecialchars($theme_name) . '</option>' . "\n";
          } else {
              $html .= '<option value="' . $theme_name . '">' . htmlspecialchars($theme_name) . '</option>' . "\n";
          }
      }
      $html .= '</select>' . "\n\n";
  }
  echo $html;
 
   ?>
		<input type="hidden" name="form_hidden" value="Y">
		<p class="submit">
		<input type="submit" name="Submit" value="<?php _e('Update Options', 'jv_mobiletheme' ) ?>" />
		</p>
	
		<p><a href="http://www.jonasvorwerk.com" target="_blank"><img src="http://www.jonasvorwerk.com/wp-content/themes/JonasVorwerk/32x32/rotate.php" alt="Jonas Vorwerk" title="http://www.jonasvorwerk.com" width="25"></a></p>
	</form>
</div>