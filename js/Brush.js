function Brush( context )
{
    if ( !context ) { Log.Error( "Brush( --> context <-- )" ); return; }

    this.Color = "#0000FF";
    this.Width = 10;

    function Draw( drawing )
    {
        if ( !drawing ) { Log.Error( "Brush.Draw( --> drawing <-- )" ); return; }
        
        context.beginPath();
        context.strokeStyle = drawing.Color;
        context.lineWidth = drawing.Width;
        context.moveTo( drawing.Line.From.X, drawing.Line.From.Y );
        context.lineTo( drawing.Line.To.X, drawing.Line.To.Y );
        context.stroke();
    }

    function SetColor( color ) { this.Color = color; }
    function SetWidth( width ) { this.Width = width; }

    return { Color: Color, Width: Width, Draw: Draw, SetColor: SetColor, SetWidth: SetWidth }
}