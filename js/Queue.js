var Queue = ( function ()
{
    var data = [];

    function Enqueue( element )
    {
        if ( !element ) { Log.Error( "Queue.Enqueue( --> element <-- )" ); return; }
        data.push( element );
    }

    function Dequeue() { return data.shift(); }
    function Clear() { data = []; }

    return { Enqueue: Enqueue, Dequeue: Dequeue, Clear: Clear }
} )();