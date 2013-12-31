class BackboneDeferred.Collection extends Backbone.Model

    fetch: (options = {}) ->

        deferred = Q.defer()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (args...) ->
                if _success?
                    _success args...
                deferred.resolve(args)
            error: (args...) ->
                if _error?
                    _error args...
                deferred.reject(args)

        _.extend(options, params)

        super(options)

        return deferred.promise
