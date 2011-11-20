TestCase( "HashTableTest",
{
    setUp: function ()
    {
        this.drawing = new Drawing( new Line( new Point( 1, 2 ), new Point( 3, 4 ) ) );
        this.hashtable = new HashTable();
        this.hashtable.Add( this.drawing );
    },

    test_Adds_Only_Uniq_Values: function ()
    {
        this.hashtable.Add( this.drawing );

        assertEquals( 1, this.hashtable.length );
    },

    test_Can_Remove_Drawing: function ()
    {
        this.hashtable.Remove( this.drawing );
        assertEquals( 0, this.hashtable.length );
    }
} );