
<ul class="discipline-list">
	<?php
		$types_query = new WP_Query(array('post_type' => 'types', 'orderby' => 'title', 'order' => 'ASC'));
		while ( $types_query->have_posts() ) : $types_query->the_post();
			$title = $types_query->post->post_title;
			$slug = str_replace(' ', '-', strtolower($title));
	?>
    	<li class="<?php echo $slug; ?>"><a href="/projects/<?php echo $slug; ?>"><?php echo $title; ?></a></li>
    <?php endwhile; wp_reset_postdata(); ?>
</ul>
<div class="frame">
    <div class="grid">
		<?php
            /* NOTE: For whatever reason, the only way that wordpress would not use a limit of 10 on this
             * query was to use nopaging = true instead of sending other limit related properties as -1 or even 15. */
			$pieces_query = new WP_Query(
				array(
					'post_type' => 'pieces',
					'post_status' => 'publish',
					'nopaging' => true,
                    'meta_query' => array(array(
						'key' => 'wpcf-featured',
						'value' => '1'
					)),
                    'meta_key' => 'wpcf-featured-weight',
                    'orderby' => 'meta_value_num',
					'order' => 'ASC'
				)
			);

			$project_count = 0;
			while ( $pieces_query->have_posts() ) : $pieces_query->the_post();
				$project_count++;
				$piece_data = get_post_custom();
				$parent_id = $piece_data["_wpcf_belongs_types_id"][0];
				$type_query = get_posts(
					array(
						'post_type' => 'types',
						'p' => $parent_id
					)
				);
				$type = $type_query[0]->post_title;
				$category = str_replace(' ', '-', strtolower($type));
				$permalink = get_permalink($id);
				$link = "/$category";
		?>
		<div class="item b10" cat="<?php echo $category; ?>" pid="<?php echo $pieces_query->post->ID; ?>" href="#!<?php echo $link; ?>" data-view="<?php echo $permalink; ?>">
			<div class="container" data-link="<?php echo $link; ?>">
				<div class="card shadow">
					<div class="front face">
						<img class="img preventHomePageLinkage" src="<?php echo $piece_data["wpcf-main-thumbnail"][0]; ?>" width="150" height="150" />
					</div>
					<div class="back face">
						<h3><?php echo $pieces_query->post->post_title; ?></h3>
						<p><?php echo $type; ?></p>
					</div>
				</div>
			</div>			
		</div>
        <?php endwhile; wp_reset_postdata(); ?>

        <?php 
			//fill in blank if needed
			for($blank_count=0; $blank_count < 15-$project_count; $blank_count++):
		?>
			<div class="item blank b10">
            	<div class="img" style="z-index:0;"></div>
			</div>
		<?php endfor; ?>
        <div class="clear"></div>
        
		<?php 
			$id = 19;
			$post = get_post($id);
			if ($post){
				setup_postdata($post); 
				the_content();
			}
		?>
    </div>
</div>