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
			$selfcate = wp_get_post_terms($post->ID, 'project_category');
			$selfcate = $selfcate[0];
			$color = get_terms_meta($selfcate->term_id, 'color',true);
			
			$title = get_post_meta($post->ID, 'project_title',true);
			$desc = get_post_meta($post->ID, 'project_description',true);
			//images
			$images = get_post_meta($post->ID, 'project_images',true);
		?>
				
			<article class="article projects" id="projects-<?php echo $selfcate->slug; ?>" cat="<?php echo $selfcate->slug; ?>">
            <header class="header">
            	<h1 style="color:rgb(<?php echo $color; ?>);"><?php echo $selfcate->name; ?></h1>
            	<div class="projects-animated-nav">
                	<?php $categories = get_terms('project_category'); ?>
                	<ul>
                    	<?php foreach($categories as $item): ?>
                        	<li><a href="/projects/<?php echo $item->slug; ?>"><?php echo $item->name; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="clear"></div>
           	</header>
            <section class="section"><div class="frame">
                <div class="featured">
                	<div class="base">
                        <div class="desc">
                            <h2 class="title"><?php echo $title; ?></h2>
                            <p class="details"><?php echo $desc; ?></p>
                        </div>
                    </div>
                    <div class="gallery">
                    	<?php
                        if(is_array($images)):
                            foreach($images as $key => $image): if(!empty($image)): ?>
                                <img src="<?php echo $image; ?>" alt="<?php echo $title; ?>" height="470" width="790">
                            <?php endif; endforeach;
                        endif;?>
                    </div>
                </div>
            </div></section>
        </article>
		<?php endwhile; ?>
	<?php endif; ?>
<?php get_footer(); ?>
