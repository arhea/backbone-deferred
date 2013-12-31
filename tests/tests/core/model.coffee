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

asyncTest 'fetch: ok response', () ->
    expect 3

    deferred = @model.fetch().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'fetch: bad response', () ->
    expect 3

    @model.fetch().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()

asyncTest 'save: ok response', () ->
    expect 3

    deferred = @model.save().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'save: bad response', () ->
    expect 3

    @model.save().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()

asyncTest 'destroy: ok response', () ->
    expect 3

    deferred = @model.destroy().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveModel, 'Make sure the arugment is a ResolveModel object.')
        start()
    )

    @respondOk()

asyncTest 'destroy: bad response', () ->
    expect 3

    @model.destroy().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectModel, 'Make sure the arugment is a RejectModel object.')
        start()
    )

    @respondBad()
