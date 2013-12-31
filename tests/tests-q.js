BackboneDeferred.Model.prototype.url = '/api/model';

var myModel = new BackboneDeferred.Model({
    id: 1
});

BackboneDeferred.Collection.prototype.url = '/api/collection';

var myCollection = new BackboneDeferred.Collection([myModel]);

module('Model Fetch', {
    setup: function () {
        var requests = this.requests = [];
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    },

    teardown: function () {
        this.requests = [];
        this.xhr.restore();
    }
});

asyncTest('Then Deferred', function() {
    expect(3);

    myModel.fetch().then(function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        name: 'Test'
    }));

});

asyncTest('Fail Deferred', function() {
    expect(3);

    myModel.fetch().then(null, function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

});

module('Model Save', {
    setup: function () {
        var requests = this.requests = [];
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    },

    teardown: function () {
        this.requests = [];
        this.xhr.restore();
    }
});

asyncTest('Then Deferred', function() {
    expect(3);

    myModel.save().then(function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        id: 1,
        name: 'Test'
    }));

});

asyncTest('Fail Deferred', function() {
    expect(3);

    myModel.save().then(null, function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

});

module('Model Destroy', {
    setup: function () {
        var requests = this.requests = [];
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    },

    teardown: function () {
        this.requests = [];
        this.xhr.restore();
    }
});

asyncTest('Then Deferred', function() {
    expect(3);

    myModel.destroy().then(function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        id: 1,
        name: 'Test'
    }));

});

asyncTest('Fail Deferred', function() {
    expect(3);

    myModel.destroy().then(null, function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

});

module('Collection Fetch', {
    setup: function () {
        var requests = this.requests = [];
        this.xhr = sinon.useFakeXMLHttpRequest();
        this.xhr.onCreate = function (xhr) {
            requests.push(xhr);
        };
    },

    teardown: function () {
        this.requests = [];
        this.xhr.restore();
    }
});

asyncTest('Then Deferred', function() {
    expect(3);

    myCollection.fetch().then(function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        name: 'Test'
    }));

});

asyncTest('Fail Deferred', function() {
    expect(3);

    myCollection.fetch().then(null, function(resp) {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
        ok(_.isArray(resp), 'Make sure the arugment is an array.');
        start();
    });

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

});
