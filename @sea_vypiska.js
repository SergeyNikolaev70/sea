
   let ar_vypiska_th=[ 
                      ["1.Сдельно", "1.Аванс за 1 половину месяца"], 
                      ["2.Почасово", "2.Выплаты в межрасчетный период"],
                      ["3.Премии", "3.Подоходный налог"],
                      ["4.Допл. в ночное время", "4.Отчисления в пенсионный фонд"],
                      ["5.Допл. за сверхуроч. работы", "5.Профсоюзный взнос"],
                      ["6.Разные помощи", "6.За исполнительными документами"],
                      ["7.Отпускные:", "7.Фонд соцстраха по безработице"],
                      ["&nbsp;&nbsp;за текущий месяц", "8.Фонд соцстраха по утрате работоспос."],
                      ["&nbsp;&nbsp;за следующий месяц", "9.Другие удержания"],
                      ["8. _________________ ", ""],
                      ["9.Другие начисления", ""],
                      ["10.За время болезни", ""],
                      ["Всего начислено:", "Всего удержаний:"],
                      ["", "Сумма к выдаче:"],
                      ["", ""]
                     ];

   let sea_create_vypiska=function(id1) {

           var st2='<div id="vypiski_name_org_r'+id1+'" class="vypiska_td">Организация: Банк</div>';
              st2+='<div id="vypiski_okpo_org_r'+id1+'" class="vypiska_td">Код ОКПО: 123456789</div>';
              st2+='<div class="vypiska_td" style="text-align: center">РАСЧЕТ ЗАРАБОТНОЙ ПЛАТЫ</div>';
              st2+='<div id="vypiski_ym_r'+id1+'" class="vypiska_td" style="text-align: center">за:</div>';
              st2+='<div id="vypiski_fio_r'+id1+'" class="vypiska_td" style="text-align: center">Фамилия Имя Отчество:</div>';
               st2+='<table class="vypiski_field" table id="vypiska_table_r'+id1+'"><thead>'+
                   '     <tr class="vypiska_body" id="t_data_head_vypiska">';

              st2+=' <th id="f0_'+id1+'">вид заработной платы</th>';
              st2+=' <th id="f1_'+id1+'">сумма</th>';
              st2+=' <th id="f01_'+id1+'" style="margin-left: 20px">вид удержания</th>';
              st2+=' <th id="f02_'+id1+'">сумма</th>';

       st2+='       </tr>'+
            '  </thead>'+
            '    <tbody id="tbody_id_vypiska_r'+id1+'">';

             for (var i=0; i<ar_vypiska_th.length; i++) {

               st2+='<tr id="rf_'+id1+'_'+i+'" class="t_data_body_record_vypiski">';
               st2+='   <td style="text-align: left">'+ar_vypiska_th[i][0]+'</td>';
               st2+='   <td style="text-align: right">'+(ar_vypiska_th[i][0].length==0 ? "" : "0.0")+'</td>';
               st2+='   <td style="text-align: left">&nbsp;&nbsp'+ar_vypiska_th[i][1]+'</td>';
               st2+='   <td style="text-align: right">'+(ar_vypiska_th[i][1].length==0 ? "" : "0.0")+'</td>';
               st2+='</tr>';
             }

            st2+='    </tbody>'+
            ' </table>';

	st2+='<div class="vypiska_td">_________________________________________________________</div>';
         
         var div1=document.createElement("div");
         div1.id="vypiski_block_t_"+id1;
         div1.style="color: black; background: white";
         div1.innerHTML=st2;
         
	return div1;
   };
   
