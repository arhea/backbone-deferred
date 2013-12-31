(function() {
  var BackboneDeferred, root;

  root = this;

  root.BackboneDeferred = BackboneDeferred = {
    version: '0.2.0'
  };

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  BackboneDeferred.Collection = (function(_super) {
    __extends(Collection, _super);

    function Collection() {
      _ref = Collection.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Collection.prototype.fetch = function(options) {
      var deferred, params, _error, _success;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_success != null) {
            _success.apply(null, args);
          }
          return deferred.resolve(args);
        },
        error: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_error != null) {
            _error.apply(null, args);
          }
          return deferred.reject(args);
        }
      };
      _.extend(options, params);
      Collection.__super__.fetch.call(this, options);
      return deferred.promise;
    };

    return Collection;

  })(Backbone.Model);

}).call(this);

(function() {
  var _ref,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    __slice = [].slice;

  BackboneDeferred.Model = (function(_super) {
    __extends(Model, _super);

    function Model() {
      _ref = Model.__super__.constructor.apply(this, arguments);
      return _ref;
    }

    Model.prototype.fetch = function(options) {
      var deferred, params, _error, _success;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_success != null) {
            _success.apply(null, args);
          }
          return deferred.resolve(args);
        },
        error: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_error != null) {
            _error.apply(null, args);
          }
          return deferred.reject(args);
        }
      };
      _.extend(options, params);
      Model.__super__.fetch.call(this, options);
      return deferred.promise;
    };

    Model.prototype.save = function(key, value, options) {
      var data, deferred, params, _error, _success;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      data = {};
      if (_.isObject(key)) {
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
        success: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_success != null) {
            _success.apply(null, args);
          }
          return deferred.resolve(args);
        },
        error: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_error != null) {
            _error.apply(null, args);
          }
          return deferred.reject(args);
        }
      };
      _.extend(options, params);
      Model.__super__.save.call(this, data, options);
      return deferred.promise;
    };

    Model.prototype.destroy = function(options) {
      var deferred, params, _error, _success;
      if (options == null) {
        options = {};
      }
      deferred = Q.defer();
      _success = _.isFunction(options.success) ? options.success : null;
      _error = _.isFunction(options.error) ? options.error : null;
      params = {
        success: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_success != null) {
            _success.apply(null, args);
          }
          return deferred.resolve(args);
        },
        error: function() {
          var args;
          args = 1 <= arguments.length ? __slice.call(arguments, 0) : [];
          if (_error != null) {
            _error.apply(null, args);
          }
          return deferred.reject(args);
        }
      };
      _.extend(options, params);
      Model.__super__.destroy.call(this, options);
      return deferred.promise;
    };

    return Model;

  })(Backbone.Model);

}).call(this);
