var MouseCanvas = ( function ()
{
    var from, to;
    var isDrawing = false;
    var offset_x = parseInt( $( "#video-block" ).css( "margin-left" ).replace( 'px', '' ) );
    var offset_y = parseInt( $( "#video-block" ).css( "margin-top" ).replace( 'px', '' ) );

    function Start( e )
    {
        if ( !e ) { Log.Error( "mouse event args" ); return; }

        from = Point( e.clientX - offset_x, e.clientY - offset_y );
        isDrawing = true;
    }

    function Finish( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "mouse event args" ); return; }

        to = Point( e.clientX - offset_x, e.clientY - offset_y );

        var draw = Draw( Line( from, to ), Canvas.Brush.Color, Canvas.Brush.Width );
        Canvas.Queue.Dequeue( draw );
        Canvas.StartDrawing();
        DataBase.Set( draw, $( "video" )[0].currentTime.toFixed( 2 ) );

        isDrawing = false;
    }

    function Move( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "mouse event args" ); return; }

        to = Point( e.clientX - offset_x, e.clientY - offset_y );

        var draw = Draw( Line( from, to ), Canvas.Brush.Color, Canvas.Brush.Width );
        Canvas.Queue.Dequeue( draw );
        Canvas.StartDrawing();
        DataBase.Set( draw, $( "video" )[0].currentTime.toFixed( 2 ) );

        if ( InPaintArea( to ) )
            from = to;
        else
            isDrawing = false;
    }

    function InPaintArea( point )
    {
        if ( !point ) { Log.Error( "point argument" ); return; }

        var borderLeftTop = 10;

        return point.x > borderLeftTop && point.x < Canvas.Width &&
               point.y > borderLeftTop && point.y < Canvas.Height;
    }

    return { Start: Start, Finish: Finish, Move: Move }
} )();