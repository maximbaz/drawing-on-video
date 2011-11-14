TestCase( "CanvasRepositoryTest",
{
    test_Cannot_Add_Duplicate_Drawings: function ()
    {
        var repository = new MockCanvasRepository();

        assertEquals( 3, repository.GetAllDrawings().length );
        repository.Add( 6 );
        assertEquals( 3, repository.GetAllDrawings().length );
    },

    test_Repository_Stores_Drawings_Sorted_By_VideoTimeFinish: function ()
    {
        var repository = new MockCanvasRepository();

        assertEquals( [{ "VideoTimeFinish": 5 },
                       { "VideoTimeFinish": 7 },
                       { "VideoTimeFinish": 9 }],
                      repository.GetAllDrawings() );
    },

    test_Can_Remove_Drawings_That_Are_Not_In_Desired_Time_Interval: function ()
    {
        var repository = new MockCanvasRepository();

        repository.Remove( 6 );

        assertEquals( [{ "VideoTimeFinish": 7 },
                       { "VideoTimeFinish": 9 }],
                       repository.GetAllDrawings() );

        repository.Remove( 2 );

        assertEquals( [{ "VideoTimeFinish": 7 }],
                       repository.GetAllDrawings() );
    },

    test_Can_Clear_All_Drawings: function ()
    {
        var repository = new MockCanvasRepository();

        repository.Clear();

        assertEquals( [], repository.GetAllDrawings() );
    }
} );