

$(document).ready(function () {

    var allImages;
    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    var allDescriptions = new Array();

    var page = window.location.href.substring(indexOfEqualSign + 1);
    page = page;

    document.getElementById('linkContainer').onclick = function (event) {

        event = event || window.event;
        var target = event.target || event.srcElement,
            link = target.src ? target.parentNode : target,
            options = {
                index: link,
                event: event,
                onclosed: function () {
                    // Callback function executed when the Gallery has been closed
                    var el = document.getElementById("hideWhenCarouselIsShown");
                    el.style.display = "block";
                },
                onopen: function () {
                    var el = document.getElementById("hideWhenCarouselIsShown");
                    el.style.display = "none";
                }

            }
        links = this.parentNode.getElementsByTagName('a');
        blueimp.Gallery(links, options);

        scroll(0, 0);
    };


    function GetDescription(index) {
        var fullNameSplit = allImages[index].split("/");
        var shortName = fullNameSplit[fullNameSplit.length - 1];
        var urlParam = "http://www.InHetOogFotografie.nl/JSONService.svc/GetDescriptionOfImage?image=" + shortName;
        $.getJSON(urlParam, {},
            function (data) {

                var result = data[0] + " , " + data[1];
                var element = "thumbNail" + (index + 1);
                var el = document.getElementById(element);
                el.title = shortName.substring(2, shortName.length - 4) + " -- " + result;
            });
    }


    var urlParam = "http://www.inhetoogfotografie.nl/jsonservice.svc/GetImagesByRating?path=" + page + "&rating=3";
    //resultTextBox.textContent = " TesT " + urlParam;
    $.getJSON(urlParam, {},
        function (data) {
            allImages = data;

            var ankerPoint = document.getElementById("ankerPoint");
            var ankerContainer = document.getElementById("ankerPoint").parentNode;

            var newRow = document.createElement("div");
            newRow.setAttribute("class", "row");

            for (i = 1; i < allImages.length; i++) {
                var imagePath = "http://www.InHetOogFotografie.nl/images/medium/" + page + "/" + allImages[i - 1] + ".jpg";
                //$('img', "#thumbNail" + i).attr("src", imagePath);
                var newColumn = document.createElement("div");
                newColumn.setAttribute("class", "col-md-2");
                
                var newA_Tag = document.createElement("a");
                newA_Tag.setAttribute("href", imagePath);
                newA_Tag.setAttribute("id", "thumbNail" + i);
                //GetDescription(allImages[i-1]);
                newA_Tag.setAttribute("title", "$" + allDescriptions[0]);
                //newA_Tag.setAttribute("title","test"+i);
                newA_Tag.setAttribute("data-gallery", "");
                newColumn.appendChild(newA_Tag);
                var newImage = document.createElement("img");
                newImage.setAttribute("src", imagePath);
                newA_Tag.appendChild(newImage);
                newRow.appendChild(newColumn);
                allImages[i - 1] = imagePath;

                if (i % 6 == 0) {
                    ankerContainer.insertBefore(newRow, ankerPoint);
                    //alert("running");
                    newRow = document.createElement("div");
                    newRow.setAttribute("class", "row");
                }
                ankerContainer.insertBefore(newRow, ankerPoint);

            }
            for (var i = 0; i < allImages.length; i++) {
                GetDescription(i);
            }
        });

});
