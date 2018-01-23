<?php 
	//$request_uri = $_SERVER['REQUEST_URI'];
	//wp_redirect('/#!'.$request_uri, 301);
	//exit;
?>
<?php get_header(); ?>
<?php
	$selfcate = wp_get_post_terms($post->ID, 'project_category');
	$selfcate = $selfcate[0];
	$color = get_terms_meta($selfcate->term_id, 'color',true);
?>
		<article class="article projects" id="projects-<?php echo $selfcate->slug; ?>" cat="<?php echo $selfcate->slug; ?>">
            <header class="header">
            	<h1 style="color:rgb(<?php echo $color; ?>);"><?php echo $selfcate->name; ?></h1>
            	<div class="projects-animated-nav">
                	<?php $categories = get_terms('project_category'); ?>
                	<ul>
                    	<?php foreach($categories as $item): ?>
                        	<li class="<?php echo $item->slug; ?>"><a href="/projects/<?php echo $item->slug; ?>"><?php echo $item->name; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="clear"></div>
           	</header>
            <section class="section"><div class="frame">
				<div class="grid">
                    <?php
						$args = array ('post_type' => 'projects', 'posts_per_page' => 15, 'project_category' => $selfcate->slug, 'order' => 'ASC');
						$project_query = new WP_Query( $args );
						$project_count = 0;
						while ( $project_query->have_posts() ) : $project_query->the_post();
							$project_count++;
							$categories = wp_get_post_terms($project_query->post->ID,'project_category');
							$cat = $categories[0]->slug;
							$title = htmlentities($project_query->post->post_title);
							$name = '<span class="title">'.str_replace('&amp;#8211;','</span><span class="project">', $title).'</span>';
							$thumbs = get_post_meta($project_query->post->ID, 'project_thumbnails', true);
							$thumb = $thumbs[1];
					?>
						<div class="item b10" cat="<?php echo $cat; ?>" pid="<?php echo $project_query->post->ID; ?>">
							<a href="/<?php echo $cat; ?>/<?php echo $project_query->post->ID; ?>" class="hideable">
                            <img class="img preventHomePageLinkage" name="<?php echo $project_count; ?>"  style="z-index:1" src="<?php echo $thumb; ?>" height="150" width="150" /></a>
							<div class="img preventHomePageLinkage" name="<?php echo $project_count; ?>" style="z-index:0;"><a href="/<?php echo $cat; ?>/<?php echo $project_query->post->ID; ?>"><?php echo trim($name); ?></a></div>
						</div>
					<?php endwhile; wp_reset_postdata(); ?>
                    <?php 
						//fill in blank if needed
						for($blank_count=0; $blank_count < 15-$project_count; $blank_count++):
					?>
						<div class="item b10">
							<div class="img" name="<?php echo $project_count; ?>" style="z-index:0;"></div>
						</div>
					<?php endfor; ?>
                    <div class="clear"></div>
                    <h2><?php echo $selfcate->description; ?></h2>
                </div>
            </div></section>
        </article>
<?php get_footer(); ?>