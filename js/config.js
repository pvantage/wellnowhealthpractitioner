var siteurl = "http://vantageappspro.com/wellnowhealth";
var realsiteurl = "http://vantageappspro.com/wellnowhealth/";
function gup(sParam) {
  var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
}
function gup2(sParam,url) {
  var results = new RegExp('[\?&]' + sParam + '=([^&#]*)').exec(url);
    if (results==null){
       return null;
    }
    else{
       return decodeURI(results[1]) || 0;
    }
}

var uid=localStorage.getItem('Manager_ID');

function checkloggedin(uid)
{
	
	var url=siteurl+'/api/managerlogin/checkloggedin';
	
	jQuery.ajax({  
	 type: 'POST',  
	 url: url,  
	 //contentType: contentType,  
	 dataType: 'json',  
	 data: {uid:uid},  
	 crossDomain: true,  
	 beforeSend: function() {
	 },		
	 complete: function() {
					
	 },
	 success: function(res) {  
	   if(res['loggedin']!='success')
	   {
		window.location='login.html';   
	   }
		else
		{
			window.location='your-location.html';	
		}
	 },  
	 error: function(response, d, a){
		jQuery('body .showmessage').remove();
		var html='<div class="showmessage">Server Error.</div>';
		jQuery('body').append(html);
		setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
	 } 
   });
}





function showPosition(position) {
	localStorage.setItem('Manager_Lat',position.coords.latitude);
	localStorage.setItem('Manager_Long',position.coords.longitude);
	var uid=localStorage.getItem('Manager_ID');
	
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null && (position.coords.latitude!='' || position.coords.longitude!='')){
		var url=siteurl+'/api/account/updatelatilongi';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 data: {id:uid,lati:position.coords.latitude,longi:position.coords.longitude},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		   
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update location.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		setTimeout(getLocation,5000);
	}
    
}
 function showError(error){
	 alert('Message:' + error.message);
 }
 function getLocation() {
     navigator.geolocation.getCurrentPosition(showPosition, showError);
}
 
var uid=localStorage.getItem('Manager_ID');
		
function ValidateEmail(inputText)  
{  
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;  
	if(inputText.match(mailformat))  
	{  
		return true;  
	}  
	else  
	{  
		return false;  
	}  
}

document.addEventListener("deviceready", onDeviceReady2, false);
function onDeviceReady2(){
	var deviceplatform=device.platform;
	var uid=localStorage.getItem('Manager_ID');
	/*if(deviceplatform=='Android'){
		if(typeof uid!='undefined' && uid!='' && uid!=null){
			
		}
	}
	else{
		if(typeof uid!='undefined' && uid!='' && uid!=null){
			var path = window.location.pathname;
			var page = path.split("/").pop();
			if(page=='emergancy.html'){
				getLocation();
			}
		}	
	}*/
}
getLocation();
function playnotification(audioElement){
   //audioElement.play();
   var audiop = document.getElementById(audioElement);
   audiop.play();
   setTimeout(function(){playnotification(audioElement);},10000);
}
function checkNotification(audioElement) {
	
	var clinic_id=localStorage.getItem('Manager_clinic_id');
	var uid=localStorage.getItem('Manager_ID');
	var path = window.location.pathname;
	var page = path.split("/").pop();
	//alert(uid);
	if(typeof uid!='undefine' && uid!='' && uid!=null){
		var url=siteurl+'/api/emergencies/notifications';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 //contentType: contentType,  
		 dataType: 'json',  
		 data: {clinic_id:clinic_id,uid:uid},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: function(res) {  
		  
				   
				   
				   if(res['data'])
				   {
					   var totalnoti=jQuery('.showpopmessage').length;
						if(parseInt(totalnoti)<=0){
						   if(!jQuery('body').hasClass('showpopmessage')){
							   var html='<div class="showpopmessage"></div>';
							   jQuery('body').append(html);
						   }
						}
					   var htm='';
						jQuery(res['data']).each(function(index){
							htm+='<div class="trip-notification">';
							htm+='<div class="trip-content">';
							htm+='<div class="trip-title">Company: '+res['data'][index]['company']+'</div>';
							if(jQuery.trim(res['data'][index]['note'])!=''){
								htm+='<div class="trip-title">Note: '+res['data'][index]['note']+'</div>';
							}
							htm+='</div><div class="trip-link"><a class="closenotification" href="javascript:;">CLOSE</a> <a class="viewnotification" href="emergancy.html?id='+res['data'][index]['emergency_id']+'">VIEW</a></div></div>';
						});
						jQuery('.showpopmessage').append(htm);
						jQuery('a.closenotification').click(function(){
							jQuery(this).parents('.trip-notification').remove();
							var totalnoti=jQuery('.trip-notification').length;
							if(parseInt(totalnoti)<=0){
								jQuery('.showpopmessage').remove();
							}
						});
						playnotification(audioElement);
				   }
			   
		 },  
		 error: function(response, d, a){
			jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);
			
		 } 
	   });
		setTimeout(function(){checkNotification(audioElement)},10000);
	}
    
}
function showimg(imgurl){
	cordova.InAppBrowser.open(imgurl, '_blank', 'location=yes');	
}

jQuery(document).ready(function(){
	jQuery('body').append('<div style="display:none;"><audio id="successSound" controls><source src="'+siteurl+'/uploads/ding.mp3" type="audio/mpeg"><source src="'+siteurl+'/uploads/1Hand.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>');	
	checkNotification('successSound');
});