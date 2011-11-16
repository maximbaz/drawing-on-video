function SetBindings()
{
    $( "#video-block" ).on( "selectstart", function ( e ) { e.preventDefault(); } );
    $( "#colors input" ).on( "change", function () { Canvas.Brush.SetColor( this.value ); } );
    $( "#width" ).on( "change", function () { Canvas.Brush.SetWidth( parseInt( this.value ) ); } );
    $( ".show-hide-algorithm" ).on( "click", function ()
    {
        $( "#algorithm" ).toggle( 500 );
        $( ".show-hide-algorithm" ).html( $( this ).html() == "Показать описание алгоритма" ? "Скрыть описание алгоритма" : "Показать описание алгоритма" );
    } );
    // clear-history
    $( "#remove-drawings" ).on( "click", function () { Canvas.ClearHistory(); } );
}

function GetVideoTime() { return parseFloat( $( "video" )[0].currentTime.toFixed( 2 ) ); }
