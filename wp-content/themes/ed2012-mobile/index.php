<?php get_header(); ?>
<div id="container">
	<header id="header">
        <hgroup id="hgroup" class="b9">
            <div class="center">
                <h1><a href="<?php bloginfo('url'); ?>"><img src="/wp-content/themes/ed2012/images/grfx.png" /></a></h1>
                <!--
                <nav id="navigation">
                    <?php wp_nav_menu( array( 
                        'menu' => 'Main Menu',
                        'theme_location' => 'menu-1',
                        'sort_column' => 'menu_order',
                        'container_class' => 'menu-header', 
                    ) ); ?>
                </nav>
                -->
            </div>
        </hgroup>
        <div id="strip"></div>
    </header>
    <div id="main">
    </div>
</div>
<?php get_footer(); ?>