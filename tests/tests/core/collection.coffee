config =
    setup: () ->
        requests = @requests = []

        @xhr = sinon.useFakeXMLHttpRequest()

        @xhr.onCreate = (xhr) ->
            requests.push(xhr)

        collectionConfig =
             url: '/api/example/model'

        TestCollection = Backbone.Deferred.Collection.extend(collectionConfig)

        attributes =
            id: 1

        @collection = new TestCollection([attributes])

        @respondOk = () ->
            status = 200
            headers =
                'Content-Type': 'application/json'
            response = [
                {
                    name: 'Test',
                    email: 'test@example.com'
                }
            ]

            @requests[0].respond(status, headers, JSON.stringify(response))

        @respondBad = () ->
            status = 400
            headers =
                'Content-Type': 'application/json'
            response =
                message: 'Something went wrong'

            @requests[0].respond(status, headers, JSON.stringify(response))

    teardown: () ->
        @collection = null
        @requests = []
        @xhr.restore()


module('collection', config)

asyncTest 'fetch: deferred ok response', () ->
    expect 3

    deferred = @collection.fetch().then((result) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(result instanceof Backbone.Deferred.ResolveCollection, 'Make sure the arugment is a ResolveCollection object.')
        start()
    )

    @respondOk()

asyncTest 'fetch: deferred bad response', () ->
    expect 3

    @collection.fetch().then(null, (error) ->
        ok(true, 'Make sure the then callback was called.')
        ok(arguments.length is 1, 'Make sure there is only 1 argument passed.')
        ok(error instanceof Backbone.Deferred.RejectCollection, 'Make sure the arugment is a RejectCollection object.')
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

    @collection.fetch(options)

    @respondOk()

asyncTest 'fetch: callback bad response', () ->
    expect 2

    options =
        error: () ->
            ok(true, 'Make sure the then callback was called.')
            ok(arguments.length is 3, 'Make sure there is 3 arguments passed.')
            start()

    @collection.fetch(options)

    @respondBad()
