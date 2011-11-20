function CanvasRepository( brush, drawingsRepository )
{
    if ( !brush ) { Log.Error( "CanvasRepository( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "CanvasRepository( --> drawingsRepository <-- )" ); return; }

    var newestDrawing;
    var lastRemoved = 0;
    var table = new HashTable();

    this.Add = function ( time )
    {
        var newDrawings = ( !newestDrawing || time < lastRemoved )
                            ? drawingsRepository.GetVisibleBefore( time )
                            : drawingsRepository.GetInterval( newestDrawing, time );
        if ( newDrawings.length > 0 )
            newestDrawing = newDrawings[newDrawings.length - 1];

        for ( var i = 0; i < newDrawings.length; i++ )
        {
            table.Add( newDrawings[i] );
            brush.Draw( newDrawings[i] );
        }
    }

    this.Remove = function ( time )
    {
        RemoveWhereVideoTimeFinishPassed( time );
        RemoveWhereVideoTimeStartDoesntBegin( time );
    }

    this.Clear = function ( time )
    {
        table = new HashTable();
        lastRemoved = time;
    }

    function RemoveWhereVideoTimeFinishPassed( time )
    {
        for ( var i in table.Data )
        {
            if ( table.Data[i].VideoTimeFinish < time )
            {
                var removing = table.Data[i];
                lastRemoved = removing.VideoTimeFinish;
                brush.Clear( removing );
                table.Remove( removing );
                InvalidatePreviouslyHiddenLines( removing );
            }
        }
    }

    function RemoveWhereVideoTimeStartDoesntBegin( time )
    {
        var needToUpdateNewestDrawing = false;
        for ( var i in table.Data )
        {
            if ( table.Data[i].VideoTimeStart > time )
            {
                if ( table.Data[i].Equals( newestDrawing ) )
                    needToUpdateNewestDrawing = true;
                brush.Clear( table.Data[i] );
                table.Remove( table.Data[i] );
            }
        }

        if ( needToUpdateNewestDrawing )
            UpdateNewestDrawing();
    }

    function UpdateNewestDrawing()
    {
        newestDrawing = null;
        for ( var i in table.Data )
        {
            if ( !newestDrawing || table.Data[i].VideoTimeStart > newestDrawing.VideoTimeStart )
                newestDrawing = table.Data[i];
        }
    }

    function InvalidatePreviouslyHiddenLines( drawing )
    {
        var dVertical = drawing.Line.From.X == drawing.Line.To.X;
        var d = new Line( new Point( drawing.Line.From.X - ( dVertical ? Math.ceil( drawing.Width / 2 ) : 0 ), drawing.Line.From.Y - ( dVertical ? 0 : Math.ceil( drawing.Width / 2 ) ) ),
                         new Point( drawing.Line.To.X + ( dVertical ? Math.ceil( drawing.Width / 2 ) : 0 ), drawing.Line.To.Y + ( dVertical ? 0 : Math.ceil( drawing.Width / 2 ) ) ) );

        for ( var i in table.Data )
        {
            var t = table.Data[i];
            var tVertical = t.Line.From.X == t.Line.To.X;

            if ( t.Line.From.X - ( tVertical ? Math.ceil( t.Width / 2 ) : 0 ) > d.To.X ||
                 t.Line.To.X + ( tVertical ? Math.ceil( t.Width / 2 ) : 0 ) < d.From.X ||
                 t.Line.From.Y - ( tVertical ? 0 : Math.ceil( t.Width / 2 ) ) > d.To.Y ||
                 t.Line.To.Y + ( tVertical ? 0 : Math.ceil( t.Width / 2 ) ) < d.From.Y )
                continue;
            brush.Draw( t );
        }
    }

    /* For testing purposes only */
    this.GetAllDrawings = function ()
    {
        var result = [];
        for ( var i in table.Data )
            result.push( { "VideoTimeFinish": table.Data[i].VideoTimeFinish } );

        return result;
    }
}