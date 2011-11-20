function Brush( context )
{
    if ( !context ) { Log.Error( "Brush( --> context <-- )" ); return; }

    this.Color = "#0000FF";
    this.Width = 13;
    this.Duration = 1;

    this.Draw = function ( drawing )
    {
        if ( !drawing ) { Log.Error( "Brush.Draw( --> drawing <-- )" ); return; }

        context.beginPath();
        context.strokeStyle = drawing.Color;
        context.lineWidth = drawing.Width;
        context.moveTo( drawing.Line.From.X, drawing.Line.From.Y );
        context.lineTo( drawing.Line.To.X, drawing.Line.To.Y );
        context.stroke();
    }

    this.Clear = function ( drawing )
    {
        if ( !drawing ) { Log.Error( "Brush.Clear( --> drawing <-- )" ); return; }

        var vertical = drawing.Line.From.X == drawing.Line.To.X;

        var fromX = drawing.Line.From.X - ( vertical ? Math.ceil( drawing.Width / 2 ) : 0 );
        var fromY = drawing.Line.From.Y - ( vertical ? 0 : Math.ceil( drawing.Width / 2 ) );
        var cX = ( drawing.Line.To.X - drawing.Line.From.X || drawing.Width ) + ( vertical ? Math.ceil( drawing.Width / 2 ) : 0 );
        var cY = ( drawing.Line.To.Y - drawing.Line.From.Y || drawing.Width ) + ( vertical ? 0 : Math.ceil( drawing.Width / 2 ) );

        context.clearRect( fromX, fromY, cX, cY );
    }
}

Brush.prototype.SetColor = function ( color ) { this.Color = color; }
Brush.prototype.SetWidth = function ( width ) { this.Width = width; }
Brush.prototype.SetDuration = function ( duration ) { this.Duration = duration; }