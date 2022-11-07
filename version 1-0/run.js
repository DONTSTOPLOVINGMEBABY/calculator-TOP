const top_output = document.getElementById("top-output");
const bottom_output = document.getElementById("bottom-output");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators')
const reset = document.getElementById("reset");
const deleteButton = document.getElementById("delete");

let display_string = ''
let store_number = 0 ; 
let stored = false;
let operator_sign = ''; 
let solution = 0;

function add (x, y) {return x + y ;}
function multiply(x, y){return x * y ;}
function subtract(x, y){return x - y ;}
function divide(x, y){return x/y ;}


function clear_screen (print_bottom=true) {
    display_string = ''; 
    if (print_bottom){
    bottom_output.textContent = '0';}
}


function reset_button () {
    clear_screen();
    store_number = 0 ;
    stored = false;
    operator_sign = '';
    solution = 0 ; 
}

function delete_button () {
    if (display_string.length == 0){return;}
    if (display_string.length == 1){
        clear_screen();
        return;
    }
    else {
    display_string = display_string.slice(0,-1);
    bottom_output.textContent = display_string;}
}

function operate (operator, x, y){
    if (operator == '+'){return add(x, y)}
    else if (operator == 'x'){return multiply(x, y)}
    else if (operator == '-'){return subtract(x, y)}
    else {return divide(x, y)}
}






operators.forEach( (operator) => {
    operator.addEventListener('click', () => {
        if (display_string.length == 0) {return}
        else if (stored){
            solution = operate(operator_sign, store_number, parseInt(display_string));
            operator_sign = operator.textContent ;
            top_output.textContent = `${solution} ${operator_sign}`;
            bottom_output.textContent = `${solution}`;
            store_number = solution ; 
            clear_screen(false);
        }
        else if (!stored) {
            operator_sign = operator.textContent; 
            top_output.textContent = `${display_string} ${operator_sign}`
            store_number = parseInt(display_string);
            clear_screen();
            stored = true;
        }
        console.log(bottom_output.textContent, top_output.textContent);
    }) 
});




numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (display_string.length == 0 && number.textContent == 0){
            bottom_output.textContent = number.textContent;}
        else {
            display_string += number.textContent;
            bottom_output.textContent = display_string;
        }
    })
})

reset.addEventListener('click', () => {reset_button();});
deleteButton.addEventListener('click', () => {delete_button();});

