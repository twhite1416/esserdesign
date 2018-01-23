<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */
 
define('WP_HOME','http://esserdesign.com');
define('WP_SITEURL','http://esserdesign.com');
define('FORCE_SSL_ADMIN', true);

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'forge');
/** MySQL database username */
define('DB_USER', 'forge');
/** MySQL database password */
define('DB_PASSWORD', 'bPty4CskXiTNutgfoPDn');
/** MySQL hostname */
define('DB_HOST', 'localhost');
/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');
/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');
define('DISALLOW_FILE_EDIT', TRUE); // Sucuri Security: Wed, 17 Dec 2014 19:51:50 +0000
/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'm]WO(?riD.hG=I+17ba|jad[0A7 j: i_W^=*+8) Y3:<-{B7/7CnSJMQQ+7T_7Y');
define('SECURE_AUTH_KEY',  '9Ipf?H`4|g>lK)~O{8il5*)gk_8-^jhk~[83zBM7FyT=kR#I%G{o%LK*liGPMPx1');
define('LOGGED_IN_KEY',    'nOAM;M]zWz&!VIH5]t?NyI5fj0-,|~ZU=6JPH])%s|lD4v/nQG>0F!T BMOtRz*m');
define('NONCE_KEY',        'Y0WT{(g[D+fSg;1ujf(a;sm^9cWBH8Dc5COT:uO:n4d;q^/x9[.aAQG.F-2ojNvL');
define('AUTH_SALT',        '8|;iSWo0}r8!4a#{zAJtXY_X*D3X`+8&2!-l_4D2&6tP#qA{^B <1PFpHrE+0-Kg');
define('SECURE_AUTH_SALT', 'oN{U*8YszYb8%Eh.&3^YU_{12?.c+D]kJuh%|c.,TkG|YNx_x[/>t^5m-5} N4jL');
define('LOGGED_IN_SALT',   'p!4@@%<2%,HXUx Vl0DlPt{B?]|rAd.pOLAnQMjC6,|xY4#j^( ?jb0|)L.1p=kc');
define('NONCE_SALT',       'R0C1/_/!j,+{U^yEBdi3W7-* I%!^(J<z94*-5A^d?aE_1Mjy.KeRuC#uZsj%` q');
/**#@-*/
/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';
/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');
define('WP_MEMORY_LIMIT', '96M');
/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);
/* That's all, stop editing! Happy blogging. */
/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');
/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');

