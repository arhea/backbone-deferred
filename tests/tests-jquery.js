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

test('Done Deferred', function() {
    var callback = this.spy();

    myModel.fetch().done(callback);

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        name: 'Test'
    }));

    ok(callback.called, 'Make sure the done callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

});

test('Fail Deferred', function() {
    var callback = this.spy();

    myModel.fetch().fail(callback);

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

    ok(callback.called, 'Make sure the fail callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

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

test('Done Deferred', function() {
    var callback = this.spy();

    myModel.save().done(callback);

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        id: 1,
        name: 'Test'
    }));

    ok(callback.called, 'Make sure the done callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

});

test('Fail Deferred', function() {
    var callback = this.spy();

    myModel.save().fail(callback);

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

    ok(callback.called, 'Make sure the fail callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

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

test('Done Deferred', function() {
    var callback = this.spy();

    myModel.destroy().done(callback);

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        id: 1,
        name: 'Test'
    }));

    ok(callback.called, 'Make sure the done callback was called.');
    ok(callback.withArgs(1), 'Make sure the 3 arguments were passed to the deferred.');

});

test('Fail Deferred', function() {
    var callback = this.spy();

    myModel.destroy().fail(callback);

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

    ok(callback.called, 'Make sure the fail callback was called.');
    ok(callback.withArgs(1), 'Make sure the 3 arguments were passed to the deferred.');

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

test('Done Deferred', function() {
    var callback = this.spy();

    myCollection.fetch().done(callback);

    this.requests[0].respond(200, {"Content-Type": "application/json"}, JSON.stringify({
        name: 'Test'
    }));

    ok(callback.called, 'Make sure the done callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

});

test('Fail Deferred', function() {
    var callback = this.spy();

    myCollection.fetch().fail(callback);

    this.requests[0].respond(400, {"Content-Type": "application/json"}, JSON.stringify({
        error: true,
        message: 'Something'
    }));

    ok(callback.called, 'Make sure the fail callback was called.');
    ok(callback.withArgs(1), 'Make sure the 1 arguments were passed to the deferred.');

});
