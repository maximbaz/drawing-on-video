function Brush( context )
{
    if ( !context ) { Log.Error( "context argument" ); return; }

    this.Color = "#0000FF";
    this.Width = "10";
    var context = context;

    function Draw( draw )
    {
        if ( !draw ) { Log.Error( "draw argument" ); return; }

        context.beginPath();

        context.strokeStyle = draw.color;
        context.lineWidth = draw.width;
        context.moveTo( draw.line.from.x, draw.line.from.y );
        context.lineTo( draw.line.to.x, draw.line.to.y );

        context.stroke();
    }

    function SetColor( color ) { this.Color = color; }
    function SetWidth( width ) { this.Width = width; }

    return { Color: Color, Width: Width, Draw: Draw, SetColor: SetColor, SetWidth: SetWidth }
}