var DataBase = ( function ()
{
    var db;
    var request = window.webkitIndexedDB.open( "lines-db" );
    request.onerror = Log.Error;
    request.addEventListener( "success", function ( e ) 
                                         { 
                                             db = request.result; 
                                             Log.Show("Database opened / created!"); 
                                         }, false );

    function Create()
    {
        if ( IsOpening() )
            return;

        var versionRequest = db.setVersion( "1.0" );
        versionRequest.onerror = Log.Error;
        versionRequest.onsuccess = function ( e )
        {
            if ( !db.objectStoreNames.contains( "lines" ) )
            {
                objectStore = db.createObjectStore( "lines", { autoIncrement: true } ); 
                Log.Show( "Object store created!" );
            }
            else { Log.Show( "Object store opened!" ); }
        }
    }

    function Set( draw, videoTime )
    {
        if( !draw )      { Log.Error( "draw argument" );      return; }
        if( !videoTime ) { Log.Error( "videoTime argument" ); return; }

        if ( IsOpening() )
            return;

        if ( !db.objectStoreNames.contains( "lines" ) )
        {
            Log.Error( "Object store doesn't exist." );
            return;
        }
        var objectStore = db.transaction( [], webkitIDBTransaction.READ_WRITE ).objectStore( "lines" );

        var addRequest = objectStore.put( Serialize(draw, videoTime) );
        addRequest.onerror = Log.Error;
    }

    function Get( videoTimeTo, videoTimeFrom )
    {
        if (!db.objectStoreNames.contains("lines")) 
        {
            Log.Error("Object store not yet created.");
            return;
        }
 
        var transaction = db.transaction([], webkitIDBTransaction.READ_ONLY);
        var cursorRequest = transaction.objectStore("lines").openCursor();

        cursorRequest.onsuccess = function(e) 
        {
            var cursor = cursorRequest.result;
            if(!cursor)
            {
                Canvas.StartDrawing();
                return;
            }
            var videoTime = parseFloat(cursor.value.videoTime);
            if (videoTime <= videoTimeTo && videoTime >= (videoTimeFrom ? videoTimeFrom : 0))
                Canvas.Queue.Dequeue(Deserialize(cursor.value)); 
            cursor.continue();
        }
        cursorRequest.onerror = Log.Error;
    }

    function Remove() 
    {
        if ( IsOpening() )
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
                    Canvas.Queue.Clear();
                    Log.Show("Object store removed!");
                } 
                catch (err) { Log.Exception(err); }
            } 
            else 
                Log.Error("Object store doesn't exist.");
        };
    }

    function IsOpening()
    {
        if ( !db )
        {
            if ( request )
                request.addEventListener( 'success', db.removeObjectStore, false );
            return true;
        }
        return false;
    }

    function Serialize( draw, videoTime )
    {
        var record = 
        {
            "videoTime": videoTime, 
            "color": draw.color,
            "width": draw.width,
            "fromX": draw.line.from.x,
            "fromY": draw.line.from.y,
            "toX": draw.line.to.x,
            "toY": draw.line.to.y
        };

        return record;
    }

    function Deserialize( value )
    {
        if( !value ) { Log.Error( "value argument" ); return; }

        var from = Point( value.fromX, value.fromY );
        var to = Point( value.toX, value.toY );
        var line = Line(from, to);

        return Draw( line, value.color, value.width);
    }

    return { Create: Create, Remove: Remove, Get: Get, Set: Set }
} )();