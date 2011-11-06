var Point = ( function ( x, y )
{
    var x = x, y = y;
    function Equals( point )
    {
        if ( !point ) { Log.Error( "point argument" ); return; }
        return x == point.x && y == point.y;
    }

    return { Equals: Equals, x: x, y: y }
} );

var Line = ( function ( from, to )
{
    var from = from, to = to;
    function Equals( line )
    {
        if ( !line ) { Log.Error( "line argument" ); return; }
        return from.Equals( line.from ) && to.Equals( line.to );
    }

    return { Equals: Equals, from: from, to: to }
} );

var Draw = ( function ( line, color, width )
{
    var line = line, color = color, width = width;
    function Equals( draw )
    {
        if ( !draw ) { Log.Error( "draw argument" ); return; }
        return line.Equals( draw.line ) && color == draw.color && width == draw.width;
    }

    return { Equals: Equals, line: line, color: color, width: width }
} );