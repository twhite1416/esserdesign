<?php
  $assets_url = ESSER_REPORTS_PLUGIN_URL . 'assets/dist/';

  $post_id = get_the_ID();
  $client = get_post_meta( $post_id, 'er_client', true );
  $core_updates = intval( get_post_meta( $post_id, 'er_core_updates', true ) );
  $core_current = get_post_meta( $post_id, 'er_core_current', true );

  $hide_plugins = get_post_meta( $post_id, 'er_hide_plugins', true );

  // Get plugins array
  $plugins = get_post_meta( $post_id, 'er_plugins', true );

  // Add core updates and plugin updates
  $total_updates = $core_updates + count( $plugins );

  $downtime = intval( get_post_meta( $post_id, 'er_downtime', true ) );
  $downtime_hours = floor( $downtime / 3600 );
  $downtime_minutes = floor( ( $downtime / 60 ) % 60 );
  $downtime_seconds = $downtime % 60;

  $uptime = get_post_meta( $post_id, 'er_uptime', true );
  $uptime_meter = intval( number_format( ( $uptime - 99.90 ), 3 ) * 1000 ) . '%';

  $response_ms = get_post_meta( $post_id, 'er_response', true );
  $response_sec = $response_ms / 1000;

  $hide_notifications = get_post_meta( $post_id, 'er_hide_notifications', true );

  // Get notifications array
  $notifications = get_post_meta( $post_id, 'er_notifications', true );
?>

<!DOCTYPE html>

<html>

  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">
    <title>Esser Design &ndash; Website Maintenance Report</title>
    <link rel="stylesheet" href="<?php echo $assets_url; ?>styles/main.css" />
    <script src="https://use.typekit.net/shs2zhw.js"></script>
    <script>try{Typekit.load({ async: true });}catch(e){}</script>


  </head>

  <body>

    <header class="navbar" role="banner">
      <div class="navbar-line"></div>
      <div class="navbar-header">
        <div class="container">
          <a class="navbar-brand" href="http://esserdesign.com/"><span class="dark">esser</span>design</a>
        </div>
      </div>
    </header>

    <main>

      <div id="app">

        <section class="page-section intro">
          <div class="container">
            <h2>Esser Design &ndash; Website Maintenance Report</h2>
            <h1><?php echo $client; ?></h1>
            <p>We&#8217;ve been taking care of things behind the scenes. Here&#8217;s a recap of what&#8217;s happening:</p>
          </div>
        </section>

        <div class="accordion-main">
          <div class="updates accordion closed" data-accordion="closed">

            <div class="accordion-header">
              <div class="container">
                <div class="badge">
                  <span><?php echo $total_updates; ?></span>
                </div>

                <h2>Updates</h2>
                <p class="description">Before making any updates, we always make a backup of your site. When updates are finished, we test them to make sure they were applied correctly and didn&#8217;t cause any conflicts.</p>
              </div>
            </div>

            <div class="accordion-content">
              <div class="highlight-section">
                <div class="container">
                  <div class="row">
                    <div class="col-2">
                      <h3>WordPress</h3>
                      <p>Updates to WordPress core that require an upgrade to the newest version.</p>
                    </div>

                    <div class="col-2">
                      <h3>Themes / Plugins</h3>
                      <p>Updates that WordPress makes that requires an upgrade to the newest version.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">

                <div class="row">
                  <div class="col-2 wordpress-updates">

                    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="255px" height="257.708px" viewBox="0 0 255 257.708" enable-background="new 0 0 255 257.708" xml:space="preserve">
                    
                      <g id="wordpress">
                        
                        <path class="logo" fill="#E1E1D8" d="M221.802,129.33c0,6.207-0.605,12.354-1.816,18.441s-3.004,11.999-5.379,17.733
                          c-2.375,5.734-5.287,11.182-8.735,16.342c-3.448,5.161-7.367,9.936-11.756,14.325c-4.389,4.389-9.164,8.307-14.324,11.756
                          c-5.161,3.448-10.608,6.36-16.343,8.735c-5.734,2.375-11.645,4.168-17.733,5.379s-12.235,1.816-18.441,1.816
                          c-6.207,0-12.354-0.605-18.441-1.816s-11.998-3.004-17.733-5.379c-5.734-2.375-11.182-5.287-16.343-8.735
                          c-5.161-3.448-9.936-7.367-14.324-11.756c-4.389-4.389-8.307-9.164-11.756-14.325c-3.448-5.161-6.36-10.608-8.735-16.342
                          c-2.375-5.734-4.168-11.646-5.379-17.733s-1.816-12.235-1.816-18.441s0.605-12.354,1.816-18.441
                          c1.211-6.088,3.004-11.999,5.379-17.733c2.375-5.734,5.287-11.182,8.735-16.343s7.367-9.936,11.756-14.324
                          c4.389-4.389,9.164-8.307,14.324-11.756c5.161-3.448,10.608-6.36,16.343-8.735c5.734-2.375,11.645-4.168,17.733-5.379
                          s12.235-1.816,18.441-1.816c6.207,0,12.354,0.605,18.441,1.816s11.998,3.004,17.733,5.379c5.734,2.375,11.182,5.287,16.343,8.735
                          c5.161,3.449,9.936,7.367,14.324,11.756c4.389,4.389,8.307,9.164,11.756,14.324s6.36,10.608,8.735,16.343
                          c2.375,5.734,4.168,11.645,5.379,17.733C221.197,116.976,221.802,123.124,221.802,129.33z"></path>
                        <path fill="#FFFFFF" d="M212.571,141.078c-3.712,26.748-19.707,49.594-42.055,62.643l6.811-19.746l19.439-56.214
                          c4.898-12.284,6.544-22.08,6.544-30.767c0-3.138-0.191-6.123-0.574-8.878c6.735,12.284,10.562,26.328,10.562,41.29
                          C213.298,133.348,213.068,137.252,212.571,141.078z M139.137,88.997c5.166-0.268,9.835-0.842,9.835-0.842
                          c4.669-0.497,4.095-7.385-0.574-7.079c0,0-13.929,1.072-22.922,1.072c-8.457,0-22.654-1.072-22.654-1.072
                          c-4.592-0.306-5.166,6.812-0.497,7.079c0,0,4.362,0.574,8.993,0.842l13.432,36.698l-18.827,56.481l-31.34-93.179
                          c5.204-0.268,9.873-0.842,9.873-0.842c4.592-0.497,4.095-7.385-0.574-7.079c0,0-13.929,1.072-22.922,1.072
                          c-1.645,0-3.521-0.038-5.549-0.115c15.383-23.266,41.825-38.688,71.865-38.688c22.424,0,42.82,8.572,58.089,22.539
                          c-0.383,0-0.765-0.076-1.11-0.076c-8.457,0-14.427,7.385-14.427,15.307c0,7.079,4.095,13.049,8.457,20.128
                          c3.291,5.74,7.118,13.087,7.118,23.726c0,7.385-2.219,16.608-6.544,27.781l-8.61,28.738L139.137,88.997z M138.372,214.665
                          c-3.635,0.459-7.385,0.689-11.136,0.689c-8.457,0-16.569-1.263-24.223-3.521l9.375-27.399h0.077l16.302-47.604l26.442,72.477
                          c0.191,0.383,0.421,0.842,0.612,1.148C150.235,212.407,144.418,213.861,138.372,214.665z M41.251,129.369
                          c0-12.475,2.717-24.299,7.5-34.976l40.984,112.389C61.073,192.815,41.251,163.349,41.251,129.369z M127.236,33.664
                          c-52.693,0-95.628,42.935-95.628,95.705c0,52.77,42.935,95.628,95.628,95.628c4.209,0,8.38-0.229,12.398-0.88
                          c42.706-5.472,76.648-39.224,82.35-81.776c0.612-4.209,0.957-8.572,0.957-12.973C222.941,76.599,180.006,33.664,127.236,33.664z"></path>
                        <circle fill="none" stroke="#F1F1EC" stroke-width="10" cx="127.274" cy="129.33" r="118"></circle>
                      </g>
                    </svg>

                    <?php if ( $core_updates > 1 ): ?>
                      <h3><?php echo $core_updates; ?> Updates Completed</h3>
                    <?php elseif ( $core_updates == 1 ): ?>
                      <h3><?php echo $core_updates; ?> Update Completed</h3>
                    <?php else: ?>
                      <h3>No Updates Required</h3>
                    <?php endif; ?>

                    <?php if ( $core_updates >= 1 ): ?>
                      <p>Current Version: <?php echo $core_current; ?></p>
                    <?php endif; ?>

                  </div>

                  <div class="col-2 plugin-updates">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="246.439px" height="244.973px" viewBox="0 0 246.439 244.973" enable-background="new 0 0 246.439 244.973" xml:space="preserve">
                      <g id="plugins">
                        <path class="line" fill="none" stroke="#F1F1EC" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" d="M123.85,183.151
                          c0,16.316,3.916,62.218-27.193,54.931c-16.642-3.916-31.871-12.183-43.401-20.45c-26.323-19.144-46.881-55.583-46.881-93.98
                          C6.374,58.823,59.021,6.177,123.85,6.177s117.475,52.646,117.475,117.476c0,59.608-44.38,108.773-101.812,116.387"/>
                        <path fill="#9aca3c" d="M73.791,108.281v25.197c0,18.15,9.929,34.165,24.556,42.813v9.716c0,8.542,6.94,15.481,15.481,15.481h19.218
                          c8.541,0,15.481-6.939,15.481-15.481v-9.716c14.627-8.648,24.556-24.663,24.556-42.813v-25.197H73.791z"/>
                        <path fill="#9aca3c" d="M181.411,95.79c-0.214,0.534-0.534,1.174-0.747,1.708c-1.708,3.31-4.484,4.804-8.114,4.804
                          c-23.275,0-44.522,0-67.797,0c-10.143,0-18.15,0-28.293,0c-5.125,0-7.367-1.602-9.289-6.299c0-0.107-0.107-0.107-0.214-0.213
                          c0-1.174,0-2.349,0-3.523c0.107-0.107,0.214-0.213,0.214-0.32c1.601-4.377,4.164-6.192,8.755-6.192c3.31,0,4.484,0,7.687,0
                          c1.281,0,2.989,0,4.377,0c0-0.747,0-1.388,0-1.922c0-10.997,0-17.723,0-28.72c0-3.203,0.854-6.193,3.096-8.648
                          c1.708-1.921,3.95-2.776,6.299-3.523c1.281,0,1.708,0,2.989,0c0.961,0.32,1.922,0.641,2.883,1.067
                          c4.484,2.242,6.406,6.086,6.406,10.997c0,11.104,0,17.83,0,28.934c0,0.534,0,1.174,0,1.815c9.502,0,19.645,0,29.04,0
                          c0-0.641,0-1.174,0-1.815c0-11.104,0-17.83,0-28.934c0-3.31,0.854-6.192,3.096-8.648c1.708-1.815,3.95-2.669,6.193-3.523
                          c1.281,0,1.708,0,2.989,0c2.349,0.748,4.591,1.708,6.299,3.523c2.242,2.456,3.096,5.445,3.096,8.648c0,11.104,0,17.83,0,28.934
                          c0,0.534,0.107,1.174,0.107,1.815c0.747,0,1.708,0,2.242,0c4.377,0,6.62,0,10.997,0c1.815,0,3.63,0.534,4.804,1.922
                          s2.029,2.99,2.99,4.591C181.411,93.334,181.411,94.508,181.411,95.79z"/>
                      </g>
                    </svg>

                    <?php if ( count( $plugins ) > 1 && $hide_plugins != 'on' ): ?>
                      <h3><?php echo count( $plugins ); ?> Updates Completed</h3>
                      <?php elseif ( count( $plugins ) == 1 && $hide_plugins != 'on' ): ?>
                      <h3><?php echo count( $plugins ); ?> Update Completed</h3>
                    <?php else: ?>
                      <h3>No Updates Required</h3>
                    <?php endif; ?>

                    <?php if ( ! empty( $plugins ) && $hide_plugins != 'on' ): ?>
                      <p>
                      <?php foreach( $plugins as $plugin ): ?>
                        <span class="collection-item">
                          <strong><?php echo esc_html( $plugin['name'] ); ?></strong> &ndash; Version: <?php echo esc_html( $plugin['version'] ); ?>
                        </span>
                      <?php endforeach; ?>
                      </p>                        
                    <?php endif; ?>

                    <p class="see-more">See &quot;Themes &amp; Plugins&quot; section below for more information.</p>

                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="testing accordion closed" data-accordion="closed">

            <div class="accordion-header">
              <div class="container">
                <div class="badge">
                  <span>2</span>
                </div>

                <h2>Testing</h2>
              </div>
            </div>

            <div class="accordion-content">
              <div class="highlight-section">
                <div class="container">
                  <div class="row">
                    <div class="col-2">
                      <h3>Up / Downtime</h3>
                      <p>Planned &amp; unplanned time &ndash; from server issues to scheduled maintenance.</p>
                    </div>

                    <div class="col-2">
                      <h3>Average Response Time</h3>
                      <p>How long it takes for your server to respond and start loading your site.</p>
                    </div>
                  </div>
                </div>
              </div>

              <div class="container">

                <div class="row">
                  <div class="col-2 up-down-time">
                    <h3>Total Downtime:</h3>

                    <div class="timer">
                      <div class="hrs">
                        <span class="number"><span class="counter" data-number="<?php echo $downtime_hours; ?>">00</span></span>
                        <span class="label">hrs</span>
                      </div>

                      <span class="spacer">:</span>

                      <div class="min">
                        <span class="number"><span class="counter" data-number="<?php echo $downtime_minutes; ?>">00</span></span>
                        <span class="label">min</span>
                      </div>

                      <span class="spacer">:</span>

                      <div class="sec">
                        <span class="number"><span class="counter" data-number="<?php echo $downtime_seconds; ?>">00</span></span>
                        <span class="label">sec</span>
                      </div>
                    </div>

                    <div class="meter-wrapper">
                      <div class="meter-percent">
                        <span><?php echo $uptime; ?>%</span>
                      </div>
                      <div class="meter">
                        <span style="width: <?php echo $uptime_meter; ?>"></span>
                      </div>
                      <div class="meter-labels">
                        <span class="first">99.9% Up<br>Industry Standard</span>
                        <span class="last">100% Up</span>
                      </div>
                    </div>
                  </div>

                  <div class="col-2 response-time">
                    <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        width="247.145px" height="282.114px" viewBox="0 0 247.145 282.114" enable-background="new 0 0 247.145 282.114"
                        xml:space="preserve">
                    <g>
                      <path class="watch-stroke" fill="none" stroke="#F1F1EC" stroke-width="10" stroke-linecap="round" stroke-miterlimit="10" d="M241.051,159.302
                        c0,7.716-0.753,15.358-2.258,22.926s-3.734,14.916-6.687,22.045c-2.953,7.129-6.573,13.901-10.859,20.317
                        c-4.287,6.416-9.158,12.352-14.615,17.808c-5.456,5.456-11.392,10.328-17.808,14.615c-6.416,4.287-13.188,7.907-20.317,10.859
                        c-7.129,2.953-14.477,5.182-22.045,6.688c-7.568,1.505-15.21,2.258-22.926,2.258c-7.716,0-15.358-0.753-22.926-2.258
                        c-7.568-1.505-14.916-3.735-22.045-6.688c-7.129-2.953-13.901-6.573-20.317-10.859c-6.416-4.287-12.352-9.158-17.808-14.615
                        c-5.456-5.456-10.328-11.392-14.615-17.808c-4.287-6.416-7.907-13.188-10.859-20.317c-2.953-7.129-5.182-14.477-6.687-22.045
                        s-2.258-15.21-2.258-22.926s0.753-15.358,2.258-22.926c1.505-7.568,3.734-14.917,6.687-22.045
                        c2.953-7.129,6.573-13.901,10.859-20.317s9.158-12.352,14.615-17.808s11.392-10.328,17.808-14.615
                        c6.416-4.287,13.188-7.907,20.317-10.859c7.129-2.953,14.477-5.182,22.045-6.688c7.568-1.505,15.21-2.258,22.926-2.258
                        c7.716,0,15.358,0.752,22.926,2.258c7.568,1.505,14.916,3.735,22.045,6.688c7.129,2.953,13.901,6.573,20.317,10.859
                        c6.416,4.287,12.352,9.159,17.808,14.615s10.328,11.392,14.615,17.808c4.287,6.416,7.907,13.188,10.859,20.317
                        c2.953,7.129,5.182,14.477,6.687,22.045C240.299,143.944,241.051,151.586,241.051,159.302z"/>
                      <path fill="#E1E1D8" d="M227.668,80.85l-23.829-23.83c-1.741-1.741-1.741-4.461,0-6.202l11.969-11.969
                        c1.741-1.741,4.461-1.741,6.202,0l23.829,23.83c1.741,1.741,1.741,4.461,0,6.202L233.87,80.85
                        C232.129,82.59,229.3,82.59,227.668,80.85z"/>
                      <path fill="#E1E1D8" d="M218.2,158.945c0,6.207-0.605,12.354-1.816,18.441c-1.211,6.087-3.004,11.998-5.379,17.733
                        s-5.287,11.182-8.735,16.343c-3.448,5.161-7.367,9.936-11.756,14.324c-4.389,4.389-9.164,8.307-14.324,11.756
                        c-5.161,3.448-10.608,6.36-16.343,8.735s-11.645,4.168-17.733,5.379c-6.088,1.211-12.235,1.816-18.441,1.816
                        c-6.207,0-12.354-0.605-18.441-1.816c-6.088-1.211-11.999-3.004-17.733-5.379c-5.734-2.375-11.182-5.287-16.343-8.735
                        c-5.161-3.448-9.936-7.367-14.324-11.756c-4.389-4.389-8.307-9.164-11.756-14.324c-3.448-5.161-6.36-10.608-8.735-16.343
                        s-4.168-11.645-5.379-17.733c-1.211-6.088-1.816-12.235-1.816-18.441c0-6.207,0.605-12.354,1.816-18.441
                        c1.211-6.088,3.004-11.999,5.379-17.733s5.287-11.182,8.735-16.343c3.448-5.161,7.367-9.936,11.756-14.324
                        c4.389-4.389,9.164-8.308,14.324-11.756s10.608-6.36,16.343-8.735c5.734-2.375,11.645-4.168,17.733-5.379
                        c6.088-1.211,12.235-1.816,18.441-1.816c6.207,0,12.354,0.605,18.441,1.816c6.088,1.211,11.998,3.004,17.733,5.379
                        c5.734,2.375,11.182,5.287,16.343,8.735s9.936,7.367,14.324,11.756c4.389,4.389,8.307,9.164,11.756,14.324
                        c3.448,5.161,6.36,10.608,8.735,16.343s4.168,11.645,5.379,17.733C217.595,146.591,218.2,152.738,218.2,158.945z"/>
                      <path fill="#FFFFFF" d="M49.995,158.966c-2.107,0-3.85-1.875-3.85-4.142c0-2.267,1.744-4.142,3.85-4.142
                        c2.107,0,3.85,1.875,3.85,4.142C53.845,157.09,52.102,158.966,49.995,158.966z"/>
                      <path fill="#FFFFFF" d="M61.764,202.182c-1.889,1.172-4.214,0.469-5.303-1.563s-0.436-4.533,1.453-5.705
                        c1.889-1.172,4.214-0.469,5.303,1.563C64.234,198.509,63.58,201.088,61.764,202.182z"/>
                      <path fill="#FFFFFF" d="M63.217,121.455c-1.09,2.032-3.414,2.657-5.303,1.563c-1.889-1.172-2.47-3.673-1.453-5.705
                        c1.09-2.032,3.414-2.657,5.303-1.563C63.58,116.922,64.234,119.423,63.217,121.455z"/>
                      <path fill="#FFFFFF" d="M90.169,229.69c-1.09,2.032-3.414,2.657-5.303,1.563c-1.889-1.172-2.47-3.673-1.453-5.705
                        c1.09-2.032,3.414-2.657,5.303-1.563C90.604,225.158,91.258,227.737,90.169,229.69z"/>
                      <path fill="#FFFFFF" d="M88.716,93.946c-1.889,1.172-4.214,0.469-5.303-1.563c-1.09-2.032-0.436-4.533,1.453-5.705
                        c1.889-1.172,4.214-0.469,5.303,1.563C91.258,90.195,90.604,92.774,88.716,93.946z"/>
                      <path fill="#FFFFFF" d="M157.15,88.241c1.09-2.032,3.414-2.657,5.303-1.563c1.889,1.172,2.47,3.673,1.453,5.705
                        c-1.09,2.032-3.414,2.657-5.303,1.563C156.714,92.774,156.06,90.195,157.15,88.241z"/>
                      <path fill="#FFFFFF" d="M123.659,75.503c2.107,0,3.85,1.876,3.85,4.142c0,2.266-1.744,4.142-3.85,4.142
                        c-2.107,0-3.85-1.876-3.85-4.142C119.809,77.379,121.553,75.503,123.659,75.503z"/>
                      <path fill="#FFFFFF" d="M123.659,242.429c-2.107,0-3.85-1.875-3.85-4.142s1.744-4.142,3.85-4.142c2.107,0,3.85,1.875,3.85,4.142
                        S125.766,242.429,123.659,242.429z"/>
                      <path fill="#FFFFFF" d="M162.453,231.253c-1.889,1.172-4.214,0.469-5.303-1.563c-1.09-2.032-0.436-4.533,1.453-5.705
                        c1.889-1.172,4.214-0.469,5.303,1.563C164.923,227.581,164.342,230.081,162.453,231.253z"/>
                      <path fill="#FFFFFF" d="M169.245,207.979l-45.014-41.845c-0.703,0.145-1.407,0.291-2.188,0.291c-4.611,0-8.362-3.487-8.362-7.773
                        c0-4.286,3.751-7.773,8.362-7.773c4.611,0,8.362,3.487,8.362,7.773c0,0.727-0.156,1.38-0.313,2.034l45.014,41.845
                        c1.641,1.526,1.641,3.923,0,5.449C173.543,209.504,170.886,209.504,169.245,207.979z"/>
                      <path fill="#FFFFFF" d="M190.786,200.697c-1.09,2.032-3.414,2.657-5.303,1.563c-1.889-1.172-2.47-3.673-1.453-5.705
                        c1.09-2.032,3.414-2.657,5.303-1.563C191.294,196.165,191.875,198.744,190.786,200.697z"/>
                      <path fill="#FFFFFF" d="M189.406,122.939c-1.889,1.172-4.214,0.469-5.303-1.563s-0.436-4.533,1.453-5.705
                        c1.889-1.172,4.214-0.469,5.303,1.563C191.876,119.188,191.295,121.767,189.406,122.939z"/>
                      <path fill="#FFFFFF" d="M197.325,163.186c-2.107,0-3.85-1.875-3.85-4.142s1.744-4.142,3.85-4.142s3.85,1.875,3.85,4.142
                        S199.504,163.186,197.325,163.186z"/>
                      <path fill="#E1E1D8" d="M141.54,25.698h-33.7c-2.462,0-4.386-1.924-4.386-4.386V4.385c0-2.462,1.923-4.385,4.386-4.385h33.7
                        c2.462,0,4.386,1.923,4.386,4.385v16.927C145.926,23.774,143.925,25.775,141.54,25.698z"/>
                      <path fill="#E1E1D8" d="M131.54,32.698h-13.7c-2.462,0-4.386-1.924-4.386-4.386V11.385c0-2.462,1.923-4.385,4.386-4.385h13.7
                        c2.462,0,4.386,1.923,4.386,4.385v16.927C135.926,30.774,133.925,32.775,131.54,32.698z"/>
                    </g>
                    </svg>

                    <h3><?php echo number_format( $response_ms ); ?> ms</h3>
                    <p>(<?php echo round( $response_sec, 1 ); ?> seconds)<br>
                    Industry Standard: 2 seconds</p>
                  </div>
                </div>
              </div>

              <!-- <div class="broken-links">
                <div class="highlight-section">
                  <div class="container">
                    <h3>Broken Links</h3>
                    <p>A broken link or dead link is a link on a web page that no longer works. This could be a an improper URL entered for the link by the website content editor, or a webpage that no longer exists.</p>
                  </div>
                </div>

                <div class="table">
                  <div class="table-bg"></div>
                  <div class="container">
                    
                    <table>
                      <thead>
                        <tr>
                          <th>Broken Link URL</th>
                          <th>Correct Link URL</th>
                          <th>Resolution</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>http://www.jokake.com/about/what-we-do/</td>
                          <td>http://www.jokake.com/services</td>
                          <td><a href="#" class="btn">fix link now</a></td>
                        </tr>
                        <tr>
                          <td>http://www.jokake.com/news/</td>
                          <td>http://www.jokake.com/2017/01/dutch-athletic-complex-dedication/</td>
                          <td><a href="#" class="btn">fix link now</a></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                <div class="container">
                  <p>If you have any questions regarding the above, <a href="mailto:holly@esserdesign.com" target="_blank">click here</a>.</p>
                </div>
              </div> -->

            </div>
          </div>

          <?php if ( $hide_plugins != 'on' ): ?>
            <div class="plugins accordion closed" data-accordion="closed">

              <div class="accordion-header">
                <div class="container">
                  <div class="badge">
                    <span><?php echo count( $plugins ); ?></span>
                  </div>

                  <h2>Themes / Plugins</h2>
                </div>
              </div>

              <div class="accordion-content">
                <div class="table">
                  <div class="table-bg"></div>
                  <div class="container">
                    
                    <table>
                      <thead>
                        <tr>
                          <th>Date</th>
                          <th>Action</th>
                          <th>Name</th>
                          <th>Details</th>
                        </tr>
                      </thead>
                      <tbody>
                        <?php if ( ! empty( $plugins ) ): ?>
                          <?php foreach( $plugins as $plugin ): ?>
                            <tr>
                              <td><?php echo esc_html( $plugin['date'] ); ?></td>
                              <td>Plugin Updated</td>
                              <td><?php echo esc_html( $plugin['name'] ); ?></td>
                              <td>Version: <?php echo esc_html( $plugin['version'] ); ?></td>
                            </tr>
                          <?php endforeach; ?>                
                        <?php endif; ?>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          <?php endif; ?>

          <?php if ( ! empty( $notifications ) && $hide_notifications != 'on' ): ?>
            <div class="notifications accordion closed" data-accordion="closed">

              <div class="accordion-header">
                <div class="container">
                  <div class="badge">
                    <span><?php echo count( $notifications ); ?></span>
                  </div>

                  <h2>Notifications</h2>
                </div>
              </div>

              <div class="accordion-content">
                <div class="container">
                  <?php foreach( $notifications as $notification ): ?>
                    <div class="notification-item">
                      <?php if ( $notification['type'] === 'update' || $notification['type'] === 'bug' ): ?>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          width="46.763px" height="46.72px" viewBox="0 0 46.763 46.72" enable-background="new 0 0 46.763 46.72" xml:space="preserve">
                          <g>
                            <path fill="#11BDE7" d="M46.76,23.38c0.157,11.914-9.504,23.369-23.402,23.34C9.382,46.692-0.078,35.109,0,23.206
                              C0.079,11.449,9.488,0.011,23.392,0C37.312-0.006,46.951,11.499,46.76,23.38z"/>
                            <path fill="#FFFFFF" d="M28.326,32.8c0.936,0,1.771-0.011,2.606,0c0.969,0.017,1.272,0.302,1.283,1.289
                              c0.022,1.396,0.022,2.791,0,4.186c-0.017,1.048-0.308,1.351-1.334,1.351c-4.315,0.006-8.636,0.006-12.951,0
                              c-1.037,0-1.334-0.292-1.351-1.328c-0.022-1.395-0.022-2.791,0-4.186c0.017-1.037,0.308-1.3,1.362-1.311
                              c0.801-0.011,1.608,0,2.471,0c0-3.262,0-6.428,0-9.729c-0.807,0-1.608,0.006-2.41,0c-1.143-0.011-1.412-0.28-1.423-1.457
                              c-0.011-1.328-0.017-2.662,0-3.99c0.011-1.104,0.291-1.379,1.39-1.384c2.953-0.006,5.907-0.006,8.86,0
                              c1.222,0,1.485,0.258,1.491,1.479c0.006,4.606,0.006,9.219,0.006,13.825C28.326,31.926,28.326,32.307,28.326,32.8z"/>
                            <path fill="#FFFFFF" d="M24.431,5.52c0.908,0,1.816-0.017,2.718,0.006c0.801,0.017,1.143,0.314,1.166,1.104
                              c0.034,1.519,0.034,3.043,0,4.562c-0.017,0.846-0.353,1.149-1.222,1.154c-1.81,0.017-3.626,0.017-5.436,0
                              c-0.801-0.011-1.143-0.319-1.16-1.11c-0.034-1.552-0.028-3.104,0-4.663c0.011-0.689,0.398-1.065,1.121-1.053
                              C22.554,5.525,23.49,5.52,24.431,5.52z"/>
                          </g>
                        </svg>
                      <?php elseif ( $notification['type'] === 'warning' ): ?>
                        <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                          width="50.409px" height="46.774px" viewBox="0 0 50.409 46.774" enable-background="new 0 0 50.409 46.774" xml:space="preserve">
                          <g>
                            <path fill="#F15F33" d="M368.999,231.466c-7.084,0-14.168,0.005-21.252-0.005c-2.213,0-3.788-1.228-3.944-3.239
                              c-0.057-0.751,0.192-1.617,0.56-2.296c3.793-7.048,7.639-14.069,11.473-21.097c3.286-6.027,6.581-12.048,9.851-18.085
                              c0.725-1.332,1.798-2.109,3.306-2.104c1.467,0.005,2.534,0.757,3.244,2.057c7.099,13.033,14.204,26.061,21.319,39.079
                              c0.627,1.146,0.912,2.286,0.332,3.508c-0.741,1.57-2.047,2.171-3.721,2.167c-6.364-0.011-12.727-0.005-19.091-0.005
                              C370.383,231.466,369.694,231.466,368.999,231.466z"/>
                            <path fill="#FFFFFF" d="M372.798,206.249c-0.088,2.037-0.207,4.079-0.254,6.115c-0.016,0.803-0.43,1.073-1.114,1.083
                              c-1.648,0.021-3.301,0.015-4.954,0c-0.689-0.005-1.099-0.291-1.119-1.078c-0.124-4.047-0.295-8.095-0.435-12.147
                              c-0.026-0.788,0.327-1.171,1.125-1.187c1.949-0.026,3.902-0.026,5.851,0c0.829,0.01,1.145,0.399,1.119,1.275
                              c-0.062,1.979-0.15,3.959-0.228,5.938C372.798,206.249,372.798,206.249,372.798,206.249z"/>
                            <path fill="#FFFFFF" d="M368.989,217.049c0.839,0,1.679,0.005,2.519,0c0.71-0.01,1.073,0.363,1.083,1.037
                              c0.021,1.71,0.031,3.415-0.005,5.125c-0.016,0.762-0.358,1.047-1.156,1.052c-1.648,0.015-3.296,0.015-4.944,0
                              c-0.782-0.011-1.114-0.306-1.13-1.083c-0.031-1.679-0.031-3.358,0-5.037c0.016-0.788,0.337-1.073,1.114-1.094
                              C367.31,217.033,368.149,217.049,368.989,217.049z"/>
                          </g>
                          <g>
                            <path fill="#F15F33" d="M25.204,46.826c-7.084,0-14.168,0.005-21.252-0.005c-2.213,0-3.788-1.228-3.944-3.239
                              c-0.057-0.751,0.192-1.617,0.56-2.296c3.793-7.048,7.639-14.069,11.473-21.097c3.286-6.027,6.581-12.048,9.851-18.085
                              C22.618,0.772,23.691-0.005,25.198,0c1.467,0.005,2.534,0.757,3.244,2.057c7.099,13.033,14.204,26.061,21.319,39.079
                              c0.627,1.146,0.912,2.286,0.332,3.508c-0.741,1.57-2.047,2.171-3.721,2.167c-6.364-0.011-12.727-0.005-19.091-0.005
                              C26.587,46.826,25.898,46.826,25.204,46.826z"/>
                            <path fill="#FFFFFF" d="M29.002,21.609c-0.088,2.037-0.207,4.079-0.254,6.115c-0.016,0.803-0.43,1.073-1.114,1.083
                              c-1.648,0.021-3.301,0.015-4.954,0c-0.689-0.005-1.099-0.291-1.119-1.078c-0.124-4.047-0.295-8.095-0.435-12.147
                              c-0.026-0.788,0.327-1.171,1.125-1.187c1.949-0.026,3.902-0.026,5.851,0c0.829,0.01,1.145,0.399,1.119,1.275
                              c-0.062,1.979-0.15,3.959-0.228,5.938C29.002,21.609,29.002,21.609,29.002,21.609z"/>
                            <path fill="#FFFFFF" d="M25.193,32.409c0.839,0,1.679,0.005,2.519,0c0.71-0.01,1.073,0.363,1.083,1.037
                              c0.021,1.71,0.031,3.415-0.005,5.125c-0.016,0.762-0.358,1.047-1.156,1.052c-1.648,0.015-3.296,0.015-4.944,0
                              c-0.782-0.011-1.114-0.306-1.13-1.083c-0.031-1.679-0.031-3.358,0-5.037c0.016-0.788,0.337-1.073,1.114-1.094
                              C23.514,32.393,24.354,32.409,25.193,32.409z"/>
                          </g>
                        </svg>
                      <?php endif; ?>

                      <?php if ( $notification['type'] === 'update' ): ?>
                        <p><strong>Industry Update:</strong> <?php echo esc_html( $notification['message'] ); ?></p>
                      <?php elseif ( $notification['type'] === 'warning' ): ?>
                        <p><strong>Warning:</strong> <?php echo esc_html( $notification['message'] ); ?></p>
                      <?php elseif ( $notification['type'] === 'bug' ): ?>
                        <p><strong>Bug Fix:</strong> <?php echo esc_html( $notification['message'] ); ?></p>
                      <?php endif; ?>

                      <?php if ( ! empty( $notification['link'] ) ): ?>
                        <?php if ( $notification['type'] === 'update' || $notification['type'] === 'bug' ): ?>
                          <a href="<?php echo esc_url( $notification['link'] ); ?>" class="btn" target="_blank">Learn More</a>
                        <?php elseif ( $notification['type'] === 'warning' ): ?>
                          <a href="<?php echo esc_url( $notification['link'] ); ?>" class="btn warning" target="_blank">Contact Us</a>
                        <?php endif; ?>
                      <?php endif; ?>
                    </div>
                  <?php endforeach; ?>
                </div>
              </div>
            </div>
          <?php endif; ?>

        </div>

      </div>

    </main>
    
    <footer>

      <div class="footer-1">
        <div class="container">
          <h3>Questions?</h3>
          <p>If you have any questions regarding any of the services above, feel free to reach out to us for additional support!</p>
          <a href="mailto:holly@esserdesign.com" target="_blank" class="btn">Contact Us</a>
        </div>
      </div>

      <div class="footer-2">
        <div class="container">
          <p>&copy; <?php echo date( 'Y' ); ?> Esser Design</p>
        </div>
      </div>
    </footer>

    <script src="https://code.jquery.com/jquery-2.2.4.min.js"></script>
    <script src="<?php echo $assets_url; ?>scripts/main.js"></script>
    
  </body>

</html>
