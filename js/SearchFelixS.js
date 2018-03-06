
$(document).ready(function () {

    var allImages;
    var urlParam = "";
    var getAllImages;
    var indexOfEqualSign = window.location.href.indexOf("=", 0);
    var page = "";



    getAllImages = function () {
        $.getJSON(urlParam, {},
            function (data) {
                allImages = data;
                var ankerPoint = document.getElementById("ankerPoint");
                var ankerContainer = document.getElementById("ankerPoint").parentNode;
                var newRow = document.createElement("div");
                newRow.setAttribute("class", "row");

                for (i = 1; i < allImages.length; i++) {
                    var imagePath = "http://www.felixs.nl/images/medium/" + allImages[i - 1];
                    var newColumn = document.createElement("div");
                    newColumn.setAttribute("class", "col-md-2");
                    var newA_Tag = document.createElement("a");
                    newA_Tag.setAttribute("href", imagePath);
                    newA_Tag.setAttribute("id", "thumbNail" + i);
                    newA_Tag.setAttribute("title", "$undefined");
                    newA_Tag.setAttribute("data-gallery", "");
                    newColumn.appendChild(newA_Tag);
                    var newImage = document.createElement("img");
                    newImage.setAttribute("src", imagePath);
                    newA_Tag.appendChild(newImage);
                    newRow.appendChild(newColumn);
                    allImages[i - 1] = imagePath;

                    if (i % 6 == 0) {
                        ankerContainer.insertBefore(newRow, ankerPoint);
                        newRow = document.createElement("div");
                        newRow.setAttribute("class", "row");
                    }
                    ankerContainer.insertBefore(newRow, ankerPoint);

                }
                for (var i = 0; i < allImages.length; i++) {
                    GetDescription(i);
                }
            });
    }


    function clearAnkerPoint() {
        var ankerNode = document.getElementById("linkContainer");
        var newRow = document.createElement("div");
        newRow.setAttribute("id", "ankerPoint");
        ankerNode.innerHTML = " ";
        ankerNode.appendChild(newRow);
    }




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
        var fullNameSplit = allImages[index].split("\\");
        var shortName = fullNameSplit[fullNameSplit.length - 1];
        var urlParam = "http://www.felixs.nl/JSONService.svc/GetDescriptionOfImage?image=" + shortName;
        $.getJSON(urlParam, {},
            function (data) {
                var result = data[0] + " , " + data[1];
                var element = "thumbNail" + (index + 1);
                var el = document.getElementById(element);
                el.title = shortName.substring(2, shortName.length - 4) + " -- " + result;
            });
    }



    //The user entered a search term in the texbox and pressed the searc button.
    $("#searchButton").click(function () {
        var searchTerm = $("#searchTerm").val();
        urlParam = "http://www.Felixs.nl/JSONService.svc/SearchImagesContaining?searchTerm=" + searchTerm;
        clearAnkerPoint();
        getAllImages();
    });


    //The user entered a search term in the texbox and pressed the enter key.
    var searchTermTextBox = document.getElementById("searchTerm")
    searchTermTextBox.addEventListener("keyup", function (event) {
        event.preventDefault();
        if (event.keyCode == 13) {
            document.getElementById("searchButton").click();
            searchTermTextBox.textContent = "";
        }
    });



    //run as soon as page is loaded.
    //the search page can be opened by a user selecting a link on another page within this site.
    //A search term is passed in the url in that case. Searching should start immediately after opening this page.
    if (indexOfEqualSign > -1) {
        page = window.location.href.substring(indexOfEqualSign + 1);
        urlParam = "http://www.Felixs.nl/JSONService.svc/SearchImagesContaining?searchTerm=" + page;
        clearAnkerPoint();
        getAllImages();
    }
    else {
        page = "";
    }
    page = page;


});
