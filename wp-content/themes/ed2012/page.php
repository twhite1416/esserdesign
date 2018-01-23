<?php 
	//$request_uri = $_SERVER['REQUEST_URI'];
	//wp_redirect('/#!'.$request_uri, 301);
	//exit;
?>
<?php get_header(); ?>
	<?php if (have_posts()) : ?>
		<?php
        	while (have_posts()) : 
			the_post(); 
		?>
        <?php endwhile; endif; ?>
<?php get_footer(); ?>