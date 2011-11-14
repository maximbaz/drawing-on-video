function CanvasRepository( brush, drawingsRepository )
{
    if ( !brush ) { Log.Error( "CanvasRepository( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "CanvasRepository( --> drawingsRepository <-- )" ); return; }

    newestVideoTimeStart = 0;
    this.Drawings = [];
    var that = this;

    // privileged

    this.Add = function ( time )
    {
        var newDrawings = drawingsRepository.Get( newestVideoTimeStart, time );
        if ( newDrawings.length > 0 )
            newestVideoTimeStart = newDrawings[newDrawings.length - 1].VideoTimeStart; // +0.01;

        for ( var i = 0; i < newDrawings.length; i++ )
        {
            this.Drawings.splice( Find( newDrawings[i].VideoTimeFinish, function ( a, b ) { return a > b; } ), 0, newDrawings[i] );
            brush.Draw( newDrawings[i] );
        }
    }

    this.Remove = function ( time )
    {
        RemoveWhereVideoTimeFinishPassed( time );
        RemoveWhereVideoTimeStartDoesntBegin( time );
    }

    // private

    function Find( videoTimeFinish, compare )
    {
        for ( var i = 0; i < that.Drawings.length; i++ )
            if ( compare( that.Drawings[i].VideoTimeFinish, videoTimeFinish ) )
                return i;
        return that.Drawings.length;
    }

    function RemoveWhereVideoTimeFinishPassed( time )
    {
        var removeDrawings = that.Drawings.splice( Find( time, function ( a, b ) { return a < b; } ),
                                                   Find( time, function ( a, b ) { return a >= b; } ) );
        if ( removeDrawings.length > 0 )
        {
            for ( var i = 0; i < removeDrawings.length; i++ )
                brush.Clear( removeDrawings[i] );
        }
    }

    function RemoveWhereVideoTimeStartDoesntBegin( time )
    {
        var needToUpdateNewestVideoTimeStart = false;
        for ( var i = 0; i < that.Drawings.length; i++ )
        {
            if ( that.Drawings[i].VideoTimeStart > time )
            {
                if ( that.Drawings[i].VideoTimeStart == newestVideoTimeStart )
                    needToUpdateNewestVideoTimeStart = true;
                brush.Clear( that.Drawings[i] );
                that.Drawings.splice( i--, 1 );
            }
        }

        if ( needToUpdateNewestVideoTimeStart )
            UpdateNewestVideoTimeStart();
    }

    function UpdateNewestVideoTimeStart()
    {
        newestVideoTimeStart = 0;
        for ( var i = 0; i < that.Drawings.length; i++ )
            if ( that.Drawings[i].VideoTimeStart > newestVideoTimeStart )
                newestVideoTimeStart = that.Drawings[i].VideoTimeStart;
        // newestVideoTimeStart += 0.01;
    }
}

// public

CanvasRepository.prototype.Clear = function () { this.Drawings = []; }

/* For testing purposes only */
CanvasRepository.prototype.GetAllDrawings = function ()
{
    var result = [];
    for ( var i = 0; i < this.Drawings.length; i++ )
        result.push( { "VideoTimeFinish": this.Drawings[i].VideoTimeFinish } );

    return result;
}