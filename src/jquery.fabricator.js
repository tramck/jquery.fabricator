/*!
 * jQuery lightweight plugin boilerplate
 * Original author: @ajpiano
 * Further changes, comments: @addyosmani
 * Licensed under the MIT license
 */

// the semi-colon before the function invocation is a safety
// net against concatenated scripts and/or other plugins
// that are not closed properly.
;(function ( $, window, document, undefined ) {

  // undefined is used here as the undefined global
  // variable in ECMAScript 3 and is mutable (i.e. it can
  // be changed by someone else). undefined isn't really
  // being passed in so we can ensure that its value is
  // truly undefined. In ES5, undefined can no longer be
  // modified.

  // window and document are passed through as local
  // variables rather than as globals, because this (slightly)
  // quickens the resolution process and can be more
  // efficiently minified (especially when both are
  // regularly referenced in your plugin).

  // Create the defaults once
  var pluginName = "fabricator",
      defaults = {
        shape: "triangle",
        size: 50,
        animation: false,

      };

  // The actual plugin constructor
  function Fabricator( el, options ) {
    this.el = el;
    this.$el = $(el);

    // jQuery has an extend method that merges the
    // contents of two or more objects, storing the
    // result in the first object. The first object
    // is generally empty because we don't want to alter
    // the default options for future instances of the plugin
    this.options = $.extend( {}, defaults, options) ;

    this._defaults = defaults;
    this._name = pluginName;
    this._data = {};

    this.init();
  }

  Fabricator.prototype = {

    init: function() {
      // Place initialization logic here
      // You already have access to the DOM element and
      // the options via the instance, e.g. this.element
      // and this.options
      // you can add more functions like the one below and
      // call them like so: this.yourOtherFunction(this.element, this.options).
      
      if (this.swapImgWithCanvas()) {
        this.setUpPoints();
      }
    },

    swapImgWithCanvas: function() {
      // if el is an image 
      // insert canvas element after image
      // hide image element

      var self = this;

      if (self.$el.is('img')) {
        self.$canvas = $('<canvas />');
        self.$canvas
          .width(self.$el.width())
          .height(self.$el.height());
        self.$el.after(self.$canvas);
        self.$el.hide();
        self.context = self.$canvas[0].getContext('2d');
        return true;
      } 
      else {
        $.error('Element used must be an <img>.');
        return false;
      }

    },

    setUpPoints: function() {
      var self = this;
      self._data.points = [];
      switch (self.options.shape) {
        case "triangle":
          // make squares
          self.trianglePoints();
          break;
        case "square":
          // make squares
          self.squarePoints();
          break;
        case "bucky":
          // make triangles
          self.trianglePoints();
          // make bucky
          self.buckyPoints();
          break;
        default:
          $.error('Invalid shape option.');
      }
    },

    Point: function(x,y) {
      this.x = x;
      this.y = y;
    },

    squarePoints: function() {
      var self = this,
          size = self.options.size,
          width = self.$canvas.width(),
          height = self.$canvas.height(),
          point;

      for (var x = 0; x < width; x += size) {
        for (var y = 0; y < height; y += size) {
          point = new self.Point(x, y);
          self._data.points.push(point);
        }
      }

      self.setSquareColor();
    },

    trianglePoints: function() {
    },

    buckyPoints: function() {
    },

    setSquareColor: function() {
      var self = this,
          x,
          y;

      for (var i = 0; i < self._data.points.length; i++) {
        self._data.points[i]
      };
    }
  };

  // A really lightweight plugin wrapper around the constructor,
  // preventing against multiple instantiations
  $.fn[pluginName] = function ( options ) {
    return this.each(function () {
        if (!$.data(this, "plugin_" + pluginName)) {
          $.data(this, "plugin_" + pluginName,
          new Fabricator( this, options ));
        }
    });
  };

})( jQuery, window, document );