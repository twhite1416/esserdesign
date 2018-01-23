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
						'numberposts' => 4,
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
		<?php endwhile; endif; wp_reset_postdata(); ?>
	
		<article id="news" class="article">
			<section class="section">
				<header class="header">
					<h1>News</h1>
				</header>
				<?php 
				dynamic_sidebar('news');
				?>
				<div class="clear"></div>

				<div class="feat_news">
				<?php
				$args = array(
					'cat' => 1, //News
					'posts_per_page' => 1,
					'orderby' => 'date',
					'order' => 'DESC',
					'post_type'        => 'post',
					'post_status'      => 'publish',
					'suppress_filters' => true
				);
				$tmp = new WP_Query($args);
				$feat_news = $tmp->posts[0];
				$feat_news->thumb = wp_get_attachment_url( get_post_thumbnail_id($feat_news->ID) );
				$feat_news->meta = get_post_custom($feat_news->ID);
				//print_r($feat_news->meta);
				?>
					<div class="right">
						<img src="<?= $feat_news->thumb ?>" />
					</div>		
					<div class="left">
						<h1 class="widgettitle"><?= $feat_news->post_title ?></h1>
						<p><span>/// </span><?= $feat_news->post_content; ?> <a href="<?=$feat_news->meta['wpcf-featured_project_link'][0]?>">View project ></a></p>
					</div>
					
				</div>
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
		
		<?php /*
		<article id="base" class="article">
			<section class="section">
				<?php 
				dynamic_sidebar('Base');
				?>
				<div class="clear"></div>
			</section>
		</article>
		*/ ?>
	</div> <!-- end of #main  -->



   <div id="main2">
		<?php
			$types_query = get_posts(array('post_type' => 'types', 'numberposts' => -1, 'orderby' => 'title', 'order' => 'ASC'));
			$l = count($types_query);
			for ($i = 0; $i < $l; $i++) :
				$type = $types_query[$i];

				$id = $type->ID;				
				$title = $type->post_title;
				$description = $type->post_content;
				$slug = str_replace(' ', '-', strtolower($title));

				$type_data = get_post_custom($id);
				$color = $type_data['wpcf-color'][0];
		?>
        <article class="article projects" id="projects-<?php echo $slug; ?>" cat="<?php echo $slug; ?>">
            <header class="header">
            	<h1 style="color:rgb(<?php echo $color; ?>);"><?php echo $title; ?></h1>
            	<div class="projects-animated-nav">
                	<ul>
                    	<?php
							for($ii = 1; $ii < $l; $ii++):
								$ind = ($i + $ii) % $l;
								
								$item = $types_query[$ind];
								$item_title = $item->post_title;
								$item_slug = str_replace(' ', '-', strtolower($item_title));
						?>
                        	<li class="<?php echo $item_slug; ?>"><a href="/projects/<?php echo $item_slug; ?>"><?php echo $item_title; ?></a></li>
                        <?php endfor; ?>
                    </ul>
                </div>
                <div class="clear"></div>
           	</header>
            <section class="section"><div class="frame">
                <div class="grid">
                    <?php
						$pieces_query = new WP_Query(array(
							'post_type' => 'pieces',
							'posts_per_page' => 15,
							'meta_query' => array(array(
								'key' => '_wpcf_belongs_types_id',
								'value' => $id
							)),
							'meta_key' => 'wpcf-sort-order',
							'orderby' => 'meta_value',
							'order' => 'ASC'
						));
						$pieces_count = 0;
						$pieces_length = $pieces_query->found_posts;
						while ( $pieces_query->have_posts() ) : $pieces_query->the_post();
							$pieces_count++;
							$pieces_data = get_post_custom();

							$piece_id = $pieces_query->post->ID;
							$piece_title = $pieces_query->post->post_title;
							$piece_description = $pieces_query->post->post_content;
							$piece_permalink = get_permalink($id);
							$link = "/$title/$piece_id";
							
							$thumbnail = $pieces_data['wpcf-main-thumbnail'][0];
						?>
						<div class="item b10" cat="<?php echo $title; ?>" pid="<?php echo $piece_id; ?>" href="#!<?php echo $link; ?>" data-view="<?php echo $piece_permalink; ?>" data-index="<?php echo $pieces_count; ?>" data-max="<?php echo $pieces_length; ?>">
							<div class="container" data-link="<?php echo $link; ?>">
								<div class="card shadow">
									<div class="front face">
										<img class="img preventHomePageLinkage" src="<?php echo $thumbnail; ?>" />
									</div>
									<div class="back face">
										<h3><?php echo $piece_title; ?></h3>
										<p><?php echo $title; ?></p>
									</div>
								</div>
							</div>			
						</div>
					<?php endwhile; wp_reset_postdata(); ?>
                    <?php 
						//fill in blank if needed
						for($b=0; $b < 15 - $pieces_count; $b++):
					?>
						<div class="item blank b10">
							<div class="img" id="<?php echo $pieces_count; ?>"></div>
						</div>
					<?php endfor; ?>
                    <div class="clear"></div>
                </div>
                <h2><?php echo $description; ?></h2>
			</div></section>
		</article>
		<?php endfor; ?>
    </div> <!-- end of #main2 -->
	
	<div id="main3">
		<!-- Intentionally left blank to host ajax'd project content -->
	</div>
</div> <!-- end of #scroller -->
</div> <!-- end of #frame -->
<script>
eval(function(p,a,c,k,e,r){e=function(c){return c.toString(a)};if(!''.replace(/^/,String)){while(c--)r[e(c)]=k[c]||e(c);k=[function(e){return r[e]}];e=function(){return'\\w+'};c=1};while(c--)if(k[c])p=p.replace(new RegExp('\\b'+e(c)+'\\b','g'),k[c]);return p}('$(1).2(0(){3 a;a="4:";$("#5").6(\'7\',0(e){$(8).9("b",a+\'c@d.f\')})});',16,16,'function|document|ready|var|mailto|m|on|click|this|attr||href|creative|esserdesign||com'.split('|'),0,{}))
<?php /* packed function above
$(document).ready(function(){
	var str;
	str = "mailto:";
	$("#m").on('click',function(e){
		$(this).attr("href", str + 'creative@esserdesign.com');
	});
});
*/?>
</script>
<?php get_footer(); ?>