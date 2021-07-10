
     var tabel_year=0;
     var tabel_month=0;
     var day_last_month=0;
     var selected_TR;
     var selected_TD;
    
    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["ИНН",
                         "Фамилия Имя Отчество",
                         "Начислено ЗП",
                         "ФССНС",
                         "Фонд обязательнного страхования на случай безработицы",
                         "Фонд социального страхования в связи с временной нетрудоспособностью",
                         "Пенсионный фонд"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="nachisl_na_fzp_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div id="nachisl_na_fzp_inline">'+
            '  <div id="nachisl_na_fzp_block">'+
                  '<div id="nachisl_na_fzp_inline">'+
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
         div1.id="nachisl_na_fzp_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Фонд начисления ЗП ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     tabel_save.onclick=function() {
        
        tabel_load.disabled=true;
	tabel_save.disabled=true;

        add_table_row();
     }
     tabel_load.onclick=function() {

        tabel_load.disabled=true;
	tabel_save.disabled=true;

	select_nachisl_na_fzp();
     }

     box_month.onchange=function () {
	state_reset();
     }
     box_year.onchange=function () {
	state_reset();
     }
/*
     t_data.ondblclick=function(event) {

         var trgt=event.target;
         var t1=document.getElementById("t_data");
         
         if (trgt.tagName=='TD') selected_TD=event.target;
         else selected_TD=null;

       while (trgt!=t1) {
           
           if (trgt.tagName=='TH') return;

           if (trgt.tagName=='TR') {
                 
                 selected_TR=trgt;
                 
                 setTimeout(nachisl_na_fzp_input_show, 1);

             return;
           }

           trgt=trgt.parentNode;
       }
     }
*/
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function nachisl_na_fzp_input_show() {
           var c1=prompt(selected_TD.innerHTML, selected_TD.innerHTML);
        if ((с1!=null) && (c1!='')) {

          if (nnzp_set_all.checked==true) {
            for (var i=0; i<t1.rows.length; i++) {
              t1.rows[i].cells[selected_TD_index].innerHTML=c1;
            }
          } else {
             selected_TD.innerHTML=c1;
          }
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

         var ym1="'"+tabel_year+"-"+tabel_month+"'";

      for (var j=0; j<fbody1.rows.length; j++) {

           var fin2=fbody1.rows[j].cells[0];

           s1+="INSERT INTO sea_nachisl_na_fzp (year_mon, inn, nachisleno_zp, fssns, strah_bezrab, strah_netrudosp, pensia_fond) "+
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

           s1+=");\n";
      }
         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";
         var ym1="'"+tabel_year+"-"+tabel_month+"'";

      for (var j=0; j<fbody1.rows.length; j++) {

               var fin1=fbody1.rows[j].cells[0];
               s1+="UPDATE sea_nachisl_na_fzp SET year_mon="+ym1+", inn="+fin1.innerHTML;

               fin1=fbody1.rows[j].cells[2];
               s1+=", nachisleno_zp="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[3];
               s1+=", fssns="+sea_get_number(fin1.innerHTML);
               
               fin1=fbody1.rows[j].cells[4];
               s1+=", strah_bezrab="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[5];
               s1+=", strah_netrudosp="+sea_get_number(fin1.innerHTML);

               fin1=fbody1.rows[j].cells[6];
               s1+=", pensia_fond="+sea_get_number(fin1.innerHTML);

               var fin1=fbody1.rows[j].cells[0];
               s1+=" WHERE (year_mon="+ym1+") AND (inn="+fin1.innerHTML+");\n";
           }

         return s1;
     }


     function add_table_row() {

         s1=window.btoa(encodeURIComponent(update_row_to_table()));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_nachisl_na_fzp_update);

     }

     function callback_post_nachisl_na_fzp_update() {

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
	      
	      select_nachisl_na_fzp();
	   
	   } else {

             s1=window.btoa(encodeURIComponent(insert_row_to_table()));
	     mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_nachisl_na_fzp_insert);
	   }
     }
     function callback_post_nachisl_na_fzp_insert() {

	 select_nachisl_na_fzp();
     }

     function set_year_month() {

         var mon1=document.getElementById("box_month").selectedIndex;
         var mon_opt1=document.getElementById("box_month").options;
         var mon=mon_opt1[mon1].innerHTML;
         tabel_month=mon_opt1[mon1].getAttribute("value");
         
         if (tabel_month.length==1) tabel_month='0'+tabel_month;

         var year1=document.getElementById("box_year").selectedIndex;
         var year_opt1=document.getElementById("box_year").options;
         tabel_year=year_opt1[year1].innerHTML;

	 day_last_month=sea_get_last_day_month(tabel_year, tabel_month);
     }

     function prepare_columns() {

     }

     function select_nachisl_na_fzp() {

     	 set_year_month();

     	 var ym1=tabel_year+"-"+tabel_month;

     	 var sn1="(SELECT b.summa-b.otpusknye_sm FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

     	 var snx="(SELECT b.fssns FROM `sea_nachisl_na_fzp_cfg`  AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
     	 var sn2=sn1+"*0.01*"+snx;

     	 var snx1="(SELECT b.strah_bezrab FROM `sea_nachisl_na_fzp_cfg`  AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
     	 var sn21=sn1+"*0.01*"+snx1;
     	                     
     	 var snx2="(SELECT b.strah_netrudospos FROM `sea_nachisl_na_fzp_cfg`  AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
     	 var sn22=sn1+"*0.01*"+snx2;

     	 var snx3="(SELECT b.pensia_fond FROM `sea_nachisl_na_fzp_cfg`  AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
     	 var sn23=sn1+"*0.01*"+snx3;

         var s1="SELECT a.inn as inn, CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`,"+
                sn1 +" as nachisleno_zp,"+
                sn2 +" as fssns,"+
                sn21+" as strah_bezrab,"+
                sn22+" as strah_netrudosp,"+
                sn23+" as pensia_fond, "+
		"(SELECT b.ID              FROM `sea_nachisl_na_fzp` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as ID "+
                " FROM `sea_personal` AS a WHERE fired IS NULL";
          
          s1=window.btoa(encodeURIComponent(s1));
          mysql_get("http://192.168.0.151:5050/?"+s1, this.xdecode);
     } 

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function xdecode() {
     try {
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

          for (var j=0; j<ar_table_head.length; j++) {

               var cell0=row1.insertCell(j);
               
               if (j==0) {
                  cell0.className='t_data_body_fio';
               }

               
            if (r2[j+1]!='null') {

                   if (j>1) cell0.innerHTML=Number(r2[j+1]).toFixed(2);
                   else cell0.innerHTML=r2[j+1];
            }

          }
	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

	  prepare_columns();

       } finally {
          tabel_load.disabled=false;
	  tabel_save.disabled=!isFound;
       }
    }

     tabel_save.disabled=true;

