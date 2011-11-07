var Log = ( function ()
{
    function Exception( exception ) { console.error( exception ); }
    function Error( description ) { console.error( description ); }
    function Show( description ) { console.info( description ); }

    return { Exception: Exception, Error: Error, Show: Show }
} )();