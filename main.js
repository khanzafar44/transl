$(document).ready(function() {
    "use strict";

    //------- Niceselect  js --------//

    if (document.getElementById("default-select")) {
        $("select").niceSelect();
    }
    if (document.getElementById("default-select2")) {
        $("select").niceSelect();
    }
    if (document.getElementById("service-select")) {
        $("select").niceSelect();
    }

    //------- Lightbox  js --------//

    $(".img-pop-up").magnificPopup({
        type: "image",
        gallery: {
            enabled: true,
        },
    });

    $(".play-btn").magnificPopup({
        type: "iframe",
        mainClass: "mfp-fade",
        removalDelay: 160,
        preloader: false,
        fixedContentPos: false,
    });

    //------- Counter  js --------//

    if (document.getElementById("facts-area")) {
        $(".counter").counterUp({
            delay: 10,
            time: 1000,
        });
    }

    //------- Skill  js --------//

    $(".skill").simpleSkillbar();

    //------- Filter  js --------//

    $(".filters ul li").click(function() {
        $(".filters ul li").removeClass("active");
        $(this).addClass("active");

        var data = $(this).attr("data-filter");
        $grid.isotope({
            filter: data,
        });
    });

    if (document.getElementById("portfolio")) {
        var $grid = $(".grid").isotope({
            itemSelector: ".all",
            percentPosition: true,
            masonry: {
                columnWidth: ".all",
            },
        });
    }

    //------- Timeline js --------//

    $(".content").each(function(i) {
        var bottom_of_object = $(this).offset().top + $(this).outerHeight();
        var bottom_of_window = $(window).height();

        if (bottom_of_object > bottom_of_window) {
            $(this).addClass("hidden");
        }
    });

    $(window).scroll(function() {
        /* Check the location of each element hidden */
        $(".hidden").each(function(i) {
            var bottom_of_object = $(this).offset().top + $(this).outerHeight();
            var bottom_of_window = $(window).scrollTop() + $(window).height();

            /* If the object is completely visible in the window, fadeIn it */
            if (bottom_of_window > bottom_of_object) {
                $(this).animate({
                    opacity: "1"
                }, 700);
            }
        });
    });

    //------- Superfish nav menu  js --------//

    $(".nav-menu").superfish({
        animation: {
            opacity: "show",
        },
        speed: 400,
    });

    //------- Accordian Js --------//

    var allPanels = $(".accordion > dd").hide();
    allPanels.first().slideDown("easeOutExpo");
    $(".accordion").each(function() {
        $(this).find("dt > a").first().addClass("active").parent().next().css({
            display: "block",
        });
    });

    $(document).on("click", ".accordion > dt > a", function(e) {
        var current = $(this).parent().next("dd");
        $(this).parents(".accordion").find("dt > a").removeClass("active");
        $(this).addClass("active");
        $(this).parents(".accordion").find("dd").slideUp("easeInExpo");
        $(this).parent().next().slideDown("easeOutExpo");

        return false;
    });

    //------- Tabs Js --------//
    if (document.getElementById("horizontalTab")) {
        $("#horizontalTab").jqTabs({
            direction: "horizontal",
            duration: 200,
        });
    }

    //------- Owl Carusel  js --------//

    $(".active-review-carusel").owlCarousel({
        items: 1,
        loop: true,
        autoplay: true,
        autoplayHoverPause: true,
        margin: 30,
        dots: true,
    });

    $(".active-testimonial").owlCarousel({
        items: 2,
        loop: true,
        margin: 30,
        autoplayHoverPause: true,
        dots: true,
        autoplay: true,
        nav: true,
        navText: [
            "<span class='lnr lnr-arrow-up'></span>",
            "<span class='lnr lnr-arrow-down'></span>",
        ],
        responsive: {
            0: {
                items: 1,
            },
            480: {
                items: 1,
            },
            768: {
                items: 2,
            },
        },
    });

    $(".active-brand-carusel").owlCarousel({
        items: 5,
        loop: true,
        autoplayHoverPause: true,
        autoplay: true,
        responsive: {
            0: {
                items: 1,
            },
            455: {
                items: 2,
            },
            768: {
                items: 3,
            },
            991: {
                items: 4,
            },
            1024: {
                items: 5,
            },
        },
    });

    //------- Mobile Nav  js --------//

    if ($("#nav-menu-container").length) {
        var $mobile_nav = $("#nav-menu-container").clone().prop({
            id: "mobile-nav",
        });
        $mobile_nav.find("> ul").attr({
            class: "",
            id: "",
        });
        $("body").append($mobile_nav);
        $("body").prepend(
            '<button type="button" id="mobile-nav-toggle"><i class="lnr lnr-menu"></i></button>'
        );
        $("body").append('<div id="mobile-body-overly"></div>');
        $("#mobile-nav")
            .find(".menu-has-children")
            .prepend('<i class="lnr lnr-chevron-down"></i>');

        $(document).on("click", ".menu-has-children i", function(e) {
            $(this).next().toggleClass("menu-item-active");
            $(this).nextAll("ul").eq(0).slideToggle();
            $(this).toggleClass("lnr-chevron-up lnr-chevron-down");
        });

        $(document).on("click", "#mobile-nav-toggle", function(e) {
            $("body").toggleClass("mobile-nav-active");
            $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
            $("#mobile-body-overly").toggle();
        });

        $(document).on("click", function(e) {
            var container = $("#mobile-nav, #mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $("#mobile-nav-toggle i").toggleClass("lnr-cross lnr-menu");
                    $("#mobile-body-overly").fadeOut();
                }
            }
        });
    } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
        $("#mobile-nav, #mobile-nav-toggle").hide();
    }

    //------- Smooth Scroll  js --------//

    $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function() {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            if (target.length) {
                var top_space = 0;

                if ($("#header").length) {
                    top_space = $("#header").outerHeight();

                    if (!$("#header").hasClass("header-fixed")) {
                        top_space = top_space;
                    }
                }

                $("html, body").animate({
                        scrollTop: target.offset().top - top_space,
                    },
                    1500,
                    "easeInOutExpo"
                );

                if ($(this).parents(".nav-menu").length) {
                    $(".nav-menu .menu-active").removeClass("menu-active");
                    $(this).closest("li").addClass("menu-active");
                }

                if ($("body").hasClass("mobile-nav-active")) {
                    $("body").removeClass("mobile-nav-active");
                    $("#mobile-nav-toggle i").toggleClass("lnr-times lnr-bars");
                    $("#mobile-body-overly").fadeOut();
                }
                return false;
            }
        }
    });

    $(document).ready(function() {
        $("html, body").hide();

        if (window.location.hash) {
            setTimeout(function() {
                $("html, body").scrollTop(0).show();

                $("html, body").animate({
                        scrollTop: $(window.location.hash).offset().top - 108,
                    },
                    1000
                );
            }, 0);
        } else {
            $("html, body").show();
        }
    });

    jQuery(document).ready(function($) {
        // Get current path and find target link
        var path = window.location.pathname.split("/").pop();

        // Account for home page with empty path
        if (path == "") {
            path = "index.html";
        }

        var target = $('nav a[href="' + path + '"]');
        // Add active class to target link
        target.addClass("menu-active");
    });

    $(document).ready(function() {
        if ($(".menu-has-children ul>li a").hasClass("menu-active")) {
            $(".menu-active")
                .closest("ul")
                .parentsUntil("a")
                .addClass("parent-active");
        }
    });

    //------- Header Scroll Class  js --------//

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $("#header").addClass("header-scrolled");
        } else {
            $("#header").removeClass("header-scrolled");
        }
    });

    //------- Google Map  js --------//

    if (document.getElementById("map")) {
        google.maps.event.addDomListener(window, "load", init);

        function init() {
            var mapOptions = {
                zoom: 11,
                center: new google.maps.LatLng(40.67, -73.94), // New York
                styles: [{
                        featureType: "water",
                        elementType: "geometry",
                        stylers: [{
                                color: "#e9e9e9",
                            },
                            {
                                lightness: 17,
                            },
                        ],
                    },
                    {
                        featureType: "landscape",
                        elementType: "geometry",
                        stylers: [{
                                color: "#f5f5f5",
                            },
                            {
                                lightness: 20,
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.fill",
                        stylers: [{
                                color: "#ffffff",
                            },
                            {
                                lightness: 17,
                            },
                        ],
                    },
                    {
                        featureType: "road.highway",
                        elementType: "geometry.stroke",
                        stylers: [{
                                color: "#ffffff",
                            },
                            {
                                lightness: 29,
                            },
                            {
                                weight: 0.2,
                            },
                        ],
                    },
                    {
                        featureType: "road.arterial",
                        elementType: "geometry",
                        stylers: [{
                                color: "#ffffff",
                            },
                            {
                                lightness: 18,
                            },
                        ],
                    },
                    {
                        featureType: "road.local",
                        elementType: "geometry",
                        stylers: [{
                                color: "#ffffff",
                            },
                            {
                                lightness: 16,
                            },
                        ],
                    },
                    {
                        featureType: "poi",
                        elementType: "geometry",
                        stylers: [{
                                color: "#f5f5f5",
                            },
                            {
                                lightness: 21,
                            },
                        ],
                    },
                    {
                        featureType: "poi.park",
                        elementType: "geometry",
                        stylers: [{
                                color: "#dedede",
                            },
                            {
                                lightness: 21,
                            },
                        ],
                    },
                    {
                        elementType: "labels.text.stroke",
                        stylers: [{
                                visibility: "on",
                            },
                            {
                                color: "#ffffff",
                            },
                            {
                                lightness: 16,
                            },
                        ],
                    },
                    {
                        elementType: "labels.text.fill",
                        stylers: [{
                                saturation: 36,
                            },
                            {
                                color: "#333333",
                            },
                            {
                                lightness: 40,
                            },
                        ],
                    },
                    {
                        elementType: "labels.icon",
                        stylers: [{
                            visibility: "off",
                        }, ],
                    },
                    {
                        featureType: "transit",
                        elementType: "geometry",
                        stylers: [{
                                color: "#f2f2f2",
                            },
                            {
                                lightness: 19,
                            },
                        ],
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.fill",
                        stylers: [{
                                color: "#fefefe",
                            },
                            {
                                lightness: 20,
                            },
                        ],
                    },
                    {
                        featureType: "administrative",
                        elementType: "geometry.stroke",
                        stylers: [{
                                color: "#fefefe",
                            },
                            {
                                lightness: 17,
                            },
                            {
                                weight: 1.2,
                            },
                        ],
                    },
                ],
            };
            var mapElement = document.getElementById("map");
            var map = new google.maps.Map(mapElement, mapOptions);
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(40.67, -73.94),
                map: map,
                title: "Snazzy!",
            });
        }
    }

    //------- Mailchimp js --------//

    $(document).ready(function() {
        $("#mc_embed_signup").find("form").ajaxChimp();
    });

    $(".special-characters p").click(function() {
        if ($("#translator_ifr").length > 0) {
            tinyMCE.activeEditor.insertContent($(this).data("char"));
        } else {
            typingForm.translator.value += $(this).data("char");
            document.getElementById("translator").focus();
        }
    });

    if ($("#translator").length > 0) {
        $("#translator").keyup(function() {
            var word_count = $("#translator").val().split(" ").length;
            var char_count = $("#translator").val().length;
            var char_count_space = $("#translator").val().length;

            $("#wordCount").html(word_count);
            $("#totalChars").html(char_count_space);
            $("#charCountNoSpace").html(char_count);
        });
    }
});

function saveTextAsFile() {
    if ($("#translator_ifr").length > 0) {
        var textToSave = tinyMCE.activeEditor.getContent({
            format: "text"
        });
    } else if ($("#translator").length > 0) {
        var textToSave = $("#translator").val();
    }
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/plain"
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);

    var fileNameToSaveAs = "typingapp-" + date_pre + ".txt";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

// for save as doc file

function saveDocAsFile() {
    var preHtml =
        "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>Export HTML To Doc</title></head><body>";
    var postHtml = "</body></html>";
    if ($("#translator_ifr").length > 0) {
        var textToSave = tinyMCE.activeEditor.getContent();
    } else if ($("#translator").length > 0) {
        var textToSave = $("#translator").val();
    }
    var textToSaveAsBlob = new Blob(["\ufeff", preHtml + textToSave + postHtml], {
        type: "application/msword",
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    //var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    var fileNameToSaveAs = "typingapp-" + date_pre + ".doc";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function savePdfAsFile() {
    if ($("#translator_ifr").length > 0) {
        var textToSave = tinyMCE.activeEditor.getContent({
            format: "text"
        });
    } else if ($("#translator").length > 0) {
        var textToSave = $("#translator").val();
    }
    var textToSaveAsBlob = new Blob([textToSave], {
        type: "text/pdf"
    });
    var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    //var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
    var fileNameToSaveAs = "typingapp.pdf";

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    downloadLink.href = textToSaveAsURL;
    downloadLink.onclick = destroyClickedElement;
    downloadLink.style.display = "none";
    document.body.appendChild(downloadLink);

    downloadLink.click();
}

function resetText() {
    if ($("#translator_ifr").length > 0) {
        tinyMCE.activeEditor.setContent("");
    } else {
        $("#translator").val("");
    }

    document.cookie =
        page_slug + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/";
    console.log(page_slug + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;");

    $("#wordCount").html("0");
    $("#totalChars").html("0");
    $("#charCountNoSpace").html("0");
}

function printTextOLD() {
    var text = "";
    text = tinyMCE.activeEditor.getContent();

    if (text == "" || text == undefined) {
        alert("No content available to print.");
        return false;
    } else {
        w = window.open("webpage.htm", "_self");
        w.document.write(text);
        w.print();
        setTimeout(function() {
            window.close();
        }, 10000);
        return false;
    }
}

function printText() {
    var contents = '';
    contents = tinyMCE.activeEditor.getContent();

    if (contents == '' || contents == undefined) {
        alert("No content available to print.");
        return false;
    } else {

        var frame1 = $('<iframe />');
        frame1[0].name = "frame1";
        frame1.css({
            "position": "absolute",
            "top": "-1000000px"
        });
        $("body").append(frame1);
        var frameDoc = frame1[0].contentWindow ? frame1[0].contentWindow : frame1[0].contentDocument.document ? frame1[0].contentDocument.document : frame1[0].contentDocument;
        frameDoc.document.open();
        //Create a new HTML document.
        frameDoc.document.write('<html><head><title>DIV Contents</title>');
        frameDoc.document.write('</head><body>');
        //Append the external CSS file.
        frameDoc.document.write('<link href="style.css" rel="stylesheet" type="text/css" />');
        //Append the DIV contents.
        frameDoc.document.write(contents);
        frameDoc.document.write('</body></html>');
        frameDoc.document.close();
        setTimeout(function() {
            window.frames["frame1"].focus();
            window.frames["frame1"].print();
            frame1.remove();
        }, 500);
    }
}

function copyAll() {
    /* Get the text field */
    if ($("#translator_ifr").length > 0) {
        tinymce.activeEditor.execCommand("SelectAll");
        tinymce.activeEditor.execCommand("Copy");
        tinymce.activeEditor.execCommand("mceCleanup");
    } else {
        var copyText = document.getElementById("translator");
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
        document.execCommand("copy");

        tinymce.activeEditor.execCommand("SelectAll");
        tinymce.activeEditor.execCommand("Copy");
        $("body").click();
    }
    var x = document.getElementById("snackbar");

    // Add the "show" class to DIV
    x.className = "show";

    // After 3 seconds, remove the show class from DIV
    setTimeout(function() {
        x.className = x.className.replace("show", "");
    }, 2000);
}

function selectAll() {
    if ($("#translator_ifr").length > 0) {
        tinymce.activeEditor.execCommand("SelectAll");
    } else {
        var copyText = document.getElementById("translator");
        /* Select the text field */
        copyText.select();
        /* Copy the text inside the text field */
    }
}

function destroyClickedElement(event) {
    document.body.removeChild(event.target);
}

$(function() {
    $("#ready, .disabled-content").hide();
});
