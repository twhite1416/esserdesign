<?php
/*
	Template Name: Home
*/
?>
<?php get_header(); ?>
	<div id="home"></div>
	<?php if (have_posts()): while (have_posts()): the_post(); ?>
		<article id="masthead">
			<header>
				<?php the_content(); ?>
			</header>
        	<section class="gallery">
            	<?php
				$args = array(
					'post_type' => 'attachment',
					'numberposts' => -1,
					'post_parent' => $post->ID,
					'order' => 'ASC'
				);
				$attachments = get_posts( $args );
				foreach($attachments as $attachment):
				?>
					<img src="<?php echo $attachment->guid; ?>" height="400" width="790" />
				<?php
				endforeach;
				?>
            </section>
		</article>
	<?php endwhile; endif; ?>
	
    <article id="news" class="article">
    	<section class="section">
    	<?php 
			dynamic_sidebar('news');
		?>
        </section>
    </article>
   <?php
        wp_nav_menu( array('menu_class' => 'menu',
            'items_wrap' => '<div id="%1$s" class="%2$s">%3$s</div>',
            'menu' => 'homepage-content',
            'container_class' => 'homepage-content',
            'theme_location' => 'primary',
            'walker'=> new Homepage_Page_Walker()
        ) );
    ?>
    <div class="clear"></div>
    <article id="base" class="article">
        <section class="section">
        	<?php 
				dynamic_sidebar('Base');
			?>
            <div class="clear"></div>
        </section>
    </article>
   </div> <!-- end of #main  -->



   <div id="main2">
    	<?php 
		$categories = get_terms('project_category');
		foreach($categories as $category):
			$color = get_terms_meta($category->term_id, 'color',true);
		?>
        <article class="article projects" id="projects-<?php echo $category->slug; ?>" cat="<?php echo $category->slug; ?>">
            <header class="header">
            	<h1 style="color:rgb(<?php echo $color; ?>);"><?php echo $category->name; ?></h1>
            	<div class="projects-animated-nav">
                	<?php
						foreach($categories as $cat){
							$simple[] = $cat->slug;
							$associative[] = array('slug' => $cat->slug, 'name' => $cat->name);
						}
						$key = array_search($category->slug, $simple);
						$pre = array_slice($associative, 0, $key);
						$post = array_slice($associative, $key+1);
					?>
                	<ul>
                    	<?php foreach($post as $item): ?>
                        	<li><a href="/projects/<?php echo $item['slug']; ?>"><?php echo $item['name']; ?></a></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
                <div class="clear"></div>
           	</header>
            <section class="section"><div class="frame">
                <div class="grid">
                    <?php
						$args = array ('post_type' => 'projects', 'posts_per_page' => 15, 'project_category' => $category->slug, 'order' => 'ASC');
						$project_query = new WP_Query( $args );
						$project_count = 0;
						while ( $project_query->have_posts() ) : $project_query->the_post();
							$project_count++;
							$categories = wp_get_post_terms($project_query->post->ID,'project_category');
							$cat = $categories[0]->slug;
							$title = htmlentities($project_query->post->post_title);
							print_r($tile);
							$name = '<span class="title">'.str_replace('-','</span><span class="project">', $title).'</span>';
							$thumbs = get_post_meta($project_query->post->ID, 'project_thumbnails', true);
							$thumb = $thumbs[1];
					?>
						<div class="item b10" cat="<?php echo $cat; ?>" pid="<?php echo $project_query->post->ID; ?>" href="#!/<?php echo $cat; ?>/<?php echo $project_query->post->ID; ?>">
							<img class="img" style="z-index:1" src="/assets/images/spaceball.gif" data-original="<?php echo $thumb; ?>" height="150" width="150" />
							<div class="img" style="z-index:0;"><?php echo trim($name); ?></div>
						</div>
					<?php endwhile; wp_reset_postdata(); ?>
                    <?php 
						//fill in blank if needed
						for($blank_count=0; $blank_count < 15-$project_count; $blank_count++):
					?>
						<div class="item b10">
							<div class="img" style="z-index:0;"></div>
						</div>
					<?php endfor; ?>
                    <div class="clear"></div>
                    <h2><?php echo $category->description; ?></h2>
                </div>
                <div class="featured">
                    <div class="gallery"></div>
                    <div class="base">
                        <div class="desc">
                            <h2 class="title"></h2>
                            <p class="details" ></p>
                        </div>
                        <div class="controls">
                            <div class="arrowl"><</div>
                            <div class="count"></div>
                            <div class="refer">
                                <ul>
                                	<?php for($chipCount=0; $chipCount<15; $chipCount++):
                                    	if($chipCount < $project_count){
			                               echo '<li></li>';
										}else{
											echo '<li class="inactive"></li>';
										}
                                    endfor; ?>
                                </ul>
                            </div>
                            <div class="arrowr">></div>
                        </div>
                    </div>
                    <div class="loader"></div>
                </div>
            </div></section>
            <script>
				$(document).ready(function(){
					console.log('ready');
					$('#projects-<?php echo $category->slug; ?>').projectGrid({hiLite:'<?php echo $color; ?>',category:'<?php echo $category->slug; ?>'});
				});
			</script>
        </article>
        <?php endforeach; ?>
	<div class="clear"></div>
    </div> <!-- end of #main2 -->
</div> <!-- end of #scroller -->
</div> <!-- end of #frame -->
<?php get_footer(); ?>