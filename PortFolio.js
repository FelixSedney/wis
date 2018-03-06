

$(document).ready(function () {

    $('.previous').hide();
    $('#previousGroupPhone').hide();

    var allImages;
    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    var imageOffset = 11;

    var page = window.location.href.substring(indexOfEqualSign + 1);

    function GetFileName(fullName) {
        var fullNameSplit = fullName.split("/");
        var result;
        var urlParam = "http://www.felixs.nl/JSONService.svc/GetDescriptionOfImage?image=" + fullNameSplit[fullNameSplit.length - 1];
        $.getJSON(urlParam, {},
            function (data) {
                $('#description').text(data[0]);
                $('#optional').text(data[1]);
            });
    }



    $('body').delegate(':not(#nextGroup *, #nextGroup, #previousGroup *, #previousGroup)', 'click', function () {
        var currentSrc = ($(this).attr("src"));
        $('img', '#mainImage').attr('src', function () {
            return currentSrc;
        });
        var fullNameSplit = currentSrc.split("/");
        $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
        GetFileName(currentSrc);
        return false;
    });


    $("#nextGroup, #nextGroupPhone").click(function () {
        $('.previousButton').show();
        $('#previousGroupPhone').show();
        if (imageOffset < allImages.length - 12) {
            imageOffset += 12;
        }

        if (allImages.length > 12) {
            var n = 1;
            for (i = 0; i < 12; i++) {
                if (imageOffset + i >= allImages.length) {
                    $('img', "#thumbNail" + n++).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                }
                else {
                    //
                    var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];
                    $('img', "#thumbNail" + n++).attr("src", imagePath);
                }
            }
            var currentImage = $('img', "#thumbNail1").attr('src');
            $('img', '#mainImage').attr('src', currentImage);

            var fullNameSplit = currentImage.split("/");
            $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
            GetFileName(fullNameSplit[fullNameSplit.length - 1]);
            if (imageOffset >= allImages.length - 12) {
                $('.nextButton').hide();
                $('#nextGroupPhone').hide();
            }
        }
    });




    $("#previousGroup, #previousGroupPhone").click(function () {
        $('.nextButton').show();
        $('#nextGroupPhone').show();
        if (imageOffset >= 12) {
            imageOffset -= 12;
            $('.previousButton').show();
            $('#previousGroupPhone').show();
        }

        var n = 1;
        for (i = 0; i < 12; i++) {
            //
            var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];
            $('img', '#thumbNail' + n++).attr("src", imagePath);
        }
        var currentImage = $('img', '#thumbNail1').attr('src');
        $('img', '#mainImage').attr('src', currentImage);

        var fullNameSplit = currentImage.split("/");
        $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
        GetFileName(fullNameSplit[fullNameSplit.length - 1]);
        if (imageOffset < 12) {
            $('.previousButton').hide();
        }
    });




    var urlParam = "http://www.felixs.nl/JSONService.svc/GetImages?path=" + page;
    $.getJSON(urlParam, {},
        function (data) {
            imageOffset = 0;
            allImages = data;
            for (i = 1; i < 13; i++) {
                if (imageOffset + i >= allImages.length + 1) {
                    //$('img', "#thumbNail" + n++).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                }
                else {
                    //
                    var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + data[i - 1];
                    $('img', "#thumbNail" + i).attr("src", imagePath);
                }
            }
            $('img', "#mainImage").attr("src", "http://www.felixs.nl/images/medium/" + page + "/" + data[0]);
            if (allImages.length < 13) {
                $('.nextButton').hide();
                $('#nextGroupPhone').hide();
            }
            $('.previousButton').hide();
            $('#previousGroupPhone').hide();
            GetFileName(data[0]);
            $('#filename').text(data[0]);
        });
});

