var Log = ( function ()
{
    function Exception( e )
    {
        $( "#error" ).append( "<p>Exception: " + e.message + " (" + e.code + ")</p>" );
    }

    function Error( description )
    {
        $( "#error" ).append( "<p>Error: " + description + "</p>" );
    }

    function Show( description )
    {
        $( "#log" ).append( "<p>" + description + "</p>" );
    }

    return { Exception: Exception, Error: Error, Show: Show }
} )();