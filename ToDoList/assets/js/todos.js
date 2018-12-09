//$("input[type='text'").keypress(function(event){ 
//it should actually be: $("input[type='text']").keypress(function(event){

//check off specific todos by clicking



function setLiListenersWithJavascript() {

    $('li').click(function() {

        //if li is gray, turn it black
        if($(this).css("color") === "rgb(128, 128, 128)"){
            $(this).css({
                color: "black",
                textDecoration: "none"
            });
        }
        //else turn it gray
        else {
            $(this).css({
                color: "gray",
                textDecoration: "line-through"
            });
        }

    });

}

//much shorter than the above function which uses JS
function setLiListenersWithCss() {

    //we can only add listeners to elements that exist on page creation
    //(using jQuery) 
    $('ul').on("click", "li", function() {
        $(this).toggleClass("completed");
    });
}

function setXlisteners() {

    $("ul").on("click", "span",function(event) {

        //.parent() gets the parent element
        $(this).parent().fadeOut(500, function() {
            $(this).remove();
        });

        //stops the event from bubbling up the the parent elements
        event.stopPropagation();
    });
}



function setInputListener(){

    $("input[type='text']").keypress(function(event) {
        if(event.which === 13){

            //grab new text from input
            var todoText = $(this).val();

            //clear input
            $(this).val("");

            //create a new li and add to ul
            //append can take a string of html and add it to an
            //existing element
            $("ul").append("<li><span><i class='fa fa-trash'></i></span> " + todoText + "</li>")

            
        }
    });

}

//allows the addToDo drop down to fade in and out
//when the plus icon is clicked
$(".fa-plus").click(function() {
    $("input[type='text']").fadeToggle();
})


setInputListener();

setXlisteners();

setLiListenersWithCss();
