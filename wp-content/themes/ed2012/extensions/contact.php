<?php

@session_start();
add_action('init','ed2012ProcessContact');
function place_ed2012form ($atts) {
	$form = ed2012LoadForm();
	 return $form;
}
add_shortcode( 'contactform', 'place_ed2012form' );
function ed2012ProcessContact() {
	if($_POST['contact_form'] == 'true' && $_POST['hums'] == ""){
		$required = array();
		if(trim($_POST['name']) == "") { array_push($required,"Name"); }
		if(trim($_POST['email']) == "") { array_push($required,"Email"); }
		if(trim($_POST['phone']) == "") { array_push($required,"Phone Number"); }
		if(count($required) > 0){
			$j = 0;
			$fields = "";
			for($i = 0;$i < count($required); $i++){
				$j++;
				if(trim($required[$j]) != "") {$fields = $fields.$required[$i].", ";} else {$fields = $fields.$required[$i];}
			}
			wp_redirect('/email-failure.html');
			exit();
		}
		
		$headers = array('From: '. $_POST['name'] .' <' . $_POST['email'] . '>',
	         "Content-Type: text/html"
	         );
  		$h = implode("\r\n",$headers) . "\r\n";
		$webmaster_subject  =  'Contact from: '.$_POST['name'];
		$webmaster_data = getEmailContent(TEMPLATEPATH.'/emails/webmaster.html',$_POST);
		$isWebmasterSent = wp_mail( get_option('ed2012_contact_email'),$webmaster_subject,$webmaster_data,$h);
		
		$headers = array('From: '. get_bloginfo('name') .' <' .  get_option('ed2012_contact_email') . '>',
	         "Content-Type: text/html"
	         );
  		$h = implode("\r\n",$headers) . "\r\n";
		$reply_data = getEmailContent(TEMPLATEPATH.'/emails/reply.html',$_POST);
		$reply_subject  =  'Thank You for contacting '.get_bloginfo('name');
		$isReplySent = wp_mail($_POST['email'],$reply_subject,$reply_data,$h);
		
		if($isReplySent || $isWebmasterSent) {
			wp_redirect('/');
			wp_redirect('/email-success.html');
			exit();
		} else {
			wp_redirect('/email-failure.html');
			exit();
		}
		echo $_SESSION['form_message'];
	}
}
function ed2012LoadForm(){
	$content = '';
	if(strlen($_SESSION['form_message'])>0) $content .= $_SESSION['form_message'];
	$content .= '
	<form action="" method="post" id="ind_contact">
        <input type="hidden" name="contact_form" value="true"/>
        <input type="text" id="hums" name="hums" />
        <fieldset>
			<div class="clear">
            	<label>Name<sup>*</sup></label>
				Your Name<input type="text" name="name"/>
			</div>
			<div>
            	<label>E-Mail<sup>*</sup></label>
				Your Email Address<input type="text" name="email" placeholder="" />
			</div>
			<div class="clear">
            	<label>Phone<sup>*</sup></label>
				Your Phone Number<input type="text" name="phone" placeholder="" />
			</div>
			<div>
				<label>Zip Code<span>*</span></label>
				Your Zip Code<input type="text" name="zip" placeholder="" />
			</div>
			<div class="clear">
				<label>Message</label>
				Your Question/Comment<textarea rows="5" cols="30" name="message"  placeholder=""></textarea>
			</div>
        </fieldset>
        <div class="clear submit">
			<input type="image" src="/uploads/send.png" />
			<input type="hidden" name="hidden_variable" value="done" />
		</div>
    </form>';
	return $content;
	unset($_SESSION['form_message']);
}
function getEmailContent( $f_location, $external_data='' ) {
	//GET FILE
	$filename = $f_location;
	$handle = fopen($filename, "r");
	$contents = fread($handle, filesize($filename));
	fclose($handle);
	
	
	//
	foreach ( $external_data as $key => $value ) {
		${$key} = $value;
	}
	$date = date('F j, Y');
	$telephone = '('.$_POST['areaCode'].') '. $_POST['phoneNumber'];
	$telephone .= (strlen($_POST['extension'])>0) ? ' ext: '.$_POST['extension'] : '';
	
	$data = addslashes($contents);
	eval("\$data = \"$data\";");
	$data = stripslashes($data);
	
	//RETURN
	return $data;
}

?>