

$(document).ready(function () {

    $('.previous').hide();
    $('#previousGroupPhone').hide();

    var allImages;
    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    var imageOffset = 0;
    var maxNumberOfImages = 12;

    var page = window.location.href.substring(indexOfEqualSign + 1);


    document.getElementById('linkContainer').onclick = function (event) {
        event = event || window.event;
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = {
                index: link,
                event: event,
                onclosed: function () {
                    // Callback function executed when the Gallery has been closed
                    // var el = document.getElementById("hideWhenCarouselIsShown");
                    //el.style.display = "block";
                },
                onopen: function () {
                    //var el = document.getElementById("hideWhenCarouselIsShown");
                    //el.style.display = "none";
                }

            }
        links = this.parentNode.getElementsByTagName('a');
        blueimp.Gallery(links, options);

        scroll(0, 0);
    };



    function GetDescription(index) {
        var fullNameSplit = allImages[index].split("/");
        var shortName = fullNameSplit[fullNameSplit.length - 1];
        var urlParam = "http://www.FelixS.nl/JSONService.svc/GetDescriptionOfImage?image=" + shortName
        $.getJSON(urlParam, {},
            function (data) {

                var result = data[0] + " , " + data[1];
                var element = "thumbNail" + (index + 1);
                var el = document.getElementById(element);
                el.title = shortName.substring(2, shortName.length - 4) + " -- " + result;
            });
    }


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



    $("#nextGroup, #nextGroupPhone").click(function () {
        $('.previousButton').show();
        $('#previousGroupPhone').show();
        if (imageOffset < allImages.length - maxNumberOfImages) {
            imageOffset += maxNumberOfImages;
        }

        if (allImages.length > maxNumberOfImages) {
            for (i = 0; i < maxNumberOfImages; i++) {
                if (imageOffset + i >= allImages.length) {
                    $("#thumbNail" + i).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                    $("#anker" + i).attr("href", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                }
                else {
                    var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];
                    $("#thumbNail" + i).attr("src", imagePath);
                    $("#anker" + i).attr("href", imagePath);
                    GetDescription(imageOffset + i);
                }
            }
            if (imageOffset >= allImages.length - maxNumberOfImages) {
                $('.nextButton').hide();
                $('#nextGroupPhone').hide();
            }
        }
    });


    $("#previousGroup, #previousGroupPhone").click(function () {
        $('.nextButton').show();
        $('#nextGroupPhone').show();
        if (imageOffset >= maxNumberOfImages) {
            imageOffset -= maxNumberOfImages;
            $('.previousButton').show();
            $('#previousGroupPhone').show();
        }

        for (i = 0; i < maxNumberOfImages; i++) {
            //
            var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];

            $("#thumbNail" + i).attr("src", imagePath);
            $("#anker" + i).attr("href", imagePath);
            GetDescription(imageOffset + i);
        }

        if (imageOffset < maxNumberOfImages) {
            $('.previousButton').hide();
        }
    });


    var urlParam = "http://www.felixs.nl/JSONService.svc/GetImages?path=" + page;
    $.getJSON(urlParam, {},
        function (data) {
            imageOffset = 0;
            allImages = data;
            var ankerPoint = document.getElementById("ankerPoint");
            var ankerContainer = document.getElementById("ankerPoint").parentNode;
            var newRow = document.createElement("div");
            newRow.setAttribute("class", "row");

            for (i = 1; i < allImages.length; i++) {
                if (i % 10 == 1) {
                    var mtColumn = document.createElement("div");
                    mtColumn.setAttribute("class", "col-md-1");
                    newRow.appendChild(mtColumn);
                }
                // var imagePath = "http://www.InHetOogFotografie.nl/images/medium/" + page + "/" + allImages[i - 1] + ".jpg";
                var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[i - 1];
                //alert("running  "+imagePath);
                var newColumn = document.createElement("div");
                newColumn.setAttribute("class", "col-md-1");
                var newA_Tag = document.createElement("a");
                newA_Tag.setAttribute("href", imagePath);
                newA_Tag.setAttribute("id", "thumbNail" + i);
                newA_Tag.setAttribute("title", "$");
                // newA_Tag.setAttribute("title", "$" + allDescriptions[0]);
                newA_Tag.setAttribute("data-gallery", "");
                newColumn.appendChild(newA_Tag);
                var newImage = document.createElement("img");
                newImage.setAttribute("src", imagePath);
                // newImage.setAttribute("class","thumbnal");
                newA_Tag.appendChild(newImage);
                newRow.appendChild(newColumn);
                allImages[i - 1] = imagePath;
                //alert("running");
                if (i % 10 == 0) {
                    ankerContainer.insertBefore(newRow, ankerPoint);
                    newRow = document.createElement("div");
                    newRow.setAttribute("class", "row");
                    var mtColumn = document.createElement("div");
                    mtColumn.setAttribute("class", "col-md-1");
                }
                ankerContainer.insertBefore(newRow, ankerPoint);
            }
            for (var i = 0; i < allImages.length; i++) {
                GetDescription(i);
            }
        });

});

