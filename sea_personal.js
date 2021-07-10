
    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_input=["ИНН",
                    "Фамилия", 
                    "Имя", 
                    "Отчество", 
                    "Табельный №",
                    "Родился", 
                    "Принят", 
                    "Уволен"];

     var div_main1=sea_create_input("fio", "fio_div_main", ar_input);
     
    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица персонала ~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["ID", 
                         "ИНН",
                         "Табельный №",
                         "Фамилия", 
                         "Имя", 
                         "Отчество", 
                         "Родился", 
                         "Принят", 
                         "Уволен"];

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", this.input_field_fill);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

      tabel_save.onclick=function() {

       update_table_row(record_id.innerHTML,
                     input_0.value, 
		     input_4.value,
                     input_1.value, 
                     input_2.value, 
                     input_3.value, 
                     input_5.value,
                     input_6.value,
                     input_7.value
                    );
     }
     tabel_clear.onclick=function() {
       sea_set_data("", "", "", "", "", "", "", "");
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function input_field_fill(el1) {

          record_id.innerHTML=el1.cells[0].innerHTML;

          input_0.value=el1.cells[1].innerHTML;
          input_1.value=el1.cells[3].innerHTML;
          input_2.value=el1.cells[4].innerHTML;
          input_3.value=el1.cells[5].innerHTML;
          input_4.value=el1.cells[2].innerHTML;
          input_5.value=el1.cells[6].innerHTML;
          input_6.value=el1.cells[7].innerHTML;
          input_7.value=el1.cells[8].innerHTML;
     }

     function update_table_row() {

          var a1=Number(input_0.value);

       if (!isNaN(a1)) {

         var s1="UPDATE `sea_personal` SET "+
                                                            " inn="+input_0.value+
                                                            ",tab_n="+input_4.value+
                                                            ",family='"+input_1.value+"'"+
                                                            ",name='"+input_2.value+"'"+
                                                            ",father='"+input_3.value+"'"+
                                                            ",birdth="+(input_5.value==''   ? null : "'"+input_5.value+"'")+
                                                            ",accepted="+(input_6.value=='' ? null : "'"+input_6.value+"'")+
                                                            ",fired="+(input_7.value==''    ? null : "'"+input_7.value+"'")+" WHERE ID="+record_id.innerHTML;

         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post);
       }
     }
     function callback_post() {

           var t1=document.getElementById("responseDiv");
           var a1=decodeURIComponent(window.atob(t1.innerHTML));
         
           var ar1=a1.split(",");
           
           var is1=false;

         if (ar1.length>1) {
           
           for (var i=0; i<ar1.length; i++) {

              if (ar1[i]!='') {
                 var b1=Number(ar1[i]);

                if (!isNaN(b1)) {
                  is1=b1>0;
                }
              }
           }

         } else {
            
              if (a1!='') {
                 var b1=Number(a1);

                if (!isNaN(b1)) {
                  is1=b1>0;
                }
              }
         }

	   if (is1) {
	      select_personal();

	   } else {
              insert_table_row();

	   }
     }

     function callback_post_personal_insert() {
          select_personal();
     }

     function insert_table_row() {

         var s1="INSERT INTO `sea_personal` (inn,tab_n,family,name,father,birdth,accepted,fired) "+
                                  " VALUES ("+input_0.value+
                                         ", "+input_4.value+
                                        ", '"+input_1.value+"'"+
                                        ", '"+input_2.value+"'"+
                                        ", '"+input_3.value+"'"+
                                        ", "+(input_5.value=='' ? null : "'"+input_5.value+"'")+
                                        ", "+(input_6.value=='' ? null : "'"+input_6.value+"'")+
                                        ", "+(input_7.value=='' ? null : "'"+input_7.value+"'")+")";

         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_personal_insert);
     }
               
     function select_personal() {

        var s1=window.btoa("SELECT `id`,`inn`,`tab_n`,`family`,`name`,`father`,`birdth`,`accepted`,`fired`,`is_deleted` FROM `sea_personal`"); 
        mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {
          
          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  var r1=a1.split('\n');
		
	for (var i=0; i<(r1.length-1); i++) {
	  
	  var r2=r1[i].split('\r');
	  
          var row1=tb1.insertRow();
          
          var cell0=row1.insertCell(0);
          var cell1=row1.insertCell(1);
          var cell2=row1.insertCell(2);
          var cell3=row1.insertCell(3);
          var cell4=row1.insertCell(4);
          var cell5=row1.insertCell(5);
          var cell6=row1.insertCell(6);
          var cell7=row1.insertCell(7);
          var cell8=row1.insertCell(8);

          cell0.innerHTML=r2[1];
          cell1.innerHTML=r2[2];
          cell2.innerHTML=r2[3];
          cell3.innerHTML=r2[4];
          cell4.innerHTML=r2[5];
          cell5.innerHTML=r2[6];
          cell6.innerHTML=(r2[7]=='null' ? "" : r2[7]);
          cell7.innerHTML=(r2[8]=='null' ? "" : r2[8]);
          cell8.innerHTML=(r2[9]=='null' ? "" : r2[9]);
       
          cell3.className='t_data_body_fio';
          cell4.className='t_data_body_fio';
          cell5.className='t_data_body_fio';
	}

          tb.parentNode.replaceChild(tb1, tb);
        
 	  t1.innerHTML="";
   }

   select_personal();

                    