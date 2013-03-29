##Backbone Deferred
This library converts models and collections to use the deferred pattern. So instead of returning the raw jQuery XHR object from a fetch, save, or destroy. This library allows you to access all the same functionality provided by the success and error callbacks with the nice deferred pattern.

###Requirements
* Backbone
* Underscore
* jQuery

###API Changes
This library assumes that when you save that you want to save all attributes.  So now when using the `save` method just pass an options hash.

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

model.fetch().done(function(model, response, options) {
    alert('Yay!');
}).fail(function(model, xhr, options) {
    alert('Darn!');
});

```