
     var date_selected;
     var type_day_selected;
     var year_selected;

     var total_sum=0;

      var ar_table_head=["ИНН",
                         "Фамилия Имя Отчество",
                         "I",
                         "II",
                         "III",
                         "IV",
                         "V",
                         "VI",
                         "VII",
                         "VIII",
                         "IX",
                         "X",
                         "XI",
                         "XII",
                         "Всего"
                         ];
         var div_main1=document.createElement("div");
         div_main1.id="vyplaty_za_god_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div class="chasy_za_god_inline">'+
            '  <div class="chasy_za_god_block">'+
                  '<div class="chasy_za_god_inline">'+
                  '  <div class="record_id"></div>';
                   
                     st1+='  <div style="margin-left: 40px">Расчет за&nbsp</div>';

                     st1+='  <select id="box_year">';

                   for (var j=0; j<10; j++) {
                      st1+='     <option value="'+(2019+j)+'" >'+(2019+j)+'</option>';

                   }
                     st1+='  </select>';

                     st1+='</div>'+
            '  </div>'+
                  '  <button id="chasy_za_god_calc" data-action="chasy_za_god_calc">Сформировать</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id="chasy_za_god_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

         document.body.appendChild(div_main1);

    // ~~~~~~~~~~~~~~~~~~~~~ добавляется таблица Помощи ~~~~~~~~~~~~~~~~~~~~~~~~

         div_main1.appendChild(sea_create_table("t_data", "t_data_head", "t_data_body", "t_data_body_record", ar_table_head));

         document.body.appendChild(div_main1);

         sea_set_onmousedown("t_data", sea_input_field_fill);

    // ~~~~~~~~~~~~~~~~~~~~~ Обработчики на очистить и записать ~~~~~~~~~~~~~~~~~~~~

     box_year.onchange=function () {
	state_reset();
     }
     chasy_za_god_calc.onclick=function() {

        chasy_za_god_calc.disabled=true;

        chasy_za_god_generate();
     }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function state_reset() {
         year_selected=box_year.options[box_year.selectedIndex].value;

         var div_main1=document.getElementById("vo_block_t_total");

        if (div_main1!=null) div_main1.innerHTML='';
     }
    
     function chasy_za_god_generate() {
         
         state_reset();

         var ym1=year_selected;

         var s1="SELECT a.inn as inn, CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`,"+
                "(SELECT b.h01      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h01,"+
                "(SELECT b.h02      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h02,"+
                "(SELECT b.h03      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h03,"+
                "(SELECT b.h04      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h04,"+
                "(SELECT b.h05      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h05,"+
                "(SELECT b.h06      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h06,"+
                "(SELECT b.h07      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h07,"+
                "(SELECT b.h08      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h08,"+
                "(SELECT b.h09      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h09,"+
                "(SELECT b.h10      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h10,"+
                "(SELECT b.h11      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h11,"+
                "(SELECT b.h12      FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h12,"+
                "(SELECT b.h_summa  FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h_summa "+
                " FROM `sea_personal` AS a WHERE fired IS NULL";
                               
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_chasy_za_god_generate);
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function callback_chasy_za_god_generate() {

          var tb=document.getElementById("t_data_body");
          var tb1=document.createElement("tbody");
          tb1.id="t_data_body";

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');

          var sum_niw="";

           var div_main_big1=document.getElementById("vo_block_t_total");
         if (div_main_big1==null) {
           
           div_main_big1=document.createElement("div");
           div_main_big1.id="vo_block_t_total";

           document.body.appendChild(div_main_big1);
         }

      if ((a1!=null) && (a1.length>0)) {
          
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

               
            if ((r2[j+1]!='null') && (r2[j+1].length>0)) {
                   if (j>1) cell0.innerHTML=Number(r2[j+1]).toFixed(0);
                   else cell0.innerHTML=r2[j+1];
            } else {
                   cell0.innerHTML='-';
            }

               if (j>=1) {

                     if ((r2[j+1]!='null') && (r2[j+1]!='')) {
                          var s2=0;
                       try {
                           s2=Number(r2[j+1]);

                          if (!isNaN(s2)) sum+=s2;

                       } catch (ex1) {

                       }
                     }
               }
          }
	    if (r2.length>0) {

               var cell0=row1.insertCell(ar_table_head.length-1);
               cell0.innerHTML=sum;
               cell0.className='t_column_sum';
               
               var th1=document.getElementById("f"+(ar_table_head.length-1));
               th1.className='t_column_sum';

            }

	}

          tb.parentNode.replaceChild(tb1, tb);
	  
 	  t1.innerHTML="";

          chasy_za_god_calc.disabled=false;
      }	
          chasy_za_god_calc.disabled=false;
    }

