var inactivityTimer;

function setFullHeightCol(){
    //stolpec ob zivi naredi full height na vseh velikostih razen xs
    if( isBreakpoint('xs') ) {
        //xs screens
        /*xsHeight = $("#startButton").height()+50;
        $(".fullHeightCol").height(xsHeight);
        $(".fullHeightCol").css('line-height',xsHeight+"px");*/
    }
    else{
        //sm, md, lg screens
        //visino stolpca prilagodi visini viewporta - menuheight - footer height
        var footerHeight = $("footer").height();
        var menuHeight = $("#gameMenu").height();
        var windowHeight = window.innerHeight;
        var maxHeight = windowHeight - footerHeight - menuHeight;
        $(".fullHeightCol").height(maxHeight);
        $(".fullHeightCol").css('line-height',maxHeight+"px");
    }
}

function redirectToAnswerOK(){
    window.location.href = "./answerOK.html";
}

function redirectToAnswerWrong(){
    window.location.href = "./answer.html";
}

function setMaxImgHeight(){

  if( isBreakpoint('xs') ) {
      //xs screens
      var windowWidth = window.innerWidth;
      var windowHeight = window.innerHeight;
      $(".zivaImg").css('max-width', (windowWidth-20)+"px"); //set max height
      $(".zivaImg").css('max-height', (windowHeight*0.7)+"px"); //set max height
  }
  else{
    //visino zive prilagodi visini viewporta - menuheight - footer height
    var footerHeight = $("footer").height();
    var menuHeight = $("#gameMenu").height();
    var windowHeight = window.innerHeight;
    var maxImgHeight = (windowHeight - footerHeight - menuHeight)*0.7;
    $(".zivaImg").css('max-height', maxImgHeight+"px"); //set max height
    $(".zivaImg").css('max-width', "100%"); //set max height
  }
}

//breakpoint detection
function isBreakpoint( alias ) {
    return $('.device-' + alias).is(':visible');
}

$(document).ready(function(){

    if(localStorage.getItem("lang")){
        //ze nastavljen jezik
    }else{
        //nastavi privzeto slo
        localStorage.setItem("lang","slo");
        $("body").removeClass("lang-en lang-slo").addClass("lang-slo");
    }


    $( "#answerSLO" ).click(function() {
        if(document.getElementById("r2").checked){
            redirectToAnswerOK();
        }
        else{
            redirectToAnswerWrong();
        }
    });

    $( "#answerEn" ).click(function() {
        if(document.getElementById("r21").checked){
            redirectToAnswerOK();
        }
        else{
            redirectToAnswerWrong();
        }
    });

    $( "#answerXSen" ).click(function() {
        if(document.getElementById("r23").checked){
            redirectToAnswerOK();
        }
        else{
            redirectToAnswerWrong();
        }
    });

    $( "#answerXSslo" ).click(function() {
        if(document.getElementById("r22").checked){
            redirectToAnswerOK();
        }
        else{
            redirectToAnswerWrong();
        }
    });


    $(".btn-en, .btn-slo").click(function(){
        var lang = $(this).data("lang");
        localStorage.setItem("lang",lang);
        $("body").removeClass("lang-en lang-slo").addClass("lang-"+lang);

        $(this).parents(".dropdown").children("button").text($(this).text());
    });

    if(localStorage.getItem("lang")){
        $(".btn-"+localStorage.getItem("lang")).click();
    }else{
        $(".btn-en").click();
    }
    $(this).on("click mousemove mousedown keypress touchstart", resetTimer);

    setMaxImgHeight();
    setFullHeightCol();
    $(window).resize(function() {
        setMaxImgHeight();
        setFullHeightCol();
    });

});

function resetTimer() {
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(inactivity, 1000*60*2);
}

function inactivity(){
    window.location.href = "index.html";
}
