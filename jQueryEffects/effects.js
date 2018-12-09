
function fadeOutDivsOnClick(){

    $("button").on("click", function() {
        $('div').fadeOut(1000, function() {
            console.log("fade completed");

            //removes the item(s) after the action is complete
            $(this).remove();
        });
    });
    
}

function fadeInDivsOnClick() {

    $("button").on("click", function() {
        $('div').fadeIn(1000, function() {
            //code in the callback
        });
    });

}

function fadeToggleOnClick(){

    $("button").on("click", function() {
        $('div').fadeToggle(1000, function() {
            //code in the callback
        });
    });

}

function slideDownOnClick() {

    $("button").on("click", function() {
        $('div').slideDown();
    });

}

function slideUpOnClick() {

    $("button").on("click", function() {
        $('div').slideUp();
    });

}

function slideToggleOnClick() {

    $("button").on("click", function() {
        $('div').slideToggle(1000, function() {
            console.log("The slide has been toggled");
        });
    });

}

slideToggleOnClick();
