class Backbone.Deferred.Resolve
    constructor: (@response, @options) ->

    getResponse: () ->
        return @response

    getOptions: () ->
        return @options

class Backbone.Deferred.ResolveModel extends Backbone.Deferred.Resolve
    constructor: (@model, @response, @options) ->
        super(@response, @options)

    getModel: () ->
        return @model

class Backbone.Deferred.ResolveCollection extends Backbone.Deferred.Resolve
    constructor: (@collection, @response, @options) ->
        super(@response, @options)

    getCollection: () ->
        return @collection
