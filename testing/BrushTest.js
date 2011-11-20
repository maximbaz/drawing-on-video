TestCase( "BrushTest",
{
    test_Brush_Set_Default_Values_For_Color_Width: function ()
    {
        var brush = new Brush( new MockCanvasContext() );
        assertEquals( "#0000FF", brush.Color );
        assertEquals( 13, brush.Width );
        assertEquals( 1, brush.Duration );
    },

    test_Can_Get_Set_Color_Width_Duration_Of_Brush: function ()
    {
        var brush = new Brush( new MockCanvasContext() );

        brush.SetColor( "#FFFFFF" );
        assertEquals( "#FFFFFF", brush.Color );

        brush.SetWidth( 20 );
        assertEquals( 20, brush.Width );

        brush.SetDuration( 5 );
        assertEquals( 5, brush.Duration );
    }
} );