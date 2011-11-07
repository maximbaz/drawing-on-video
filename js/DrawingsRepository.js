var DrawingsRepository = ( function ()
{
    var drawings = [];

    function Add( drawing )
    {
        if ( !drawing ) { Log.Error( "DrawRepository.Add( --> drawing <-- )" ); return; }
        drawings.splice( Find( drawing.VideoTime, function ( a, b ) { return a > b; } ), 0, drawing );
    }

    function Take( videoTimeFrom, videoTimeTo )
    {
        return drawings.slice( Find( videoTimeFrom, function ( a, b ) { return a >= b; } ),
                            Find( videoTimeTo, function ( a, b ) { return a > b; } ) );
    }

    function Find( videoTime, compare )
    {
        for ( var i = 0; i < drawings.length; i++ )
            if ( compare( drawings[i].VideoTime, videoTime ) )
                return i;
        return drawings.length;
    }

    function Clear()
    {
        drawings = [];
    }

    return { Add: Add, Take: Take, Clear: Clear }
} )();