<?php
/*
Plugin Name: Mobile theme switch
Plugin URI: http://wordpress.org/extend/plugins/mobile-theme-switcher/
Description: This plugin detects if your site is being viewed by a mobile browser and switches to an different, selectable theme. 
You will have to install or create a mobile theme by yourself. Just upload it to your themes folder and select it in the plugin admin screen. It's easy to add or remove mobile browsers, just look at the plugin source. 
You can bypass this check in any browser by using myurl/?mobile=on or myurl/?mobile=off This is locally being stored using a cookie. 
Version: 0.6
Author: Jonas Vorwerk
Author URI: http://www.jonasvorwerk.com/
*/
session_start();

if($_GET['mobile'] == "off"){
	$_SESSION[$mobilethemeswitch] = "off"; 
} else if($_GET['mobile'] == "on"){
	$_SESSION[$mobilethemeswitch] = "on";
}

//mobile browsers
$iphone = strpos($_SERVER['HTTP_USER_AGENT'],"iPhone");
$ipod = strpos($_SERVER['HTTP_USER_AGENT'],"iPod");
$android = strpos($_SERVER['HTTP_USER_AGENT'],"Android");
$palmpre = strpos($_SERVER['HTTP_USER_AGENT'],"webOS");
$berry = strpos($_SERVER['HTTP_USER_AGENT'],"BlackBerry");
$iemobile = ( strpos($_SERVER['HTTP_USER_AGENT'],"iemobile") || strpos($_SERVER['HTTP_USER_AGENT'],"IEMobile") );

if ( ((($iphone || $android || $palmpre || $ipod || $berry !== FALSE || $iemobile) === true) || $_SESSION[$mobilethemeswitch] == "on") && $_SESSION[$mobilethemeswitch] != "off" ) { 
	add_filter('stylesheet', 'getTemplateStyle');
	add_filter('template', 'getTemplateStyle');
} 

function getTemplateStyle(){
	$mobiletheme =  get_option('mobiletheme');
    $themes = get_themes();
	foreach ($themes as $theme_data) {
	  if ($theme_data['Name'] == $mobiletheme) {
	      return $theme_data['Stylesheet'];
	  }
	}	
}

function mts_admin_actions() { 
	if (current_user_can('manage_options'))  {
		add_theme_page("Mobile theme switch", "Mobile theme switch", 'manage_options', "mobile-theme-switch", "mts_show_admin");
	}
} 

function mts_show_admin(){
	include('mobile-theme-switch-admin.php'); 
}

add_action('admin_menu', 'mts_admin_actions'); 

?>