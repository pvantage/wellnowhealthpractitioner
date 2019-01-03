//var siteurl = "http://178.128.186.105";
//var realsiteurl = "http://178.128.186.105/"; 
var siteurl = "http://vantageappspro.com/wellnowhealth";
var realsiteurl = "http://vantageappspro.com/wellnowhealth/";
var db = window.openDatabase("wnhmanager", "1.0", "Wellnowhealth Manager", 200000);
var days=['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
var times = {'07:00:00':'7:00 AM','07:30:00':'7:30 AM','08:00:00':'8:00 AM','08:30:00':'8:30 AM','09:00:00':'9:00 AM','09:30:00':'9:30 AM','10:00:00':'10:00 AM', '10:30:00':'10:30 AM','11:00:00':'11:00 AM', '11:30:00':'11:30 AM','12:00:00':'12:00 PM','12:30:00':'12:30 PM','13:00:00':'01:00 PM', '13:30:00':'01:30 PM','14:00:00':'02:00 PM','14:30:00':'02:30 PM','15:00:00':'03:00 PM', '15:30:00':'03:30 PM','16:00:00':'04:00 PM','16:30:00':'04:30 PM','17:00:00':'05:00 PM','17:30:00':'05:30 PM','18:00:00':'06:00 PM'};

var d = new Date();
var m=d.getMonth();
if(parseInt(m)<12){m=parseInt(m)+1;}
if(parseInt(m)<10){m='0'+m;}
var d1=d.getDate();
if(parseInt(d1)<10){d1='0'+d1;}
var today=d.getFullYear()+'-'+m+'-'+d1;
function addasecondintime(){
	d = new Date(); // just for example, can be any other time
	myTimeSpan = 1000; // 1 second in milliseconds
	d.setTime(d.getTime() + myTimeSpan);	
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
function getcurrenttime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return h+':'+mint+':'+sec;
}
var currenttime=getcurrenttime();
function getdatetime(){
	var d = new Date();
	var mint=d.getMinutes();
	if(parseInt(mint)<10){mint='0'+mint;}
	var h=d.getHours();
	if(parseInt(h)<10){h='0'+h;}
	var sec=d.getSeconds();
	if(parseInt(sec)<10){sec='0'+sec;}
	return today+' '+h+':'+mint+':'+sec;
}
var currentdatetime=getdatetime();
function datetimewithoutspace(){
	var cm=getdatetime().replace('-','');
	cm=cm.replace('-','');
	cm=cm.replace(':','');
	cm=cm.replace(':','');
	cm=cm.replace(' ','');
	return cm;
}
var cdateinnum=datetimewithoutspace();
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
	var path = window.location.pathname;
	var page = path.split("/").pop();
	if(page!='logout.html'){
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
}





function showPosition(position) {
	localStorage.setItem('Manager_Lat',position.coords.latitude);
	localStorage.setItem('Manager_Long',position.coords.longitude);
	var uid=localStorage.getItem('Manager_ID');
	var path = window.location.pathname;
	var page = path.split("/").pop();
	//alert(uid);
	if(typeof uid!='undefined' && uid!='' && uid!=null && (position.coords.latitude!='' || position.coords.longitude!='') && page!='logout.html'){
		var url=siteurl+'/api/account/updatelatilongi';
		var deviceuuid=localStorage.getItem('deviceuuid');
		var deviceplatform=localStorage.getItem('deviceplatform');
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 data: {id:uid,lati:position.coords.latitude,longi:position.coords.longitude,deviceuuid:deviceuuid,deviceplatform:deviceplatform},  
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
		setTimeout(getLocation,30000);
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
getLocation();

function playnotification(){
   //audioElement.play();
   var audiop = document.getElementById('successSound');
	audiop.play();
}
function checknotistatus(id){
	db.transaction(chknotificationstatus, errorDB, successDB);
	function chknotificationstatus(tx){
		var q="SELECT * FROM wnh_emergency_notifications where emergency_notification_id=?";
		var cond=[id,'pending'];
		tx.executeSql(q, cond, function(tx, res){
			var shownotification=false;
			if(parseInt(res.rows.length)>0){
				if(res.rows.item(i).status!='pending'){
					var emergency_id=res.rows.item(i).emergency_id;
					jQuery('.notification-'+emergency_id).remove();
					audiop.pause();
					var shownotification=false;
				}
			}
		});
	}
}
function checkNotification() {
	
	var clinic_id=localStorage.getItem('Manager_clinic_id');
	var uid=localStorage.getItem('Manager_ID');
	var path = window.location.pathname;
	var page = path.split("/").pop();
	//alert(page);
	//alert(uid);
	
	if(typeof uid!='undefined' && uid!='' && uid!=null){
		db.transaction(shownotification, errorDB, successDB);
		function shownotification(tx){
			var q="SELECT * FROM wnh_emergency_notifications where clinic_id=? AND manager_id=? AND status=? AND deletenotification=?";
			var cond=[clinic_id,uid,'pending','0'];
			tx.executeSql(q, cond, function(tx, res){
				//var audiop = document.getElementById('successSound');
				//audiop.pause();
				var shownotification=false;
				if(parseInt(res.rows.length)>0){
					
					for(var i = 0; i < res.rows.length; i++)
					{
						var previous_notify=datetimewithoutspace();
						var next_notify=res.rows.item(i).next_notify;
						//alert(previous_notify+'='+next_notify);
						
						if(next_notify=='0'){
							shownotification=true;
							var next_notify2=parseInt(previous_notify)+3;
						}
						else{
							var dif=parseInt(next_notify)-previous_notify;
							if(dif<=0){
								shownotification=true;
								var next_notify2=parseInt(previous_notify)+3;
							}
						}
						if(page=='emergancy.html'){shownotification=false;}
						if(shownotification){
							var totalnoti=jQuery('.showpopmessage').length;
							if(parseInt(totalnoti)<=0){
							   if(!jQuery('body').hasClass('showpopmessage')){
								   var html='<div class="showpopmessage"></div>';
								   jQuery('body').append(html);
							   }
							}
							var id=res.rows.item(i).emergency_notification_id;
							var qr="UPDATE wnh_emergency_notifications SET next_notify='"+next_notify2+"', previous_notify='"+previous_notify+"' WHERE emergency_notification_id='"+id+"'";
							//alert(qr);
							tx.executeSql(qr);
							
							var emergency_id=res.rows.item(i).emergency_id;
						   
						   var playbeep=false;
						 
							jQuery('.notification-'+emergency_id).remove();
							var htm='';
							htm+='<div class="trip-notification notification-'+emergency_id+'">';
							htm+='<div class="trip-content">';
							htm+='<div class="trip-title">Company: '+res.rows.item(i).company_name+'</div>';
							if(jQuery.trim(res.rows.item(i).notification_text)!=''){
								htm+='<div class="trip-title">Note: '+res.rows.item(i).notification_text+'</div>';
							}
							htm+='</div><div class="trip-link"><a class="closenotification" data-id="'+emergency_id+'" href="javascript:;">CLOSE</a> <a class="viewnotification" href="emergancy.html?id='+emergency_id+'">VIEW</a></div></div>';
							jQuery('.showpopmessage').append(htm);
							checknotistatus(id);
							
						}
					}
					if(shownotification){
						var audiop = document.getElementById('successSound');
						if (audiop.duration > 0 && !audiop.paused) {
						} else {
							audiop.play();
						}
					}
					else{
						var audiop = document.getElementById('successSound');
						
						if (audiop.duration > 0 && !audiop.paused) {
						} else {
							audiop.pause();
						}
					}
				}
				
				
				jQuery('a.closenotification').click(function(){
					jQuery(this).parents('.trip-notification').remove();
					var totalnoti=jQuery('.trip-notification').length;
					if(parseInt(totalnoti)<=0){
						jQuery('.showpopmessage').remove();
					}
					var audiop = document.getElementById('successSound');
					audiop.pause();
					var emid=jQuery(this).attr('data-id');
					db.transaction(function(tx){
						var qr="UPDATE wnh_emergency_notifications SET deletenotification='1' WHERE emergency_id='"+emid+"'";
						tx.executeSql(qr);
					},  function(){}, function(){});
					
					var url=siteurl+'/api/updates/companyemergencies';
					jQuery.ajax({  
						type: 'POST',  
						url: url,           
						dataType: 'json',  
						crossDomain: true,
						data: {emid:emid}, 
						beforeSend: function() {
						
						},		
						complete: function() {
							setTimeout(function(){window.location='';},3000);
						}, 
						crossDomain: true,  
						success: Updateemergencydata,  
						error: function(response, d, a){
					
						}
					});
				});
			});
			
			
		}
		
	}
	setTimeout(checkNotification,2000);
}
/*function showimg(imgurl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+imgurl+'&ftype=image';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}
function showvideo(videourl){
	var url=siteurl+'/api/emergencies/showmdeiafile/?file='+videourl+'&ftype=video';
	cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
}*/
function showimg(imgurl){
	//var url=siteurl+'/api/emergencies/showmdeiafile/?file='+imgurl+'&ftype=image';
	//cordova.InAppBrowser.open('showimg.html?file='+imgurl, '_blank', 'location=yes');	
	//cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
	//showimg('http://vantageappspro.com/wellnowhealth/uploads/emergencies/1_1542974538.jpg')
	
	/*var vd='<img src="'+imgurl+'" class="loadimage" />';
	jQuery('#playvideos .modal-body').html(vd);
	jQuery('#emergency').modal('hide');
	jQuery('#playvideos').modal();*/
	var wh=jQuery(window).height();
	var ww=jQuery(window).width()-50;
	var vd='<div id="mycontainer" style="width: '+ww+'px; height: '+wh+'px"><canvas id="mycanvas" style="width: 100%; height: 100%"></canvas></div>';
	jQuery('#playvideos .modal-body').html(vd);
	jQuery('#emergency').modal('hide');
	jQuery('#playvideos').modal();
	setTimeout(function(){
	var pinchZoom = new PinchZoomCanvas({
    canvas: document.getElementById('mycanvas'),
    path: imgurl,
    momentum: true,
    zoomMax: 2,
    doubletap: true,
    onZoomEnd: function (zoom, zoomed) {
        console.log("---> is zoomed: %s", zoomed);
        console.log("---> zoom end at %s", zoom);
    },
    onZoom: function (zoom) {
        console.log("---> zoom is %s", zoom);
    }
    });
						},1000);
	
}
function showvideo(videourl){
	//showvideo('http://vantageappspro.com/wellnowhealth/uploads/emergencies/1_1542891378.mp4')
	//var url=siteurl+'/api/emergencies/showmdeiafile/?file='+videourl+'&ftype=video';
	//cordova.InAppBrowser.open(url, '_blank', 'location=yes');	
	//cordova.InAppBrowser.open('showvideo.html?file='+videourl, '_blank', 'location=yes');	
	
	var vd='<video id="videoplayer" style="width:100%; height:100%; margin:0px;" controls><source src="'+videourl+'" type="video/mp4"><source src="'+videourl+'" type="video/webm"><source src="'+videourl+'" type="video/ogg">Your browser does not support the video tag.</video>';
	jQuery('#playvideos .modal-body').html(vd);
	jQuery('#emergency').modal('hide');
	jQuery('#playvideos').modal();
}
function closevideo(){
	
	jQuery('#playvideos').modal('hide');
	if(!jQuery('#emergency').hasClass('show')){
		setTimeout(function(){jQuery('#emergency').modal();},1000);
	}
	var myVideo=document.getElementById("videoplayer"); 
	if(typeof myVideo!='undefined'){
		 myVideo.pause(); 
	}
		
}
jQuery(document).ready(function(){
	jQuery('body').append('<div style="display:none;"><audio id="successSound" controls><source src="'+siteurl+'/uploads/ding.mp3" type="audio/mpeg"><source src="'+siteurl+'/uploads/1Hand.wav" type="audio/wav">Your browser does not support the audio element.</audio></div>');	
	var audiop = document.getElementById('successSound');
	audiop.pause();
	checkNotification();
});