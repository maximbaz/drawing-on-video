function SplitDrawings( drawing )
{
    if ( !drawing ) { Log.Error( "SplitDrawings( --> drawing <-- )" ); return; }

    if ( drawing.Line.From.X == drawing.Line.To.X || drawing.Line.From.Y == drawing.Line.To.Y )
        return [drawing];

    var result = [];

    if ( drawing.Line.To.X - drawing.Line.From.X < 0 )
        SwapLines( drawing );

    var bottomToTop = drawing.Line.To.Y - drawing.Line.From.Y < 0;
    var TryY = bottomToTop ? TryTop : TryBottom;

    var line = new Line( drawing.Line.From, drawing.Line.From );
    var point;
    var offset = 1;
    var inSegment = true;
    while ( true )
    {
        if ( TryX( line, point = new Point( line.To.X + offset, line.To.Y ) ) ||
             TryY( line, point = new Point( line.To.X, line.To.Y ), offset ) )
        {
            offset = 1;
            if ( point.Equals( drawing.Line.To ) )
                break;
            else
                continue;
        }
        else if ( !inSegment )
            break;

        if ( PointBelongsToSegment( point = new Point( line.To.X + offset, line.To.Y + ( bottomToTop ? -offset : offset ) ), drawing.Line ) )
        {
            offset = 1;
            line.From = line.To = point;
            continue;
        }
        else if ( !inSegment )
            break;

        ++offset;
    }

    return result;

    // private

    function TryX( line, point )
    {
        while ( PointBelongsToSegment( point, drawing.Line ) )
            ++point.X;
        if ( --point.X == line.To.X)
            return false;
        result.push( new Drawing( new Line( line.From, point ), drawing.Color, drawing.Width, drawing.VideoTimeStart, drawing.VideoTimeFinish ) );
        line.From = line.To = point;
        return true;
    }

    function TryBottom( line, point, offset )
    {
        point.Y += offset;
        while ( PointBelongsToSegment( point, drawing.Line ) )
            ++point.Y;
        if ( --point.Y == line.To.Y )
            return false;
        result.push( new Drawing( new Line( line.From, point ), drawing.Color, drawing.Width, drawing.VideoTimeStart, drawing.VideoTimeFinish ) );
        line.From = line.To = point;
        return true;
    }

    function TryTop( line, point, offset )
    {
        point.Y -= offset;
        while ( PointBelongsToSegment( point, drawing.Line ) )
            --point.Y;
        if ( ++point.Y == line.To.Y )
            return false;
        result.push( new Drawing( new Line( line.From, point ), drawing.Color, drawing.Width, drawing.VideoTimeStart, drawing.VideoTimeFinish ) );
        line.From = line.To = point;
        return true;
    }

    function PointBelongsToSegment( point, line )
    {
        return PointBelongsToLine( point, line ) && ( inSegment = PointInSegment( point, line ));
    }

    function PointBelongsToLine( point, line )
    {
        return Math.abs( ( point.X - line.From.X ) * ( line.To.Y - line.From.Y ) -
                         ( point.Y - line.From.Y ) * ( line.To.X - line.From.X ) )
               <= HalfOfVectorLength( line );
    }

    function PointInSegment( point, line )
    {
        return Math.abs( ( 2 * point.X - line.From.X - line.To.X ) * ( line.To.X - line.From.X ) +
                         ( 2 * point.Y - line.From.Y - line.To.Y ) * ( line.To.Y - line.From.Y ) )
               <= SquaredVectorLength( line );
    }

    function HalfOfVectorLength( line )
    {
        return Math.floor( Math.sqrt( SquaredVectorLength( line ) ) / 2 );
    }

    function SquaredVectorLength( line )
    {
        return ( line.To.X - line.From.X ) * ( line.To.X - line.From.X ) + ( line.To.Y - line.From.Y ) * ( line.To.Y - line.From.Y );
    }

    function SwapLines( drawing )
    {
        var temp = drawing.Line.From;
        drawing.Line.From = drawing.Line.To;
        drawing.Line.To = temp;
    }
}