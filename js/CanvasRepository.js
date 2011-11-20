function CanvasRepository( brush, drawingsRepository )
{
    if ( !brush ) { Log.Error( "CanvasRepository( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "CanvasRepository( --> drawingsRepository <-- )" ); return; }

    var newestDrawing;
    var lastRemoved = 0;
    var table = new HashTable();
    var that = this;

    // privileged

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


    this.Clear = function ( time ) { table = new HashTable(); lastRemoved = time; }

    /* For testing purposes only */
    this.GetAllDrawings = function ()
    {
        var result = [];
        for ( var i in table.Data )
            result.push( { "VideoTimeFinish": table.Data[i].VideoTimeFinish } );

        return result;
    }

    // private

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
                // InvalidatePreviouslyHiddenLines( removing );
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
        for ( var i in table.Data )
        {
            if ( ( table.Data[i].Line.From.X - Math.ceil( table.Data[i].Width / 2 ) <= drawing.Line.From.X - Math.ceil( drawing.Width / 2 ) <= table.Data[i].Line.To.X + Math.ceil( table.Data[i].Width / 2 ) || drawing.Line.From.X - Math.ceil( drawing.Width / 2 ) <= table.Data[i].Line.From.X - Math.ceil( table.Data[i].Width / 2 ) <= drawing.Line.To.X + Math.ceil( drawing.Width / 2 ) ) &&
                 ( table.Data[i].Line.From.Y - Math.ceil( table.Data[i].Width / 2 ) <= drawing.Line.From.Y - Math.ceil( drawing.Width / 2 ) <= table.Data[i].Line.To.Y + Math.ceil( table.Data[i].Width / 2 ) || drawing.Line.From.Y - Math.ceil( drawing.Width / 2 ) <= table.Data[i].Line.From.Y - Math.ceil( table.Data[i].Width / 2 ) <= drawing.Line.To.Y + Math.ceil( drawing.Width / 2 ) ) )
            {
                console.log( ( table.Data[i].Line.From.X - Math.ceil( table.Data[i].Width / 2 ) ) + " " + ( drawing.Line.From.X - Math.ceil( drawing.Width / 2 ) ) + " " + ( table.Data[i].Line.To.X + Math.ceil( table.Data[i].Width / 2 ) ) + " " +( drawing.Line.From.X - Math.ceil( drawing.Width / 2 )) + " " +( table.Data[i].Line.From.X - Math.ceil( table.Data[i].Width / 2 )) + " " +( drawing.Line.To.X + Math.ceil( drawing.Width / 2 ))  + " " +
                             ( table.Data[i].Line.From.Y - Math.ceil( table.Data[i].Width / 2 ) ) + " " + ( drawing.Line.From.Y - Math.ceil( drawing.Width / 2 ) ) + " " + ( table.Data[i].Line.To.Y + Math.ceil( table.Data[i].Width / 2 ) ) + " " +( drawing.Line.From.Y - Math.ceil( drawing.Width / 2 )) + " " +( table.Data[i].Line.From.Y - Math.ceil( table.Data[i].Width / 2 )) + " " +( drawing.Line.To.Y + Math.ceil( drawing.Width / 2 ) ));
                brush.Draw( table.Data[i] );
            }
        }
    }
}