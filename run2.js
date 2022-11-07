let running_list = [];
let running_total = 0;
let number_string = '';
let pi_button = false; 
let trig_map = {sin: 0, cos: 0, sec: 0, csc: 0, tan: 0, cot: 0};
let trig_button_active = false;  
let styling = false;  


const top_output = document.getElementById("top-output");
const bottom_output = document.getElementById("bottom-output");
const numbers = document.querySelectorAll('.number');
const operators = document.querySelectorAll('.operators')
const decimal = document.getElementById("decimal");
const compute = document.getElementById("compute");
const pi = document.getElementById("pi");
const deleteButton = document.getElementById("delete");
const sec_csc = document.getElementById("sec-csc");
const sin_cos = document.getElementById("sin-cos");
const tan_cot = document.getElementById("tan-cot"); 
const trig_functions = document.querySelectorAll('.trig');


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


function add_trig_styling () {
    if (trig_button_active && !styling){
    let trig_function = find_active_button();
    number_string = `${trig_function}(${number_string})`;
    bottom_output.textContent = number_string ;
    styling = true;
    }
    else if (trig_button_active && styling) {
        remove_trig_styling();
        styling = true;
        let trig_function = find_active_button();
        number_string = `${trig_function}(${number_string})`;
        bottom_output.textContent = number_string ;
    }
    else{
        remove_trig_styling()
        bottom_output.textContent = '0';
        number_string = '';
        console.log(number_string);}

}


function remove_trig_styling (setstyle=false) {
    number_string = number_string.slice(4, -1) ; 
    bottom_output.textContent = number_string ; 
    styling = setstyle;
    console.table(trig_map);
}


function reset_all_trig_buttons () {
    trig_functions.forEach( trig => {
        trig.style.borderColor = 'black';
    })
}

function find_active_button () {
    for (const object in trig_map){
        if (trig_map[object] == 1) {
            return object ;
        }
    }
}

function adjust_trig_map (list) {
    let no_match = true ; 
    let first_element = list[0];
    let second_element = list[1];
    for (const element in trig_map){
        if ((trig_map[element] == 1) && (element != first_element) && (element != second_element)){
            trig_map[element] = 0 ; 
            trig_map[first_element] = 1 ; 
            no_match = false; 
            trig_button_active = true; 
            break;
        }
        if (trig_map[element] == 1 && element == first_element){
            trig_map[first_element] = 0 ;
            trig_map[second_element] = 1 ;
            no_match = false;
            trig_button_active = true; 
            break ; 
        }
        if (trig_map[element] == 1 && element == second_element){
            trig_map[second_element] = 0 ; 
            no_match = false; 
            trig_button_active = false; 
            break ; 
        }
    }
    if (no_match){
        trig_map[first_element] = 1; 
        trig_button_active = true; 
    }
    reset_all_trig_buttons();
    console.log(trig_button_active);
}


function update_trig_button () {
    let translate_elements = {
        sin: sin_cos, cos: sin_cos, 
        sec: sec_csc, csc: sec_csc, 
        tan: tan_cot, cot: tan_cot
     }
    let allFalse = true;
    for (const element in trig_map) {
        if (trig_map[element] == 1 && (element == 'sin' || element == 'sec' || element == 'tan')){
            translate_elements[element].style.borderColor = 'yellow'; 
            allFalse = false; 
        }
        if (trig_map[element] == 1 && (element == 'cos' || element == 'csc' || element == 'cot')){
            translate_elements[element].style.borderColor = 'purple'; 
            allFalse = false;
        }
    }
}


function calculate_trig(string) {
    if (find_active_button() == 'sin') {return `${Math.sin(parseFloat(string))}`}
    if (find_active_button() == 'cos') {return `${Math.cos(parseFloat(string))}`}
    if (find_active_button() == 'sec') {return `${1/Math.cos(parseFloat(string))}`}
    if (find_active_button() == 'csc') {return `${1/Math.sin(parseFloat(string))}`}
    if (find_active_button() == 'tan') {return `${Math.sin(parseFloat(string))/Math.cos(parseFloat(string))}`}
    if (find_active_button() == 'cot') {return `${Math.cos(parseFloat(string))/Math.sin(parseFloat(string))}`}
}






trig_functions.forEach(trig => {
    trig.addEventListener('click', () => {
        //split string and pass list to handler function to adjust trig_map
        let string = trig.textContent;
        string = string.slice(0 ,-1) 
        string = string.split('(');
        adjust_trig_map(string);
        update_trig_button();
        add_trig_styling();
    })
})

















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
        console.log(number_string);
        console.log(styling)
        if (number_string.length == 0 && number.textContent == 0 && styling == false){
            bottom_output.textContent = number.textContent;}
        else {
            if (styling) {
                remove_trig_styling();
                number_string += number.textContent ; 
                add_trig_styling();
            }
            else{number_string += number.textContent;}
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
        if (trig_button_active){
            remove_trig_styling();
            number_string = calculate_trig(number_string);
            bottom_output.textContent = number_string ; 
        }
        return; }
    if (pi_button) {
        number_string = `${parseFloat(number_string) * Math.PI}`;
        pi_button_off(no_slice=true);
    }
    if (trig_button_active){
        remove_trig_styling();
        number_string = calculate_trig(number_string);
        bottom_output.textContent = number_string ; 
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