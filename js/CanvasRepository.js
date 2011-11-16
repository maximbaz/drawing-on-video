function CanvasRepository( brush, drawingsRepository )
{
    if ( !brush ) { Log.Error( "CanvasRepository( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "CanvasRepository( --> drawingsRepository <-- )" ); return; }

    var newestDrawing;
    var table = new HashTable();
    var that = this;

    // privileged

    this.Add = function ( time )
    {
        var newDrawings = drawingsRepository.Get( newestDrawing, time );
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


    this.Clear = function () { table = []; }

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
            if ( table.Data[i].VideoTimeFinish < time )
            {
                brush.Clear( table.Data[i] );
                table.Remove( table.Data[i] );
            }
    }

    function RemoveWhereVideoTimeStartDoesntBegin( time )
    {
        var needToUpdateNewestDrawing = false;
        for ( var i in table.Data )
            if ( table.Data[i].VideoTimeStart > time )
            {
                if ( table.Data[i].Equals(newestDrawing) )
                    needToUpdateNewestDrawing = true;
                table.Remove( table.Data[i] );
                brush.Clear( table.Data[i] );
            }

            if ( needToUpdateNewestDrawing )
            UpdateNewestDrawing();
    }

    function UpdateNewestDrawing()
    {
        newestDrawing = null;
        for ( var i in table.Data )
            if ( !newestDrawing || table.Data[i].VideoTimeStart > newestDrawing.VideoTimeStart )
                newestDrawing = table.Data[i];
    }
}