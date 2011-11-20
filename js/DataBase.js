function DataBase( indexedDB, drawingsRepository, updateDbLog )
{
    if ( !indexedDB ) { Log.Error( "DataBase( --> indexedDB <-- )" ); return; }
    if ( !drawingsRepository ) { Log.Error( "DataBase( --> drawingsRepository <-- )" ); return; }
    if ( !updateDbLog ) { Log.Error( "DataBase( --> updateDbLog <-- )" ); return; }

    var db;
    var request = indexedDB.open( "lines-db" );
    request.onerror = Log.Error;
    var that = this;

    this.Create = function ( loadPrevious )
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
            else
                Log.Show( "DataBase.Create --> Object store opened!" );

            if ( loadPrevious )
            {
                updateDbLog( "Загрузка предыдущих изображений  . . ." );
                that.Get();
            }
        }, false );
    }

    this.Add = function ( drawing )
    {
        if ( !drawing ) { Log.Error( "DataBase.Add( --> drawing <-- )" ); return; }

        if ( !IsOpened() || !IsObjectStoreCreated() )
            return;

        var objectStore = db.transaction( ["lines"], webkitIDBTransaction.READ_WRITE ).objectStore( "lines" );
        var addRequest = objectStore.put( drawing );
        addRequest.onerror = Log.Error;
    }

    this.Get = function ()
    {
        if ( !IsObjectStoreCreated() )
            return;

        var objectStore = db.transaction( ["lines"], webkitIDBTransaction.READ_ONLY ).objectStore( "lines" );
        var cursorRequest = objectStore.openCursor();

        cursorRequest.addEventListener( "success", function ( e )
        {
            var cursor = cursorRequest.result;
            if ( !cursor )
            {
                Log.Show( "DataBase.Get --> Previous drawings loaded!" );
                updateDbLog( null, "hide" );
                return;
            }

            drawingsRepository.Add( DrawingFromObject( cursor.value ) );
            cursor.continue();
        }, false );
        cursorRequest.onerror = Log.Error;
    }

    this.ReCreate = function ()
    {
        if ( !IsOpened() )
            return;

        var request = db.setVersion( "1.0" );
        request.onerror = Log.Error;
        request.addEventListener( "success", function ( e )
        {
            if ( db.objectStoreNames.contains( "lines" ) )
            {
                try
                {
                    db.deleteObjectStore( "lines" );
                    Log.Show( "DataBase.ReCreate --> Object store removed!" );
                    that.Create();
                }
                catch ( err ) { Log.Exception( err ); }
            }
            else
                Log.Error( "DataBase.ReCreate --> Object store doesn't exist." );
        }, false );
    }

    request.addEventListener( "success", function ( e )
    {
        db = request.result;
        Log.Show( "DataBase --> Database opened / created!" );
        that.Create( true );
        updateDbLog( "Создание хранилища объектов . . .", "show" );
    }, false );

    function DrawingFromObject( value )
    {
        value.__proto__ = Drawing.prototype;
        value.Line.__proto__ = Line.prototype;
        value.Line.From.__proto__ = Point.prototype;
        value.Line.To.__proto__ = Point.prototype;

        return value;
    }

    function IsOpened()
    {
        if ( !db && request )
        {
            Log.Error( "DataBase.IsOpened --> DataBase is not opened." );
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
}

