class BackboneDeferred.Model extends Backbone.Model

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

    save: (key, value, options = {}) ->

        deferred = Q.defer()
        data = {}

        if _.isObject(key)
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
            success: (args...) ->
                if _success?
                    _success args...
                deferred.resolve(args)
            error: (args...) ->
                if _error?
                    _error args...
                deferred.reject(args)

        _.extend(options, params)

        super(data, options)

        return deferred.promise

    destroy: (options = {}) ->

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
