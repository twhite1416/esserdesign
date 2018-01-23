<?php
/**
 * Plugin Name: 	Esser Reports
 * Plugin URI: 		https://stephengreer.me
 * Description:  	Create custom designed website maintenance reports.
 * Version:      	1.1
 * Author:       	Stephen Greer
 * Author URI:   	https://stephengreer.me
 * License:      	GPLv2
 * License URI:  	https://www.gnu.org/licenses/gpl-2.0.html
**/

// avoid direct calls to this file, because now WP core and framework has been used
if ( ! function_exists( 'add_filter' ) ) {
	header( 'Status: 403 Forbidden' );
	header( 'HTTP/1.1 403 Forbidden' );
	exit();
}
// Create plugin instance on plugins_loaded action to maximize flexibility of wp hooks and filters system.
include_once 'vendor/autoload.php';
include_once 'app/class-init.php';
Esser_Design\Init::run( __FILE__ );