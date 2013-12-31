##Backbone Deferred
[![Build Status](https://travis-ci.org/arhea/backbone-deferred.png)](https://travis-ci.org/arhea/backbone-deferred)

This library converts models and collections to use the deferred pattern. So instead of returning the raw jQuery XHR object from a fetch, save, or destroy. This library allows you to access all the same functionality provided by the success and error callbacks with the nice deferred pattern.

```javascript
model.save();
```

###Examples
```javascript
var model = new Model({ id: 1 });

model.fetch({
    success: function(model, response, options) {
        alert('Yay!');
    },
    error: function(model, xhr, options) {
        alert('Darn!');
    }
});
```

Becomes

```javascript
var model = new Model({ id: 1 });

model.fetch().done(function(result) {
    alert('Yay!');
}).fail(function(error) {
    alert('Darn!');
});
```
or
```javascript
var model = new Model({ id: 1 });

model.fetch().then(function(result) {
    alert('Yay!');
}, function(error) {
    alert('Darn!');
});
```

###Documentation
Backbone.Deferred supports both the jQuery promise implementation and the Q promise implementation. I will use `.done` and `.fail` in the documentation but for Q these are one method, `.then(doneCallback, failCallback)`. In order to be compliant across libaries the first parameter is an array which contains all the paramters passed to the Backbone callback.

**Backbone.Deferred.Model.fetch(*options*)**
* .done(result)
    * result.model - instance of the model
    * result.response - the response from the server
    * result.options - the options passed to the function
* .fail(error)
    * error.model - instance of the model
    * error.xhr - the jQXhr object
    * error.options - the options passed to the function

**Backbone.Deferred.Model.save(*key*, *val*, *options*)**
* .done(result)
    * result.model - instance of the model
    * result.response - the response from the server
    * result.options - the options passed to the function
* .fail(error)
    * error.model - instance of the model
    * error.xhr - the jQXhr object
    * error.options - the options passed to the function

**Backbone.Deferred.Model.save(*attributes*, *options*)**
* .done(result)
    * result.model - instance of the model
    * result.response - the response from the server
    * result.options - the options passed to the function
* .fail(error)
    * error.model - instance of the model
    * error.xhr - the jQXhr object
    * error.options - the options passed to the function

**Backbone.Deferred.Model.destroy(*options*)**
* .done(result)
    * result.model - instance of the model
    * result.response - the response from the server
    * result.options - the options passed to the function
* .fail(error)
    * error.model - instance of the model
    * error.xhr - the jQXhr object
    * error.options - the options passed to the function

**Backbone.Deferred.Collection.fetch(*options*)**
* .done(result)
    * result.collection - instance of the collection
    * result.response - the response from the server
    * result.options - the options passed to the function
* .fail(error)
    * result.collection - instance of the collection
    * result.xhr - the jQXhr object
    * result.options - the options passed to the function

###Requirements
* Backbone
* Underscore
* jQuery
