
   let ar_otpuska_th=[ 
                      ["", "I", "", "Средний заработок:", ""],
                      ["", "II", "", "за месяц_________", ""],
                      ["", "III", "", "за день _________", ""],
                      ["", "IV", "", "за час___________", ""],
                      ["", "V", "", "Оплата производится:", ""],
                      ["", "VI", "", "c: ", ""],
                      ["", "VII", "", "по: ", ""],
                      ["", "VIII", "", "", ""],
                      ["", "IX", "", "Количество дней:", ""],
                      ["", "X", "", "а) основного отпуска:", ""],
                      ["", "XI", "", "б) дополнительного:", ""],
                      ["", "XII", "",   "в)____________", ""],
                      ["", "Всего:", "", "г)____________", ""],
                      ["", "", "", ""]
                     ];

   let sea_create_otpuska=function(id1) {

           var st2='<table class="otpuski_field" table id="otpuska_table_r'+id1+'"><thead>'+
                   '     <tr class="otpuska_body" id="t_data_head_otpuska_">';

              st2+=' <th id="fo0_'+id1+'">Год</th>';
              st2+=' <th id="fo1_'+id1+'">Месяц</th>';
              st2+=' <th id="fo2_'+id1+'">&nbsp;Сумма&nbsp;</th>';
              st2+=' <th id="fo3_'+id1+'">Категория</th>';
              st2+=' <th id="fo4_'+id1+'">сумма</th>';

       st2+='       </tr>'+
            '  </thead>'+
            '    <tbody id="tbody_id_otpuska__r'+id1+'">';

             for (var i=0; i<ar_otpuska_th.length; i++) {

               st2+='<tr id="rfo_'+id1+'_'+i+'" class="t_data_body_record_vypiski">';
               st2+='   <td style="text-align: right">'+ ar_otpuska_th[i][0]+'</td>';
               st2+='   <td style="text-align: center">'+ar_otpuska_th[i][1]+'</td>';
               st2+='   <td style="text-align: left">'+  ar_otpuska_th[i][2]+'</td>';
               st2+='   <td style="text-align: left">'+  ar_otpuska_th[i][3]+'</td>';
               st2+='   <td style="text-align: right">'+ ar_otpuska_th[i][4]+'</td>';
               st2+='</tr>';
             }

            st2+='    </tbody>'+
            ' </table>';

         var div1=document.createElement("div");
         div1.id="otpuski_block_t_"+id1;
         div1.style="color: black; background: white";
         div1.setAttribute("class", "otpuski_block_t_");
         div1.innerHTML=st2;
         
	return div1;
   };
   
