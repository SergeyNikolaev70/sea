
     var date_selected;
     var type_day_selected;
     var year_selected;
     var month_selected;
     var day_last_month;

      var ar_table_head=["N п/п",
                         "ИНН",
                         "Фамилия Имя Отчество",
                         "К выплате",
                         "Подпись"
                         ];

         var div_main1=document.createElement("div");
         div_main1.id="plategnaya_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div class="plategnaya_inline">'+
            '  <div class="plategnaya_block">'+
                  '<div class="plategnaya_inline">'+
                  '  <div class="record_id"></div>';
                   
                     st1+='  <div style="margin-left: 40px">Расчет за&nbsp</div>'+
                          '  <select id="box_month">'+
                          '     <option value="01" >Январь</option>'+
                          '     <option value="02" >Февраль</optiont>'+
                          '     <option value="03" >Март</option>'+
                          '     <option value="04" >Апрель</option>'+
                          '     <option value="05" >Май</option>'+
                          '     <option value="06" >Июнь</option>'+
                          '     <option value="07" >Июль</option>'+
                          '     <option value="08" >Август</option>'+
                          '     <option value="09" >Сентябрь</option>'+
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
                  '  <button id="plategnaya_calc" data-action="plategnaya_calc">Сформировать</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id="plategnaya_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

         document.body.appendChild(div_main1);

   // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     box_year.onchange=function () {
	state_reset();
     }
     box_month.onchange=function () {
	state_reset();
     }
     plategnaya_calc.onclick=function() {

        plategnaya_generate();
     }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function state_reset() {

         year_selected=box_year.options[box_year.selectedIndex].value;
         month_selected=box_month.options[box_month.selectedIndex].value;

         var div1=document.getElementById("vedomost_for_del");
         if (div1!=null) document.body.removeChild(div1);
     }
    
     function plategnaya_generate() {
         
         state_reset();

         var ym1=year_selected+"-"+month_selected;

         var s1="SELECT a.inn as inn, CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`,"+
                "(SELECT b.summa           FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as summa_n,"+
                "(SELECT b.summa           FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as summa_u "+
                " FROM `sea_personal` AS a WHERE fired IS NULL";
                               
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_plategnaya_generate);
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function create_vedomost_template() {

         var date1=box_month.options[box_month.selectedIndex].innerHTML+" "+year_selected;

         st1='<div id="vedomost_div_main" class="vedom_table_div_main"> '+
          '<div class="pt" id="pv">Платежная ведомость</div>'+
          '<div id="vedom_date" class="pb fs15 pt">по заработной плате за '+date1+'г.</div>'+
          '<table class="vedomost_table">'+
          '<thead>'+
           '<tr> '+
            '<th class="p10 bg">N п/п</th>'+
            '<th class="p10 bg">ИНН</th>'+
            '<th class="p10 bg">ФИО</th>'+
            '<th class="p10 bg">К выплате</th>'+
            '<th class="p10 bg">Подпись</th>'+
           '</tr>'+
           '</thead> '+
           '<tbody id="tvedomost">'+
           '</tbody>'+
          '</table>'+
        '</div>'+
        '<div class="lbt30 vedom_direc p10">'+ 
            '<div class="mr30 ml30">Управляющий:</div>'+
            '<div id="boss" class="mr30 ml30">Петров В.В.</div>'+
        '</div>'+
        '<div class="lbt30 vedom_direc p10"> '+
          '  <div class="mr30 ml30">Главный бухгалтер:</div>'+
          '  <div id="glbuh" class="mr30 ml30">Сидорова А.А.</div>'+
        '</div>   '+
        '  <div class="vedom_direc p10 mr30 ml30">По настоящей платежной ведомости выплачено____</div>'+
        '  <div class="vedom_direc p10 mr30 ml30">и депонировано: ______________________________</div>'+
        '  <div class="vedom_direc p10 mr30 ml30">_____________________________________________</div>'+
        '  <div class="vedom_direc lbt30 p10 mr30 ml30">Кассир: ____________________________________</div>'+
        '  <div class="vedom_direc p10 mr30 ml30 pb50">Кассовый ордер: N___ от _____________________</div>';

     var div1=document.createElement("div");
     div1.id="vedomost_for_del";
     div1.innerHTML=st1;

     document.body.appendChild(div1);
   }
   function callback_plategnaya_generate() {

	  create_vedomost_template();
 
          var tb=document.getElementById("tvedomost");
          var tb1=document.createElement("tbody");
          tb1.id="tvedomost";
          
	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');

          var div_main1=document.getElementById("t_data_div");

          var total_sum=0;

      if ((a1!=null) && (a1.length>0)) {
          
          var div_left=document.createElement("div");

	for (var i=0; i<(r1.length-1); i++) {
	
	    var r2=r1[i].split('\r');

	  if (r2!=null) {
             
             var row1=tb1.insertRow();

             var cell0=row1.insertCell(0);
             cell0.setAttribute("class", "p10 ta_r");

             var cell1=row1.insertCell(1);
             cell1.setAttribute("class", "p10");

             var cell2=row1.insertCell(2);
             cell2.setAttribute("class", "ta_l p10");
             
             var cell3=row1.insertCell(3);
             cell3.setAttribute("class", "ta_r p10");

             var cell4=row1.insertCell(4);

             var n1=Number(r2[3]);
             var n2=Number(r2[4]);
             
             var n3=Number(Number(n1-n2).toFixed(2));

             cell0.innerHTML=""+(i+1);
             cell1.innerHTML=r2[1];
             cell2.innerHTML=r2[2];
             cell3.innerHTML=n3;
             cell4.innerHTML="____________";

             total_sum+=n3;
          }
	}
             var row1=tb1.insertRow();
          
             var cell0=row1.insertCell(0);
             cell0.setAttribute("class", "p10 ta_r");

             var cell1=row1.insertCell(1);
             cell1.setAttribute("class", "p10");

             var cell2=row1.insertCell(2);
             cell2.setAttribute("class", "bg ta_r p10");
             
             var cell3=row1.insertCell(3);
             cell3.setAttribute("class", "bg ta_r p10");

             var cell4=row1.insertCell(4);

             var n1=Number(r2[3]);
             var n2=Number(r2[4]);
             
             var n3=Number(n1-n2).toFixed(2);

             cell0.innerHTML="";
             cell1.innerHTML="";
             cell2.innerHTML="Всего:";
             cell3.innerHTML=Number(total_sum).toFixed(2);
             cell4.innerHTML="";
      }	
          plategnaya_calc.disabled=false;

          tb.parentNode.replaceChild(tb1, tb);
    }

