
   let firma=null;

   function firma_select_request() {

         var s1="SELECT name, edrpou, address_ur, address_ph, licensia, boss, phone, email FROM sea_organizacia"; 
         s1=window.btoa(encodeURIComponent(s1));
         mysql_get("http://192.168.0.151:5050/?"+s1, this.firma_xdecode);
   }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function firma_xdecode() {

	  var t1=document.getElementById("responseDiv");
          var a1=decodeURIComponent(window.atob(t1.innerHTML));

 	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
	
	if (t1!=null) {
	  firma=r1[0].split('\r');
	}

 	  t1.innerHTML="";
   }

   firma_select_request();