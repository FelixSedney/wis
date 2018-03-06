

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
     var count=index-imageOffset;
        var fullNameSplit = allImages[index].split("/");
        var shortName=fullNameSplit[fullNameSplit.length - 1];
        var urlParam = "http://www.FelixS.nl/JSONService.svc/GetDescriptionOfImage?image=" + shortName
        $.getJSON(urlParam, {},
            function (data) {
//alert(count+"  "+index);
                var result = data[0] + " , " + data[1];
                var element = "anker" + count;
                var el = document.getElementById(element);
                el.title = shortName.substring(2,shortName.length-4)+" -- "+result;
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


    // $('body').delegate(':not(#nextGroup *, #nextGroup, #previousGroup *, #previousGroup)', 'click', function () {
    //     var currentSrc = ($(this).attr("src"));
    //     $('img', '#mainImage').attr('src', function () {
    //         return currentSrc;
    //     });
    //     var fullNameSplit = currentSrc.split("/");
    //     $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
    //     GetFileName(currentSrc);
    //     return false;
    // });


    $("#nextGroup, #nextGroupPhone").click(function () {
        $('.previousButton').show();
        $('#previousGroupPhone').show();
        if (imageOffset < allImages.length - maxNumberOfImages) {
            imageOffset += maxNumberOfImages;
        }

        if (allImages.length > maxNumberOfImages) {
           // var n = 1;
            for (i = 0; i < maxNumberOfImages; i++) {
                if (imageOffset + i >= allImages.length) {
                    $("#thumbNail" + i).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                       $("#anker"+i).attr("href", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                }
                else {
                    var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];
                    $("#thumbNail" + i).attr("src", imagePath);
                       $("#anker"+i).attr("href", imagePath);
                       GetDescription(imageOffset+i);
                     //  alert(count+"---"+index);
                }
            }
           // var currentImage = $('img', "#thumbNail1").attr('src');
           // $('img', '#mainImage').attr('src', currentImage);

           // var fullNameSplit = currentImage.split("/");
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

        //var n = 1;
        for (i = 0; i < maxNumberOfImages; i++) {
            //
            var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + allImages[imageOffset + i];
          //  $('#thumbNail' + n++).attr("src", imagePath);

  $("#thumbNail" + i).attr("src", imagePath);
                       $("#anker"+i).attr("href", imagePath);
                       GetDescription(imageOffset+i);

        }
        // var currentImage = $('img', '#thumbNail1').attr('src');
        // $('img', '#mainImage').attr('src', currentImage);

        // var fullNameSplit = currentImage.split("/");
        // $('#filename').text(fullNameSplit[fullNameSplit.length - 1]);
        // GetFileName(fullNameSplit[fullNameSplit.length - 1]);
        if (imageOffset < maxNumberOfImages) {
            $('.previousButton').hide();
        }
    });




    var urlParam = "http://www.felixs.nl/JSONService.svc/GetImages?path=" + page;
    $.getJSON(urlParam, {},
           function (data) {
               imageOffset = 0;
               allImages = data;
               for (i = 0; i < maxNumberOfImages ; i++) {
                   if (imageOffset + i >= allImages.length + 1) {
                       //$('img', "#thumbNail" + n++).attr("src", "http://www.felixs.nl/Images/default_lo_fade_60.jpg");
                   }
                   else {
                       //
                       var imagePath = "http://www.felixs.nl/images/medium/" + page + "/" + data[i ];
                       $("#thumbNail" + i).attr("src", imagePath);
                       $("#anker"+i).attr("href", imagePath);
                       GetDescription(i);
                   }
               }
               if (allImages.length < maxNumberOfImages + 1) {
                   $('.nextButton').hide();
                   $('#nextGroupPhone').hide();
               }
               $('.previousButton').hide();
               $('#previousGroupPhone').hide();
           });
});

