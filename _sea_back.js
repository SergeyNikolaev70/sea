
   function Menu(menu1) {

      function load_script(namef1) {

           document.body.innerHTML="";

           let script1=document.createElement("script");
           script1.src=namef1;
           script1.async=false;
           document.body.appendChild(script1);
      }

     menu1.onclick=function(event1) {

          let trgt=event1.target;
          let action1=trgt.getAttribute("data-action");
          
          if (action1) {
              load_script("sea_"+action1+".js");
          }
     }

   };

   new Menu(menu);
