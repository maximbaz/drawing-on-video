$( function ()
{
    if ( !window.webkitIndexedDB )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает IndexedDB :(</p>" ).fadeIn( 500 );
    if ( !$( "video" )[0].canPlayType )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает Video tag :(</p>" ).fadeIn( 500 );
    if ( !$( "canvas" )[0].getContext )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает Canvas tag :(</p>" ).fadeIn( 500 );

    SetBindings();
    window.Canvas = new Canvas( $( "canvas" )[0], window.webkitIndexedDB );
    setInterval( function () { Canvas.Update( GetVideoTime() ); }, 42 );
} );