TestCase( "DrawingsRepositoryTest",
{
    test_Repository_Stores_Drawings_Sorted_By_VideoTimeStart: function ()
    {
        var repository = new MockDrawingsRepository();

        assertEquals( [{ "VideoTimeStart": 1 },
                       { "VideoTimeStart": 3 },
                       { "VideoTimeStart": 6}],
                      repository.GetAllDrawings() );
    },

    test_Can_Get_Drawings_In_Desired_Time_Interval: function ()
    {
        var repository = new MockDrawingsRepository();
        var drawing = new Drawing( new Line( new Point( 0, 0 ), new Point( 0, 0 ) ), 0, 0, 1, 7 )

        assertEquals( 3, repository.GetAllDrawings().length );
        assertEquals( [{ "VideoTimeStart": 3}], TakeVideoTimeStartFromGet( repository, drawing, 5 ) );

        drawing.VideoTimeStart = 1;
        drawing.VideoTimeFinish = 7;
        assertEquals( [{ "VideoTimeStart": 3 },
                       { "VideoTimeStart": 6}],
                      TakeVideoTimeStartFromGet( repository, drawing, 15 ) );

        drawing.VideoTimeStart = 3;
        drawing.VideoTimeFinish = 5;
        assertEquals( [{ "VideoTimeStart": 6}], TakeVideoTimeStartFromGet( repository, drawing, 15 ) );
    },

    test_Can_Clear_All_Drawings: function ()
    {
        var repository = new MockDrawingsRepository();

        repository.Clear();

        assertEquals( [], repository.GetAllDrawings() );
    }
} );

function TakeVideoTimeStartFromGet( repository, drawing, videoTimeStartTo )
{
    var result = [];

    var drawings = repository.Get( drawing, videoTimeStartTo );
    for ( var i = 0; i < drawings.length; i++ )
        result.push( { "VideoTimeStart": drawings[i].VideoTimeStart } );

    return result;
}
