TestCase( "BrushTest",
{
    test_Brush_Set_Default_Values_For_Color_Width: function ()
    {
        var brush = new Brush( new MockCanvasContext() );
        assertEquals( "#0000FF", brush.Color );
        assertEquals( 13, brush.Width );
    },

    test_Can_Get_Set_Color_Width_Of_Brush: function ()
    {
        var brush = new Brush( new MockCanvasContext() );

        brush.SetColor( "#FFFFFF" );
        brush.SetWidth( 20 );

        assertEquals( "#FFFFFF", brush.Color );
        assertEquals( 20, brush.Width );
    }
} );