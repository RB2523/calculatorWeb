
   function getHistory(){
      return document.getElementById("history-value").textContent;
   }

   function setHistory(num){
         document.getElementById("history-value").textContent = num;
   }

   function getOutput(){
      return document.getElementById("output-value").textContent;
   }

   function setOutput(num){
        document.getElementById("output-value").textContent = num;
   }
      

     
   
        let number = document.getElementsByClassName("number");
   
         for(let i = 0 ; i< number.length ; i++)
         {
               number[i].addEventListener("click" , function(){
 
                   let output = getOutput();

                   if(output.length >= 17)   return;
                   
                   
                   if(this.id == "0" || this.id =="." ) return;
                  

                      if(output == "0" ){
                         setOutput( this.id);
                         return;
                      } 

                      setOutput(getOutput() + this.id);
               });
         }


         function clearDisplay(){
            setHistory("");
            setOutput("0");
         }


         function removeLast(){
            let output =  getOutput();
            output = output.substring(0 , output.length-1);
            setOutput(output);

            if(output == "") setOutput("0");
         }


         function percentage(){

            let output = getOutput();
            let history = getHistory();

            if(output == "" && history == "") return;

            if(output != ""  && history == ""){
              setOutput(getOutput() / 100);
              return;
            }

            if(output == ""  && history != "") return;

            let no1 = history.substring(0 , history.length-1);
            let sign = history.substring(history.length-1 , history.length);
            
            let no2 = getOutput();
            let ans ;

             if(sign == "/" || sign == "*"){
                  ans = no2 / 100;
             }
             else{
                 ans = (no1 * no2) / 100; 
             }
             
             output = eval(history + ans);
             setOutput(output);
             setHistory("");
         }
               

         let operator = document.getElementsByClassName("operator");
   
         for(let i = 3 ; i< operator.length-1 ; i++)
         {
             operator[i].addEventListener("click" , function(){
             
                    let output = getOutput();
                    let history = getHistory();

                     if(output == "" && history == "") return;

                     if(output == "" && history != ""){    // to change sign of history
                        history = history.substr( 0 , history.length-1 ) + this.id;
                        setHistory(history);
                        return;
                     }

                     if(output != ""  && history == ""){
                        history = history + output + this.id;
  
                        setHistory(history);
                        setOutput("");
                        return;
                     }

                     if(output != ""  && history != ""){
                         output =   calculateOutput();                        

                         if(isNaN(output)){
                           setOutput("0");
                           setHistory("");
                           return
                        }         

                        if(output == Infinity  || output == (-1 / 0)){
                           setOutput("0");
                           setHistory("");
                           return ;
                        }

                         history = output + this.id;
                         setHistory(history);
                         setOutput("");
                         return;
                     }
                     
               });
         }


         function calculateOutput(){
               
               let history = getHistory();
               let output = getOutput();

               if(history != ""  && output == ""){
                  setOutput(history.substring(0 , history.length-1));
                  setHistory("");
                  return;
               }

               output = eval(history + output);

               if(isNaN(output)){
                  setOutput("0");
                  setHistory("");
                  return output;
               }

               if(output == Infinity  || output == (-1 / 0)){
                  setOutput("0");
                  setHistory("");
                  return output;
               }


               if(output.toString().length > 17){
                  alert('only first 17 digits are shown');
                  let str = output.toString();
                  output = str.substring(0  , 17);
                  setOutput(output);
                  setHistory("");
                  return output;
               } 

               setHistory("");
               setOutput(output);
               

               return output;
         }


         function zero(obj){
             let output = getOutput();

             if(output == ""){
              setOutput("0");
               return;
             }


             let firstDigit = output.substring( 0 , 1 );
             let secondDigit = output.substring( 1 , 2 );


                 if(secondDigit == "."){
                  setOutput(output + obj.id);
                    return;
                 }
              
             if(firstDigit == "0") return;
         
              setOutput(output + obj.id);

         }


         function isDot(str){
            for(let i=0;i<str.length ;i++){
               if(str.substring(i , i+1) == ".") return true;
            }
            return false;
         }


         function dot(obj){
            let output = getOutput();

            if(output == ""){
             setOutput("0.");
              return;
            }

             if(isDot(output)) return ;
        
             output = output + obj.id;
             setOutput(output);

        }