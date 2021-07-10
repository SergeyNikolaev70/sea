
   let sea_create_input_A=function(a1, prefix1, div_main2, ar_input, callback_save, callback_clear) {

         var div_main1=document.createElement("div");
         div_main1.id=div_main2;
         
    // ~~~~~~~~~~~~~~~~~~~~~ добавляются поля ввода по таблице ~~~~~~~~~~~~~~~~~~

    var st1='<div id="'+prefix1+'_inline">'+
            '  <div id="'+prefix1+'_block">'+
                  '<div id="'+prefix1+'_inline_family">'+
                  '  <div id="record_id"></div>';
                      
                      var j=0;
                      var n=0;
                  for (var i=0; i<ar_input.length; i++) {
                      
                      if (j>=a1) {

                         n++;
                         j=0;

                         st1+='</div>';
                         st1+='<div id="'+prefix1+'_inline_family">';
                      }
                        st1+='  <div>'+ar_input[i]+'</div>'+
                             '  <input id="input_'+i+'"></input>';

                      j++;
                  }
                   st1+='</div>'+
            '  </div>'+
                  '  <button id="tabel_clear" data-action="tabel_clear">Очистить</button>'+
                  '  <button id="tabel_save" data-action="tabel_save">Записать</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.id=prefix1+"_block";
         div1.innerHTML=st1;
         
         div_main1.appendChild(div1);

	return div_main1;
   };
   
   let sea_create_input=function(prefix1, div_main2, ar_input, callback_save, callback_clear) {
       return sea_create_input_A(4, prefix1, div_main2, ar_input, callback_save, callback_clear);
   };

   let sea_create_input_B=function(a1, prefix1, div_main2, ar_input, callback_save, callback_clear) {

        var st1='<div class="'+prefix1+'_inline">'+

              '  <div id="record_id1"></div>';
                   
                  for (var i=0; i<ar_input.length; i++) {

                        st1+='  <div class="'+prefix1+'_input_label">'+ar_input[i]+'</div>'+
                             '  <input id="input_'+i+'"></input>';
                   }

                  st1+='  <button id="'+prefix1+'_clear" data-action="'+prefix1+'_clear">Очистить</button>'+
                       '  <button id="'+prefix1+'_save"  data-action="'+prefix1+'_save">Записать в базу</button>'+
            '</div>';

         var div1=document.createElement("div");
         div1.className=prefix1+"_block";
         div1.innerHTML=st1;
         
	return div1;
   };

   let sea_input_field_fill=function(el1) {
       
       for (var i=0; i<el1.cells.length; i++) {
          
          var in1=document.getElementById("input_"+i);

         if (in1!=null) {
           in1.value=el1.cells[i].innerHTML;
         }
       }

   };

   let sea_set_data=function() {

       for (var i=0; i<arguments.length; i++) {

          var in1=document.getElementById("input_"+i);

         if (in1!=null) {
           in1.value=arguments[i];
         }

       }
   };

   let sea_clear_data_all_input=function(val1, fcount) {

       for (var i=0; i<fcount; i++) {

          var in1=document.getElementById("input_"+i);

         if (in1!=null) {
           in1.value=val1;
         }

       }
   };
  
