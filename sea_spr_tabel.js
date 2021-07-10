
     var id_selected;

    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["Название",
                         "Код",
                         "ID" 
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="spr_tabel_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

         var div_main2=sea_create_input_B(4, "spr_tabel", "spr_tabel_div_main", ar_table_head);
         div_main1.appendChild(div_main2);

      // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Начислений ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data_spr_tabel", "t_data_spr_tabel_head", "t_data_spr_tabel_body", "t_data_spr_tabel_body_record", ar_table_head, "spr_tabel_divx"));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data_spr_tabel", sea_input_field_fill, this.spr_tabel_set_id);
        
         spr_tabel_save.disabled=true; 

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     spr_tabel_clear.onclick=function() {
	clear_spr_tabel_input();
     }
     spr_tabel_save.onclick=function() {
        add_table_row();
     }
    function clear_spr_tabel_input() {
       input_0.value='';
       input_1.value='';

       spr_tabel_save.disabled=true; 
    }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function spr_tabel_set_id(tr1) {
         
         if ((tr1!=undefined) && (tr1!=null)) {

             id_selected=Number(tr1.cells[2].innerHTML);
  
             spr_tabel_save.disabled=false;

         } else id_selected=-1;
     }

     function insert_row_to_table() {

         var s1="INSERT INTO sea_spr_tabel (name, kod) VALUES ('"+input_0.value+"','"+input_1.value+"');\n";

         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("t_data_spr_tabel_body");
         var s1="";

         s1+="UPDATE sea_spr_tabel SET name='"+input_0.value+"', kod='"+input_1.value+"'"+
             " WHERE id="+id_selected;

         return s1;
     }


     function add_table_row() {

         s1=window.btoa(encodeURIComponent(update_row_to_table()));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_spr_tabel_update);

     }

     function callback_post_spr_tabel_update() {

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

	   if (is1==true) {
	      
	      select_spr_tabel();
	   
	   } else {

             s1=window.btoa(encodeURIComponent(insert_row_to_table()));
	     mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_spr_tabel_insert);
	   }
     }
     function callback_post_spr_tabel_insert() {

	 select_spr_tabel();
     }

     function prepare_columns() {

     }

     function select_spr_tabel() {

         var s1="SELECT name, kod, id FROM sea_spr_tabel";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {

          var tb=document.getElementById("t_data_spr_tabel_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_spr_tabel_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
	  
   	  var isFound=r1.length>0;

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            var row1=tb1.insertRow();

          for (var j=1; j<r2.length; j++) {

               var cell0=row1.insertCell(j-1);
               
            if (r2[j]!='null') {
                   cell0.innerHTML=r2[j];
            }
          }
	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";
    }

        select_spr_tabel();
