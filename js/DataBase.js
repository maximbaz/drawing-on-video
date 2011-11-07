var DataBase = ( function ()
{
    var db;
    var request = window.webkitIndexedDB.open( "lines-db" );
    request.onerror = Log.Error;
    request.addEventListener( "success", function ( e ) 
    { 
        db = request.result; 
        Log.Show("DataBase --> Database opened / created!"); 
        DataBase.Create();
        DataBase.Get();
    }, false );

    function Create()
    {
        if ( !IsOpened() )
            return;

        var versionRequest = db.setVersion( "1.0" );
        versionRequest.onerror = Log.Error;
        versionRequest.onsuccess = function ( e )
        {
            if ( !db.objectStoreNames.contains( "lines" ) )
            {
                objectStore = db.createObjectStore( "lines", { autoIncrement: true } ); 
                Log.Show( "DataBase.Create --> Object store created!" );
            }
            else { Log.Show( "DataBase.Create --> Object store opened!" ); }
        }
    }

    function Set( drawing )
    {
        if( !drawing ) { Log.Error( "DataBase.Set( --> drawing <-- )" ); return; }

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

        var transaction = db.transaction([ "lines" ], webkitIDBTransaction.READ_ONLY);
        var cursorRequest = transaction.objectStore("lines").openCursor();

        cursorRequest.onsuccess = function(e) 
        {
            var cursor = cursorRequest.result;
            if(!cursor)
            {
                Log.Show("DataBase.Get --> Previous drawings loaded!");
                return;
            }
            
            DrawingsRepository.Add( cursor.value ); 
            cursor.continue();
        }
        cursorRequest.onerror = Log.Error;
    }

    function ReCreate() 
    {
        if ( !IsOpened() )
            return;
 
        var request = db.setVersion("1.0");
        request.onerror = Log.Error;
        request.onsuccess = function(e) 
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
        };
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

    return { Create: Create, ReCreate: ReCreate, Get: Get, Set: Set }
} )();