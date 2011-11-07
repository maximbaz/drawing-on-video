var Canvas = ( function ()
{
    var canvas = $( "canvas" )[0];
    var width = canvas.width;
    var height = canvas.height;
    var context = canvas.getContext( "2d" );
    var mouseCanvas = this.MouseCanvas( width, height );
    var Brush = this.Brush( context );

    canvas.onmousedown = function ( e ) { mouseCanvas.Start( e ); }
    canvas.onmousemove = function ( e ) { mouseCanvas.Move( e ); }
    canvas.onmouseup = function ( e ) { mouseCanvas.Finish( e ); }

    function Clear()
    {
        context.clearRect( 0, 0, width, height );
        Queue.Clear();
    }

    function Draw()
    {
        var drawing;
        while ( drawing = Queue.Dequeue() )
            Brush.Draw( drawing );
    }

    function Load( videoTimeFrom, videoTimeTo )
    {
        var drawings = DrawingsRepository.Take( videoTimeFrom, videoTimeTo );
        for ( var i = 0; i < drawings.length; i++ )
            Queue.Enqueue( drawings[i] );
    }

    return { Clear: Clear, Brush: Brush, Draw: Draw, Load: Load }
} )();