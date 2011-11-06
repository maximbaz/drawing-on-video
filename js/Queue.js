var Queue = ( function ()
{
    var data = [];

    function Dequeue( line )
    {
        if ( !line ) { Log.Error( "line argument" ); return; }

        if ( !Contains( line ) )
            data.push( line );
    }

    function Enqueue() 
    {
        return data.shift();
    }

    function Clear() { data = []; }

    function Contains( line )
    {
        for ( var i = 0; i < data.length; i++ )
            if ( data[i].Equals( line ) )
                return true;
        return false;
    }

    return { Dequeue: Dequeue, Enqueue: Enqueue, Clear: Clear }
} )();