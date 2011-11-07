var Point = ( function ( x, y )
{
    return { X: x, Y: y }
} );

var Line = ( function ( from, to )
{
    return { From: from, To: to }
} );

var Drawing = ( function ( line, color, width, videoTime )
{
    return { Line: line, Color: color, Width: width, VideoTime: videoTime }
} );