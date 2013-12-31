class Backbone.Deferred.Promise
    constructor: () ->
        @deferred = $.Deferred()

     get: () ->
        return @deferred

    resolve: (result) ->
        @deferred.resolve(result)
        return @;

    reject: (result) ->
        @deferred.reject(result)
        return @;

    promise: () ->
        return @deferred.promise()
