/*--------------------*/
/* FUNZIONI  GENERALI */
/*--------------------*/



/*-------------------------*/
/* FUNZIONI  CONFIGURATORE */
/*-------------------------*/

// set variabili varie

var aperto = 0; // bool aprtrura menu settata su chiuso

/* trucchetto per creare e posizionare la linea separatrice tra menu accessori e accessori */
$.fn.sepLine = function(divider, container, parent){
    if ( !$('.'+divider).length ) {
        $('<div class="'+divider+'"></div>' ).appendTo('.'+parent);
    }
    $('.'+divider).css('top', function () {
        return ($('.'+container).height());
    });
}

/* funzione regola l'altezza del megamenu in base alla dimensione della pagina */
$.fn.yammHeight = function(mainNavbar, yammContent, offsetElementHeight){
    var heightref = $(window).height() - ($('.' + mainNavbar).outerHeight() + 52);
    $('.'+yammContent).outerHeight(heightref);
}


/* funzione per apertura menu accessori in base all'altezza della viewport e con lo switch*/
$.fn.animateAccessoriBar = function(accContainer, offsetElement, triggerElement, trigger){
    var accContainerHeight = $('.'+accContainer).outerHeight();
    var offsetElementHeight = $('.'+offsetElement).outerHeight();
    var docHeight = $(window).height();

    // automatismo in base all'altezza del browser
    if (docHeight > 600) {
        aperto = 0;
        $('.'+accContainer).stop().animate({
            bottom: offsetElementHeight
        }, 500, "swing");
        $('.'+triggerElement).removeClass('aperto').addClass('chiuso');
    } else {
        aperto = 1;
        $('.'+accContainer).stop().animate({
            bottom: -(accContainerHeight - offsetElementHeight)
        }, 500, "swing");
        $('.'+triggerElement).removeClass('chiuso').addClass('aperto');
    }

}


var scale;
var offset = 0;
$.fn.parentResize = function() {
    // elemSize = calcolo l'altezza da applicare al contenitore del canvas borse tenendo conto degli elementi dell'interfaccia da sottrarre
    var elemSize = $(window).height() - $(".navbar").outerHeight() - $(".accessori").outerHeight() - $(".riepilogo").outerHeight();
    
    // calcolo
    this.css("position", "absolute").css("top", $(".navbar").outerHeight()).css("height", elemSize).css("width", $(window).width());
    
    
    var elHeight = $("#a-middle").outerHeight();
    var elWidth = $("#a-middle").outerWidth()-30;
    

    scale = Math.min(
        this.width() / elWidth,
        this.height() / elHeight
    );

    $("#a-middle").css({
        transform: "translate(-50%, -50%) " + "scale(" + scale + ")"
    }).css("margin-top", "50px");

}

if ($('#back-to-top').length) {
    var scrollTrigger = 100, // px
        backToTop = function () {
            var scrollTop = $(window).scrollTop();
            if (scrollTop > scrollTrigger) {
                $('#back-to-top').addClass('show');
            } else {
                $('#back-to-top').removeClass('show');
            }
        };
    backToTop();
    $(window).on('scroll', function () {
        backToTop();
    });
    $('#back-to-top').on('click', function (e) {
        e.preventDefault();
        $('html,body').animate({
            scrollTop: 0
        }, 700);
    });
}


/* BROWSER DETECT */

var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

// In Opera, the true version is after "Opera" or after "Version"
if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
}
// In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
}
// In Chrome, the true version is after "Chrome" 
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
}
// In Safari, the true version is after "Safari" or after "Version" 
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
}
// In Firefox, the true version is after "Firefox" 
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
}
// In most other browsers, "name/version" is at the end of userAgent 
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
    (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
}
// trim the fullVersion string at semicolon/space if present
if ((ix = fullVersion.indexOf(";")) != -1)
    fullVersion = fullVersion.substring(0, ix);
if ((ix = fullVersion.indexOf(" ")) != -1)
    fullVersion = fullVersion.substring(0, ix);

majorVersion = parseInt('' + fullVersion, 10);
if (isNaN(majorVersion)) {
    fullVersion = '' + parseFloat(navigator.appVersion);
    majorVersion = parseInt(navigator.appVersion, 10);
}

console.log(''
    + 'Browser name  = ' + browserName + ' | '
    + 'Full version  = ' + fullVersion + ' | '
    + 'Major version = ' + majorVersion + ' | '
    + 'navigator.appName = ' + navigator.appName + ' | '
    + 'navigator.userAgent = ' + navigator.userAgent
)


if (browserName == "Chrome" && navigator.userAgent.match(/Android/i) &&  majorVersion >= "77") {
    alert("attenzione: browser " + browserName + " " + majorVersion + "<br>QUesta versione presenta un bug che inficia l'utilizzo del nostro configuratore. Prego usare un browser alternativo (Firefox, Safari ecc )");
}