function DrawingsRepository()
{
    var drawings = [];

    this.Add = function ( drawing )
    {
        if ( !drawing ) { Log.Error( "DrawRepository.Add( --> drawing <-- )" ); return; }
        drawings.splice( FindTimePos( drawing.VideoTimeStart, function ( a, b ) { return a > b; } ), 0, drawing );
    }

    this.Get = function ( drawingFrom, videoTimeStartTo )
    {
        return drawings.slice( drawingFrom ? FindDrawingPos( drawingFrom ) + 1 : 0, FindTimePos( videoTimeStartTo, function ( a, b ) { return a > b; } ) );
    }

    function FindTimePos( videoTimeStart, compare )
    {
        for ( var i = 0; i < drawings.length; i++ )
            if ( compare(drawings[i].VideoTimeStart, videoTimeStart) )
                return i;
        return drawings.length;
    }

    function FindDrawingPos( drawing )
    {
        for ( var i = FindTimePos( drawing.VideoTimeStart, function ( a, b ) { return a >= b; } ); i < drawings.length; i++ )
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