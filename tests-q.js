(function() {


}).call(this);

(function() {
  var config;

  config = {
    setup: function() {
      var modelConfig, requests;
      requests = this.requests = [];
      this.xhr = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function(xhr) {
        return requests.push(xhr);
      };
      modelConfig = {
        id: 1,
        url: '/api/example/model'
      };
      this.model = new Backbone.Deferred.Model(modelConfig);
      this.respondOk(function() {
        var headers, response, status;
        status = 200;
        headers = {
          'Content-Type': 'application/json'
        };
        response = {
          name: 'Test',
          email: 'test@example.com'
        };
        return this.requests[0].respond(status, headers, JSON.stringify(response));
      });
      return this.respondBad(function() {
        var headers, response, status;
        status = 400;
        headers = {
          'Content-Type': 'application/json'
        };
        response = {
          message: 'Something went wrong'
        };
        return this.requests[0].respond(status, headers, JSON.stringify(response));
      });
    },
    teardown: function() {
      this.requests = [];
      return this.xhr.restore();
    }
  };

  module('model', config);

  asyncTest('fetch: ok response', function() {
    expect(3);
    this.model.fetch().then(function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('fetch: bad response', function() {
    expect(3);
    this.model.fetch().then(null, function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('save: ok response', function() {
    expect(3);
    this.model.save().then(function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('save: bad response', function() {
    expect(3);
    this.model.save().then(null, function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('destroy: ok response', function() {
    expect(3);
    this.model.destroy().then(function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('destroy: bad response', function() {
    expect(3);
    this.model.destroy().then(null, function(resp) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(resp instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondBad();
  });

}).call(this);

(function() {
  module('Results');

  test('resolve model', function() {
    var model, options, response, result;
    model = new Backbone.Model();
    response = 'my great response';
    options = {
      test1: 1,
      test2: 2,
      test3: 3
    };
    result = new Backbone.Deferred.ResolveModel(model, response, options);
    deepEqual(model, result.model, 'model properly handled via dot accessor');
    deepEqual(model, result.getModel(), 'model properly handled via getModel() method');
    equal(response, result.response, 'response properly handled via dot accessor');
    equal(response, result.getResponse(), 'response properly handled via getResponse() method');
    deepEqual(options, result.options, 'options properly handled via dot accessor');
    return deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method');
  });

  test('resolve collection', function() {
    var collection, options, response, result;
    collection = new Backbone.Collection();
    response = 'my great response';
    options = {
      test1: 1,
      test2: 2,
      test3: 3
    };
    result = new Backbone.Deferred.ResolveCollection(collection, response, options);
    deepEqual(collection, result.collection, 'collection properly handled via dot accessor');
    deepEqual(collection, result.getCollection(), 'collection properly handled via getCollection() method');
    equal(response, result.response, 'response properly handled via dot accessor');
    equal(response, result.getResponse(), 'response properly handled via getResponse() method');
    deepEqual(options, result.options, 'options properly handled via dot accessor');
    return deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method');
  });

  test('reject model', function() {
    var jQxhr, model, options, result;
    model = new Backbone.Model();
    jQxhr = {
      url: '/example/test'
    };
    options = {
      test1: 1,
      test2: 2,
      test3: 3
    };
    result = new Backbone.Deferred.RejectModel(model, jQxhr, options);
    deepEqual(model, result.model, 'model properly handled via dot accessor');
    deepEqual(model, result.getModel(), 'model properly handled via getModel() method');
    equal(jQxhr, result.xhr, 'xhr properly handled via dot accessor');
    equal(jQxhr, result.getXhr(), 'xhr properly handled via getXhr() method');
    deepEqual(options, result.options, 'options properly handled via dot accessor');
    return deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method');
  });

  test('reject collection', function() {
    var collection, jQxhr, options, result;
    collection = new Backbone.Collection();
    jQxhr = {
      url: '/example/test'
    };
    options = {
      test1: 1,
      test2: 2,
      test3: 3
    };
    result = new Backbone.Deferred.RejectCollection(collection, response, options);
    deepEqual(collection, result.collection, 'collection properly handled via dot accessor');
    deepEqual(collection, result.getCollection(), 'collection properly handled via getCollection() method');
    equal(jQxhr, result.xhr, 'xhr properly handled via dot accessor');
    equal(jQxhr, result.getXhr(), 'xhr properly handled via getXhr() method');
    deepEqual(options, result.options, 'options properly handled via dot accessor');
    return deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method');
  });

}).call(this);

(function() {


}).call(this);
