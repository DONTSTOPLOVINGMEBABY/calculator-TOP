const top_output = document.getElementById("top-output");
const bottom_output = document.getElementById("bottom-output");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators')
const reset = document.getElementById("reset");
const deleteButton = document.getElementById("delete");

let display_string = ''
let store_number = 0 ; 

function add (x, y) {return x + y ;}
function multiply(x, y){return x * y ;}
function subtract(x, y){return x - y ;}
function divide(x, y){return x/y ;}


function reset_button () {
    display_string = '';
    store_number = 0 ;
    bottom_output.textContent = '0';
}


function delete_button () {
    if (display_string.length == 0){return;}
    if (display_string.length == 1){
        display_string = '';
        bottom_output.textContent = '0';
        return;
    }
    display_string = display_string.slice(0,-1);
    bottom_output.textContent = display_string;
}

function operate (operator, x, y){return};






operators.forEach( (operator) => {
    operator.addEventListener('clicl', () => {
        
    })
});




numbers.forEach((number) => {
    number.addEventListener('click', () => {
        if (display_string.length == 0 && number.textContent == 0){
            bottom_output.textContent = number.textContent;}
        else {
            display_string += number.textContent;
            bottom_output.textContent = display_string;}
    })
})

reset.addEventListener('click', () => {reset_button();});
deleteButton.addEventListener('click', () => {delete_button();});

