(function(root, factory) {

  // Checking if backbone is defined as amd module
  if (typeof define === 'function' && define.amd) {
    define(['backbone', 'q'], function() {
      factory(root);
    });

  // If not, business as usual
  } else {
    factory(root);
  }

}(this, function(root) {
