;(function($) {

	/**
	 * jQuery Easing Slider
	 *
	 * This is essentially a container for our interactions with Owl Carousel, aliased as `$.easingSlider` to avoid conflicts.
	 * We're relying on it as our third-party slider script, plus some additional functionality to enhance.
	 */
	$.EasingSlider = function(el) {

		// Core variables
		var base = this;

		// Establish our elements
		base.el       = el;
		base.$el      = $(base.el);
		base.$wrapper = base.$el.find('.easingslider-wrapper');
		base.$slides  = base.$el.find('.easingslider-slide');

		// Get options
		base.options = window['EasingSlider'+ base.$el.attr('data-id')];

		// Determine click event
		base._clickEvent = ( 'ontouchstart' in document.documentElement ) ? 'touchstart' : 'click';

		// Store our data for external access
		base.$el.data('easingslider', base);

		/**
		 * Initiates the slider
		 */
		base.initSlider = function() {

			// Initiate Owl Carousel (aliased as $.easingSlider to avoid conflicts)
			base.$el.easingSlider($.extend(base.options, {
				afterInit: function() {
					base._maybeResize();
				},
				afterUpdate: function() {
					base._maybeResize();
				},
				afterAction: function() {
					base.$el.trigger('changeSlide', this.currentItem);	
				}
			}));

		};

		/**
		 * Resizes the slider if aspect ratio is enabled
		 */
		base._maybeResize = function() {

			// Resize if maintaining aspect ratio
			if ( base.$el.hasClass('easingslider-aspect-ratio') ) {
				base.doResize();
			}

			return base;

		};

		/**
		 * Executes a resize
		 */
		base.doResize = function() {

			// Get the current width
			var currentWidth = base.$el.outerWidth();

			// If it has changed, resize the height to match.
			if ( currentWidth <= base.options.width ) {

				// Using the default slider width, let's calculate the percentage change and thus calculate the new height.
				var newHeight = Math.floor((currentWidth / base.options.width) * base.options.height);

				// Set the wrapper height
				base.$el.css({ 'height': newHeight +'px' });
				base.$wrapper.css({ 'height': newHeight +'px' });

			}

			return base;

		};

		// Initialize plugin
		base.initSlider();

	};

	/**
	 * Initiate slider(s)
	 */
	$.fn.EasingSlider = function() {
		return this.each(function() {
			new $.EasingSlider(this);
		});
	};

	/**
	 * Let's go!
	 */
	$(document).ready(function() {
		$('.easingslider').EasingSlider();
	});

})(jQuery);
