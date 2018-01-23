<?php

	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-config.php');
	include_once($_SERVER['DOCUMENT_ROOT'].'/wp-load.php');

	if($_GET['id']) $post = get_post( $_GET['id'] );
?>
	<article>
		<h1><?php print($post->post_title); ?></h1>
        <h2><?php print(get_the_date('F j, Y \a\t g:ia')); ?></h2>
        <p><?php print(trim_src($post->post_content,30)); ?></p>
    </article>