function MockIndexedDB()
{
    var db = {};
    db.open = function () { return new MockOpenRequest(); };

    return db;
}

MockOpenRequest.prototype = new MockRequest();

function MockOpenRequest()
{
    var result = {};
    this.request.result.objectStoreNames = { created: false };
    this.request.result.objectStoreNames.contains = function () { return this.created; }
    this.request.result.createObjectStore = function () { this.objectStoreNames.created = true; };
    this.request.result.deleteObjectStore = function () { this.objectStoreNames.created = false; };
    
    this.request.result.setVersion = function () { return new MockRequest().request; };
    this.request.result.transaction = function () { return new MockTransactionRequest(); };

    return this.request;
}

function MockTransactionRequest()
{
    function objectStore() { return new MockObjectStore(); }
    return { objectStore: objectStore }
}

function MockObjectStore()
{
    function openCursor() { return new MockCursorRequest().request; }
    function put() { return new MockRequest().request; }
    return { openCursor: openCursor, put: put }
}

MockCursorRequest.prototype = new MockRequest();

function MockCursorRequest() { this.request.result = null; }

function MockRequest()
{
    this.request = {};
    this.request.onerror = {};
    this.request.addEventListener = function ( name, func ) { func(); };
    this.request.result = {};
}