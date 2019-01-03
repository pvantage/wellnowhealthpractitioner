
//document.addEventListener("deviceready", onDeviceReady, false);
// Cordova is ready
//function onDeviceReady() {
	db.transaction(populateDB, errorCB, successCB);
//}

    // Populate the database 
    //
    function populateDB(tx) {
		if(rebute && rebute!='undefined' && rebute!=null && rebute!=''){
			tx.executeSql('DROP TABLE IF EXISTS wnh_clinics');
			tx.executeSql('DROP TABLE IF EXISTS wnh_company');
			tx.executeSql('DROP TABLE IF EXISTS wnh_emergencies');
			tx.executeSql('DROP TABLE IF EXISTS wnh_emergency_notes');
			tx.executeSql('DROP TABLE IF EXISTS wnh_emergency_notifications');
			tx.executeSql('DROP TABLE IF EXISTS wnh_emergency_phone');
			tx.executeSql('DROP TABLE IF EXISTS wnh_managers');
			tx.executeSql('DROP TABLE IF EXISTS userlogin');
			//alert('test');
		}
		
		tx.executeSql('CREATE TABLE IF NOT EXISTS userlogin (id integer primary key autoincrement, user_id integer, lastlogin_time datetime, loggedin integer, name text, remberme text, uname text, pwd text)');
         tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_clinics (id integer primary key autoincrement, clinic_id integer, name text, phone text, fax text, address text, address_lati text, address_longi text)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_company (id integer primary key autoincrement, company_id integer DEFAULT "0", name text, email text, phone text, fax text, status integer DEFAULT "0", address text, total_employees integer DEFAULT "0", current_lati text, current_longi text, current_address text, address_lati text, address_longi text, applogin integer DEFAULT "0", deviceregID text, device_type text)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_emergencies (id integer primary key autoincrement, emergency_id integer DEFAULT "0", company_id integer DEFAULT "0", clinic_id integer DEFAULT "0", manager_id integer DEFAULT "0", note text, status text, filepath text, mobilefilepath text, filetype text, cdate datetime, readbymanager integer DEFAULT "0", deletebymanager integer DEFAULT "0", deletebycaompany integer DEFAULT "0", showdate text, clinic text, clinicaddress text, measurement text, companyname text)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_emergency_notes (id integer primary key autoincrement, emergency_note_id integer DEFAULT "0", emergency_id integer DEFAULT "0", note text, filepath text, mobilefilepath text, filetype varchar(255), manager_id integer DEFAULT "0", company_id integer DEFAULT "0", cdate datetime, readbymanager integer DEFAULT "0", readbycompany integer DEFAULT "0", parent_id integer DEFAULT "0", notify integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_emergency_notifications (id integer primary key autoincrement, emergency_notification_id integer DEFAULT "0", emergency_id integer DEFAULT "0", manager_id integer DEFAULT "0", company_id integer DEFAULT "0", clinic_id DEFAULT "0", cdate datetime, readbycompany integer DEFAULT "0", readbymanager integer DEFAULT "0", notification_for text, notification_type text, notify integer DEFAULT "0", previous_notify text DEFAULT "0", next_notify text DEFAULT "0", status text DEFAULT "pending", company_name text, notification_text text, deletenotification integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_emergency_phone (id integer primary key autoincrement, phone_id integer DEFAULT "0", manager_id integer DEFAULT "0", company_id integer DEFAULT "0", clinic_id DEFAULT "0", cdate datetime, phone text)');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_managers (id integer primary key autoincrement, manager_id integer, name text, email text, phone text, clinic_id integer DEFAULT "0", status integer DEFAULT "1", image text, current_lati text, current_longi text, current_address text, bioinfo text, position_in_clinic text, deviceregID text, device_type text, loggedin integer DEFAULT "0")');
		 tx.executeSql('CREATE TABLE IF NOT EXISTS wnh_testnotes (id integer primary key autoincrement, test_note_id integer DEFAULT "0", note text, filepath text, mobilefilepath text, filetype varchar(255), manager_id integer DEFAULT "0", company_id integer DEFAULT "0", cdate datetime)');
         
    }

    // Transaction error callback
    //
    function errorCB(tx, err) {
        alert("Error processing SQL1: "+err);
		alert("Error processing SQL2: "+err.code);
		alert("Error processing SQL3: "+err.message);
    }

    // Transaction success callback
    //
    function successCB() {
        //alert("success!");
    }
