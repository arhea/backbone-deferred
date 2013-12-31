(function() {
  var config;

  config = {
    setup: function() {
      var TestCollection, attributes, collectionConfig, requests;
      requests = this.requests = [];
      this.xhr = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function(xhr) {
        return requests.push(xhr);
      };
      collectionConfig = {
        url: '/api/example/model'
      };
      TestCollection = Backbone.Deferred.Collection.extend(collectionConfig);
      attributes = {
        id: 1
      };
      this.collection = new TestCollection([attributes]);
      this.respondOk = function() {
        var headers, response, status;
        status = 200;
        headers = {
          'Content-Type': 'application/json'
        };
        response = [
          {
            name: 'Test',
            email: 'test@example.com'
          }
        ];
        return this.requests[0].respond(status, headers, JSON.stringify(response));
      };
      return this.respondBad = function() {
        var headers, response, status;
        status = 400;
        headers = {
          'Content-Type': 'application/json'
        };
        response = {
          message: 'Something went wrong'
        };
        return this.requests[0].respond(status, headers, JSON.stringify(response));
      };
    },
    teardown: function() {
      this.collection = null;
      this.requests = [];
      return this.xhr.restore();
    }
  };

  module('collection', config);

  asyncTest('fetch: deferred ok response', function() {
    var deferred;
    expect(3);
    deferred = this.collection.fetch().then(function(result) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(result instanceof Backbone.Deferred.ResolveCollection, 'Make sure the arugment is a ResolveCollection object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('fetch: deferred bad response', function() {
    expect(3);
    this.collection.fetch().then(null, function(error) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(error instanceof Backbone.Deferred.RejectCollection, 'Make sure the arugment is a RejectCollection object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('fetch: callback ok response', function() {
    var options;
    expect(2);
    options = {
      success: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.collection.fetch(options);
    return this.respondOk();
  });

  asyncTest('fetch: callback bad response', function() {
    var options;
    expect(2);
    options = {
      error: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.collection.fetch(options);
    return this.respondBad();
  });

}).call(this);

(function() {
  var config;

  config = {
    setup: function() {
      var TestModel, attributes, modelConfig, requests;
      requests = this.requests = [];
      this.xhr = sinon.useFakeXMLHttpRequest();
      this.xhr.onCreate = function(xhr) {
        return requests.push(xhr);
      };
      modelConfig = {
        url: '/api/example/model'
      };
      TestModel = Backbone.Deferred.Model.extend(modelConfig);
      attributes = {
        id: 1
      };
      this.model = new TestModel(attributes);
      this.respondOk = function() {
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
      };
      return this.respondBad = function() {
        var headers, response, status;
        status = 400;
        headers = {
          'Content-Type': 'application/json'
        };
        response = {
          message: 'Something went wrong'
        };
        return this.requests[0].respond(status, headers, JSON.stringify(response));
      };
    },
    teardown: function() {
      this.model = null;
      this.requests = [];
      return this.xhr.restore();
    }
  };

  module('model', config);

  asyncTest('fetch: deferred ok response', function() {
    var deferred;
    expect(3);
    deferred = this.model.fetch().then(function(result) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('fetch: deferred bad response', function() {
    expect(3);
    this.model.fetch().then(null, function(error) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('fetch: callback ok response', function() {
    var options;
    expect(2);
    options = {
      success: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.fetch(options);
    return this.respondOk();
  });

  asyncTest('fetch: callback bad response', function() {
    var options;
    expect(2);
    options = {
      error: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.fetch(options);
    return this.respondBad();
  });

  asyncTest('save: deferred ok response', function() {
    var deferred;
    expect(3);
    deferred = this.model.save().then(function(result) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('save: deferred bad response', function() {
    expect(3);
    this.model.save().then(null, function(error) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('save: callback ok response', function() {
    var options;
    expect(2);
    options = {
      success: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.save(null, null, options);
    return this.respondOk();
  });

  asyncTest('save: callback bad response', function() {
    var options;
    expect(2);
    options = {
      error: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.save(null, null, options);
    return this.respondBad();
  });

  asyncTest('save: backbone api pass object', function() {
    var options, params;
    expect(1);
    params = {
      sample: 'sample'
    };
    options = {
      success: function(model) {
        ok(model.get('sample') === 'sample', 'make sure the data passed was said.');
        return start();
      }
    };
    this.model.save(params, options);
    return this.respondOk();
  });

  asyncTest('save: backbone api pass key and value', function() {
    var options;
    expect(1);
    options = {
      success: function(model) {
        ok(model.get('sample') === 'sample', 'make sure the data passed was said.');
        return start();
      }
    };
    this.model.save('sample', 'sample', options);
    return this.respondOk();
  });

  asyncTest('destroy: deferred ok response', function() {
    var deferred;
    expect(3);
    deferred = this.model.destroy().then(function(result) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.');
      return start();
    });
    return this.respondOk();
  });

  asyncTest('destroy: deferred bad response', function() {
    expect(3);
    this.model.destroy().then(null, function(error) {
      ok(true, 'Make sure the then callback was called.');
      ok(arguments.length === 1, 'Make sure there is only 1 argument passed.');
      ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.');
      return start();
    });
    return this.respondBad();
  });

  asyncTest('destroy: callback ok response', function() {
    var options;
    expect(2);
    options = {
      success: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.destroy(options);
    return this.respondOk();
  });

  asyncTest('destroy: callback bad response', function() {
    var options;
    expect(2);
    options = {
      error: function() {
        ok(true, 'Make sure the then callback was called.');
        ok(arguments.length === 3, 'Make sure there is 3 arguments passed.');
        return start();
      }
    };
    this.model.destroy(options);
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
    result = new Backbone.Deferred.RejectCollection(collection, jQxhr, options);
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
