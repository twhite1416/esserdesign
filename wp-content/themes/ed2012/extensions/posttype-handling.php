<?php

/*******| REWRITE URLS |*******/
/*
add_filter('post_rewrite_rules','wp_insertMyRewriteRules');
add_filter('query_vars','wp_insertMyRewriteQueryVars');
add_filter('admin_init','flushRules');

// Remember to flush_rules() when adding rules
function flushRules(){
	global $wp_rewrite;
	$wp_rewrite->flush_rules();
}

// Adding a new rule
function wp_insertMyRewriteRules($rules){
	$newrules = array();
	$newrules['(projects)/(\d*)$'] = 'index.php?post_type=$matches[1]&project_category=$matches[2]&p=$matches[3]';
	return $newrules + $rules;
}

// Adding the id var so that WP recognizes it
function wp_insertMyRewriteQueryVars($vars){
	array_push($vars, 'id');
	return $vars;
}
*/

?>
