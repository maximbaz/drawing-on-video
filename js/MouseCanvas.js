function MouseCanvas( width, height )
{
    var from, to;
    var isDrawing = false;

    function Start( e )
    {
        if ( !e ) { Log.Error( "MouseCanvas.Start( --> e <-- )" ); return; }

        from = Point( e.offsetX, e.offsetY );
        isDrawing = true;
    }

    function Finish( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "MouseCanvas.Finish( --> e <-- )" ); return; }
        
        to = Point( e.offsetX, e.offsetY );
        var drawing = Drawing( Line( from, to ), Canvas.Brush.Color, Canvas.Brush.Width, $( "video" )[0].currentTime.toFixed( 2 ) );
        isDrawing = false;
        
        Queue.Enqueue( drawing );
        Canvas.Draw();
        DrawingsRepository.Add( drawing );
        DataBase.Set( drawing );

    }

    function Move( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "MouseCanvas.Move( --> e <-- )" ); return; }

        to = Point( e.offsetX, e.offsetY );
        var drawing = Drawing( Line( from, to ), Canvas.Brush.Color, Canvas.Brush.Width, $( "video" )[0].currentTime.toFixed( 2 ) );

        if ( InPaintArea( to ) )
            from = to;
        else
            isDrawing = false;
            
        Queue.Enqueue( drawing );
        Canvas.Draw();
        DrawingsRepository.Add( drawing );
        DataBase.Set( drawing );
    }

    function InPaintArea( point )
    {
        if ( !point ) { Log.Error( "MouseCanvas.InPaintArea( --> point <-- )" ); return; }

        var bordersLeftTop = 10;

        return point.X > bordersLeftTop && point.X < width &&
               point.Y > bordersLeftTop && point.Y < height;
    }

    return { Start: Start, Finish: Finish, Move: Move }
}