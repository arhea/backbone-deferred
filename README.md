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
BackboneDeferred supports both the jQuery promise implementation and the Q promise implementation. I will use `.done` and `.fail` in the documentation but for Q these are one method, `.then(doneCallback, failCallback)`. In order to be compliant across libaries the first parameter is an array which contains all the paramters passed to the Backbone callback.

**BackboneDeferred.Model.fetch(*options*)**
* .done([model, response, options])
    * model - instance of the model
    * response - the response from the server
    * options - the options passed to the function
* .fail([model, xhr, options])
    * model - instance of the model
    * xhr - the jQXhr object
    * options - the options passed to the function

**BackboneDeferred.Model.save(*key*, *val*, *options*)**
* .done([model, response, options])
    * model - instance of the model
    * response - the response from the server
    * options - the options passed to the function
* .fail([model, xhr, options])
    * model - instance of the model
    * xhr - the jQXhr object
    * options - the options passed to the function

**BackboneDeferred.Model.save(*attributes*, *options*)**
* .done([model, response, options])
    * model - instance of the model
    * response - the response from the server
    * options - the options passed to the function
* .fail(model, xhr, options])
    * model - instance of the model
    * xhr - the jQXhr object
    * options - the options passed to the function

**BackboneDeferred.Model.destroy(*options*)**
* .done([model, response, options])
    * model - instance of the model
    * response - the response from the server
    * options - the options passed to the function
* .fail([model, xhr, options])
    * model - instance of the model
    * xhr - the jQXhr object
    * options - the options passed to the function

**BackboneDeferred.Collection.fetch(*options*)**
* .done([collection, response, options])
    * collection - instance of the collection
    * response - the response from the server
    * options - the options passed to the function
* .fail([model, xhr, options])
    * collection - instance of the collection
    * xhr - the jQXhr object
    * options - the options passed to the function

###Requirements
* Backbone
* Underscore
* jQuery
