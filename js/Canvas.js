function Canvas( canvas, indexedDB, updateDbLog )
{
    if ( !canvas ) { Log.Error( "Canvas( --> canvas <-- )" ); return; }

    var context = canvas.getContext( "2d" );
    this.Brush = new Brush( context );
    var drawingsRepository = new DrawingsRepository();
    var canvasRepository = new CanvasRepository( this.Brush, drawingsRepository );
    var dataBase = new DataBase( indexedDB, drawingsRepository, updateDbLog );

    var mouseEvents = new MouseEvents( canvas.width, canvas.height, this.Brush, drawingsRepository, canvasRepository, dataBase );

    canvas.onmousedown = function ( e ) { mouseEvents.Start( e ); }
    canvas.onmousemove = function ( e ) { mouseEvents.Move( e ); }
    canvas.onmouseup = function ( e ) { mouseEvents.Finish( e ); }

    this.Update = function ( time )
    {
        canvasRepository.Remove( time );
        canvasRepository.Add( time );
    }

    this.ClearHistory = function ()
    {
        drawingsRepository.Clear();
        dataBase.ReCreate();
    }

    this.Clear = function ( time )
    {
        context.clearRect( 0, 0, canvas.width, canvas.height );
        canvasRepository.Clear( time );
    }
}