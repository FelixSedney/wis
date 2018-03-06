
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
