class BackboneDeferred.Model extends Backbone.Model

    fetch: (options = {}) ->

        defer = $.Deferred()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (args...) ->
                if _success?
                    _success args...
                defer.resolve(args)
            error: (args...) ->
                if _error?
                    _error args...
                defer.reject(args)

        _.extend(options, params)

        super(options)

        return defer.promise()

    save: (key, value, options = {}) ->

        defer = $.Deferred()
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
            success: (args...) ->
                if _success?
                    _success args...
                defer.resolve(args)
            error: (args...) ->
                if _error?
                    _error args...
                defer.reject(args)

        _.extend(options, params)

        super(data, options)

        return defer.promise()

    destroy: (options = {}) ->

        defer = $.Deferred()

        _success = if _.isFunction(options.success) then options.success else null
        _error = if _.isFunction(options.error) then options.error else null

        params =
            success: (args...) ->
                if _success?
                    _success args...
                defer.resolve(args)
            error: (args...) ->
                if _error?
                    _error args...
                defer.reject(args)

        _.extend(options, params)

        super(options)

        return defer.promise()
