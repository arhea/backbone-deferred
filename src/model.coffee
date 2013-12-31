class Backbone.Deferred.Model extends Backbone.Model

    fetch: (options = {}) ->

        defer = new Backbone.Deferred.Promise()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (model, response, options) ->
                if _success?
                    _success.call(@, model, response, options)
                defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options))
            error: (model, xhr, options) ->
                if _error?
                    _error.call(@, model, xhr, options)
                defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options))

        _.extend(options, params)

        super(options)

        return defer.promise()

    save: (key, value, options = {}) ->

        defer = new Backbone.Deferred.Promise()
        data = {}

        if key? and _.isObject(key)
            data = key
            options = _.extend({}, value)
        else if _.isString(key)
            data[key] = value
        else
            key = null
            value = null

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (model, response, options) ->
                if _success?
                    _success.call(@, model, response, options)
                defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options))
            error: (model, xhr, options) ->
                if _error?
                    _error.call(@, model, xhr, options)
                defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options))

        _.extend(options, params)

        super(data, options)

        return defer.promise()

    destroy: (options = {}) ->

        defer = new Backbone.Deferred.Promise()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (model, response, options) ->
                if _success?
                    _success.call(@, model, response, options)
                defer.resolve(new Backbone.Deferred.ResolveModel(model, response, options))
            error: (model, xhr, options) ->
                if _error?
                    _error.call(@, model, xhr, options)
                defer.reject(new Backbone.Deferred.RejectModel(model, xhr, options))

        _.extend(options, params)

        super(options)

        return defer.promise()
