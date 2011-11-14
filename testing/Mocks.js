function MockCanvasContext() { return document.createElement( "canvas" ).getContext( "2d" ); }

function MockBrush()
{
    var brush = {};
    brush.Draw = function () { };
    brush.Clear = function () { };

    return brush;
}


function MockDrawingsRepository()
{
    var repository = new DrawingsRepository();

    repository.Add( new Drawing( null, null, null, 6, 9 ) );
    repository.Add( new Drawing( null, null, null, 1, 7 ) );
    repository.Add( new Drawing( null, null, null, 3, 5 ) );
    
    return repository;
}

function MockCanvasRepository()
{
    var repository = new CanvasRepository( new MockBrush(), new MockDrawingsRepository() );

    repository.Add( 6 );

    return repository;
}