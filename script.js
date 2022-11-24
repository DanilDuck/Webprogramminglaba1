var form = document.querySelector('.validate_form')
var validateButton = form.querySelector('.validate')
var fields= document.querySelectorAll('.validate')
var xCoord = document.querySelectorAll(".x");
var yCoord = document.querySelector(".y");
var rCoord = document.querySelectorAll(".r");
function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}
function removeMsg() {
    var msg = form.querySelectorAll('.msg')
    for (var i = 0; i < msg.length; i++) {
        msg[i].remove()
    }
}
function createError(text){
    let msg = document.createElement('div');
    msg.className = 'msg';
    msg.style.color = 'red';
    msg.innerHTML = text;
    return msg
}
function checkSelection(values) {
    for(let i=0; i<values.length; i++){
        if(values[i].checked) return true;
    }
    var error = createError('Пустое поле');
    values[0].parentElement.insertBefore(error, values[0]);
    return false;
}
function checkString(coordinate){
    if(!isNumber(coordinate.value)) {
        let exc = createError('Пустое поле');
        coordinate.parentElement.insertBefore(exc, coordinate);
        return true;
    }
    else {
        return false;
    }
}
function validateCoordinate(coordinate){
    if(coordinate.value){
        if(coordinate.value<-3 || coordinate.value>3 || !isNumber(coordinate.value)){
            let error = createError('Неправильное число')
            coordinate.parentElement.insertBefore(error, coordinate)
            return false;
        }
        return true
    }
}
function validateData(){
    return checkSelection(xCoord)&& validateCoordinate(yCoord) && checkSelection(rCoord);
}
$("#input-form").on("submit", function (event) {
    event.preventDefault();
    removeMsg();
    if (!validateData() && checkString(yCoord)) {
        console.log("post canceled")
        return
    }
    console.log("data sending...")
    console.log($(this).serialize());
    $.ajax({
        url: 'scripts/index.php',
        method: "POST",
        data: $(this).serialize() + "&timezone=" + new Date().getTimezoneOffset(),
        dataType: "html",
        success: function (data) {
            console.log(data);
            $(".validate").attr("disabled", false);
            $("#table_out").html(data);
        },
        error: function (error) {
            console.log(error);
            $(".validate").attr("disabled", false);
        },
    })

});
$(".resetDate").on("click",function(event){
    $.ajax({
        url: 'scripts/clear.php',
        method: "POST",
        dataType: "html",
        success: function(data){
            console.log(data);
            $("#table_out").empty();
        },
        error: function(error){
            console.log(error);
        },
    })
})


