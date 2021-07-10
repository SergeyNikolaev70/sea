
   let selectedTR;

   let sea_create_table=function(table_id, t_data_head, tbody_id, t_data_body_record, ar_table_head, t_data_div) {

           var st2='<table id="'+table_id+'">  <thead>'+
                   '     <tr id="'+t_data_head+'">';

         for (var i=0; i<ar_table_head.length; i++) {
             st2+='<th id="f'+i+'">'+ar_table_head[i]+'</th>';
             
         }
          
       st2+='       </tr>'+
            '  </thead>'+
            '    <tbody id="'+tbody_id+'">'+
            '      <tr class="'+t_data_body_record+'">'+
            '      </tr>'+
            '    </tbody>'+
            ' </table>'
                       
         var t1=document.createElement("div");
         t1.id=t_data_div;
         t1.innerHTML=st2;

         t1.style.cursor='default';

	return t1;
   };
   
   let sea_set_onmousedown=function(t_data, callback, callback2) {

         var t1=document.getElementById(t_data);

         t1.onmousedown=function(event) {
               
               var trg=event.target;

           while (trg!=t1) {
                 
               if (trg.tagName=="TH") {
                     return ;
               } 
               if (trg.tagName=="TR") {
                     
                     if (selectedTR) {
                        selectedTR.classList.remove('_selected_');
                     }

                     selectedTR=trg;
                     selectedTR.classList.add('_selected_');

                     if (callback!=undefined) callback(selectedTR);
                     if (callback2!=undefined) callback2(selectedTR);

                     return ;
               }
                   trg=trg.parentNode;
           }

         }
   };

   let sea_add_table_row_only=function() {

         var t1=document.getElementById("t_data_body");
         var row1=t1.insertRow();

       for (var i=0; i<arguments.length; i++) {

           var cell0=row1.insertCell(i);
           cell0.innerHTML=(arguments[i]=='null' ? "" : arguments[i]);
       }
   };

   let sea_add_table_row_as_array_only=function() {

         var t1=document.getElementById("t_data_body");
         var row1=t1.insertRow();

  	 var r2=arguments[0].split('\r');
                           
       for (var i=1; i<r2.length; i++) {

           var cell0=row1.insertCell(i-1);
           cell0.innerHTML=(r2[i]=='null' ? "" : r2[i]);

       }
   };

   let sea_set_table_row_from_input=function() {

         var t1=document.getElementById("t_data");
         var row1=t1.insertRow();

       for (var i=0; i<arguments.length; i++) {

           var in1=document.getElementById("input_"+i);

           var cell0=row1.insertCell(i);

         if (in1!=null) {

           cell0.innerHTML=arguments[i];

         }

       }
   };
  