
     var year_selected=0;
     var month_selected=0;
     var day_last_month=0;
     var selected_TR;
     var selected_TD;
    
    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["ИНН",
                         "Фамилия Имя Отчество",
                         "Аванс за первую половину месяца",
                         "Выплаты в межрасчетный период",
                         "Подоходный налог",
                         "Отчисления в пенсионный фонд",
                         "Профсоюзный взнос",
                         "За исполнительными документами",
                         "Фонд сцстрах. по безработице",
                         "Фонд сцстрах. по утрате работоспособности",
                         "Другие удержания",
                         "Всего"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="udergania_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div id="udergania_inline">'+
            '  <div id="udergania_block">'+
                  '<div id="udergania_inline">'+
                  '  <div id="record_id"></div>';
                   
                     st1+='</div>';

                     st1+='  <div>Расчет за&nbsp</div>'+
                          '  <select id="box_month">'+
                          '     <option value="1" >Январь</option>'+
                          '     <option value="2" >Февраль</optiont>'+
                          '     <option value="3" >Март</option>'+
                          '     <option value="4" >Апрель</option>'+
                          '     <option value="5" >Май</option>'+
                          '     <option value="6" >Июнь</option>'+
                          '     <option value="7" >Июль</option>'+
                          '     <option value="8" >Август</option>'+
                          '     <option value="9" >Сентябрь</option>'+
                          '     <option value="10">Октябрь</option>'+
                          '     <option value="11">Ноябрь</option>'+
                          '     <option value="12">Декабрь</option>'+
                          '  </select>';

                     st1+='  <select id="box_year">';
                   for (var j=0; j<10; j++) {
                      st1+='     <option value="'+(2019+j)+'" >'+(2019+j)+'</option>';

                   }
                     st1+='  </select>';

                     st1+='</div>'+
            '  </div>'+
                  '  <button id="tabel_load" data-action="tabel_load">Загрузить данные</button>'+
                  '  <button id="tabel_save" data-action="tabel_save">Записать в базу</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id="udergania_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Начислений ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     tabel_save.onclick=function() {
        add_table_row();
     }
     tabel_load.onclick=function() {

	tabel_load.disabled=true;

	select_udergania();
     }

     box_month.onchange=function () {
	state_reset();
     }
     box_year.onchange=function () {
	state_reset();
     }

     t_data.ondblclick=function(event) {

         var trgt=event.target;
         var t1=document.getElementById("t_data");
         
         if (trgt.tagName=='TD') selected_TD=event.target;
         else selected_TD=null;

       while (trgt!=t1) {
           
           if (trgt.tagName=='TH') return;

           if (trgt.tagName=='TR') {
                 
                 selected_TR=trgt;
                 
                 setTimeout(udergania_input_show, 1);

             return;
           }

           trgt=trgt.parentNode;
       }
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function _summ_total() {
         var sum=0;
       for (var i=2; i<(selected_TR.cells.length-1); i++) {

        try {
              s2=Number(selected_TR.cells[i].innerHTML);
           if (!isNaN(s2)) sum+=s2;

           } catch (ex1) {

           }
       }
         selected_TR.cells[selected_TR.cells.length-1].innerHTML=""+Number(sum).toFixed(2);
     }

     function udergania_input_show() {
         var c1=prompt(selected_TD.innerHTML, selected_TD.innerHTML);

       if ((c1!=null) && (c1.length>0)) {

          selected_TD.innerHTML=c1;

          _summ_total();
	}
     }

     function state_reset() {

          tabel_load.disabled=false;
	  tabel_save.disabled=true;

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";
          tb.parentNode.replaceChild(tb1, tb);

          for (var j=2; j<ar_table_head.length; j++) {

               var th1=document.getElementById("f"+j);

               th1.style.background='';
               th1.style.display='';
          }
     }

     function set_hours_all() {

           var t1=document.getElementById("t_data");
               
       for (var i=1; i<t1.rows.length; i++) {
             var r1=t1.rows[i];
             var sum=0.0;
         for (var j=2; j<33; j++) {
            
              var f1=r1.cells[j];

            if ((f1.style.background=='') && (f1.style.display!='none')) {
              
              f1.innerHTML=hours_input.value;
              sum+=Number(hours_input.value);
            }
         }
             var f1=r1.cells[ar_table_head.length-1];
             f1.innerHTML=sum;
       }
     }

     function insert_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";

         var ym1="'"+year_selected+"-"+month_selected+"'";

      for (var j=0; j<fbody1.rows.length; j++) {

           var fin2=fbody1.rows[j].cells[0];

           s1+="INSERT INTO sea_udergania (year_mon, inn, avans, vyplaty, podohod_nalog, pension_fond, profsouz, ispolniteln_doc, socstrah_bezrab, socstrah_netrudosp, udergania_dr, summa) "+
                                    " VALUES ("+ym1+", "+fin2.innerHTML;

               fin1=fbody1.rows[j].cells[2];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[3];
               s1+=", "+sea_get_number(fin1.innerHTML);
               
               fin1=fbody1.rows[j].cells[4];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[5];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[6];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[7];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[8];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[9];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[10];
               s1+=", "+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[11];
               s1+=", "+sea_get_number(fin1.innerHTML);

           s1+=");\n";
      }
         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";
         var ym1="'"+year_selected+"-"+month_selected+"'";

      for (var j=0; j<fbody1.rows.length; j++) {

               var fin1=fbody1.rows[j].cells[0];
               s1+="UPDATE sea_udergania SET year_mon="+ym1+", inn="+fin1.innerHTML;

               fin1=fbody1.rows[j].cells[2];
               s1+=", avans="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[3];
               s1+=", vyplaty="+sea_get_number(fin1.innerHTML);
               
               fin1=fbody1.rows[j].cells[4];
               s1+=", podohod_nalog="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[5];
               s1+=", pension_fond="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[6];
               s1+=", profsouz="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[7];
               s1+=", ispolniteln_doc="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[8];
               s1+=", socstrah_bezrab="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[9];
               s1+=", socstrah_netrudosp="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[10];
               s1+=", udergania_dr="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[11];
               s1+=", summa="+sea_get_number(fin1.innerHTML);

               var fin1=fbody1.rows[j].cells[0];
               s1+=" WHERE (year_mon="+ym1+") AND (inn="+fin1.innerHTML+");\n";
           }

         return s1;
     }


     function add_table_row() {

         s1=window.btoa(encodeURIComponent(update_row_to_table()));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_udergania_update);

     }

     function callback_post_udergania_update() {

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

              if (ar1[i]!='') {
                 var b1=Number(ar1[i]);

                if (!isNaN(b1)) {
                  is1=b1>0;
                }
              }
         }

	   if (is1) {
	      
	      select_udergania();
	   
	   } else {

             s1=window.btoa(encodeURIComponent(insert_row_to_table()));
	     mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_udergania_insert);
	   }
     }
     function callback_post_udergania_insert() {

	 select_udergania();
     }

     function set_year_month() {

         var mon1=document.getElementById("box_month").selectedIndex;
         var mon_opt1=document.getElementById("box_month").options;
         var mon=mon_opt1[mon1].innerHTML;
         month_selected=mon_opt1[mon1].getAttribute("value");
         
         if (month_selected.length==1) month_selected='0'+month_selected;

         var year1=document.getElementById("box_year").selectedIndex;
         var year_opt1=document.getElementById("box_year").options;
         year_selected=year_opt1[year1].innerHTML;

	 day_last_month=sea_get_last_day_month(year_selected, month_selected);
     }

     function prepare_columns() {

     }

     function select_udergania() {

     	 set_year_month();
     	 
         var ym1=year_selected+"-"+month_selected;

    	 var oklad1  ="(SELECT MAX(b.oklad) FROM sea_oklady AS b WHERE (b.inn=a.inn) AND (b.date_oklada<'"+year_selected+"-"+month_selected+"-"+day_last_month+"'))";
    	 var av1="(SELECT b.avans          FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

    	 var sum_nsp1="(SELECT b.summa-b.otpusknye_sm FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

    	 var pn1="(SELECT b.pn_sum         FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
    	 var pn2="(SELECT b.pn_proc        FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
    	 var pn3="(SELECT b.pn_sum_vycheta FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

    	 var ssb1="(SELECT b.fossb FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
    	 var ssn1="(SELECT b.fosvn FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

    	 var pf1="(SELECT b.pensia_fond FROM `sea_nachisl_na_zp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

         var s1="SELECT a.inn as inn, CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`,"+
                "("+oklad1+"*"+av1+"*0.01) as avans,"+
                "(SELECT b.vyplaty            FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as vyplaty,"+
                "("+pn1+"+("+pn2+"*0.01*("+sum_nsp1+"-"+pn3+"))) as podohod_nalog,"+
                "("+sum_nsp1+"*0.01*"+pf1+") as pensia_fond,"+
                "(SELECT b.profsouz           FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as profsouz,"+
                "(SELECT b.ispolniteln_doc    FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as ispolniteln_doc,"+
                "("+ssb1+"*0.01*"+sum_nsp1+") as socstrah_bezrab,"+
                "("+ssn1+"*0.01*"+sum_nsp1+") as socstrah_netrudosp,"+
                "(SELECT b.udergania_dr    FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as udergania_dr,"+
                "(SELECT b.summa           FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as summa,"+
		"(SELECT b.ID              FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as ID "+                
                " FROM `sea_personal` AS a WHERE fired IS NULL";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
	  
	  var sum=0.0;

   	  var isFound=r1.length>0;

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            var row1=tb1.insertRow();

            sum=0;

          for (var j=0; j<(ar_table_head.length-1); j++) {

               var cell0=row1.insertCell(j);
               
               if (j==0) {
                  cell0.className='t_data_body_fio';
               }

               
            if (r2[j+1]!='null') {

                if (j>2) cell0.innerHTML=Number(r2[j+1]).toFixed(2);
                else cell0.innerHTML=r2[j+1];
            }

               if (j>=1) {
                    var sdt=year_selected+'-'+month_selected+'-'+(j-1);
                    var dt=new Date(sdt);
                    var y1=dt.getFullYear();
                    var m1=dt.getMonth()+1;
                     
                  if ((y1==year_selected) && (m1==month_selected)) {

                     if ((r2[j+1]!='null') && (r2[j+1]!='')) {
                          var s2=0;
                       try {
                           s2=Number(r2[j+1]).toFixed(2);

                          if (!isNaN(s2)) sum+=Number(s2);

                       } catch (ex1) {

                       }
                     }

                  }
               }
          }
	    if (r2.length>0) {

               var cell0=row1.insertCell(ar_table_head.length-1);
               cell0.innerHTML=Number(sum).toFixed(2);
               cell0.className='t_column_sum';
               
               var th1=document.getElementById("f"+(ar_table_head.length-1));
               th1.className='t_column_sum';

            }

	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

	  prepare_columns();

          tabel_load.disabled=false;
	  tabel_save.disabled=!isFound;
    }

     tabel_save.disabled=true;

