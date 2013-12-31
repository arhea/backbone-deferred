module 'Results'

test 'resolve model', () ->
    model = new Backbone.Model()
    response = 'my great response'
    options =
        test1: 1
        test2: 2
        test3: 3

    result = new Backbone.Deferred.ResolveModel(model, response, options)

    deepEqual(model, result.model, 'model properly handled via dot accessor')
    deepEqual(model, result.getModel(), 'model properly handled via getModel() method')

    equal(response, result.response, 'response properly handled via dot accessor')
    equal(response, result.getResponse(), 'response properly handled via getResponse() method')

    deepEqual(options, result.options, 'options properly handled via dot accessor')
    deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method')

test 'resolve collection', () ->
    collection = new Backbone.Collection()
    response = 'my great response'
    options =
        test1: 1
        test2: 2
        test3: 3

    result = new Backbone.Deferred.ResolveCollection(collection, response, options)

    deepEqual(collection, result.collection, 'collection properly handled via dot accessor')
    deepEqual(collection, result.getCollection(), 'collection properly handled via getCollection() method')

    equal(response, result.response, 'response properly handled via dot accessor')
    equal(response, result.getResponse(), 'response properly handled via getResponse() method')

    deepEqual(options, result.options, 'options properly handled via dot accessor')
    deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method')

test 'reject model', () ->
    model = new Backbone.Model()
    jQxhr =
        url: '/example/test'
    options =
        test1: 1
        test2: 2
        test3: 3

    result = new Backbone.Deferred.RejectModel(model, jQxhr, options)

    deepEqual(model, result.model, 'model properly handled via dot accessor')
    deepEqual(model, result.getModel(), 'model properly handled via getModel() method')

    equal(jQxhr, result.xhr, 'xhr properly handled via dot accessor')
    equal(jQxhr, result.getXhr(), 'xhr properly handled via getXhr() method')

    deepEqual(options, result.options, 'options properly handled via dot accessor')
    deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method')

test 'reject collection', () ->
    collection = new Backbone.Collection()
    jQxhr =
        url: '/example/test'
    options =
        test1: 1
        test2: 2
        test3: 3

    result = new Backbone.Deferred.RejectCollection(collection, jQxhr, options)

    deepEqual(collection, result.collection, 'collection properly handled via dot accessor')
    deepEqual(collection, result.getCollection(), 'collection properly handled via getCollection() method')

    equal(jQxhr, result.xhr, 'xhr properly handled via dot accessor')
    equal(jQxhr, result.getXhr(), 'xhr properly handled via getXhr() method')

    deepEqual(options, result.options, 'options properly handled via dot accessor')
    deepEqual(options, result.getOptions(), 'options properly handled via getOptions() method')


