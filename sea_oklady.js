
     var inn_selected;

    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["Дата",
                         "Оклад (грн)"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="oklady_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

         var s1="SELECT inn AS inn, CONCAT(CONCAT(family, ' '), CONCAT(CONCAT(name, ' '), father)) AS `fio`"+
                " FROM `sea_personal` WHERE (fired IS null) AND (is_deleted IS null)";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode_fios);

   function xdecode_fios() {

    var st1='<div class="oklady_inline">'+
                  '  <div id="record_id1"></div>';
                   
                     st1+='  <div>Сотрудник:&nbsp</div>';
                     st1+='  <select id="box_fio">';

	  	     var t1=document.getElementById("responseDiv");
		     var a1=decodeURIComponent(window.atob(t1.innerHTML));
		     a1=a1.replace(//gi, ' ');
                     var r1=a1.split('\n');
	  
                  for (var i=0; i<(r1.length-1); i++) {
                      var r2=r1[i].split('\r');

                      st1+='     <option value="'+r2[1]+'" >'+r2[2]+'</option>';
                   }
                     st1+='  </select>';

                st1+='</div>'+

                  '  <button id="oklady_load" data-action="oklady_load">Загрузить данные</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.className="oklady_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         var div_main2=sea_create_input_B(4, "oklady", "oklady_div_main", ar_table_head);
         div_main1.appendChild(div_main2);

      // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Начислений ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "_t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill, save_enabled);
        
         oklady_save.disabled=true; 

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     oklady_clear.onclick=function() {
	clear_oklady_input();
     }
     oklady_save.onclick=function() {
        add_table_row();
     }
     oklady_load.onclick=function() {

	oklady_load.disabled=true;
	oklady_save.disabled=true;

	inn_selected=box_fio.options[box_fio.selectedIndex].value;
	select_oklady(inn_selected);
     }

     box_fio.onchange=function () {
	state_reset();
     }

   }
    function save_enabled() {
        oklady_save.disabled=false;
    }

    function clear_oklady_input() {
       input_0.value='';
       input_1.value='';
    }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function state_reset() {

          clear_oklady_input();

	  oklady_load.disabled=false;
	  oklady_save.disabled=true;

          var tb=document.getElementById("_t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="_t_data_body";
          tb.parentNode.replaceChild(tb1, tb);

          for (var j=0; j<ar_table_head.length; j++) {

               var th1=document.getElementById("f"+j);

               th1.style.background='';
               th1.style.display='';
          }

     }

     function insert_row_to_table() {

         var s1="INSERT INTO sea_oklady (inn, date_oklada, oklad) VALUES ("+Number(inn_selected)+",'"+input_0.value+"',"+input_1.value+");\n";

         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("_t_data_body");
         var s1="";

         s1+="UPDATE sea_oklady SET date_oklada='"+input_0.value+"', oklad="+input_1.value;
         s1+=" WHERE inn="+inn_selected+" AND date_oklada='"+input_0.value+"'";

         return s1;
     }


     function add_table_row() {

         s1=window.btoa(encodeURIComponent(update_row_to_table()));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_oklady_update);

     }

     function callback_post_oklady_update() {

           var t1=document.getElementById("responseDiv");
           var a1=decodeURIComponent(window.atob(t1.innerHTML));
         
           var ar1=a1.split(",");
           
           var is1=false;

         if (ar1.length>0) {
           
           for (var i=0; i<ar1.length; i++) {

              if (ar1[i]!='') {
                 var b1=Number(ar1[i]);

                if (!isNaN(b1)) {
                  is1=b1>0;
                }
              }
           }

         } else {

              if (ar1[i]!='') {
                 var b1=Number(ar1[i]);

                if (!isNaN(b1)) {
                  is1=b1>0;
                }
              }
         }

	   if (is1) {
	      
	      select_oklady();
	   
	   } else {

             s1=window.btoa(encodeURIComponent(insert_row_to_table()));
	     mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_oklady_insert);
	   }
     }
     function callback_post_oklady_insert() {

	 select_oklady();
     }

     function prepare_columns() {

     }

     function select_oklady(inn1) {

         var s1="SELECT inn, date_oklada, oklad"+
                " FROM `sea_oklady`"+
                " WHERE inn="+inn_selected+" ORDER BY date_oklada";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {

          var tb=document.getElementById("_t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="_t_data_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
	  
   	  var isFound=r1.length>0;

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            var row1=tb1.insertRow();

          for (var j=2; j<r2.length; j++) {

               var cell0=row1.insertCell(j-2);
               
            if (r2[j]!='null') {
                   cell0.innerHTML=r2[j];
            }
          }
	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

          oklady_load.disabled=false;
    }


