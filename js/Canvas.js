var Canvas = ( function ()
{
    var Canvas = $( "canvas" )[0];
    var Width = Canvas.width;
    var Height = Canvas.height;

    var context = Canvas.getContext( "2d" );
    var Queue = this.Queue;
    var mouseCanvas = this.MouseCanvas;
    var Brush = this.Brush( context );

    Canvas.onmousedown = function ( e ) { mouseCanvas.Start( e ); }
    Canvas.onmousemove = function ( e ) { mouseCanvas.Move( e ); }
    Canvas.onmouseup = function ( e ) { mouseCanvas.Finish( e ); }

    function Clear() { context.clearRect( 0, 0, Width, Height ); }

    function StartDrawing()
    {
        while ( true )
        {
            var draw = Queue.Enqueue();
            if ( !draw )
                return;
            Brush.Draw( draw );
        }
    }

    return { Clear: Clear, Brush: Brush, Queue: Queue, StartDrawing: StartDrawing, Width: Width, Height: Height }
} )();