(function() {
  var root;

  root = this;

  root.Backbone.Deferred = Backbone.Deferred = {
    version: '0.2.0'
  };

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.Deferred.Reject = (function() {
    function Reject(xhr, options) {
      this.xhr = xhr;
      this.options = options;
    }

    Reject.prototype.getXhr = function() {
      return this.xhr;
    };

    Reject.prototype.getOptions = function() {
      return this.options;
    };

    return Reject;

  })();

  Backbone.Deferred.RejectModel = (function(_super) {
    __extends(RejectModel, _super);

    function RejectModel(model, response, options) {
      this.model = model;
      this.response = response;
      this.options = options;
      RejectModel.__super__.constructor.call(this, this.response, this.options);
    }

    RejectModel.prototype.getModel = function() {
      return this.model;
    };

    return RejectModel;

  })(Backbone.Deferred.Reject);

  Backbone.Deferred.RejectCollection = (function(_super) {
    __extends(RejectCollection, _super);

    function RejectCollection(collection, response, options) {
      this.collection = collection;
      this.response = response;
      this.options = options;
      RejectCollection.__super__.constructor.call(this, this.response, this.options);
    }

    RejectCollection.prototype.getCollection = function() {
      return this.collection;
    };

    return RejectCollection;

  })(Backbone.Deferred.Reject);

}).call(this);

(function() {
  var __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.Deferred.Resolve = (function() {
    function Resolve(response, options) {
      this.response = response;
      this.options = options;
    }

    Resolve.prototype.getResponse = function() {
      return this.response;
    };

    Resolve.prototype.getOptions = function() {
      return this.options;
    };

    return Resolve;

  })();

  Backbone.Deferred.ResolveModel = (function(_super) {
    __extends(ResolveModel, _super);

    function ResolveModel(model, response, options) {
      this.model = model;
      this.response = response;
      this.options = options;
      ResolveModel.__super__.constructor.call(this, this.response, this.options);
    }

    ResolveModel.prototype.getModel = function() {
      return this.model;
    };

    return ResolveModel;

  })(Backbone.Deferred.Resolve);

  Backbone.Deferred.ResolveCollection = (function(_super) {
    __extends(ResolveCollection, _super);

    function ResolveCollection(collection, response, options) {
      this.collection = collection;
      this.response = response;
      this.options = options;
      ResolveCollection.__super__.constructor.call(this, this.response, this.options);
    }

    ResolveCollection.prototype.getCollection = function() {
      return this.collection;
    };

    return ResolveCollection;

  })(Backbone.Deferred.Resolve);

}).call(this);

(function() {
  Backbone.Deferred.Promise = (function() {
    function Promise() {
      this.deferred = Q.defer();
    }

    Promise.prototype.get = function() {
      return this.deferred;
    };

    Promise.prototype.resolve = function(result) {
      this.deferred.resolve(result);
      return this;
    };

    Promise.prototype.reject = function(result) {
      this.deferred.reject(result);
      return this;
    };

    Promise.prototype.promise = function() {
      return this.deferred.promise;
    };

    return Promise;

  })();

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.Deferred.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      _ref = Model.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Model.prototype.fetch = function(options) {
      var defer, params, _error, _success;
      if (options == null) {
        options = {};
      }
      defer = new Backbone.Deferred.Promise();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function(model, response, options) {
          if (_success != null) {
            _success.call(this, model, response, options);
          }
          return defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options));
        },
        error: function(model, xhr, options) {
          if (_error != null) {
            _error.call(this, model, xhr, options);
          }
          return defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options));
        }
      };
      _.extend(options, params);
      Model.__super__.fetch.call(this, options);
      return defer.promise();
    };

    Model.prototype.save = function(key, value, options) {
      var data, defer, params, _error, _success;
      if (options == null) {
        options = {};
      }
      defer = new Backbone.Deferred.Promise();
      data = {};
      if ((key != null) && _.isObject(key)) {
        data = key;
        options = _.extend({}, value);
      } else if (_.isString(key)) {
        data[key] = value;
      } else {
        key = null;
        value = null;
      }
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function(model, response, options) {
          if (_success != null) {
            _success.call(this, model, response, options);
          }
          return defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options));
        },
        error: function(model, xhr, options) {
          if (_error != null) {
            _error.call(this, model, xhr, options);
          }
          return defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options));
        }
      };
      _.extend(options, params);
      Model.__super__.save.call(this, data, options);
      return defer.promise();
    };

    Model.prototype.destroy = function(options) {
      var defer, params, _error, _success;
      if (options == null) {
        options = {};
      }
      defer = new Backbone.Deferred.Promise();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function(model, response, options) {
          if (_success != null) {
            _success.call(this, model, response, options);
          }
          return defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options));
        },
        error: function(model, xhr, options) {
          if (_error != null) {
            _error.call(this, model, xhr, options);
          }
          return defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options));
        }
      };
      _.extend(options, params);
      Model.__super__.destroy.call(this, options);
      return defer.promise();
    };

    return Model;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Backbone.Deferred.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Collection.prototype.fetch = function(options) {
      var defer, params, _error, _success;
      if (options == null) {
        options = {};
      }
      defer = new Backbone.Deferred.Promise();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function(model, response, options) {
          if (_success != null) {
            _success.call(this, model, response, options);
          }
          return defer.resolve(new Backbone.Deferred.ResolveCollection(model, response, options));
        },
        error: function(model, xhr, options) {
          if (_error != null) {
            _error.call(this, model, xhr, options);
          }
          return defer.reject(new Backbone.Deferred.RejectCollection(model, xhr, options));
        }
      };
      _.extend(options, params);
      Collection.__super__.fetch.call(this, options);
      return defer.promise();
    };

    return Collection;

  })(Backbone.Collection);

}).call(this);
