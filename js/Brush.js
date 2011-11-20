function Brush( context )
{
    if ( !context ) { Log.Error( "Brush( --> context <-- )" ); return; }

    this.Context = context;
    this.Color = "#0000FF";
    this.Width = 13;
    this.Duration = 1;
}

Brush.prototype.Draw = function ( drawing )
{
    if ( !drawing ) { Log.Error( "Brush.Draw( --> drawing <-- )" ); return; }

    this.Context.beginPath();
    this.Context.strokeStyle = drawing.Color;
    this.Context.lineWidth = drawing.Width;
    this.Context.moveTo( drawing.Line.From.X, drawing.Line.From.Y );
    this.Context.lineTo( drawing.Line.To.X, drawing.Line.To.Y );
    this.Context.stroke();
}

Brush.prototype.Clear = function ( drawing )
{
    if ( !drawing ) { Log.Error( "Brush.Clear( --> drawing <-- )" ); return; }

    var fromX = drawing.Line.From.X - Math.ceil( drawing.Width / 2 );
    var fromY = drawing.Line.From.Y - Math.ceil( drawing.Width / 2 );
    var cX = ( drawing.Line.To.X - drawing.Line.From.X || drawing.Width ) + Math.ceil( drawing.Width / 2 );
    var cY = ( drawing.Line.To.Y - drawing.Line.From.Y || drawing.Width ) + Math.ceil( drawing.Width / 2 );

    this.Context.clearRect( fromX, fromY, cX, cY );
}

Brush.prototype.SetColor = function ( color ) { this.Color = color; }
Brush.prototype.SetWidth = function ( width ) { this.Width = width; }
Brush.prototype.SetDuration = function ( duration ) { this.Duration = duration; }