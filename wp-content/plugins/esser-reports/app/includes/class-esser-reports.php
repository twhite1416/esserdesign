<?php
namespace Esser_Design\Includes;

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class Custom_Reports
 *
 * @since 0.1.0
 */
class Esser_Reports {

  public function __construct() {
    add_action( 'init', array( $this, 'reports_cpt' ), 0 );
    add_action( 'cmb2_admin_init', array( $this, 'add_metaboxes' ) );
    add_filter( 'template_include', array( $this, 'load_template' ), 99 );
  }

  public function reports_cpt() {

    $labels = array(
      'name'                  => _x( 'Reports', 'Post Type General Name', 'text_domain' ),
      'singular_name'         => _x( 'Report', 'Post Type Singular Name', 'text_domain' ),
      'menu_name'             => __( 'Reports', 'text_domain' ),
      'name_admin_bar'        => __( 'Report', 'text_domain' ),
      'archives'              => __( 'Report Archives', 'text_domain' ),
      'attributes'            => __( 'Report Attributes', 'text_domain' ),
      'parent_item_colon'     => __( 'Parent Report:', 'text_domain' ),
      'all_items'             => __( 'All Reports', 'text_domain' ),
      'add_new_item'          => __( 'Add New Report', 'text_domain' ),
      'add_new'               => __( 'Add New', 'text_domain' ),
      'new_item'              => __( 'New Report', 'text_domain' ),
      'edit_item'             => __( 'Edit Report', 'text_domain' ),
      'update_item'           => __( 'Update Report', 'text_domain' ),
      'view_item'             => __( 'View Report', 'text_domain' ),
      'view_items'            => __( 'View Reports', 'text_domain' ),
      'search_items'          => __( 'Search Report', 'text_domain' ),
      'not_found'             => __( 'Not found', 'text_domain' ),
      'not_found_in_trash'    => __( 'Not found in Trash', 'text_domain' ),
      'featured_image'        => __( 'Featured Image', 'text_domain' ),
      'set_featured_image'    => __( 'Set featured image', 'text_domain' ),
      'remove_featured_image' => __( 'Remove featured image', 'text_domain' ),
      'use_featured_image'    => __( 'Use as featured image', 'text_domain' ),
      'insert_into_item'      => __( 'Insert into report', 'text_domain' ),
      'uploaded_to_this_item' => __( 'Uploaded to this report', 'text_domain' ),
      'items_list'            => __( 'Reports list', 'text_domain' ),
      'items_list_navigation' => __( 'Reports list navigation', 'text_domain' ),
      'filter_items_list'     => __( 'Filter reports list', 'text_domain' ),
    );

    $args = array(
      'label'                 => __( 'Report', 'text_domain' ),
      'description'           => __( 'Post Type Description', 'text_domain' ),
      'labels'                => $labels,
      'supports'              => array( 'title', ),
      'hierarchical'          => false,
      'public'                => true,
      'show_ui'               => true,
      'show_in_menu'          => true,
      'menu_position'         => 5,
      'menu_icon'             => 'dashicons-media-document',
      'show_in_admin_bar'     => true,
      'show_in_nav_menus'     => true,
      'can_export'            => true,
      'has_archive'           => true,		
      'exclude_from_search'   => true,
      'publicly_queryable'    => true,
      'capability_type'       => 'page',
      'show_in_rest'          => true,
    );

    register_post_type( 'reports', $args );
  }

  public function add_metaboxes() {

    // Start with an underscore to hide fields from custom fields list
    $prefix = 'er_';

    /**
     * Initiate the metabox
     */
    $cmb = new_cmb2_box( array(
      'id'            => 'test_metabox',
      'title'         => __( 'Report Information', 'cmb2' ),
      'object_types'  => array( 'reports', ), // Post type
      'context'       => 'normal',
      'priority'      => 'high',
      'show_names'    => true, // Show field names on the left
      // 'cmb_styles' => false, // false to disable the CMB stylesheet
      // 'closed'     => true, // Keep the metabox closed by default
    ) );

    // Client
    $cmb->add_field( array(
      'name'       => __( 'Client', 'cmb2' ),
      'id'         => $prefix . 'client',
      'type'       => 'text',
    ) );

    // Core Updates
    $cmb->add_field( array(
      'name'       => __( 'Core Updates', 'cmb2' ),
      'desc' => __( 'How many updates where made to WordPress Core.', 'cmb2' ),
      'id'         => $prefix . 'core_updates',
      'type'       => 'text',
    ) );

    // Core Current Version
    $cmb->add_field( array(
      'name'       => __( 'Core Current Version', 'cmb2' ),
      'desc' => __( 'Current version of WordPress.', 'cmb2' ),
      'id'         => $prefix . 'core_current',
      'type'       => 'text',
    ) );

    // Hide Plugins
    $cmb->add_field( array(
      'name'       => __( 'Hide Plugins', 'cmb2' ),
      'desc' => __( 'Hide the plugins section on your report.', 'cmb2' ),
      'id'         => $prefix . 'hide_plugins',
      'type' => 'checkbox',
    ) );

    // Plugins Repeater
    $group_plugins = $cmb->add_field( array(
      'id'          => $prefix . 'plugins',
      'type'        => 'group',
      'description' => __( 'Add each plugin that was updated', 'cmb2' ),
      // 'repeatable'  => false, // use false if you want non-repeatable group
      'options'     => array(
        'group_title'   => __( 'Updated Plugin {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
        'add_button'    => __( 'Add Plugin Update', 'cmb2' ),
        'remove_button' => __( 'Remove Entry', 'cmb2' ),
        'sortable'      => true, // beta
        // 'closed'     => true, // true to have the groups closed by default
      ),
    ) );

    $cmb->add_group_field( $group_plugins, array(
      'name' => 'Plugin Name',
      'id'   => 'name',
      'type' => 'text',
    ) );

    $cmb->add_group_field( $group_plugins, array(
      'name' => 'Plugin Version',
      'id'   => 'version',
      'type' => 'text',
    ) );

    $cmb->add_group_field( $group_plugins, array(
      'name' => 'Date',
      'id'   => 'date',
      'type' => 'text_date',
    ) );

    // Downtime
    $cmb->add_field( array(
      'name'       => __( 'Downtime', 'cmb2' ),
      'desc' => __( 'In seconds', 'cmb2' ),
      'id'         => $prefix . 'downtime',
      'type'       => 'text',
    ) );

    // Uptime Percent
    $cmb->add_field( array(
      'name'       => __( 'Uptime', 'cmb2' ),
      'desc' => __( 'In percent', 'cmb2' ),
      'id'         => $prefix . 'uptime',
      'type'       => 'text',
    ) );

    // Response Time
    $cmb->add_field( array(
      'name'       => __( 'Response Time', 'cmb2' ),
      'desc' => __( 'In milliseconds', 'cmb2' ),
      'id'         => $prefix . 'response',
      'type'       => 'text',
    ) );

    // Hide Notifications
    $cmb->add_field( array(
      'name'       => __( 'Hide Notifications', 'cmb2' ),
      'desc' => __( 'Hide the notifications section on your report.', 'cmb2' ),
      'id'         => $prefix . 'hide_notifications',
      'type' => 'checkbox',
    ) );

    // Notifications Repeater
    $group_notifications = $cmb->add_field( array(
      'id'          => $prefix . 'notifications',
      'type'        => 'group',
      'description' => __( 'Add any notifications for report', 'cmb2' ),
      // 'repeatable'  => false, // use false if you want non-repeatable group
      'options'     => array(
        'group_title'   => __( 'Notification {#}', 'cmb2' ), // since version 1.1.4, {#} gets replaced by row number
        'add_button'    => __( 'Add Notification', 'cmb2' ),
        'remove_button' => __( 'Remove Notification', 'cmb2' ),
        'sortable'      => true, // beta
        // 'closed'     => true, // true to have the groups closed by default
      ),
    ) );

    $cmb->add_group_field( $group_notifications, array(
      'name' => 'Type',
      'id'   => 'type',
      'type' => 'select',
      'options'          => array(
        'update' => __( 'Industry Update', 'cmb2' ),
        'warning'   => __( 'Warning', 'cmb2' ),
        'bug'     => __( 'Bug Fix', 'cmb2' ),
      ),
    ) );

    $cmb->add_group_field( $group_notifications, array(
      'name' => 'Message',
      'id'   => 'message',
      'type' => 'text',
    ) );

    $cmb->add_group_field( $group_notifications, array(
      'name' => 'Link',
      'id'   => 'link',
      'type' => 'text_url',
      'protocols' => array( 'http', 'https', 'mailto' ), // Array of allowed protocols
    ) );
  
  }

  /**
   * Load report template
   *
   * @param [type] $template
   * @return void
   */
  public function load_template( $template ) {

    // Get current post id
    $post_id = get_the_ID();

    // Get current post type
    $post_type = get_post_type( $post_id );

    // Check if viewing a report
    if ( $post_type != 'reports' ):

    else:

      $template = ESSER_REPORTS_PLUGIN_PATH . 'templates/single-report.php';

    endif;

    return $template;
  }
}