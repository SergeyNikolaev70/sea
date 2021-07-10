
   let sea_get_last_day_month=function(year1, month1) {

          var sdt1=0;

        for (var i=1; i<=31; i++) {
           
             var dt1=year1+"-"+month1+"-"+i;
             
             var dt=new Date(dt1);
             
           if (((dt.getMonth()+1)==month1) && (dt.getFullYear()==year1)) {
              sdt1=i;
           }
        }

	return sdt1;
   };
   

   let sea_get_last_date_month=function(year1, month1) {

          var dt1=year1+"-"+month1;
          var sdt1="";

        for (var i=1; i<=31; i++) {
           
             var dt1=year1+"-"+month1+"-"+(i<10 ? "0" : "")+i;

             var dt=new Date(dt1);
             
           if (((dt.getMonth()+1)==month1) && (dt.getFullYear()==year1)) {
              sdt1=dt1;
           }
        }
         
	return sdt1;
   };
   
