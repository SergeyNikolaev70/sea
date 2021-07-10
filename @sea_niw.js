
   let ar_0_19=[ "", "одна", "две", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять", 
                 "десять", "одинадцать", "двенадцать", "тринадцать", "четырнадцать", "пятнадцать", "шестнадцать", "сенадцать", "восемнадцать", "девятнадцать"]; 

   let ar_0_19_grn=[ "", "гривна", "гривны", "гривны", "гривны", "", "", "", "", "", 
                     "", "", "", "", "", "", "", "", "", ""]; 

   let ar_20=[ "", "", "двадцать", "тридцать", "сорок", "пятьдесят", "шестьдесят", "семьдесят", "восемьдесят", "девяносто"]; 

   let ar_100=["", "сто", "двести", "триста", "четыреста", "пятьсот", "шестьсот", "семьсот", "восемьсот", "девятьсот"]; 

   let ar_1000=["тысяч", "тысяча", "тысячи", "тысячи", "тысячи", "тысяч", "тысяч", "тысяч", "тысяч", "тысяч"]; 

   let ar_1000000_x=[ "", "один", "два", "три", "четыре", "пять", "шесть", "семь", "восемь", "девять"]; 
   let ar_1000000=[ "", "миллион", "миллиона", "миллиона", "миллиона", "миллионов", "миллионов", "миллионов", "миллионов", "миллионов"]; 


   let sea_num_to_words_recurse=function(s1) {

         var i1=0;
         var i2=0;
         var i3=0;
         
         var sum="";

        if (s1.length==1)  {
            i1=Number(s1.substr(0));
          if (i1>0) {
            sum=ar_0_19[i1]+" "+(ar_0_19_grn[i1].length==0 ? "гривен" : ar_0_19_grn[i1]);
          } else sum="гривен";
 
        } else  if (s1.length==2)  {

            if (s1.substr(0, 1)=='1') {
                i1=Number(s1.substr(0, 2));
    
                sum=ar_0_19[i1]+" "+(ar_0_19_grn[i1].length==0 ? "гривен" : ar_0_19_grn[i1]);

            } else {
               
                i1=Number(s1.substr(0, 1));
                s1=s1.substr(1);

              if (i1>0) sum=ar_20[i1]+" "+sea_num_to_words_recurse(s1);
              else sum=sea_num_to_words_recurse(s1);
            }

        } else  if (s1.length==3)  {

               i1=Number(s1.substr(0, 1));
               s1=s1.substr(1);
               
            if (i1>0) sum=ar_100[i1]+" "+sea_num_to_words_recurse(s1);
            else sum=sea_num_to_words_recurse(s1);

        } else  if (s1.length==4)  {

               i1=Number(s1.substr(0, 1));
               s1=s1.substr(1);
            
            if (i1>0) sum=ar_0_19[i1]+" "+ar_1000[i1]+" "+sea_num_to_words_recurse(s1);
            else sum=sea_num_to_words_recurse(s1);

        } else  if (s1.length==5)  {
               
              i1=Number(s1.substr(0, 2));

            if (s1.substr(0, 1)=='1') {
               sum=ar_0_19[i1]+" "+ar_1000[0];

               s1=s1.substr(2);

            } else {
               
               i1=Number(s1.substr(0, 1));
              if (i1>0) {
               sum=ar_20[i1];
              }

               s1=s1.substr(1);
            }
               sum=sum.trim()+" "+sea_num_to_words_recurse(s1);
         } else if (s1.length==6)  {

               i1=Number(s1.substr(0, 1));
             if (i1>0)  {
               sum=ar_100[i1];
              }

               s1=s1.substr(1);

               sum=sum.trim()+" "+sea_num_to_words_recurse(s1);

        } else  if (s1.length==7)  {

               i1=Number(s1.substr(0, 1));
             if (i1>0) {
               sum=ar_1000000_x[i1]+" "+ar_1000000[i1];
             }

               s1=s1.substr(1);

               sum=sum.trim()+" "+sea_num_to_words_recurse(s1);

        } else  if (s1.length==8)  {
          sum='Джек пот жизин!';
        } else  if (s1.length==9)  {
          sum='Жизнь удалась!';
        } else {
          sum='Куплю планету Марс...';
        }
	return sum.trim();
   }

   let sea_num_to_words=function(num1) {

         var s1=""+num1;
         var i1=s1.indexOf(".");
         var kop=s1.substr(i1+1);
         s1=s1.substr(0, i1);

        var sum=sea_num_to_words_recurse(s1);

        var s3=sum.substr(0, 1).toUpperCase();

      if (s1.length<8) sum=s3+sum.substr(1)+" "+kop+" коп.";
      else sum=s3+sum.substr(1);

	return sum;
   };
   
