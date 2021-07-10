
    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Организация ~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["Название", 
                         "Код ЕГРОПУ", 
                         "Юридический адрес", 
                         "Фактический адрес",
                         "Лицензиия",
                         "Управляющий",
                         "Главный бухгалтер",
                         "Контактный телефон",
                         "E-mail"
                         ];


     var div_main1=sea_create_input("fio", "fio_div_main", ar_table_head);

    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Праздники ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill, tabel_save_eneble);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     tabel_save.onclick=function() {

        tabel_save.disabled=true;

	update_table_record();
     }
     tabel_clear.onclick=function() {
       sea_set_data("", "", "", "", "", "", "", "");
     }

     function tabel_save_eneble() {
        tabel_save.disabled=false;
     }

     function update_table_record() {
                          
         var s1="UPDATE sea_organizacia SET name='"+input_0.value+"',"+ 
                                                               "edrpou="+input_1.value+","+ 
                                                               "address_ur='"+input_2.value+"',"+ 
                                                               "address_ph='"+input_3.value+"',"+ 
                                                               "licensia='"+input_4.value+"',"+ 
                                                               "boss='"+input_5.value+"',"+ 
                                                               "glbuh='"+input_6.value+"',"+ 
                                                               "phone='"+input_7.value+"',"+ 
                                                               "email='"+input_8.value+"' WHERE name<>'bla-bla'";

         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.xdecode_update);
     }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function xdecode_update() {

	    var t1=document.getElementById("responseDiv");
	    var a1=decodeURIComponent(window.atob(t1.innerHTML));

            var r1=a1.split('\n');
      
         if (r1!=null) {
            var r2=r1[0].split(',');
            
            var n=0;

           for (var i=0; i<r2.length; i++) {
              n+=Number(r2[i]);
           }
           if (n==0) {
		callback_post_insert();
           } else {
   		select_organisacia();
           }
         }
     }		

     function callback_post_insert() {

         var s1="INSERT INTO sea_organizacia (name, edrpou, address_ur, address_ph, licensia, boss, glbuh, phone, email)"+ 
                                                " VALUES ('"+input_0.value+"',"+
                                                          input_1.value+","+
                                                          "'"+input_2.value+"',"+
                                                          "'"+input_3.value+"',"+
                                                          "'"+input_4.value+"',"+
                                                          "'"+input_5.value+"',"+
                                                          "'"+input_6.value+"',"+
                                                          "'"+input_7.value+"',"+
                                                          "'"+input_8.value+"')";
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.select_organisacia);
     }

     function select_organisacia() {
         var s1="SELECT name, edrpou, address_ur, address_ph, licensia, boss, glbuh, phone, email FROM sea_organizacia"; 
         s1=window.btoa(encodeURIComponent(s1));
         mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");

          tb.parentNode.replaceChild(tb1, tb);

          tb1.id="t_data_body";

	  var t1=document.getElementById("responseDiv");
          var a1=decodeURIComponent(window.atob(t1.innerHTML));

 	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
		
	for (var i=0; i<(r1.length-1); i++) {
	  var r2=r1[i].split('\r');
	  
	  sea_add_table_row_only(r2[1], r2[2], r2[3], r2[4], r2[5], r2[6], r2[7], r2[8], r2[9]);
	}

 	  t1.innerHTML="";
   }

   tabel_clear.style="display: none";
   
   tabel_save.disabled=true;

   select_organisacia();
