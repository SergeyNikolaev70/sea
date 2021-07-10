
     var tabel_year="";
     var tabel_month="";
     var ar_days_type=["","","","","","","","","","","","","","","","","","","","","","","","","","","","","","",""];

     var selected_TR;
     var selected_TD;
     var selected_TD_index;

     var date_01;
     var date_31;
     var rabochih_dney=0;

     var sum_hours_recalc_TR;
     var sum_rdney_recalc_TR;

    // ~~~~~~~~~~~~~~~~~~~~~ Создаются поля ввода ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      var ar_table_head=["Фамилия Имя Отчество", 
                         "ИНН",
                         "01",
                         "02",
                         "03",
                         "04",
                         "05",
                         "06",
                         "07",
                         "08",
                         "09",
                         "10",
                         "11",
                         "12",
                         "13",
                         "14",
                         "15",
                         "16",
                         "17",
                         "18",
                         "19",
                         "20",
                         "21",
                         "22",
                         "23",
                         "24",
                         "25",
                         "26",
                         "27",
                         "28",
                         "29",
                         "30",
                         "31",
                         "Всего часов",
                         "Отработано дней"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="tabel_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div id="tabel_inline">'+
            '  <div id="tabel_block">'+
                  '<div id="tabel_inline">'+
                  '  <div id="record_id"></div>';
                   
                     st1+='</div>';

                     st1+=' <input id="tabel_set_by_day_all" type="checkbox" data-action="tabel_set_all">Значение по дню установить всем</input>';

                     st1+='  <div style="margin-left: 30px">Расчет за&nbsp</div>'+
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
                          '<div id="tabel_inline">'+
                             '  <div id="hours_div">Часы&nbsp</div>'+
                             '  <input maxlength="3" value="8" id="hours_input"></input>'+
                             '</div>'+
                  '  <button id="tabel_set_all" data-action="tabel_set_all">Установить всем</button>'+
                  '  <button id="tabel_save" data-action="tabel_save">Записать в базу</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id="tabel_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Календаря ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     tabel_save.onclick=function() {

        tabel_save.disabled=true;

        add_table_row();
     }
     tabel_set_all.onclick=function() {
        set_hours_all();
     }
     tabel_load.onclick=function() {

	tabel_load.disabled=true;
        
	select_kalendar();
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

         selected_TD_index=-1;

       while (trgt!=t1) {
           
           if (trgt.tagName=='TH') return;

           if (trgt.tagName=='TR') {
                 
                 selected_TR=trgt;
                 
             break;
           }

           trgt=trgt.parentNode;
       }

       if ((selected_TD!=null) && (selected_TR!=null)) {

        for (var i=0; i<selected_TR.cells.length; i++) {

           if (selected_TR.cells[i]==selected_TD) {

              selected_TD_index=i;
              
              break;
           }
        }
             setTimeout(tabel_input_show, 1);
       }
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function tabel_input_show() {

       if (selected_TD_index!=-1) {

           var c1=prompt(selected_TD.innerHTML, selected_TD.innerHTML);
           var t1=document.getElementById("t_data_body");

        if ((c1!=null) && (c1!='')) {

          if (tabel_set_by_day_all.checked==true) {

            for (var i=0; i<t1.rows.length; i++) {
              t1.rows[i].cells[selected_TD_index].innerHTML=c1;
            }

          } else {
             selected_TD.innerHTML=c1;
         }
            sum_hours_recalc_TR=recalc_TR(selected_TR);

            var f2=selected_TR.cells[ar_table_head.length-1];
            f2.innerHTML=""+sum_rdney_recalc_TR;

            var f1=selected_TR.cells[ar_table_head.length-2];
            f1.innerHTML=sum_hours_recalc_TR;
	}
      }	
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function state_reset() {

          tabel_load.disabled=false;
	  tabel_set_all.disabled=true;
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
             set_year_month();
     }
     function recalc_TR(r1) {
            
            sum_hours_recalc_TR=0;
            sum_rdney_recalc_TR=0;

         for (var j=2; j<33; j++) {
            
              var f1=r1.cells[j];
              var b1=-1;
              
              try {
                 b1=Number(f1.innerHTML);
              } catch (ex) {

              }

            if (!isNaN(b1)) {
              sum_hours_recalc_TR+=Number(b1);

              sum_rdney_recalc_TR+=b1>0 ? 1: 0;
            }
         }
            return sum_hours_recalc_TR;
     }
     function set_hours_all() {

           var t1=document.getElementById("t_data");
               
       for (var i=1; i<t1.rows.length; i++) {
             var r1=t1.rows[i];

             var sum=recalc_TR(r1);

             var f2=r1.cells[ar_table_head.length-1];
             f2.innerHTML=""+rabochih_dney;

             var f1=r1.cells[ar_table_head.length-2];
             f1.innerHTML=sum;
       }
     }

     function insert_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";

      for (var j=0; j<fbody1.rows.length; j++) {

          var fin2=fbody1.rows[j].cells[1];

           s1+="INSERT INTO sea_tabel (year_mon,inn,"+
                                      "_1,_2,_3,_4,_5,_6,_7,_8,_9,_10,"+
                                      "_11,_12,_13,_14,_15,_16,_17,_18,_19,_20,"+
                                      "_21,_22,_23,_24,_25,_26,_27,_28,_29,_30,"+
                                      "_31,summa, rabochih_dney) VALUES ('"+tabel_year+"-"+tabel_month+"',"+Number(fin2.innerHTML);

           for (var i=2; i<35; i++)  {
                  var fin1=fbody1.rows[j].cells[i];

                if (fin1!=null) {
                  if (fin1.innerHTML=='') fin1.innerHTML=' ';

                  s1+=(i==34) ? ", "+Number(fin1.innerHTML)+"" : ", '"+fin1.innerHTML+"'";
                }
           }
              s1+=");\n";
      }
         return s1;
     }
     function update_row_to_table() {

         var fbody1=document.getElementById("t_data_body");
         var s1="";

      for (var j=0; j<fbody1.rows.length; j++) {

               var fin1=fbody1.rows[j].cells[1];

               s1+="UPDATE sea_tabel SET year_mon='"+tabel_year+"-"+tabel_month+"', inn="+fin1.innerHTML;

           for (var i=2; i<33; i++)  {
                  var fin1=fbody1.rows[j].cells[i];

                if (fin1!=null) {
                  s1+= ", _"+(i-1)+"='"+fin1.innerHTML+"'";
                }
           }
              var fina=fbody1.rows[j].cells[33];
              s1+=", summa="+fina.innerHTML;

              var fin1=fbody1.rows[j].cells[34];
              s1+=", rabochih_dney="+fin1.innerHTML;

              var fin2=fbody1.rows[j].cells[1];
              s1+=" WHERE (inn="+fin2.innerHTML+") AND (year_mon='"+tabel_year+"-"+tabel_month+"');\n";
      }
         return s1;
     }


     function add_table_row() {

         s1=window.btoa(encodeURIComponent(update_row_to_table()));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_tabel_update);

     }

     function callback_post_tabel_update() {

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
	      
	      select_tabel();
	   
	   } else {

             s1=window.btoa(encodeURIComponent(insert_row_to_table()));
	     mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_post_tabel_insert);
	   }
     }
     function callback_post_tabel_insert() {

	 select_tabel();
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
     }

     function prepare_columns() {

     }

     function select_kalendar() {

         set_year_month();

         date_01=tabel_year+"-"+tabel_month+"-01";
         date_31=sea_get_last_date_month(tabel_year, tabel_month);

         var s1="SELECT date_k, type FROM sea_kalendar WHERE (year="+tabel_year+") AND (date_k<='"+date_31+"') AND (date_k>='"+date_01+"')";

         s1=window.btoa(encodeURIComponent(s1));
         mysql_get("http://192.168.0.151:5050/?"+s1, this.callback_select_kalendar);
     } 
     function callback_select_kalendar() {

	  var t1=document.getElementById("responseDiv");
	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');
	  
	  rabochih_dney=0;

          ar_days_type[30]="";
          ar_days_type[29]="";
          ar_days_type[28]="";

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            ar_days_type[i]=r2[2];
           
            rabochih_dney+=(ar_days_type[i]!='j' ? 0 : 1);
        }
           select_tabel();
     }
     function select_tabel() {

     	 set_year_month();

         var s1="SELECT CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`, a.inn, ";

        for (var i=1; i<=31; i++) {
            s1+="(SELECT b._"+i+" FROM `sea_tabel` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+tabel_year+"-"+tabel_month+"')) as `_"+i+(i==31 ? "`" : "`,");
        }
          s1+=", (SELECT b.rabochih_dney FROM sea_tabel AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+tabel_year+"-"+tabel_month+"')) as rabochih_dney FROM `sea_personal` AS a WHERE fired IS NULL";
          
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
	  var rdney=0;

   	  var isFound=r1.length>0;

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

            var row1=tb1.insertRow();

            sum=0;
            rdney=0;

          for (var j=0; j<(ar_table_head.length-2); j++) {

                  var cell0=row1.insertCell(j);
               
               if (j==0) {
                  cell0.className='t_data_body_fio';
               }

               
            if (r2[j+1]!='null') {

                var a1=Number(r2[j+1]);

                cell0.innerHTML=((j>1) && (r2[j+1].length>0) ? Number(a1).toFixed(0) : r2[j+1]);
            }

               if (j>=2) {
                    var sdt=tabel_year+'-'+tabel_month+'-'+(j-1);
                    var dt=new Date(sdt);
                    var y1=dt.getFullYear();
                    var m1=dt.getMonth()+1;
                     
                  if ((y1==tabel_year) && (m1==tabel_month)) {

                     if ((r2[j+1]!='null') && (r2[j+1]!='')) {
                          
                          var s2=0;
                       try {
                           s2=Number(r2[j+1]);

                          if (!isNaN(s2)) {

                               sum+=s2;
                               rdney+=(s2>0 ? 1 : 0);
                          }

                       } catch (ex1) {

                       }
                     }
                        var th1=document.getElementById("f"+j);
                        th1.style.display='';

                     if (ar_days_type[j-2]!='j') {
                        th1.style.background='#A94744';
                        cell0.style.background='#A94744';
                     } else {
                        
                        th1.style.background='';
                        cell0.style.background='';
                     }


                  } else {

                     var th1=document.getElementById("f"+j);
                     th1.style.display='none';

                     cell0.style.display='none';
                     
                     th1.style.background='';
                     cell0.style.background='';

                     cell0.innerHTML='';
                  }
               }
          }
	    if (r2.length>0) {

               var cell0=row1.insertCell(ar_table_head.length-2);
               cell0.innerHTML=sum;
               cell0.className='t_column_sum';
               
               var cell1=row1.insertCell(ar_table_head.length-1);
               cell1.innerHTML=Number(rdney).toFixed(0);
               cell1.className='t_column_sum';
            }

	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

	  prepare_columns();

       } finally {

          tabel_load.disabled=false;
	  tabel_set_all.disabled=!isFound;
          tabel_save.disabled=false;
       }
    
    }
    
     tabel_set_all.disabled=true;
     tabel_save.disabled=true;



