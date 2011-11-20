function Canvas (canvas, indexedDB)
{
    if ( !canvas ) { Log.Error( "Canvas( --> canvas <-- )" ); return; }

    this.Width = canvas.width;
    this.Height = canvas.height;
    this.Context = canvas.getContext( "2d" );
    this.Brush = new Brush( this.Context );
    this.DrawingsRepository = new DrawingsRepository();
    this.DataBase = new DataBase( indexedDB, this.DrawingsRepository );
    this.CanvasRepository = new CanvasRepository( this.Brush, this.DrawingsRepository );

    var mouseEvents = new MouseEvents( this.Width, this.Height, this.Brush, this.DrawingsRepository, this.CanvasRepository, this.DataBase );

    canvas.onmousedown = function ( e ) { mouseEvents.Start( e ); }
    canvas.onmousemove = function ( e ) { mouseEvents.Move( e ); }
    canvas.onmouseup = function ( e ) { mouseEvents.Finish( e ); }
}

Canvas.prototype.Update = function( time )
{
    this.CanvasRepository.Remove( time );
    this.CanvasRepository.Add( time );
}

Canvas.prototype.ClearHistory = function()
{
    this.DrawingsRepository.Clear();
    this.DataBase.ReCreate();
}

Canvas.prototype.Clear = function( time )
{
    this.Context.clearRect( 0, 0, this.Width, this.Height );
    this.CanvasRepository.Clear( time );
}