TestCase( "SplitDrawingsTest",
{
    test_Straight_Lines_Dont_Splitted: function ()
    {
        var xStraight = new Drawing( new Line( new Point( 1, 1 ), new Point( 1, 15 ) ) );
        var yStraight = new Drawing( new Line( new Point( 1, 1 ), new Point( 15, 1 ) ) );

        assertEquals( [xStraight], SplitDrawings( xStraight ) );
        assertEquals( [yStraight], SplitDrawings( yStraight ) );
    },

    test_Split_Lines_Depending_On_Angle: function ()
    {
        var Angle30 = new Drawing( new Line( new Point( 1, 1 ), new Point( 5, 3 ) ) );
        var Angle60 = new Drawing( new Line( new Point( 1, 1 ), new Point( 3, 5 ) ) );
        var AngleRandom = new Drawing( new Line( new Point( 8, 2 ), new Point( 1, 0 ) ) );
        
        var splitAngle30 = new SplitDrawings( Angle30 );
        assertEquals( 5, splitAngle30.length );
        assertEquals( [new Drawing( new Line( new Point( 1, 1 ), new Point( 2, 1 ) ) ),
                       new Drawing( new Line( new Point( 2, 1 ), new Point( 2, 2 ) ) ),
                       new Drawing( new Line( new Point( 2, 2 ), new Point( 4, 2 ) ) ),
                       new Drawing( new Line( new Point( 4, 2 ), new Point( 4, 3 ) ) ),
                       new Drawing( new Line( new Point( 4, 3 ), new Point( 5, 3 ) ) )],
                       splitAngle30 );

        var splitAngle60 = SplitDrawings( Angle60 );
        assertEquals( 5, splitAngle60.length );
        assertEquals( [new Drawing( new Line( new Point( 1, 1 ), new Point( 1, 2 ) ) ),
                      new Drawing( new Line( new Point( 1, 2 ), new Point( 2, 2 ) ) ),
                      new Drawing( new Line( new Point( 2, 2 ), new Point( 2, 4 ) ) ),
                      new Drawing( new Line( new Point( 2, 4 ), new Point( 3, 4 ) ) ),
                      new Drawing( new Line( new Point( 3, 4 ), new Point( 3, 5 ) ) )],
                      splitAngle60 );
        
        var splitAngleRandom = SplitDrawings( AngleRandom );
        assertEquals( 3, splitAngleRandom.length );
        assertEquals( [new Drawing( new Line( new Point( 1, 0 ), new Point( 2, 0 ) ) ),
                       new Drawing( new Line( new Point( 3, 1 ), new Point( 6, 1 ) ) ),
                       new Drawing( new Line( new Point( 7, 2 ), new Point( 8, 2 ) ) )],
                       SplitDrawings( AngleRandom ) );
    }
} );