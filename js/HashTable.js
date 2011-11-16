function HashTable()
{
    this.length = 0;
    this.Data = {};
}

HashTable.prototype.Add = function ( drawing )
{
    var key = drawing.toString();
    if ( !this.Data[key] )
    {
        this.Data[key] = drawing;
        ++this.length;
    }
}

HashTable.prototype.Remove = function ( drawing ) { delete this.Data[drawing.toString()]; --this.length; }
