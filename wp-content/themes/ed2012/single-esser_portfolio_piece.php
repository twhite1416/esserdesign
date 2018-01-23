<?php get_header(); ?>

	THIS IS THE RIGHT PAGE
	
	<?php
	$args = array( 'post_type' => 'product', 'posts_per_page' => 10 );
	$loop = new WP_Query( $args );
	while ( $loop->have_posts() ) : $loop->the_post();
		the_title();
		echo '<div class="entry-content">';
		the_content();
		echo '</div>';
	endwhile;
	?>
	
	<header>
		<nav class="main">
			<ul>
			</ul>
		</nav>
		<h1>Arizona State University</h1>
		<nav>
			<ul>
				<li><a href="#back">Back</a></li>
				<li><a href="#forward">Forward</a></li>
				<li><span class="current-page">1</span> of <span class="total-pages">15</span></li>
			</ul>
		</nav>
	</header>
	
	<section id="">
		<figure>
			<img src="" alt="Identity Program" />
		</figure>
		
		<h4>Identity Program</h4>
		<p>We offer an integrated approach to brand development, working with both sides of our brain. Good work requires good research and planning. Therefore we oer primary and secondary research, marketing planning, brand strategy and positioning.</p>
		<img src="" alt="" />
		<nav>
			<a href="#previous">&lt;&lt;</a>
			<a href="#next">&gt;&gt;</a>
		</nav>
	</section>

	<section id="">
		<figure>
			<img src="" alt="Identity Program" />
		</figure>
		
		<h4>Identity Program</h4>
		<p>We offer an integrated approach to brand development, working with both sides of our brain. Good work requires good research and planning. Therefore we oer primary and secondary research, marketing planning, brand strategy and positioning.</p>
		<img src="" alt="" />
		<nav>
			<a href="#previous">&lt;&lt;</a>
			<a href="#next">&gt;&gt;</a>
		</nav>
	</section>

	<section id="">
		<figure>
			<img src="" alt="Identity Program" />
		</figure>
		
		<h4>Identity Program</h4>
		<p>We offer an integrated approach to brand development, working with both sides of our brain. Good work requires good research and planning. Therefore we oer primary and secondary research, marketing planning, brand strategy and positioning.</p>
		<img src="" alt="" />
		<nav>
			<a href="#previous">&lt;&lt;</a>
			<a href="#next">&gt;&gt;</a>
		</nav>
	</section>

	<section id="">
		<figure>
			<img src="" alt="Identity Program" />
		</figure>
		
		<h4>Identity Program</h4>
		<p>We offer an integrated approach to brand development, working with both sides of our brain. Good work requires good research and planning. Therefore we oer primary and secondary research, marketing planning, brand strategy and positioning.</p>
		<img src="" alt="" />
		<nav>
			<a href="#previous">&lt;&lt;</a>
			<a href="#next">&gt;&gt;</a>
		</nav>
	</section>

<?php get_footer(); ?>
