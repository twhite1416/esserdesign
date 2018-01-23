=== Mobile theme switch ===
Contributors: Jonas Vorwerk
Tags: theme, template, mobile, iphone, android
Requires at least: 2.7
Tested up to: 3.3.2
Stable tag: 0.6

== Description ==
This plugin detects if your site is being viewed by a mobile browser and switches to an different, selectable theme. 
You will have to install or create a mobile theme by yourself. Just upload it to your themes folder and select it in the plugin admin screen. It's easy to add or remove mobile browsers, just look at the plugin source. You can bypass this check in any browser by using myurl/?mobile=on or myurl/?mobile=off This is locally being stored using a cookie. 

== Installation ==
1. Upload `plugin-name.php` to the `/wp-content/plugins/` folder
2. Upload an mobile theme to the '/wp-content/themes/' folder
3. Activate the plugin
4. Open the "mobile theme switch" options page under the 'Appearance' menu in WordPress.
5. Select an mobile compatible Wordpress theme

== Frequently Asked Questions ==


== Screenshots ==
1. screenshot-1.png

== Changelog ==

= 0.6 =
* Mobile on/off check fixes, thanks to Alfred Gunnarsson
* IEMobile added for some Windows mobile users, thanks to Alfred Gunnarsson
* BlackBerry 5.0 ( and earlier ) isue fixed, thanks to Colin Smillie

= 0.55 =
* Combined the iPhone theme switch plugin and the mobile theme switch into this one plugin. 

= 0.54 =
* Mobile on/off switch so users can also go to the normal theme. 
myurl.com/?mobile=off
myurl.com/?mobile=on

= 0.53 =
* Fixed issue that editors sometimes had problems to login 

= 0.5 =
* Get rid of the message "You do not have sufficient permissions to access this page." in WP3.0

= 0.41 =
* Typo fix

= 0.4 =
* Some small improvements

= 0.3 =
* Settings screen only visible by admin users

= 0.2 = 
* removing theme options, these options belong to the theme and not in this plugin

= 0.1 =
* release of the plugin	
