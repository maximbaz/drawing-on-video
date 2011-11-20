window.Log = new function()
{
    this.Exception = function ( exception ) { console.error( exception ); }
    this.Error = function ( description ) { console.error( description ); }
    this.Show = function ( description ) { console.info( description ); }
}