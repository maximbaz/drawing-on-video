function MouseEvents( width, height, brush, drawingsRepository, canvasRepository, dataBase )
{
    if ( !width ) { Log.Error( "MouseEvents( --> width <-- )" ); return; }
    if ( !height ) { Log.Error( "MouseEvents( --> height <-- )" ); return; }
    if ( !brush ) { Log.Error( "MouseEvents( --> brush <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "MouseEvents( --> drawingsRepository <-- )" ); return; }
    if ( !canvasRepository ) { Log.Error( "MouseEvents( --> canvasRepository <-- )" ); return; }

    this.From;
    this.To;
    this.IsDrawing = false;

    // privileged

    this.Finish = function ( e )
    {
        if ( !this.IsDrawing )
            return;

        if ( !e ) { Log.Error( "MouseEvents.Finish( --> e <-- )" ); return; }

        this.To = new Point( e.offsetX, e.offsetY );
        var drawing = new Drawing( new Line( this.From, this.To ), brush.Color, brush.Width, GetVideoTime(), GetVideoTime() + brush.Duration );
        this.IsDrawing = false;

        SplitDrawAndSave( drawing );
    }

    this.Move = function ( e )
    {
        if ( !this.IsDrawing )
            return;

        if ( !e ) { Log.Error( "MouseEvents.Move( --> e <-- )" ); return; }

        this.To = new Point( e.offsetX, e.offsetY );
        var drawing = new Drawing( new Line( this.From, this.To ), brush.Color, brush.Width, GetVideoTime(), GetVideoTime() + brush.Duration );

        if ( InPaintArea( this.To ) )
            this.From = this.To;
        else
            this.IsDrawing = false;

        SplitDrawAndSave( drawing );
    }

    // private

    function InPaintArea( point )
    {
        if ( !point ) { Log.Error( "MouseEvents.InPaintArea( --> point <-- )" ); return; }

        var dx = 2;

        return point.X > dx && point.X < width - dx &&
               point.Y > dx && point.Y < height - dx;
    }

    function DataBaseSafeAdd( drawing )
    {
        if ( dataBase.Add )
            dataBase.Add( drawing );
    }

    function SplitDrawAndSave( drawing )
    {
        var splitted = SplitDrawings( drawing );
        for ( var i = 0; i < splitted.length; i++ )
        {
            drawingsRepository.Add( splitted[i] );
            canvasRepository.Add( GetVideoTime() );
            DataBaseSafeAdd( splitted[i] );
        }
    }
}

// public

MouseEvents.prototype.Start = function ( e )
{
    if ( !e ) { Log.Error( "MouseEvents.Start( --> e <-- )" ); return; }

    this.From = new Point( e.offsetX, e.offsetY );
    this.IsDrawing = true;
}

