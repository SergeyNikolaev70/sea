
     var date_selected;
     var type_day_selected;
     var year_selected;
     var selected_TR;

    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["Дата",
                         "Тип дня (праздник: h , выходной: w, рабочий: j)"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="kalendar_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div class="kalendar_inline">'+
                  '  <div id="record_id1"></div>';
                   
                     st1+='  <select id="box_year">';
                   for (var j=0; j<10; j++) {
                      st1+='     <option value="'+(2019+j)+'" >'+(2019+j)+'</option>';

                   }
                     st1+='  </select>';

                st1+='</div>'+

                  '  <button id="kalendar_load" data-action="kalendar_load">Загрузить данные</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.className="kalendar_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

      // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Календарь ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data_kalendar", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head, "t_data_kalendar_div"));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data_kalendar", sea_input_field_fill);
        
	 year_selected=box_year.options[box_year.selectedIndex].value;

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     kalendar_load.onclick=function() {

	kalendar_load.disabled=true;

	select_kalendar();
     }

     box_year.onchange=function () {
	state_reset();
     }
     t_data_kalendar.ondblclick=function(event) {

         var trgt=event.target;
         var t1=document.getElementById("t_data_kalendar");
         
       while (trgt!=t1) {
           
           if (trgt.tagName=='TH') return;

           if (trgt.tagName=='TR') {
                 
                 selected_TR=trgt;
                 
                 date_selected=selected_TR.cells[0].innerHTML;

                 setTimeout(input_show, 1);

             return;
           }

           trgt=trgt.parentNode;
       }
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function fill_color_by_date(tr1) {

         if (tr1.cells[1].innerHTML!='j') {
            tr1.style.background='red';
            tr1.style.background='red';
         } else {
            tr1.style.background='';
            tr1.style.background='';
         }
     }        
     function input_show() {
         var c1=prompt(selected_TR.cells[0].innerHTML+" (праздник: h , выходной: w, рабочий: j)", selected_TR.cells[1].innerHTML);
        if ((c1!=null) && (c1!='')) {
            type_day_selected=c1;

            date_update();
        }
     }

     function date_updated_selected_draw() {
         
	 var t1=document.getElementById("responseDiv");
	 var a1=decodeURIComponent(window.atob(t1.innerHTML));
         a1=a1.replace(//gi, ' ');

	 var r1=a1.split('\n');
	 var r2=r1[0].split('\r');

         selected_TR.cells[1].innerHTML=r2[2];
         fill_color_by_date(selected_TR);
     }
     function date_updated_select() {
         
         var s1="SELECT date_k, type FROM sea_kalendar";
         s1+=" WHERE date_k='"+date_selected+"'";
  
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.date_updated_selected_draw);
     }
     function date_update() {
         var s1="UPDATE sea_kalendar SET type='"+type_day_selected+"'";
         s1+=" WHERE date_k='"+date_selected+"'";
  
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.date_updated_select);
     }

     function state_reset() {

	  kalendar_load.disabled=false;

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";
          tb.parentNode.replaceChild(tb1, tb);

          for (var j=0; j<ar_table_head.length; j++) {

               var th1=document.getElementById("f"+j);

               th1.style.background='';
               th1.style.display='';
          }
            year_selected=box_year.options[box_year.selectedIndex].value;
     }

     function insert_row_to_table() {

         var s1="INSERT INTO sea_kalendar (date_k, year, type) VALUES ('"+date_selected+"', "+year_selected+", "+date_+");\n";

         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";

         s1+="UPDATE sea_kalendar SET type='"+type_day_selected+"'";
         s1+=" WHERE date_k="+date_selected;

         return s1;
     }
    
     function select_kalendar() {

         var s1="SELECT date_k, type"+
                " FROM `sea_kalendar`"+
                " WHERE year="+year_selected+" ORDER BY date_k";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  function date_generate() {
       var sql1="";

   for (var j=1; j<=12; j++) {
     for (var i=1; i<=31; i++) {
         
         var s1=year_selected+"-"+j+"-"+i;
         var dt=new Date(s1);

       if ((dt.getMonth()+1)!=j) break;

        stype=((dt.getDay()==0) || (dt.getDay()==6)) ? "w" : "j";

        sql1+=" INSERT INTO sea_kalendar SET date_k='"+s1+"', type='"+stype+"', year="+year_selected+";\n";
     }
   }
      sql1=window.btoa(encodeURIComponent(sql1));
      mysql_get("http://192.168.0.151:5050/?"+sql1, this.select_kalendar);
  }

   function xdecode() {

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
      
      if (a1=='') {
          
          date_generate();

      } else {

   	  var isFound=r1.length>0;

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            var row1=tb1.insertRow();

          for (var j=0; j<r2.length-1; j++) {

               var cell0=row1.insertCell(j);
               
            if (r2[j]!='null') {

                cell0.innerHTML=r2[j+1];
            }
          }
               fill_color_by_date(row1);
	}
      }	
          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

          kalendar_load.disabled=false;
    }


