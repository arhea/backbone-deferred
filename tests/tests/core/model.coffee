config =
    setup: () ->
        requests = @requests = []

        @xhr = sinon.useFakeXMLHttpRequest()

        @xhr.onCreate = (xhr) ->
            requests.push(xhr)

        modelConfig =
             url: '/api/example/model'

        TestModel = Backbone.Deferred.Model.extend(modelConfig)

        attributes =
            id: 1

        @model = new TestModel(attributes)

        @respondOk = () ->
            status = 200
            headers =
                'Content-Type': 'application/json'
            response =
                name: 'Test'
                email: 'test@example.com'

            @requests[0].respond(status, headers, JSON.stringify(response))

        @respondBad = () ->
            status = 400
            headers =
                'Content-Type': 'application/json'
            response =
                message: 'Something went wrong'

            @requests[0].respond(status, headers, JSON.stringify(response))

    teardown: () ->
        @model = null
        @requests = []
        @xhr.restore()


module('model', config)

asyncTest 'fetch: deferred ok response', () ->
    expect 3

    deferred = @model.fetch().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'fetch: deferred bad response', () ->
    expect 3

    @model.fetch().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()

asyncTest 'fetch: callback ok response', () ->
    expect 2

    options =
        success: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.fetch(options)

    @respondOk()

asyncTest 'fetch: callback bad response', () ->
    expect 2

    options =
        error: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.fetch(options)

    @respondBad()

asyncTest 'save: deferred ok response', () ->
    expect 3

    deferred = @model.save().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'save: deferred bad response', () ->
    expect 3

    @model.save().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()

asyncTest 'save: callback ok response', () ->
    expect 2

    options =
        success: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.save(null, null, options)

    @respondOk()

asyncTest 'save: callback bad response', () ->
    expect 2

    options =
        error: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.save(null, null, options)

    @respondBad()

asyncTest 'save: backbone api pass object', () ->
    expect 1

    params =
        sample: 'sample'

    options =
        success: (model) ->
            ok(model.get('sample') is 'sample', 'make sure the data passed was said.')
            start()

    @model.save(params, options)

    @respondOk()

asyncTest 'save: backbone api pass key and value', () ->
    expect 1

    options =
        success: (model) ->
            ok(model.get('sample') is 'sample', 'make sure the data passed was said.')
            start()

    @model.save('sample', 'sample', options)

    @respondOk()

asyncTest 'destroy: deferred ok response', () ->
    expect 3

    deferred = @model.destroy().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'destroy: deferred bad response', () ->
    expect 3

    @model.destroy().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()

asyncTest 'destroy: callback ok response', () ->
    expect 2

    options =
        success: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.destroy(options)

    @respondOk()

asyncTest 'destroy: callback bad response', () ->
    expect 2

    options =
        error: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @model.destroy(options)

    @respondBad()
