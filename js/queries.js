var wd=jQuery(window).width();
function updategardenerdata(){}
function checkonlineoffline(){
	checkfornewupdates();
}
setInterval(checkonlineoffline,10000);
function checkonlineofflinefast(){
	fastupdates();
}
setInterval(checkonlineofflinefast,2000);

//updategardenerdata();
function updatejobdata8(res){
	var id=res['id'];
	var site_id=res['site_id'];
	if(id!='0'){
		db.transaction(function(tx){
			tx.executeSql("UPDATE job_daytimes SET updateonsite='"+site_id+"' WHERE id='"+id+"'");
		});
	}
}
function Updateemergencynotificationdata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM wnh_emergency_notifications WHERE emergency_notification_id=?";
					tx.executeSql(q, [res['data'][index]['id']], function(tx, rest){
																		  //alert(res['data'][index]['id']);
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_emergency_notifications SET emergency_id='"+res['data'][index]['emergency_id']+"', notification_type='"+res['data'][index]['notification_type']+"', notification_for='"+res['data'][index]['notification_for']+"', clinic_id='"+res['data'][index]['clinic_id']+"', manager_id='"+res['data'][index]['manager_id']+"', company_id='"+res['data'][index]['company_id']+"', readbycompany='"+res['data'][index]['readbycompany']+"', readbymanager='"+res['data'][index]['readbymanager']+"', notify='"+res['data'][index]['notify']+"', status='"+res['data'][index]['status']+"', company_name='"+res['data'][index]['componyname']+"', notification_text='"+res['data'][index]['msg']+"' WHERE emergency_notification_id='"+res['data'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var previous_notify=cdateinnum;
							var next_notify=0;
							var qr='INSERT INTO wnh_emergency_notifications (emergency_notification_id, emergency_id, manager_id, company_id, clinic_id, cdate, readbycompany, readbymanager, notification_for, notification_type, notify, previous_notify, next_notify, status,company_name, notification_text,deletenotification) VALUES ("'+res['data'][index]['id']+'", "'+res['data'][index]['emergency_id']+'", "'+res['data'][index]['manager_id']+'", "'+res['data'][index]['company_id']+'", "'+res['data'][index]['clinic_id']+'", "'+res['data'][index]['cdate']+'", "'+res['data'][index]['readbycompany']+'", "'+res['data'][index]['readbymanager']+'", "'+res['data'][index]['notification_for']+'", "'+res['data'][index]['notification_type']+'", "'+res['data'][index]['notify']+'", "'+previous_notify+'", "'+next_notify+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['componyname']+'", "'+res['data'][index]['msg']+'", "0")';
							//alert(qr);
							//jQuery('body').append(qr);
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}

function checkfornewupdates(){
	
	var uid=localStorage.getItem('Manager_ID');
	if(typeof uid!='undefine' && uid!='' && uid!=null){
		
		var url=siteurl+'/api/updates/getnotifications';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 dataType: 'json',
		 data: {manager_id:uid},  
		 crossDomain: true,  
		 beforeSend: function() {
		 },		
		 complete: function() {
					
		 },
		 success: Updateemergencynotificationdata,  
		 error: function(response, d, a){
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update data5.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			
		 } 
	   });
		var url=siteurl+'/api/updates/clinics';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updateclinicdata,  
			error: function(response, d, a){
			
			return false; 
			}
		});
	
		var url=siteurl+'/api/updates/companies';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {}, 
			beforeSend: function() {
				
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updatecompanydata,  
			error: function(response, d, a){
		
			return false; 
			}
		});
		
		
		var url=siteurl+'/api/updates/getphones';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 dataType: 'json',
		 data: {manager_id:uid},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: Updateemergencyphonedata,  
		 error: function(response, d, a){
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update data5.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			
		 } 
	   });
		
		var url=siteurl+'/api/updates/getmanagers';
		jQuery.ajax({  
		 type: 'POST',  
		 url: url,  
		 dataType: 'json',
		 data: {},  
		 crossDomain: true,  
		 beforeSend: function() {
						
		 },		
		 complete: function() {
					
		 },
		 success: Updatemanagerdata,  
		 error: function(response, d, a){
			/*jQuery('body .showmessage').remove();
			var html='<div class="showmessage">Server Error in update data5.</div>';
			jQuery('body').append(html);
			setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
			
		 } 
	   });
	}
}
function fastupdates(){
	
	var uid=localStorage.getItem('Manager_ID');
	if(typeof uid!='undefine' && uid!='' && uid!=null){
			
		db.transaction(checkupdatefornotes, updateerrorDB, successDB);
		function checkupdatefornotes(tx){
			var q="SELECT * FROM wnh_emergencies WHERE manager_id=?";
			var cond=[uid];
			tx.executeSql(q, cond, function(tx, res2){
				if(parseInt(res2.rows.length)>0){
					
					for(var i = 0; i < res2.rows.length; i++)
					{
						var id=res2.rows.item(i).id;
						var emergency_id=res2.rows.item(i).emergency_id;
						var url=siteurl+'/api/updates/getmsgs';
						jQuery.ajax({  
						 type: 'POST',  
						 url: url,  
						 dataType: 'json',
						 data: {id:id, emergency_id:emergency_id},  
						 crossDomain: true,  
						 beforeSend: function() {
										
						 },		
						 complete: function() {
									
						 },
						 success: Updateemergencynotedata,  
						 error: function(response, d, a){
							/*jQuery('body .showmessage').remove();
							var html='<div class="showmessage">Server Error in update data5.</div>';
							jQuery('body').append(html);
							setTimeout(function(){jQuery('.showmessage').slideUp();},1000);*/
							
						 } 
					   });
							
					}
					
				}
			});
			
		}
		
		var url=siteurl+'/api/updates/companyemergencies';
		jQuery.ajax({  
			type: 'POST',  
			url: url,           
			dataType: 'json',  
			crossDomain: true,
			data: {manager_id:uid}, 
			beforeSend: function() {
			
			},		
			complete: function() {
			}, 
			crossDomain: true,  
			success: Updateemergencydata,  
			error: function(response, d, a){
		
			return false; 
			}
		});
		
		
	}
}
function Updatemanagerdata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM wnh_managers WHERE manager_id=?";
					tx.executeSql(q, [res['data'][index]['id']], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_managers SET name='"+res['data'][index]['fname']+"', clinic_id='"+res['data'][index]['clinic_id']+"', email='"+res['data'][index]['email']+"', phone='"+res['data'][index]['phone']+"', status='"+res['data'][index]['status']+"', image='"+res['data'][index]['image']+"', current_lati='"+res['data'][index]['current_lati']+"', current_longi='"+res['data'][index]['current_longi']+"', current_address='"+res['data'][index]['current_address']+"', bioinfo='"+res['data'][index]['bioinfo']+"', position_in_clinic='"+res['data'][index]['position_in_clinic']+"', deviceregID='"+res['data'][index]['deviceregID']+"', device_type='"+res['data'][index]['device_type']+"', loggedin='"+res['data'][index]['loggedin']+"'  WHERE manager_id='"+res['data'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO wnh_managers (manager_id, name, email, phone, clinic_id, status, image, current_lati, current_longi, current_address, bioinfo, position_in_clinic, deviceregID, device_type, loggedin) VALUES ("'+res['data'][index]['id']+'", "'+res['data'][index]['fname']+'", "'+res['data'][index]['email']+'", "'+res['data'][index]['phone']+'", "'+res['data'][index]['clinic_id']+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['image']+'", "'+res['data'][index]['current_lati']+'", "'+res['data'][index]['current_longi']+'", "'+res['data'][index]['current_address']+'", "'+res['data'][index]['bioinfo']+'", "'+res['data'][index]['position_in_clinic']+'", "'+res['data'][index]['deviceregID']+'", "'+res['data'][index]['device_type']+'", "'+res['data'][index]['loggedin']+'")';
							//jQuery('body').append(qr);
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}
function Updateemergencyphonedata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM wnh_emergency_phone WHERE phone_id=?";
					tx.executeSql(q, [res['data'][index]['id']], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_emergency_phone SET phone='"+res['data'][index]['phone']+"', clinic_id='"+res['data'][index]['clinic_id']+"', manager_id='"+res['data'][index]['manager_id']+"', company_id='"+res['data'][index]['company_id']+"' WHERE phone_id='"+res['data'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO wnh_emergency_phone (phone_id, manager_id, company_id, clinic_id, cdate, phone) VALUES ("'+res['data'][index]['id']+'", "'+res['data'][index]['manager_id']+'", "'+res['data'][index]['company_id']+'", "'+res['data'][index]['clinic_id']+'", "'+res['data'][index]['cdate']+'", "'+res['data'][index]['phone']+'")';
							//jQuery('body').append(qr);
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}
function Updateclinicdata(res){
     db.transaction(function(tx){
		if(typeof res['clinics']!='undefined')
		{
			
			jQuery(res['clinics']).each(function(index){
				if(typeof res['clinics'][index]!='undefined'){
					var q="SELECT * FROM wnh_clinics WHERE clinic_id=?";
					tx.executeSql(q, [res['clinics'][index]['id']], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_clinics SET name='"+res['clinics'][index]['name']+"', phone='"+res['clinics'][index]['phone']+"', fax='"+res['clinics'][index]['fax']+"', address='"+res['clinics'][index]['address']+"', address_lati='"+res['clinics'][index]['address_lati']+"', address_longi='"+res['clinics'][index]['address_longi']+"' WHERE clinic_id='"+res['clinics'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO wnh_clinics (clinic_id, name, phone, fax, address, address_lati, address_longi) VALUES ("'+res['clinics'][index]['id']+'", "'+res['clinics'][index]['name']+'", "'+res['clinics'][index]['phone']+'", "'+res['clinics'][index]['fax']+'", "'+res['clinics'][index]['address']+'", "'+res['clinics'][index]['address_lati']+'", "'+res['clinics'][index]['address_longi']+'")';
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function(){
			}, successDB);
}
function Updatecompanydata(res){
     db.transaction(function(tx){
		if(typeof res['companies']!='undefined')
		{
			
			jQuery(res['companies']).each(function(index){
				if(typeof res['companies'][index]!='undefined'){
					var q="SELECT * FROM wnh_company WHERE company_id=?";
					tx.executeSql(q, [res['companies'][index]['id']], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_company SET name='"+res['companies'][index]['fname']+"', phone='"+res['companies'][index]['phone']+"', email='"+res['companies'][index]['email']+"', fax='"+res['companies'][index]['fax']+"', total_employees='"+res['companies'][index]['total_employees']+"', address='"+res['companies'][index]['address']+"', address_lati='"+res['companies'][index]['address_lati']+"', address_longi='"+res['companies'][index]['address_longi']+"', current_address='"+res['companies'][index]['current_address']+"', current_lati='"+res['companies'][index]['current_lati']+"', current_longi='"+res['companies'][index]['current_longi']+"', deviceregID='"+res['companies'][index]['deviceregID']+"', device_type='"+res['companies'][index]['device_type']+"', applogin='"+res['companies'][index]['applogin']+"' WHERE company_id='"+res['companies'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO wnh_company (company_id, name, phone, email, fax, status, address, total_employees, current_lati, current_address, current_longi, address_lati, address_longi, applogin, deviceregID, device_type) VALUES ("'+res['companies'][index]['id']+'", "'+res['companies'][index]['fname']+'", "'+res['companies'][index]['phone']+'", "'+res['companies'][index]['email']+'", "'+res['companies'][index]['fax']+'", "'+res['companies'][index]['status']+'", "'+res['companies'][index]['address']+'", "'+res['companies'][index]['total_employees']+'", "'+res['companies'][index]['current_lati']+'", "'+res['companies'][index]['current_longi']+'", "'+res['companies'][index]['current_address']+'", "'+res['companies'][index]['address_lati']+'", "'+res['companies'][index]['address_longi']+'", "'+res['companies'][index]['applogin']+'", "'+res['companies'][index]['deviceregID']+'", "'+res['companies'][index]['device_type']+'")';
							//jQuery('body').append(qr);
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}
function Updateemergencydata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="SELECT * FROM wnh_emergencies WHERE emergency_id=?";
					tx.executeSql(q, [res['data'][index]['id']], function(tx, rest){
																		 //alert(res['data'][index]['id']);
						if(parseInt(rest.rows.length)>0){
							var qr2="UPDATE wnh_emergencies SET company_id='"+res['data'][index]['company_id']+"', clinic_id='"+res['data'][index]['clinic_id']+"', manager_id='"+res['data'][index]['manager_id']+"', note='"+res['data'][index]['note']+"', status='"+res['data'][index]['status']+"', filepath='"+res['data'][index]['filepath']+"', filetype='"+res['data'][index]['filetype']+"', readbycompany='"+res['data'][index]['readbymanager']+"', deletebymanager='"+res['data'][index]['deletebymanager']+"', deletebycaompany='"+res['data'][index]['deletebycaompany']+"', showdate='"+res['data'][index]['showdate']+"', clinic='"+res['data'][index]['clinic']+"', clinicaddress='"+res['data'][index]['clinicaddress']+"', companyname='"+res['data'][index]['companyname']+"' WHERE emergency_id='"+res['data'][index]['id']+"'";
							//alert(qr2);
							tx.executeSql(qr2);	
						}
						else{
							var qr2='INSERT INTO wnh_emergencies (emergency_id, company_id, clinic_id, manager_id, note, status, filepath, mobilefilepath, filetype, cdate, readbymanager, deletebymanager, deletebycaompany, showdate, clinic, clinicaddress, measurement,companyname) VALUES ("'+res['data'][index]['id']+'", "'+res['data'][index]['company_id']+'", "'+res['data'][index]['clinic_id']+'", "'+res['data'][index]['manager_id']+'", "'+res['data'][index]['note']+'", "'+res['data'][index]['status']+'", "'+res['data'][index]['filepath']+'", "", "'+res['data'][index]['filetype']+'", "'+res['data'][index]['cdate']+'", "'+res['data'][index]['readbymanager']+'", "'+res['data'][index]['deletebymanager']+'", "'+res['data'][index]['deletebycaompany']+'", "'+res['data'][index]['showdate']+'", "'+res['data'][index]['clinic']+'", "'+res['data'][index]['clinicaddress']+'", "'+res['data'][index]['measurement']+'", "'+res['data'][index]['companyname']+'")';
							//jQuery('body').append(qr);
							//alert(qr2);
							
							tx.executeSql(qr2);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}
function Updateemergencynotedata(res){
     db.transaction(function(tx){
		if(typeof res['data']!='undefined')
		{
			
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					
					var q="SELECT * FROM wnh_emergency_notes WHERE emergency_note_id=?";
					tx.executeSql(q, [res['data'][index]['id']], function(tx, rest){
						if(parseInt(rest.rows.length)>0){
							var qr="UPDATE wnh_emergency_notes SET emergency_id='"+res['data'][index]['emergency_id']+"', note='"+res['data'][index]['note']+"', filepath='"+res['data'][index]['filepath']+"', filetype='"+res['data'][index]['filetype']+"', manager_id='"+res['data'][index]['manager_id']+"', company_id='"+res['data'][index]['company_id']+"', readbycompany='"+res['data'][index]['readbycompany']+"', readbymanager='"+res['data'][index]['readbymanager']+"', parent_id='"+res['data'][index]['parent_id']+"', notify='"+res['data'][index]['notify']+"' WHERE emergency_note_id='"+res['data'][index]['id']+"'";
							//alert(qr);
							tx.executeSql(qr);	
						}
						else{
							var qr='INSERT INTO wnh_emergency_notes (emergency_note_id, emergency_id, note, filepath, mobilefilepath, filetype, manager_id, company_id, cdate, readbycompany, readbymanager, parent_id, notify) VALUES ("'+res['data'][index]['id']+'", "'+res['data'][index]['emergency_id']+'", "'+res['data'][index]['note']+'", "'+res['data'][index]['filepath']+'", "", "'+res['data'][index]['filetype']+'", "'+res['data'][index]['manager_id']+'", "'+res['data'][index]['company_id']+'", "'+res['data'][index]['cdate']+'", "'+res['data'][index]['readbycompany']+'", "'+res['data'][index]['readbymanager']+'", "'+res['data'][index]['parent_id']+'", "'+res['data'][index]['notify']+'")';
							//jQuery('body').append(qr);
							//alert(qr);
							tx.executeSql(qr);	
						}
						
					});
				}
			});
			
		}
						 
		},  function errorCB(err) {
        //alert("Error processing SQL1: "+err);
		//alert("Error processing SQL2: "+err.code);
		//alert("Error processing SQL3: "+err.message);
    }, successDB);
}
function Updateremovejobdata(res){
     db.transaction(function(tx){
		if(res['data'])
		{
			jQuery(res['data']).each(function(index){
				if(typeof res['data'][index]!='undefined'){
					var q="DELETE FROM jobs WHERE job_id='"+res['data'][index]['ID']+"' AND user_id='"+uid+"'";
					tx.executeSql(q);
				}
			});
			
		}
						 
		},  importerrorDB, successDB);
}

function errorDB(tx, err) {
	//alert("Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}
function importerrorDB(tx, err) {
	//alert("Import Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}
function updateerrorDB(tx, err) {
	//alert("Update Error processing SQL: "+err);
	//alert("Error processing SQL: "+err.message);
}

// Transaction success callback
//
function successDB() {
   // alert("success!");
}

function Updatefiletables(table,mobilepath,id,filetype){
     db.transaction(function(tx){
		if(mobilepath!='' && table!='' && id!='')
		{
			var qr="UPDATE "+table+" SET mobilefilepath='"+mobilepath+"' WHERE id='"+id+"'";
			tx.executeSql(qr);	
			if(filetype=='video'){
				jQuery('.notelists .video-wrape-'+id).html('<a href="javascript:;" onclick="return showvideo(\''+mobilepath+'\');"><img src="images/video1.png" alt="video" /> Click to view</a>');	
			}
			else if(filetype=='image'){
				jQuery('.notelists .img-wrape-'+id).html('<a href="javascript:;" onclick="return showimg(\''+mobilepath+'\');"><i class="fa fa-picture-o" style="font-size:18px;"></i> Click to zoom</a>');	
			}
		}
	},  importerrorDB, successDB);
}
document.addEventListener("deviceready", onDeviceReady, false);
var fileTransfer;
// use file transfer after onDeviceReady() was called         
function onDeviceReady() {
    fileTransfer = new FileTransfer();
   
}
function downloadfiles(table,filepath,id,filetype){
	
	if(filetype=='video'){
		jQuery('.notelists .video-wrape-'+id+' a').html('<img src="images/video1.png" alt="video" /> Downloading...');	
	}
	else if(filetype=='image'){
		jQuery('.notelists .img-wrape-'+id+' a').html('<i class="fa fa-picture-o" style="font-size:18px;"></i> Downloading...');	
	}
	var filepaths=filepath.split('/');
	var filename=filepaths[filepaths.length-1];
	//alert(filename);
	var fileTransfer = new FileTransfer();
	var uri = encodeURI(filepath);
	//var fileURL='/'+filename;
	 
	fileTransfer.download(
		uri,
		cordova.file.externalApplicationStorageDirectory+filename,
		function(entry) {
			var mobilepath=entry.toURL();
			Updatefiletables(table,mobilepath,id,filetype);
		},
		function(error) {
			//alert("download error source " + error.source);
			//alert("download error target " + error.target);
			//alert("download error code" + error.code);
		},
		null,
		{
			//headers: {
				//"Authorization": "Basic dGVzdHVzZXJuYW1lOnRlc3RwYXNzd29yZA=="
			//}
		}
	);
}