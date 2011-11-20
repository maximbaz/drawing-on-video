TestCase( "DataBaseTest",
{
    test_Ctor_Calls_Create_Get_Can_ReCreate_And_Add_New_Drawing: function ()
    {
        db = new DataBase( new MockIndexedDB(), new MockDrawingsRepository(), function () { } );
        // Console: [INFO] DataBase --> Database opened / created!
        // Console: [INFO] DataBase.Create --> Object store created!
        // Console: [INFO] DataBase.Get --> Previous drawings loaded!

        db.ReCreate();
        // Console: [INFO] DataBase.ReCreate --> Object store removed!
        // Console: [INFO] DataBase.Create --> Object store created!

        db.Add( new Drawing( null, null, null, 10, 15 ) );
        // NO errors in console
    }
} );