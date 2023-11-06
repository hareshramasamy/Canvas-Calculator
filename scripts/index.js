//getting the canvas element by id 'calculatorCamvas' from the index.html
const canvas = document.getElementById('calculatorCanvas');
//setting the context of the canvas to 2d
const ctx = canvas.getContext('2d');
//setting the background color of the canvas
ctx.fillStyle = '#4c4f50';
//setting the width and height of the canvas context
ctx.fillRect(0, 0, canvas.width, canvas.height);

//declaring a global expression string to hold the value of the entered mathematical expression
let expression = '';
let evaluated = false;

//buttons array for drawing on the canvas, and get value when button click occurs
const buttons = [
    ['','','','%','/'], 
    ['(','7','8','9','x'], 
    [')','4','5','6','-'], 
    ['Back','1','2','3','+'], 
    ['0','0','0','.','=']
];

//drawing the buttons by passing the x, y coordinates, color for the button, and text to write in the button
function drawButton(x, y, text, color) {
    ctx.fillStyle = color;
    if(text === "0") {
        ctx.fillRect(x,y,298,98);
    } else {
        ctx.fillRect(x, y, 98, 98);
    }
    ctx.fillStyle = '#ffffff';
    ctx.font = '40px Arial';
    const textWidth = ctx.measureText(text).width;
    const textX = x + (text === "0" ? (298 - textWidth) / 2 : (98 - textWidth) / 2);
    const textY = y + 64;
    ctx.fillText(text, textX, textY);
}

//drawing the input display with the expression value
function drawDisplay() {
    ctx.fillStyle = '#4c4f50';
    ctx.fillRect(0, 100, canvas.width, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 40px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(expression, canvas.width, 140);
}

//drawing the expression above the display when expression is evaluated
function drawExpression() {
    ctx.fillStyle = '#4c4f50';
    ctx.fillRect(0, 50, canvas.width, 50);
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 25px Arial';
    ctx.textAlign = 'right';
    ctx.fillText(expression, canvas.width, 85);
}

//evaluateExpression method to evaluate the expression typed using the eval() function
function evaluateExpression() {
    try {
        //Printing the expression above the output when the '=' button is clicked
        drawExpression();
        //changing the cross symbol to asterisk symbol to prevent exception while using eval()
        expression = expression.replaceAll('x', '*');
        expression = eval(expression).toString();
    } catch (error) {
        expression = 'Invalid Expression';
    }
    //Printing the output of the evaluated expression in the display when '=' button is clicked
    drawDisplay();
}

//callback function that gets triggered when any of the button is clicked in the canvas
function handleButtonClick(event) {
    //retrieving the x and y coordinate value of the point where the click event occurred
    const x = event.clientX - canvas.offsetLeft;
    const y = event.clientY - canvas.offsetTop;

    //converting the x and y coordinate to match the buttons matrix to retrieve the row and col value from the matrix
    const row = Math.floor((y - 150)/100);
    const col = Math.floor(x/100);
    let currButton = '';

    //ensuring that an actual button inside the canvas is clicked and retriving the value of the button from the matrix
    if((row >= 5 || col>=5) || row<0 || col<0) {
        currButton = ''
    } else {
        currButton = buttons[row][col];
    }

    //appending the character to the expression string when numbers/operators are clicked
    if(currButton!== '=' && currButton!=='Back') {
        if(evaluated === true) {
            if((currButton >='0' && currButton <= '9')) {
                expression = '';
            } else if(expression === 'Invalid Expression' || expression === 'Infinity') {
                expression = '';
                drawDisplay();
            }
        }
        expression+=currButton;
        evaluated = false;
        drawDisplay();
    //removing last character from the expression string when back button is selected
    } else if(currButton === 'Back') {
        //if the evaluated expression is invalid, back button will clear the expression string
        if((expression === 'Invalid Expression' || expression === 'Infinity') && evaluated === true) {
            evaluated = false;
            expression = '';
            drawExpression();
        } else {
            if(expression === '') {
                drawDisplay();
                drawExpression();
            }
            expression = expression.slice(0,-1);
            evaluated = false;
        }
        //printing the updated expression value
        drawDisplay();
    //calling evaluateExpression() function when the '=' button is clicked
    } else if(currButton === '=') {
        if(expression === 'Invalid Expression' || expression === 'Infinity') {
            //resetting the screen when the previous expression was invalid and equal to is clicked
            expression = '';
            drawDisplay();
            drawExpression();
        }
        //calling evaluateExpression() only when the expression is not empty.
        if(expression !== '') {
            evaluateExpression();
            evaluated = true;
        }
    }
}

//adding click event listener and providing handleButtonClick as the callback function
canvas.addEventListener('click', handleButtonClick);

// Drawing red, yellow, and green circles to indicate close, minimize and maximize buttons respectively
drawCircleButtons();
// Draw buttons in a loop
let y = 150;
let color = '#5e6065';
for(let i = 0; i < 4; i++) {
    let x = 0;
    for(let j = 0; j < 5; j++) {
        if(x === 400) {
            color = '#ff9f0c'
        } else if(y === 150) {
            color = '#5e6065';
        } else {
            color = '#787a7e';
        }
        drawButton(x,y,buttons[i][j],color);
        x+=100;
    }
    y+=100;
}

//drawing the last row of buttons in the canvas
drawButton(0, 550, '0', '#787a7e');
drawButton(300, 550, '.', '#787a7e');
drawButton(400, 550, '=', '#ff9f0c');

function drawCircleButtons() {
    // red circle indicating close button
    ctx.fillStyle = '#ff5f58';
    ctx.beginPath();
    ctx.arc(20, 20, 10, 0, Math.PI * 2);
    ctx.fill();

    // yellow circle indicating minimize button
    ctx.fillStyle = '#febc2e';
    ctx.beginPath();
    ctx.arc(50, 20, 10, 0, Math.PI * 2);
    ctx.fill();

    // green circle indicating maximize button
    ctx.fillStyle = '#29c83f';
    ctx.beginPath();
    ctx.arc(80, 20, 10, 0, Math.PI * 2);
    ctx.fill();
}





