<?php
namespace Esser_Design;

use WPAZ_Plugin_Base\V_2_5\Abstract_Plugin;
use Esser_Design\Includes\Esser_Reports;

/**
 * Class App
 */
class Init extends Abstract_Plugin {
    
    public static $autoload_class_prefix = __NAMESPACE__;
    protected static $current_file = __FILE__;
    public static $autoload_type = 'psr-4';
    // Set to 2 when you use 2 namespaces in the main app file
    public static $autoload_ns_match_depth = 1;
    
    public function onload( $instance ) {
        new Esser_Reports();
    } // END public function __construct
    
    public function init() {
        do_action( get_called_class() . '_before_init' );
        
        do_action( get_called_class() . '_after_init' );
    }
    
    public function authenticated_init() {
        if ( is_user_logged_in() ) {
            // Ready for wp-admin - but not required 
            //require_once( $this->installed_dir . '/admin/class-admin-app.php' );
            //$this->admin = new Admin/Admin_App( $this );
        }
    }
    
    protected function defines_and_globals() {
        define( 'ESSER_REPORTS_PLUGIN_PATH', plugin_dir_path( __FILE__ ) );
        define( 'ESSER_REPORTS_PLUGIN_URL', plugin_dir_url( __FILE__ ) );
    }
    
} // END class