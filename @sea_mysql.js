
   let mysql_get=function(request, callback) {

          var dv1=document.getElementById('mysql_get_script');

	if (dv1!=null) {
	   document.body.removeChild(dv1);
	}
   	   dv1=document.createElement("script");
    	   dv1.id='mysql_get_script';

         dv1.src=request;
         dv1.onload=function () {

           if (callback!=null) {
              callback();
           }

   	};

  	document.body.appendChild(dv1);
   };

   let mysql_post=function(request, callback) {

          var dv1=document.getElementById('mysql_post_script');
	if (dv1!=null) {
	   document.body.removeChild(dv1);
	} 
   	   dv1=document.createElement("script");
    	   dv1.id='mysql_post_script';

        dv1.src=request;
   	dv1.onload=function () {

         if (callback!=null) {
            callback();
         }
   	};

   	document.body.appendChild(dv1);
   };
