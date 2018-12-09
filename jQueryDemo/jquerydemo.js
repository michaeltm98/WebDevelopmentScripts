
function addPurpleBackgroundToAllDivs() {
    $('div').css("background", "purple")
}

function setPixelWidthOnClass(className, widthInPixels) {
    $(className).css("width", widthInPixels);
}

function setBorderOnId(id, border) {
    $(id).css("border", border);
}

function setDivFontColorByIndex(index, fontColor) {
    $("div").eq(index).css("color", fontColor);
}

setDivFontColorByIndex(0, "pink");
setPixelWidthOnClass(".highlight", "200px");
setBorderOnId("#third", "10px solid orange");
addPurpleBackgroundToAllDivs();