(function(Backbone, $, undefined){

    Backbone.DeferredModel = Backbone.Model.extend({

        fetch: function(options) {
            options = options || {};
            var self = this;
            var defer = $.Deferred();
            var _success = null;
            var _error = null;

            if(options.success && _.isFunction(options.success)) { _success = options.success; }
            if(options.error && _.isFunction(options.error)) { _error = options.error; }

            Backbone.Model.prototype.fetch.call(this, _.extend(options, {
                success: function(model, response, options) {
                    if(_success) { _success.apply(this, [model, response, options]); }
                    defer.resolveWith(this, [model, response, options]);
                },
                error: function(model, xhr, options) {
                    if(_error) { _error.apply(this, [model, xhr, options]); }
                    defer.rejectWith(this, [model, xhr, options]);
                }
            }));

            return defer.promise();
        },

        save: function(options) {
            options = options || {};
            var self = this;
            var defer = $.Deferred();
            var _success = null;
            var _error = null;

            if(options.success && _.isFunction(options.success)) { _success = options.success; }
            if(options.error && _.isFunction(options.error)) { _error = options.error; }

            Backbone.Model.prototype.save.call(this, this.attributes, _.extend(options, {
                success: function(model, response, options) {
                    if(_success) { _success.apply(this, [model, response, options]); }
                    defer.resolveWith(this, [model, response, options]);
                },
                error: function(model, xhr, options) {
                    if(_error) { _error.apply(this, [model, xhr, options]); }
                    defer.rejectWith(this, [model, xhr, options]);
                }
            }));

            return defer.promise();
        },

        destroy: function(options) {
            options = options || {};
            var self = this;
            var defer = $.Deferred();
            var _success = null;
            var _error = null;

            if(options.success && _.isFunction(options.success)) { _success = options.success; }
            if(options.error && _.isFunction(options.error)) { _error = options.error; }

            Backbone.Model.prototype.destroy.call(this, _.extend(options, {
                success: function(model, response, options) {
                    if(_success) { _success.apply(this, [model, response, options]); }
                    defer.resolveWith(this, [model, response, options]);
                },
                error: function(model, xhr, options) {
                    if(_error) { _error.apply(this, [model, xhr, options]); }
                    defer.rejectWith(this, [model, xhr, options]);
                }
            }));

            return defer.promise();
        }

    });

    Backbone.DeferredCollection = Backbone.Collection.extend({

        fetch: function(options) {
            options = options || {};
            var self = this;
            var defer = $.Deferred();
            var _success = null;
            var _error = null;

            if(options.success && _.isFunction(options.success)) { _success = options.success; }
            if(options.error && _.isFunction(options.error)) { _error = options.error; }

            Backbone.Collection.prototype.fetch.call(this, _.extend(options, {
                success: function(collection, response, options) {
                    if(_success) { _success.apply(this, [collection, response, options]); }
                    defer.resolveWith(this, [collection, response, options]);
                },
                error: function(collection, xhr, options) {
                    if(_error) { _error.apply(this, [collection, xhr, options]); }
                    defer.rejectWith(this, [collection, xhr, options]);
                }
            }));

            return defer.promise();
        }

    });

})(Backbone, jQuery);