let running_list = [];
let running_total = 0;
let number_string = '';
let negative_sign = false


const top_output = document.getElementById("top-output");
const bottom_output = document.getElementById("bottom-output");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators')
const decimal = document.getElementById("decimal");
const compute = document.getElementById("compute");
const deleteButton = document.getElementById("delete");
const resetButton = document.getElementById('reset');



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


function reset () {
    running_list = [] ; 
    running_total = 0 ; 
    number_string = '';
    bottom_output.textContent = '0';
    top_output.style.color = '#FCFFAD'
    top_output.textContent = '0';
}

function set_bottom_output () {
    if (number_string.length > 18) {
        number_string = number_string.slice(0,18);
    }
    bottom_output.textContent = number_string;
}



//listener for operator button (+ - / x)
operators.forEach( (operator) => {
    operator.addEventListener('click', () => {
        if (number_string.length > 0 && operator.textContent == '-' && negative_sign == false){
            number_string = '-' + number_string;
            set_bottom_output();
            negative_sign = true;
            return;
        }
        if (number_string.length == 0){return} 
        if (running_list.length == 0){
            running_list.push(operator.textContent, parseFloat(number_string));
            top_output.textContent = `${running_list[1]} ${running_list[0]}`;
            top_output.style.color = 'darkslategrey';
            clear_bottom_screen();
        }
        else{
            running_list.push(parseFloat(number_string), operator.textContent);
            running_total = operate(running_list.shift(), running_list.shift(), running_list.shift());
            running_list.push(running_total);
            top_output.textContent = `${running_total} ${running_list[0]}`;
            clear_bottom_screen();
        }
        console.log(running_list);
        negative_sign = false;
    })
})


//listener for numbers 0-9
numbers.forEach((number) => {
    number.addEventListener('click', () => {
        console.log(number_string);
        if (number_string.length == 0 && number.textContent == 0){
            bottom_output.textContent = number.textContent;}
        else {
            number_string += number.textContent;
            set_bottom_output();
        }
    })
})


//decimal button listener
decimal.addEventListener('click', () => {
    if (number_string.includes('.')){return}
    else if (number_string.length == 0){
    number_string += '0.';
    set_bottom_output();
    }
    else {
        number_string += '.';
        set_bottom_output();
    }
})


//equal-sign listener 
compute.addEventListener('click', () => {
    if (running_list.length == 0) {return}
    if (number_string.length == 0) {running_list.push(0)}
    else {running_list.push(parseFloat(number_string))}
    running_total = operate(running_list.shift(), running_list.shift(), running_list.shift());
    bottom_output.textContent = `${running_total}`;
    top_output.style.color = '#FCFFAD'
    number_string = `${running_total}`;
    if (number_string == '0') {number_string = ''}
})


//delete button listener 
deleteButton.addEventListener('click', () => {
    if (number_string.length > 1){
        number_string = number_string.slice(0,-1);
        set_bottom_output();
    }
    else if (number_string.length == 1) {
        number_string = '';
        bottom_output.textContent = 0 ; 
    }
    return;
})


resetButton.addEventListener('click', () => {reset()});