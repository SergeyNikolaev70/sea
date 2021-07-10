
     var date_selected;
     var type_day_selected;
     var year_selected;
     var month_selected;
     var day_last_month;

     var total_sum=0;

     var sSQL_update="";
     var sSQL_insert="";

         var div_main1=document.createElement("div");
         div_main1.id="vypiski_div_main";
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div class="vypiski_inline">'+
            '  <div class="vypiski_block">'+
                  '<div class="vypiski_inline">'+
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
                  '  <button id="vypiski_calc" data-action="vypiski_calc">Сформировать</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id="vypiski_block";
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
     vypiski_calc.onclick=function() {

        vypiski_generate();
     }
    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

     function state_reset() {
         year_selected=box_year.options[box_year.selectedIndex].value;
         month_selected=box_month.options[box_month.selectedIndex].value;

         var div_main1=document.getElementById("vo_block_t_total");

        if (div_main1!=null) div_main1.innerHTML='';
     }
    
     function vypiski_generate() {
         
         state_reset();

	 day_last_month=sea_get_last_day_month(year_selected, month_selected);

         var ym1=year_selected+"-"+month_selected;

     	 var oklad1  ="(SELECT MAX(b.oklad) FROM sea_oklady AS b WHERE (b.inn=a.inn) AND (b.date_oklada<'"+ym1+"-"+day_last_month+"'))";
     	 var chasov1 ="(SELECT b.summa FROM sea_tabel AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";
     	 var rd1     ="(SELECT b.rabochih_dney FROM sea_tabel AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"'))";

         var s1="SELECT a.inn as inn, CONCAT(CONCAT(a.family, ' '), CONCAT(CONCAT(a.name, ' '), a.father)) AS `fio`,"+
		"(SELECT b.sdelno          FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as sdelno,"+
                "("+oklad1+"/(8*"+rd1+")*"+chasov1+") as pochasovo,"+
                "(SELECT b.premii          FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as premii,"+
                "(SELECT b.nochnye         FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as nochnye,"+
                "(SELECT b.sverhurochnye   FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as sverhurochnye,"+
                "(SELECT b.raznye_pomowi   FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as raznye_pomowi,"+
                "(SELECT b.otpusknye_tm    FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as otpusknye_tm,"+
                "(SELECT b.otpusknye_sm    FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as otpusknye_sm,"+
                "(SELECT b.nachisleniya_dr FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as nachislenia_dr,"+
                "(SELECT b.vremya_bolezni  FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as vremya_bolezni,"+
                "(SELECT b.summa           FROM `sea_nachislenia` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as summa_n,"+
                "(SELECT b.avans              FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as avans,"+
                "(SELECT b.vyplaty            FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as vyplaty,"+
                "(SELECT b.podohod_nalog      FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as podohod_nalog,"+
                "(SELECT b.pension_fond       FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as pension_fond,"+
                "(SELECT b.profsouz           FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as profsouz,"+
                "(SELECT b.ispolniteln_doc    FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as ispolniteln_doc,"+
                "(SELECT b.socstrah_bezrab    FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as socstrah_bezrab,"+
                "(SELECT b.socstrah_netrudosp FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as socstrah_netrudosp,"+
                "(SELECT b.udergania_dr       FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as udergania_dr,"+
                "(SELECT b.summa              FROM `sea_udergania` AS b WHERE (b.inn=a.inn) AND (b.year_mon='"+ym1+"')) as summa_u,"+
                "(SELECT b.m01             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m01,"+
                "(SELECT b.m02             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m02,"+
                "(SELECT b.m03             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m03,"+
                "(SELECT b.m04             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m04,"+
                "(SELECT b.m05             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m05,"+
                "(SELECT b.m06             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m06,"+
                "(SELECT b.m07             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m07,"+
                "(SELECT b.m08             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m08,"+
                "(SELECT b.m09             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m09,"+
                "(SELECT b.m10             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m10,"+
                "(SELECT b.m11             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m11,"+
                "(SELECT b.m12             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m12,"+
                "(SELECT b.summa           FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as m_summa,"+
     	        " "+rd1+" as radochih_dney,"+
     	        " "+chasov1+" as chasov, "+
                "(SELECT b.d01             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d01,"+
                "(SELECT b.d02             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d02,"+
                "(SELECT b.d03             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d03,"+
                "(SELECT b.d04             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d04,"+
                "(SELECT b.d05             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d05,"+
                "(SELECT b.d06             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d06,"+
                "(SELECT b.d07             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d07,"+
                "(SELECT b.d08             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d08,"+
                "(SELECT b.d09             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d09,"+
                "(SELECT b.d10             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d10,"+
                "(SELECT b.d11             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d11,"+
                "(SELECT b.d12             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d12,"+
                "(SELECT b.d_summa         FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as d_summa,"+
                "(SELECT b.h01             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h01,"+
                "(SELECT b.h02             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h02,"+
                "(SELECT b.h03             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h03,"+
                "(SELECT b.h04             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h04,"+
                "(SELECT b.h05             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h05,"+
                "(SELECT b.h06             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h06,"+
                "(SELECT b.h07             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h07,"+
                "(SELECT b.h08             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h08,"+
                "(SELECT b.h09             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h09,"+
                "(SELECT b.h10             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h10,"+
                "(SELECT b.h11             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h11,"+
                "(SELECT b.h12             FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h12,"+
                "(SELECT b.h_summa         FROM `sea_vyplaty_za_god` AS b WHERE (b.inn=a.inn) AND (b.year="+year_selected+")) as h_summa"+
                " FROM `sea_personal` AS a WHERE fired IS NULL";
                               
         s1=window.btoa(encodeURIComponent(s1));
         mysql_post("http://192.168.0.151:5050/?"+s1, this.callback_vypiski_generate);
     }

    // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   function create_left_side(r2, i) {
                     
                  var sm1=0;

                  var k=3;
                  
              for (var j=0; j<ar_vypiska_th.length; j++) {

                  var dv1=document.getElementById("rf_"+i+"_"+j);
              
                // ~~~~~~~~ начисления ~~~~~~~~~~~
                  if (j==6) {
                  	dv1.cells[1].innerHTML='';
                  } else if (j==9) {
                        dv1.cells[1].innerHTML='';
                        k-=2;
                  } else if (j==13) {
                  } else {
                 	dv1.cells[1].innerHTML=Number(r2[k+j]).toFixed(2);
		  }

                // ~~~~~~~~ удержания ~~~~~~~~~~~~~~~~~~~
                  if (j==0) {
               		dv1.cells[3].innerHTML=Number(r2[14]).toFixed(2);
                  } else if (j==1) {
                	dv1.cells[3].innerHTML=Number(r2[15]).toFixed(2);
                  } else if (j==2) {
                	dv1.cells[3].innerHTML=Number(r2[16]).toFixed(2);
                  } else if (j==3) {
                	dv1.cells[3].innerHTML=Number(r2[17]).toFixed(2);
                  } else if (j==4) {
                	dv1.cells[3].innerHTML=Number(r2[18]).toFixed(2);
                  } else if (j==5) {
                	dv1.cells[3].innerHTML=Number(r2[19]).toFixed(2);
                  } else if (j==6) {
                	dv1.cells[3].innerHTML=Number(r2[20]).toFixed(2);
                  } else if (j==7) {
                	dv1.cells[3].innerHTML=Number(r2[21]).toFixed(2);
                  } else if (j==8) {
                 	dv1.cells[3].innerHTML=Number(r2[22]).toFixed(2);
                  } else if (j==12) {
                 	dv1.cells[3].innerHTML=Number(r2[23]).toFixed(2);
                  } else {
                        dv1.cells[3].innerHTML='';
		  }
                // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

                 if (j==13) {
                 	sm1=(Number(r2[13])-Number(r2[23]));
                 	var sm2=Number(r2[14]).toFixed(2);
                 	
                 	total_sum=Number(Number(sm1)+Number(sm2)).toFixed(2);

                 	sum_niw=sea_num_to_words(Number(Number(sm1).toFixed(2)));
                 	dv1.cells[3].innerHTML=""+Number(sm1).toFixed(2);

                 } else if (j==14) {
                 	dv1.cells[2].innerHTML="("+sum_niw+")";
                 	dv1.cells[1].innerHTML='';
                 }
    	      }

   }
   function create_right_side(r2, i, div_main1) {
        
        var sum_avr1=0;
        var dv1;
        var dv_avr1;
        var month_count1=0;
        var summa_mon_new=0;
        var summa_d_mon_new=0;
        var summa_h_mon_new=0;
        var sd=0;
        var sh=0;

        var stop=0;

      for (var j=0; j<ar_otpuska_th.length; j++) {
 
          dv1=document.getElementById("rfo_"+i+"_"+j);
              
        if (j<12) {
          dv1.cells[0].innerHTML=""+year_selected;

        } else if (j==12) dv_avr1=dv1;


        if (j==(month_selected-1)) {
          
           stop=1;

           var sa1=Number(total_sum).toFixed(2);
           dv1.cells[2].innerHTML=""+sa1;

           summa_mon_new=Number(sa1);
           sum_avr1+=summa_mon_new;

           summa_d_mon_new=Number(Number(r2[37])).toFixed(2);
           summa_h_mon_new=Number(Number(r2[38])).toFixed(2);

           var sdn1=Number(summa_d_mon_new);
           sd+=sdn1;
           var shn1=Number(summa_h_mon_new);
           sh+=shn1;

           month_count1++;
           
        } else {
          
          if (j<12) {
            if (r2[j+24]!='null') {
               
               var n1=Number(Number(r2[j+24]).toFixed(2));

              if (n1>0) {
                
                if (stop==0) {
     
                  month_count1++;

                  var sdn1=Number(r2[j+39]);
                  sd+=sdn1;
                  var shn1=Number(r2[j+52]);
                  sh+=shn1;

                  dv1.cells[2].innerHTML=""+Number(n1).toFixed(2);
                  sum_avr1+=n1;
                }

              }

            }
          }
        }
              
         // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
           if (j==0) {
           } else if (j==1) {
           } else if (j==2) {
           } else if (j==3) {
           } else if (j==4) {
           } else if (j==5) {
           } else if (j==6) {
           } else if (j==7) {
           } else if (j==8) {
           } else if (j==9) {
           } else if (j==10) {
           } else if (j==11) {
           } else if (j==12) {
           } else {
               dv1.cells[4].innerHTML='';
	   }
        // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
      }
           var sa1=Number(sum_avr1).toFixed(2);
           dv_avr1.cells[2].innerHTML=""+sa1;

           tr1=document.getElementById("rfo_"+i+"_1");
           var n1=Number(sa1);

           var sx1=Number(n1/month_count1).toFixed(2);
           tr1.cells[4].innerHTML=""+sx1;

           tr1=document.getElementById("rfo_"+i+"_2");
           sx1=Number(n1/sd).toFixed(2);
           tr1.cells[4].innerHTML=""+sx1;
           
           tr1=document.getElementById("rfo_"+i+"_3");
           sx1=Number(n1/sh).toFixed(2);
           tr1.cells[4].innerHTML=""+sx1;

           sSQL_update+="UPDATE      sea_vyplaty_za_god SET m"+month_selected+"="+Number(summa_mon_new).toFixed(2)+", d"+month_selected+"="+summa_d_mon_new+", h"+month_selected+"="+summa_h_mon_new+" WHERE (year="+year_selected+") AND (inn="+r2[1]+");\n"
           sSQL_insert+="INSERT INTO sea_vyplaty_za_god (year, inn, m"+month_selected+", d"+month_selected+", h"+month_selected+") VALUES ("+year_selected+", "+r2[1]+", "+Number(summa_mon_new).toFixed(2)+", "+summa_d_mon_new+", "+summa_h_mon_new+");\n"

       return sSQL_update;
   }

   function callback_vypiski_generate() {

	  var t1=document.getElementById("responseDiv");

	  var a1=decodeURIComponent(window.atob(t1.innerHTML));

	  a1=a1.replace(//gi, ' ');

	  var r1=a1.split('\n');

          var sum_niw="";

           sSQL_update="";
           sSQL_insert="";

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

	  if (r2!=null) {
             
             var div_main1=document.createElement("div");
      	     div_main1.id="vo_block_t_"+i;
      	     div_main1.setAttribute("class", "vo_block_t_");

               var  div_left=sea_create_vypiska(""+i);
               var div_right=sea_create_otpuska(""+i);

               div_main1.appendChild(div_left);
               div_main1.appendChild(div_right);

               div_main_big1.appendChild(div_main1);

               var ym1=document.getElementById("vypiski_ym_r"+i);
               ym1.innerHTML="за: "+box_month.options[box_month.selectedIndex].innerHTML+" "+box_year.options[box_year.selectedIndex].value+" г.";

               var fio1=document.getElementById("vypiski_fio_r"+i);
               fio1.innerHTML=""+r2[2];

               var name1=document.getElementById("vypiski_name_org_r"+i);
               name1.innerHTML=firma[1];
                              
               var kod1=document.getElementById("vypiski_okpo_org_r"+i);
               kod1.innerHTML="Код ЕГРПОУ:&nbsp;"+firma[2];

             total_sum=0;

	     create_left_side(r2, i);
	     create_right_side(r2, i);

           }
	}
      }	
          vypiski_calc.disabled=false;

          var sql1=window.btoa(encodeURIComponent(sSQL_update));
          mysql_post("http://192.168.0.151:5050/?"+sql1, this.callback_vypiski_update);
    }

    function callback_vypiski_update() {
       
       var t1=document.getElementById("responseDiv");
       var a1=decodeURIComponent(window.atob(t1.innerHTML));

       a1=a1.replace(//gi, ' ');

       console.log("sSQL is executed: update result: "+a1);
       
       var r1=a1.split('\n');
      
      if (r1!=null) {
           var r2=r1[0].split(',');
           
           var n=0;

         for (var i=0; i<r1.length; i++) {
            n+=Number(r2[i]);
         }
          if (n==0) {
	        var sSQL=window.btoa(encodeURIComponent(sSQL_insert));
          	mysql_post("http://192.168.0.151:5050/?"+sSQL, this.callback_vypiski_update_insert);
          }
      }

    }

    function callback_vypiski_update_insert() {

       var t1=document.getElementById("responseDiv");
       var a1=decodeURIComponent(window.atob(t1.innerHTML));

       a1=a1.replace(//gi, ' ');

       console.log("sSQL is executed: insert result: "+a1);
    }
