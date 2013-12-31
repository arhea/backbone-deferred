class Backbone.Deferred.Collection extends Backbone.Model

    fetch: (options = {}) ->

        defer = new Backbone.Deferred.Promise()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (model, response, options) ->
                if _success?
                    _success.call(@, model, response, options)
                defer.resolve(new Backbone.Deferred.ResolveCollection(model, response, options))
            error: (model, xhr, options) ->
                if _error?
                    _error.call(@, model, xhr, options)
                defer.reject(new Backbone.Deferred.RejectCollection(model, xhr, options))

        _.extend(options, params)

        super(options)

        return defer.promise()
