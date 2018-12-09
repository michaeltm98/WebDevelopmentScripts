//NOTE 
//click() only adds listeners for existing elements
//on() will add listeners for all potential future elements

// $('input[type="text"')  should have a closing bracket, like this: $('input[type="text"]')

function setButtonClicks() {

    $("button").click(function() {
        //$this refers to jQuery's "this"
        $(this).css("background", "pink");
        var text = $(this).text();
        console.log("Your clicked " + text);
    }); 

}

function setKeyPresses() {

    $("input").keypress(function(event) {
        console.log("YOU PRESSED A KEY");
        console.log(event);
        
        //13 is the "enter" key character code
        //"which" is the property that tells which code was pressed
        if(event.which == 13){
            alert("YOU HIT ENTER");
        }
    });

}

function setONClick() {

    $("h1").on("click", function(){
        $(this).css("color", "purple");
    });

}

function setONKeyPressed() {

    $("input").on("keypress", function(){
        console.log("KEY PRESSED");
    });

}

function setOnMouseEnter() {

    $("button").on("mouseenter", function() {
        $(this).css("font-weight", "bold");
    });

}

function setOnMouseLeave() {

    $("button").on("mouseleave", function() {
        $(this).css("font-weight", "normal");
    });

}

setOnMouseLeave();
setOnMouseEnter();


