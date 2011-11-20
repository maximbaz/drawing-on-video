function DrawingsRepository()
{
    var drawings = [];

    this.Add = function ( drawing )
    {
        if ( !drawing ) { Log.Error( "DrawRepository.Add( --> drawing <-- )" ); return; }
        drawings.splice( FindVideoTimeStartPos( drawing.VideoTimeStart, function ( a, b ) { return a > b; } ), 0, drawing );
    }

    this.GetInterval = function ( drawingFrom, videoTimeStartTo )
    {
        if ( !drawingFrom ) { Log.Error( "DrawRepository.GetInterval( --> drawingFrom <-- )" ); return; }

        return drawings.slice( FindDrawingPos( drawingFrom ) + 1, FindVideoTimeStartPos( videoTimeStartTo, function ( a, b ) { return a > b; } ) );
    }

    this.GetVisibleBefore = function ( videoTimeStartTo )
    {
        var allBeforeVideoTimeStartTo = drawings.slice( 0, FindVideoTimeStartPos( videoTimeStartTo, function ( a, b ) { return a > b; } ) );
        var result = [];
        for ( var i = 0; i < allBeforeVideoTimeStartTo.length; i++ )
            if ( allBeforeVideoTimeStartTo[i].VideoTimeFinish >= videoTimeStartTo )
                result.push( allBeforeVideoTimeStartTo[i] );

        return result;
    }

    function FindVideoTimeStartPos( videoTimeStartTo, compare, from, to )
    {
        from = from == undefined ? 0 : from;
        to = to == undefined ? drawings.length : to;

        if ( !drawings.length || to <= from )
            return from;
        var mid = Math.floor( ( from + to ) / 2 );

        if ( compare( drawings[mid].VideoTimeStart, videoTimeStartTo ) )
            return FindVideoTimeStartPos( videoTimeStartTo, compare, from, mid );
        return FindVideoTimeStartPos( videoTimeStartTo, compare, mid + 1, to );
    }

    function FindDrawingPos( drawing )
    {
        for ( var i = FindVideoTimeStartPos( drawing.VideoTimeStart, function ( a, b ) { return a >= b; } ); i < drawings.length; i++ )
            if ( drawings[i].Equals( drawing ) )
                return i;
        return drawings.length;
    }

    this.Clear = function () { drawings = []; }

    /* For testing purposes only */
    this.GetAllDrawings = function ()
    {
        var result = [];
        for ( var i = 0; i < drawings.length; i++ )
            result.push( { "VideoTimeStart": drawings[i].VideoTimeStart } );

        return result;
    }
}