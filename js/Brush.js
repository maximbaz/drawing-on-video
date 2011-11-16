function Brush( context )
{
    if ( !context ) { Log.Error( "Brush( --> context <-- )" ); return; }

    this.Context = context;
    this.Color = "#0000FF";
    this.Width = 13;
}

Brush.prototype.Draw = function ( drawing )
{
    if ( !drawing ) { Log.Error( "Brush.Draw( --> drawing <-- )" ); return; }
    var beautyOffset = 2;
    var vertical = drawing.Line.From.X == drawing.Line.To.X;

    this.Context.beginPath();
    this.Context.strokeStyle = drawing.Color;
    this.Context.lineWidth = drawing.Width;
    this.Context.moveTo( drawing.Line.From.X - (vertical ? 0 : beautyOffset), drawing.Line.From.Y - (vertical ? beautyOffset : 0) );
    this.Context.lineTo( drawing.Line.To.X + (vertical ? 0 : beautyOffset), drawing.Line.To.Y + (vertical ? beautyOffset : 0) );
    this.Context.stroke();
}

Brush.prototype.Clear = function ( drawing )
{
    if ( !drawing ) { Log.Error( "Brush.Clear( --> drawing <-- )" ); return; }
    var beautyOffset = 2;
    var vertical = drawing.Line.From.X == drawing.Line.To.X;

    var fromX = drawing.Line.From.X - Math.ceil( drawing.Width / 2 ) - ( vertical ? 0 : beautyOffset );
    var fromY = drawing.Line.From.Y - Math.ceil( drawing.Width / 2 ) - ( vertical ? beautyOffset : 0 );
    var cX = ( drawing.Line.To.X - drawing.Line.From.X || drawing.Width ) + Math.ceil( drawing.Width / 2 ) + ( vertical ? 0 : beautyOffset );
    var cY = ( Math.abs( drawing.Line.To.Y - drawing.Line.From.Y ) || drawing.Width ) + Math.ceil( drawing.Width / 2 ) + ( vertical ? beautyOffset : 0 );

    this.Context.clearRect( fromX, fromY, cX, cY );
}

Brush.prototype.SetColor = function ( color ) { this.Color = color; }
Brush.prototype.SetWidth = function ( width ) { this.Width = width; }