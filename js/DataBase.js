function DataBase ( indexedDB, drawingsRepository )
{
    if( !indexedDB ) { Log.Error( "DataBase( --> indexedDB <-- )" ); return; }
    if( !drawingsRepository ) { Log.Error( "DataBase( --> drawingsRepository <-- )" ); return; }
    
    var db;
    var request = indexedDB.open( "lines-db" );
    request.onerror = Log.Error;
    request.addEventListener( "success", function ( e ) 
    { 
        db = request.result; 
        Log.Show("DataBase --> Database opened / created!"); 
        Create();
        Get();
    }, false );

    function Create()
    {
        if ( !IsOpened() )
            return;

        var versionRequest = db.setVersion( "1.0" );
        versionRequest.onerror = Log.Error;
        versionRequest.addEventListener( "success", function ( e )
        {
            if ( !db.objectStoreNames.contains( "lines" ) )
            {
                objectStore = db.createObjectStore( "lines", { autoIncrement: true } ); 
                Log.Show( "DataBase.Create --> Object store created!" );
            }
            else { Log.Show( "DataBase.Create --> Object store opened!" ); }
        }, false );
    }

    function Add( drawing )
    {
        if( !drawing ) { Log.Error( "DataBase.Add( --> drawing <-- )" ); return; }

        if ( !( IsOpened() && IsObjectStoreCreated() ) )
            return;

        var objectStore = db.transaction( [ "lines" ], webkitIDBTransaction.READ_WRITE ).objectStore( "lines" );
        var addRequest = objectStore.put( drawing );
        addRequest.onerror = Log.Error;
    }

    function Get()
    {
        if ( !IsObjectStoreCreated() )
            return;

        var objectStore = db.transaction([ "lines" ], webkitIDBTransaction.READ_ONLY).objectStore("lines");
        var cursorRequest = objectStore.openCursor();

        cursorRequest.addEventListener( "success", function( e ) 
        {
            var cursor = cursorRequest.result;
            if(!cursor)
            {
                Log.Show("DataBase.Get --> Previous drawings loaded!");
                return;
            }
            
            drawingsRepository.Add( cursor.value ); 
            cursor.continue();
        }, false );
        cursorRequest.onerror = Log.Error;
    }

    function ReCreate() 
    {
        if ( !IsOpened() )
            return;

        var request = db.setVersion("1.0");
        request.onerror = Log.Error;
        request.addEventListener( "success", function( e ) 
        {
            if (db.objectStoreNames.contains("lines")) 
            {
                try 
                {
                    db.deleteObjectStore("lines");
                    Log.Show("DataBase.ReCreate --> Object store removed!");
                    Create();
                } 
                catch (err) { Log.Exception(err); }
            } 
            else 
                Log.Error("DataBase.ReCreate --> Object store doesn't exist.");
        }, false );
    }

    function IsOpened()
    {
        if ( !db && request )
        {
            Log.Error("DataBase.IsOpened --> DataBase is not opened.");
            return false;
        }
        return true;
    }

    function IsObjectStoreCreated()
    {
        if ( !db.objectStoreNames.contains( "lines" ) )
        {
            Log.Error( "DataBase.IsObjectStoreCreated --> Object store doesn't exist." );
            return false;
        }
        return true;
    }

    return { Create: Create, ReCreate: ReCreate, Get: Get, Add: Add }
}