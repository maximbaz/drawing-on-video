﻿function SetBindings()
{
    $( "#video-block" ).on( "selectstart", function ( e ) { e.preventDefault(); } );
    $( "#colors input" ).on( "change", function () { Canvas.Brush.SetColor( this.value ); } );
    $( "#width" ).on( "change", function () { UpdateWidth( this.value ); } );
    $( "#duration" ).on( "change", function () { UpdateDuration( this.value ); } );
    $( "#clear-canvas" ).on( "click", function () { Canvas.Clear( GetVideoTime() ); } );
    $( "#clear-history" ).on( "click", function () { Canvas.ClearHistory(); } );
}

function GetVideoTime() { return parseFloat( $( "video" )[0].currentTime.toFixed( 2 ) ); }

function UpdateWidth( value )
{
    var val = parseInt( value );
    Canvas.Brush.SetWidth( val * 2 + 1 );
    $( "#current-width" ).html( val + " ед." );
}

function UpdateDuration( value )
{
    var val = parseInt( value );
    Canvas.Brush.SetDuration( val == 5 ? Number.MAX_VALUE : val ); 
    $( "#current-duration" ).html( val == 5 ? "&infin;" : val + " сек." );
}


function UpdateDbLog( text, status )
{
    var DbTimer;

    if(text)
        $( "#db-log" ).html( text );

    switch ( status )
    {
        case "show":
            $( "#db-log" ).fadeIn();
            DbTimer = setTimeout( function () { UpdateDbLog( "Возникла проблема при создании хранилища объектов. Пожалуйста, перезагрузите браузер." ); }, 3000 );
            break;
        case "hide": 
            $( "#db-log" ).fadeOut(); 
            clearTimeout( DbTimer );
            break;
    }
}