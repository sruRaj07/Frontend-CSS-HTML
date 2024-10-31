let input = document.getElementById('inputBox');

// select all the buttons
let buttons = document.querySelectorAll('button');

let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click',function(e){
        if (e.target.innerHTML === '=') {
            let invalidPattern = /[\+\-\*\/]{2,}|[\+\-\*\/]$/;
            if (invalidPattern.test(string) || string === "") {
                input.value = "Invalid Expression";  
            } else {
                try {
                    string = eval(string); 
                    input.value = string;  
                } catch (error) {
                    input.value = "Invalid Expression";  
            }
        }
    }

        else if(e.target.innerHTML === 'AC'){
            string  = "";
            input.value = string;
        }
        else if (e.target.innerHTML === 'DEL') {
            if (string.length > 0) {
                string = string.substring(0, string.length - 1);  
                input.value = string;
            }
        }        

        else{
            string += e.target.innerHTML;
            input.value = string;
        }

        
    })
})