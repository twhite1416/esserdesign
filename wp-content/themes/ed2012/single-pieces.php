<!DOCTYPE html>

<!--[if lt IE 7 ]> <html <?php language_attributes(); ?> class="no-js ie6"> <![endif]-->
<!--[if IE 7 ]>    <html <?php language_attributes(); ?> class="no-js ie7"> <![endif]-->
<!--[if IE 8 ]>    <html <?php language_attributes(); ?> class="no-js ie8"> <![endif]-->
<!--[if IE 9 ]>    <html <?php language_attributes(); ?> class="no-js ie9"> <![endif]-->
<!--[if (gt IE 9)|!(IE)]><!--> <html <?php language_attributes(); ?> class="no-js"> <!--<![endif]-->

<head>
	<meta charset="utf-8">
	<!-- <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"> -->
	<meta http-equiv="Content-Type" content="<?php bloginfo('html_type'); ?>; charset=<?php bloginfo('charset'); ?>" />
	<meta name="robots" content="noindex, nofollow">

	<title><?php wp_title(''); ?></title>
	<?php wp_head(); ?>
	<link rel="shortcut icon" href="/assets/favicon.png" />
	<link rel="apple-touch-icon" href="/assets/apple-touch-icon.png" />
	
	<link rel="stylesheet" type="text/css" href="/assets/reset.css" />
	<link rel="stylesheet" href="/assets/style.css" />
	<noscript>
		<link rel="stylesheet" href="/assets/style-noscript.css">
	</noscript>
	<link rel="stylesheet" href="/assets/color.css">
	<!--[if lt IE 9]>
	<link rel="stylesheet" href="/assets/style-ie.css">
	<![endif]-->
	
	<script src="/assets/js/modernizr-1.7.min.js"></script>
	<script>!window.jQuery && document.write('<script src="/assets/js/jquery-1.7.min.js"><\/script>')</script>
	<script src="/assets/js/jquery.easing.1.3.js"></script>
	<script type="text/javascript" src="https://use.typekit.com/krt5jyn.js"></script>
	<script type="text/javascript">try{Typekit.load();}catch(e){}</script>    
	
	<script src="/assets/js/main.js"></script>
	<!--[if lte IE 9]>
	<script src="/assets/js/ie-projects.js"></script>
	<![endif]-->
</head>

<body>
	
	<?php /* This div is necessary so that jQuery can access the #samples node */ ?>
	<div>
	<div id="samples">
	
	<?php if (have_posts()) : while (have_posts()) : the_post(); ?>
		<?php
			$id = $post->ID;
			$title = $post->post_title;
			$piece_data = get_post_custom($id);
			$full_name = $piece_data['wpcf-full-name'][0];
			$piece_type_id = $piece_data['_wpcf_belongs_types_id'][0];
			$types_query = get_posts(array('post_type' => 'types', 'numberposts' => -1, 'orderby' => 'title', 'order' => 'ASC'));
			$l = count($types_query);
			
			// Loop through and find the first index
			for($i = 0; $i < $l; $i++):
				$item = $types_query[$i];
				if ($item->ID == $piece_type_id)
					break;
			endfor;
			
			$type = $types_query[$i];
			$type_id = $type->ID;
			$type_title = $type->post_title;
			$type_slug = str_replace(' ', '-', strtolower($type_title));

			$type_data = get_post_custom($type_id);
			$color = $type_data['wpcf-color'][0];
		?>
		
		<header class="header">
			<h1 style="color:rgb(<?php echo $color; ?>);"><a href="/projects/<?php echo $type_slug; ?>"><?php echo $type_title; ?></a></h1>
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

        <!-- Added the pieceHeader div to assist with resolving a display issue on iOS where the device scaling the content down resulted in some display artifacts. -->
		<div class="pieceHeader">
            <aside>
                <h1><?php echo $full_name; ?></h1>
                <nav data-type='{ "id": <?php echo $type_id; ?>, "slug": "<?php echo $type_slug; ?>" }'>
                    <ul>
                        <li><a href="#back" class="image main-sprite prev-arrow">Back</a></li>
                        <li><a href="#forward" class="image main-sprite next-arrow">Next</a></li>
                        <li><span class="current-page">1</span> of <span class="total-pages">15</span></li>
                    </ul>
                </nav>
            </aside>
        </div>

		<?php

			$samples_query = get_posts(array(
				'post_type' => 'samples',
				'numberposts' => -1,
				'meta_query' => array(array(
					'key' => '_wpcf_belongs_pieces_id',
					'value' => $id
				)),
				'meta_key' => 'wpcf-sort-order',
				'orderby' => 'meta_value',
				'order' => 'ASC'
			));

			$sl = count($samples_query);
			for ($si = 0; $si < $sl; $si++) :
				$vid = false;
				$sample = $samples_query[$si];
				$sample_id = $sample->ID;
				$sample_title = $sample->post_title;
				$sample_content = $sample->post_content;
				$sample_data = get_post_custom($sample_id);
				$sample_main_image = $sample_data["wpcf-main-image"][0];
				$sample_supporting_image = $sample_data["wpcf-supporting-image"][0];
				if($sample_data["wpcf-video"][0] == 1){
					$poster = $sample_data["wpcf-poster"][0];
					$mp4 = $sample_data["wpcf-mp4"][0];
					$ogv = $sample_data["wpcf-ogv"][0];
					$webm = $sample_data["wpcf-webm"][0];
					$vid = true;
				}
		?>
		<section>
			<figure class="main">
				<?php if($vid === true) { ?>
				
					<video class="video" width="790" height="" controls <?= $poster != '' ? 'poster="'.$poster.'"' : ''; ?>>
			        	<source src="<?=$mp4?>" type="video/mp4">
			        	<source src="<?=$ogv?>" type="video/ogg">
			        	<source src="<?=$webm?>" type="video/webm">
			    	</video>

				<?php } else { ?>
					<img src="<?php echo $sample_main_image; ?>" alt="Main Image" />
				<?php } ?>
			</figure>
			<div>
				<h3><?php echo $sample_title; ?></h3>
				<p><?php echo $sample_content; ?></p>
			</div>
			<figure class="support">
				<?php if ($sample_supporting_image): ?>
				<img src="<?php echo $sample_supporting_image; ?>" alt="Secondary Image" />
				<?php endif; ?>
			</figure>
			<aside>
				<?php if ($si > 0): ?>
				<a href="#" class="image main-sprite up-arrow">Previous</a>
				<?php endif; ?>
				
				<?php if ($si < $sl - 1): ?>
				<a href="#" class="image main-sprite down-arrow">Next</a>
				<?php endif; ?>
			</aside>
		</section>
		<?php endfor; ?>
			
	<?php endwhile; endif; ?>
	</div>
	</div>
	
</body>
</html>