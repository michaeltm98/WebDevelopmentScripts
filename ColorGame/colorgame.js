var numberOfSquares = 6;
var colors = [];
var pickedColor;
var squares = document.querySelectorAll(".square");
var colorDisplay = document.getElementById("colorDisplay");
var messageDisplay = document.querySelector("#message");
var h1 = document.querySelector("h1");
var resetButton = document.querySelector("#reset");
var modeButtons = document.querySelectorAll(".mode");


init();

function init(){
    setupModeButtons();
    setupSquares();
    reset();
}

function setupSquares(){
    for(var i = 0; i < squares.length; i++) {
        //add click listeners to squares
        squares[i].addEventListener("click", function() {
           //get color of clicked square
           var clickedColor = this.style.backgroundColor; 
    
           if(clickedColor === pickedColor){
               resetButton.textContent = "Play again?"
               //correct, game won
               messageDisplay.textContent = "Correct";
               changeColors(clickedColor)
               h1.style.background = clickedColor;
           }
           else {
               //wrong, make color of square same color as background
               this.style.background = "#232323";
               messageDisplay.textContent = "Try Again";
           }
        });
    }
}

function setupModeButtons(){
        //mode buttons event listeners
        for(var i = 0; i < modeButtons.length; i++){
            modeButtons[i].addEventListener("click", function(){
                modeButtons[0].classList.remove("selected");
                modeButtons[1].classList.remove("selected");
                this.classList.add("selected");
                this.textContent === "Easy" ? numberOfSquares = 3: numberOfSquares = 6;
                reset();
            });
        }
}

function reset(){
        //generate all new colors
        colors = generateRandomColors(numberOfSquares);
        console.log("after gen colors")
        pickedColor = pickColor();
        console.log("after pick colors")
        colorDisplay.textContent = pickedColor;
        console.log("after assign color")
    
        resetButton.textContent = "New Colors";
        messageDisplay.textContent = "";
        h1.style.background = "steelBlue";
    
        for(var i = 0; i < squares.length; i++){
            if(colors[i]){
                squares[i].style.display = "block";
                squares[i].style.background = colors[i];
            }
            else {
                squares[i].style.display = "none";
            }
        }
}



resetButton.addEventListener("click", function() {
    reset();
});


function changeColors(color){
    //loop through all squares

    for(var i = 0; i < squares.length; i++) {
        //change each color
        squares[i].style.background = color;
    }
}



function pickColor(){
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}


function generateRandomColors(number){
    //make an array
    var array = [];
    
    for(var i = 0; i < number; i++){
        //get random color and push into array'
        array.push(randomColor());
    }
    //add number random colors to arrat
    //return array
    return array;
}

function randomColor(){
    var red = Math.floor(Math.random() * 256);
    var green = Math.floor(Math.random() * 256);
    var blue = Math.floor(Math.random() * 256);


    return "rgb(" + red + ", " + green + ", " + blue + ")";
}