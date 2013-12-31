class Backbone.Deferred.Reject
    constructor: (@xhr, @options) ->

    getXhr: () ->
        return @xhr

    getOptions: () ->
        return @options

class Backbone.Deferred.RejectModel extends Backbone.Deferred.Reject
    constructor: (@model, @response, @options) ->
        super(@response, @options)

    getModel: () ->
        return @model

class Backbone.Deferred.RejectCollection extends Backbone.Deferred.Reject
    constructor: (@collection, @response, @options) ->
        super(@response, @options)

    getCollection: () ->
        return @collection
