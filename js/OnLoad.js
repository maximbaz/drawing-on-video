$( function ()
{
    if ( !window.webkitIndexedDB )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает webkitIndexedDB :(</p>" ).fadeIn( 500 );
    if ( !$( "video" )[0].canPlayType )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает &lt;video /&gt; tag :(</p>" ).fadeIn( 500 );
    if ( !$( "canvas" )[0].getContext )
        $( "#error" ).append( "<p>К сожалению, Ваш браузер не поддерживает &lt;canvas /&gt; tag :(</p>" ).fadeIn( 500 );

    SetBindings();
    window.Canvas = new Canvas( $( "canvas" )[0], window.webkitIndexedDB, UpdateDbLog );
    setInterval( function () { Canvas.Update( GetVideoTime() ); }, 42 );
} );