let running_list = [];
let running_total = 0;
let number_string = '';
let pi_button = false; 


const top_output = document.getElementById("top-output");
const bottom_output = document.getElementById("bottom-output");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators')
const decimal = document.getElementById("decimal");
const compute = document.getElementById("compute");
const pi = document.getElementById("pi");
const deleteButton = document.getElementById("delete");


function add      (x, y) {return x + y ;}
function multiply (x, y) {return x * y ;}
function subtract (x, y) {return x - y ;}
function divide   (x, y) {return x/y ;}

function operate (operator, x, y) {
    if (operator == '+') {return add(x, y)}
    else if (operator == 'x') {return multiply(x, y)}
    else if (operator == '-') {return subtract(x, y)}
    else {return divide(x, y)}
}

function clear_bottom_screen () { 
    number_string = '';
    bottom_output.textContent = '0';
}

function pi_button_on () {
    pi.style.borderColor = "yellow";
    bottom_output.textContent += '\u03C0';
    pi_button = !pi_button ; 
}

function pi_button_off (no_slice=false) {
    pi.style.borderColor = "black";
    if (!no_slice) {bottom_output.textContent = bottom_output.textContent.slice(0, -1)}
    pi_button = !pi_button ; 
}










//listener for operator button (+ - / x)
operators.forEach( (operator) => {
    operator.addEventListener('click', () => {
        if (number_string.length == 0){return}
        if (pi_button) {
            number_string = `${parseFloat(number_string) * Math.PI}`;
            pi_button_off(no_slice=true);
        }
        console.log(number_string);
        if (running_list.length == 0){
            running_list.push(operator.textContent, parseFloat(number_string));
            top_output.textContent = `${running_list[1]} ${running_list[0]}`;
            top_output.style.color = 'darkslategrey';
            clear_bottom_screen();
        }
        else{
            running_list.push(parseFloat(number_string), operator.textContent);
            console.log("Hello", running_list);
            running_total = operate(running_list.shift(), running_list.shift(), running_list.shift());
            running_list.push(running_total);
            top_output.textContent = `${running_total} ${running_list[0]}`;
            clear_bottom_screen();
        }
        console.log(running_list);
    })
})


//listener for numbers 0-9
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (number_string.length == 0 && number.textContent == 0){
            bottom_output.textContent = number.textContent;}
        else {
            number_string += number.textContent;
            bottom_output.textContent = number_string;
        }
    })
})


//decimal button listener
decimal.addEventListener('click', () => {
    if (number_string.includes('.')){return}
    else if (number_string.length == 0){
    number_string += '0.';
    bottom_output.textContent = number_string; 
    }
    else {
        number_string += '.';
        bottom_output.textContent = number_string;
    }
})


//equal-sign listener 
compute.addEventListener('click', () => {
    if (running_list.length == 0) {
        if (pi_button){
        if (number_string.length == 0) {pi_button_off();return;}
        number_string = `${parseFloat(number_string) * Math.PI}`;
        bottom_output.textContent = number_string;
        pi_button_off(no_slice=true);
        }  
        return; }
    if (pi_button) {
        number_string = `${parseFloat(number_string) * Math.PI}`;
        pi_button_off(no_slice=true);
    }
    if (number_string.length == 0) {running_list.push(0)}
    else {running_list.push(parseFloat(number_string))}
    running_total = operate(running_list.shift(), running_list.shift(), running_list.shift());
    bottom_output.textContent = `${running_total}`;
    top_output.style.color = '#FCFFAD'
    number_string = `${running_total}`;
    if (number_string == '0') {number_string = ''}
})


//pi button listener
pi.addEventListener('click', () => {
    if (!pi_button) { pi_button_on() }
    else { pi_button_off() }
})


//delete button listener 
deleteButton.addEventListener('click', () => {
    if (number_string.length > 1){
        number_string = number_string.slice(0,-1);
        bottom_output.textContent = number_string;
    }
    else if (number_string.length == 1) {
        number_string = '';
        bottom_output.textContent = 0 ; 
    }
    return;
})