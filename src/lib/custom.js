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