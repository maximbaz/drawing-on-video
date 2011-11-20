TestCase( "SplitDrawingsTest",
{
    test_Straight_Lines_Dont_Splitted_Just_With_Beauty_Offset: function ()
    {
        var beautyOffset = 2;
        var xStraightLR = new Drawing( new Line( new Point( 1,  1  ), new Point( 1,  15 ) ) );
        var xStraightRL = new Drawing( new Line( new Point( 1,  15 ), new Point( 1,  1  ) ) );
        var yStraightTB = new Drawing( new Line( new Point( 1,  1  ), new Point( 15, 1 ) ) );
        var yStraightBT = new Drawing( new Line( new Point( 15, 1  ), new Point( 1,  1 ) ) );

        assertEquals( [new Drawing( new Line( new Point( 1, 1 - beautyOffset ), new Point( 1, 15 + beautyOffset ) ) )], SplitDrawings( xStraightLR ) );
        assertEquals( [new Drawing( new Line( new Point( 1, 1 - beautyOffset ), new Point( 1, 15 + beautyOffset ) ) )], SplitDrawings( xStraightRL ) );
        assertEquals( [new Drawing( new Line( new Point( 1 - beautyOffset, 1 ), new Point( 15 + beautyOffset, 1 ) ) )], SplitDrawings( yStraightTB ) );
        assertEquals( [new Drawing( new Line( new Point( 1 - beautyOffset, 1 ), new Point( 15 + beautyOffset, 1 ) ) )], SplitDrawings( yStraightBT ) );
    },

    tet_Split_Lines_Depending_On_Angle_With_Beauty_Offset: function ()
    {
        var beautyOffset = 2;
        var Angle30      = new Drawing( new Line( new Point( 1, 1 ), new Point( 5, 3 ) ) );
        var Angle60      = new Drawing( new Line( new Point( 1, 1 ), new Point( 3, 5 ) ) );
        var AngleRandom  = new Drawing( new Line( new Point( 8, 2 ), new Point( 1, 0 ) ) );

        var splitAngle30 = new SplitDrawings( Angle30 );
        assertEquals( 5, splitAngle30.length );
        assertEquals( [new Drawing( new Line( new Point( 1 - beautyOffset,    1                ), new Point( 2 + beautyOffset,    1                ) ) ),
                       new Drawing( new Line( new Point( 2,                   1 - beautyOffset ), new Point( 2,                   2 + beautyOffset ) ) ),
                       new Drawing( new Line( new Point( 2 - beautyOffset,    2                ), new Point( 4 + beautyOffset,    2                ) ) ),
                       new Drawing( new Line( new Point( 4,                   2 - beautyOffset ), new Point( 4,                   3 + beautyOffset ) ) ),
                       new Drawing( new Line( new Point( 4 - beautyOffset,    3                ), new Point( 5 + beautyOffset,    3                ) ) )],
                       splitAngle30 );

        var splitAngle60 = SplitDrawings( Angle60 );
        assertEquals( 5, splitAngle60.length );
        assertEquals( [new Drawing( new Line( new Point( 1,                   1 - beautyOffset ), new Point( 1,                   2 + beautyOffset ) ) ),
                       new Drawing( new Line( new Point( 1 - beautyOffset,    2                ), new Point( 2 + beautyOffset,    2                ) ) ),
                       new Drawing( new Line( new Point( 2,                   2 - beautyOffset ), new Point( 2,                   4 + beautyOffset ) ) ),
                       new Drawing( new Line( new Point( 2 - beautyOffset,    4                ), new Point( 3 + beautyOffset,    4                ) ) ),
                       new Drawing( new Line( new Point( 3,                   4 - beautyOffset ), new Point( 3,                   5 + beautyOffset ) ) )],
                       splitAngle60 );

        var splitAngleRandom = SplitDrawings( AngleRandom );
        assertEquals( 3, splitAngleRandom.length );
        assertEquals( [new Drawing( new Line( new Point( 1 - beautyOffset, 0 ), new Point( 2 + beautyOffset, 0 ) ) ),
                       new Drawing( new Line( new Point( 3 - beautyOffset, 1 ), new Point( 6 + beautyOffset, 1 ) ) ),
                       new Drawing( new Line( new Point( 7 - beautyOffset, 2 ), new Point( 8 + beautyOffset, 2 ) ) )],
                       SplitDrawings( AngleRandom ) );
    }
} );