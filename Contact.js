
$(document).ready(function () {

    $("#fromInput").select();
    $("#fromInput").focus();

    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    if (indexOfEqualSign > 0) {
        var fileName = window.location.href.substring(indexOfEqualSign + 1);
        $("#subjectInput").val(fileName);
    }

    $("#sendMail").click(function () {
        var from = $("#fromInput").val();
        var subject = $("#subjectInput").val();
        var message = $("#bodyInput").val();
        var urlParam = "http://www.felixs.nl/jsonservice.svc/SendMail?fromEmail=" + from + "&subject=" + subject + "&body=" + message;
        $.getJSON(urlParam, {},
               function (data) {
                   result.textContent = data;
               });
    });

   

});