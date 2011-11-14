function DrawingsRepository() { this.Drawings = []; }

DrawingsRepository.prototype.Add = function( drawing )
{
    if ( !drawing ) { Log.Error( "DrawRepository.Add( --> drawing <-- )" ); return; }
    this.Drawings.splice( this.Find( drawing.VideoTimeStart, function ( a, b ) { return a > b; } ), 0, drawing );
}

DrawingsRepository.prototype.Get = function ( videoTimeStartFrom, videoTimeStartTo )
{
    return this.Drawings.slice( this.Find( videoTimeStartFrom, function ( a, b ) { return a >= b; } ),
                                this.Find( videoTimeStartTo, function ( a, b ) { return a > b; } ) );
}

DrawingsRepository.prototype.Find = function( videoTimeStart, compare )
{
    for ( var i = 0; i < this.Drawings.length; i++ )
        if ( compare( this.Drawings[i].VideoTimeStart, videoTimeStart ) )
            return i;
    return this.Drawings.length;
}

DrawingsRepository.prototype.Clear = function () { this.Drawings = []; }

/* For testing purposes only */
DrawingsRepository.prototype.GetAllDrawings = function ()
{
    var result = [];
    for ( var i = 0; i < this.Drawings.length; i++ )
        result.push( { "VideoTimeStart": this.Drawings[i].VideoTimeStart } );

    return result;
}
