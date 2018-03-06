
$(document).ready(function () {
    var allImages;
    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    var imageOffset = 11;

    var page = window.location.href.substring(indexOfEqualSign + 1);
    //page = page;

    function GetDescription(fullName) {
        var fullNameSplit = fullName.split("\\");
        var result;
        var urlParam = "http://www.felixs.nl/JSONService.svc/GetDescriptionOfImage?image=" + fullNameSplit[fullNameSplit.length - 1];
        //var urlParam = "http://www.InHetOogFotografie.nl/JSONService.svc/GetDescriptionOfImage?image=" + fullNameSplit[fullNameSplit.length - 1];
        $.getJSON(urlParam, {},
            function (data) {
                $('#description').text(data[0]);
                $('#optional').text(data[1]);
            });
    }

    function SearchImages() {
        var searchTerm = $("#searchTerm").val();
        $("#searchTerm").val('');
        var urlParam = "http://www.Felixs.nl/JSONService.svc/SearchImagesContaining?searchTerm=" + searchTerm;
        $.getJSON(urlParam, {},
            function (data) {
                imageOffset = 0;
                allImages = data;
                for (i = 1; i < 13; i++) {
                    if (imageOffset + i >= allImages.length) {
                        $('img', "#thumbNail" + n++).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                    }
                    else {
                        var imagePath = "http://www.FelixS.nl/images/medium/" + data[i - 1];
                        $('img', "#thumbNail" + i).attr("src", imagePath);
                    }
                }

                $('img', "#mainImage").attr("src", "http://www.Felixs.nl/images/medium/" + data[0]);
                GetDescription(data[0]);
                $('#filename').text(data[0]);
            });



        for (i = 1; i < 13; i++) {
            $('img', "#thumbNail" + n++).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
        };

    }



    $('body').delegate(':not(#nextGroup *, #nextGroup, #previousGroup *, #previousGroup)', 'click', function () {

        var currentSrc = ($(this).attr("src"));
        $('img', '#mainImage').attr('src', function () {
            return currentSrc;
        });

        var fullNameSplit = currentSrc.split("/");
        $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
        GetDescription(currentSrc);
        return false;
    });

    $("#nextGroup").click(function () {
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
                    var imagePath = "http://www.felixs.nl/images/medium/" + allImages[imageOffset + i];
                    $('img', "#thumbNail" + n++).attr("src", imagePath);
                }

            }
            var currentImage = $('img', "#thumbNail1").attr('src');
            $('img', '#mainImage').attr('src', currentImage);


            var fullNameSplit = currentImage.split("/");
            $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
            GetDescription(fullNameSplit[fullNameSplit.length - 1]);


        }
    });


    $("#previousGroup").click(function () {
        if (imageOffset >= 12) { imageOffset -= 12; }
        var n = 1;
        for (i = 0; i < 12; i++) {
            var imagePath = "http://www.FelixS.nl/images/medium/" + allImages[imageOffset + i];
            $('img', '#thumbNail' + n++).attr("src", imagePath);
        }
        var currentImage = $('img', '#thumbNail1').attr('src');
        $('img', '#mainImage').attr('src', currentImage);


        var fullNameSplit = currentImage.split("/");
        $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
        GetDescription(fullNameSplit[fullNameSplit.length - 1]);

    });

    $("#searchTerm").keypress(function (e) {
        if (e.which == 13) {
            //alert("keypressed");
            SearchImages();
        }
    });

    $("#searchButton").click(function () {
        SearchImages();



    });




    // var urlParam = "http://www.felixs.nl/JSONService.svc/GetImages?path=" + page;
    var urlParam = "http://www.felixs.nl/JSONService.svc/SearchImagesContaining?searchterm=" + page;
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
                    var imagePath = "http://www.felixs.nl/images/medium/" + data[i - 1];
                    $('img', "#thumbNail" + i).attr("src", imagePath);
                }
            }
            $('img', "#mainImage").attr("src", "http://www.felixs.nl/images/medium/" + data[0]);
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