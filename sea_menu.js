
 var ar_menu_caption=[ 
                      ["Табель", "Начисления в ФЗП", "Выплаты за год", "Персонал"], 
                      ["Начисления", "Выписки", "Дни за год", "Начисления на ФЗП (настр)"],
                      ["Удержания", "Платежная ведомость", "Часы за год", "Начисления на ЗП (настр)"],
                      ["Помощи", "", "", "Справочник табеля"],
                      ["", "", "", "Организация"],
                      ["", "", "", "Оклады"],
                      ["", "", "", "Календарь"]
                     ];

 var ar_menu_task=[
                   ["tabel", "nachisl_na_fzp", "vyplaty_za_god", "personal"], 
                   ["nachislenia", "vypiski", "dni_za_god", "nachisl_na_fzp_cfg"],
                   ["udergania", "plategnaya", "chasy_za_god", "nachisl_na_zp"],
                   ["pomowi", "", "", "spr_tabel"],
                   ["", "", "", "organizacia"],
                   ["", "", "", "oklady"],
                   ["", "", "", "kalendar"]
                  ];

       var st1="<table id='menu_general'>";

   for (var i=0; i<ar_menu_caption.length; i++) {
         
         st1+="<tr>";

       for (var j=0; j<ar_menu_caption[i].length; j++) {
         
           st1+="<td>";

         if (ar_menu_task[i][j].length>0) {
          
             st1+="<button data-action='"+ar_menu_task[i][j]+"'>"+ar_menu_caption[i][j]+"</button>";

         }
           st1+="</td>";
       }
         st1+="</tr>";
   }
     st1+="</table>";

      document.body.innerHTML=st1;
      
      // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      function load_script(namef1, text1) {

           // ~~~~~~~~ полоска название задачи и кнопка возврат в общее меню ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
             
             document.body.innerHTML="<div id='menu'><button data-action='menu'><- Меню</button></dev><div id='task_name'>"+text1+"</div>";
                      
             let scrip_back=document.createElement("script");
             scrip_back.src="_sea_back.js";
             scrip_back.async=false;
             document.body.appendChild(scrip_back);

           // ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

           let script1=document.createElement("script");
           script1.src=namef1;
           script1.async=false;
           document.body.appendChild(script1);
      }

      function Menu(menu1) {

        let self=this;

        menu1.onclick=function(event1) {

             let trgt=event1.target;
             let action1=trgt.getAttribute("data-action");
               
          if (action1) {
		load_script("sea_"+action1+".js", trgt.textContent);
          }
        }

      };

      new Menu(menu_general);

