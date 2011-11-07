$( function ()
{
    if ( !window.webkitIndexedDB )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает IndexedDB :(</p>" ).fadeIn( 500 );
    if ( !$( "canvas" )[0].getContext )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает Canvas tag :(</p>" ).fadeIn( 500 );
    if ( !$( "video" )[0].canPlayType )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает Video tag :(</p>" ).fadeIn( 500 );
    
    SetBindings();
} );


function SetBindings()
{
    $( "video" ).on( "playing", OnPlaying );
    $( "video" ).on( "seeking", OnSeeking );
    $( "video" ).on( "ontimeupdate", OnSeeking );
    $( "video" ).on( "pause", function () { playing = clearInterval( playing ); } );
    $( "video" ).on( "seeked", function () { seeking = clearInterval( seeking ); } );
    $( "#colors input" ).on( "change", function () { Canvas.Brush.SetColor( this.value ); } );
    $( "#width" ).on( "change", function () { Canvas.Brush.SetWidth( parseInt( this.value ) ); } );
    $(".show-hide-algorithm").on( "click", function() 
    { 
        $("#algorithm").toggle( 500 ); 
        $(".show-hide-algorithm").html($(this).html() == "Показать описание алгоритма" ? "Скрыть описание алгоритма" : "Показать описание алгоритма"); 
    } ); 
    $( "#remove-drawings" ).on( "click", function ()
    {
        DataBase.ReCreate();
        Canvas.Clear();
        DrawingsRepository.Clear();
    } );
}

var seeking, playing;

function OnSeeking()
{
    if ( seeking )
        return;

    seeking = setInterval( function ()
    {
        var time = parseFloat( $( "video" )[0].currentTime.toFixed( 2 ) );
        Canvas.Clear();
        Canvas.Load( 0, time + 0.042 );
        Canvas.Draw();
    }, 42 );
}

function OnPlaying()
{
    if ( playing )
        return;

    playing = setInterval( function ()
    {
        var time = parseFloat( $( "video" )[0].currentTime.toFixed( 2 ) );
        Canvas.Load( time, time + 0.042 );
        Canvas.Draw();
    }, 42 );
}
