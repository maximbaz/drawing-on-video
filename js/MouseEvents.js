function MouseEvents( width, height, brush, drawingsRepository, canvasRepository, dataBase )
{
    if ( !width ) { Log.Error( "MouseEvents( --> width <-- )" ); return; }
    if ( !height ) { Log.Error( "MouseEvents( --> height <-- )" ); return; }
    if ( !brush ) { Log.Error( "MouseEvents( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "MouseEvents( --> drawingsRepository <-- )" ); return; }
    if ( !canvasRepository ) { Log.Error( "MouseEvents( --> canvasRepository <-- )" ); return; }

    var from, to;
    var isDrawing = false;

    this.Start = function ( e )
    {
        if ( !e ) { Log.Error( "MouseEvents.Start( --> e <-- )" ); return; }

        from = new Point( e.offsetX, e.offsetY );
        isDrawing = true;
    }

    this.Finish = function ( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "MouseEvents.Finish( --> e <-- )" ); return; }

        to = new Point( e.offsetX, e.offsetY );
        var drawing = new Drawing( new Line( from, to ), brush.Color, brush.Width, GetVideoTime(), GetVideoTime() + brush.Duration );
        isDrawing = false;

        SplitDrawAndSave( drawing );
    }

    this.Move = function ( e )
    {
        if ( !isDrawing )
            return;

        if ( !e ) { Log.Error( "MouseEvents.Move( --> e <-- )" ); return; }

        to = new Point( e.offsetX, e.offsetY );
        var drawing = new Drawing( new Line( from, to ), brush.Color, brush.Width, GetVideoTime(), GetVideoTime() + brush.Duration );

        if ( InPaintArea( to ) )
            from = to;
        else
            isDrawing = false;

        SplitDrawAndSave( drawing );
    }

    function InPaintArea( point )
    {
        if ( !point ) { Log.Error( "MouseEvents.InPaintArea( --> point <-- )" ); return; }

        var dx = 2;

        return point.X > dx && point.X < width - dx &&
               point.Y > dx && point.Y < height - dx;
    }

    function SplitDrawAndSave( drawing )
    {
        var splitted = SplitDrawings( drawing );
        for ( var i = 0; i < splitted.length; i++ )
        {
            drawingsRepository.Add( splitted[i] );
            canvasRepository.Add( GetVideoTime() );
            if ( dataBase.Add )
                dataBase.Add( splitted[i] );
        }
    }
}