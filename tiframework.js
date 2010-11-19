/*
 * TiFramework for Titanium
 *
 * Copyright 2010, Rick Blalock
 * Licensed under the MIT
 * Copyright (c) 2010 Rick Blalock
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

// Set current version and codename constants.  This is helpful if
// you need to work with different versions
// @TODO Not implemented yet
var TI_FRAMEWORK_VERSION 	= '0.1', 
	TI_FRAMEWORK_CODENAME 	= 'Zergling';

/**
 * The Framework class
 *
 * @param mixed context
 */	
function TiFramework(context) {
	// Return the new framework class
	return new TiFramework.core(context);
};

TiFramework.core = TiFramework.prototype = function(context) {
	// Make the context accessible
	this.context = context;
	
	// Return the object even if no context is provided
	if(!this.context) {
		return this;
	}
	
	/** 
	 * Handle new context
	 * @TODO create more
	 */
	if(typeof this.context === 'string') {
		// Determine the string context
		switch(this.context) {
			case 'window':
				this.context = Ti.UI.createWindow();
				break;
				
			case 'view':
				this.context = Ti.UI.createView();
				break;

			case 'table':
				this.context = Ti.UI.createTableView();
				break;				
				
			case 'label':
				this.context = Ti.UI.createLabel();
				break;	
				
			case 'tabgroup':
				this.context = Ti.UI.createTabGroup();
				break;
				
			case 'navigationgroup':
	            this.context = Ti.UI.iPhone.createNavigationGroup();				
				
			case 'row':
				this.context = Ti.UI.createTableViewRow();
				break;	
				
			case 'image':
				this.context = Ti.UI.createImageView();
				break;	
				
			case 'button':
				this.context = Ti.UI.createButton();
				break;	
				
			case 'email':
				this.context = Ti.UI.createEmailDialog();
				break;
				
			case 'web':
				this.context = Ti.UI.createWebView();
				break;
				
			case 'paypal':
				this.context = Ti.Paypal.createPaypalButton();
				break;
			
			case 'currentWin':
				this.context = Ti.UI.currentWindow;
				break;
		}
	}

/** --- EVENT HELPERS --- */

	/** Add event wrapper
	 *
	 * @param string event
	 * @param function callback	
	 */
	this.event = function(event, callback) {		
		this.context.addEventListener(event, function(e) {
			callback(e);
		});

		return this;
	};

	/** Click event helper
	 *
	 * @param function callback
	 */
	this.click = function(callback) {		
		this.event('click', callback);

		return this;
	};
	
	/** Focus event helper
	 *
	 * @param function callback
	 */
	this.focus = function(callback) {		
		this.event('focus', callback);

		return this;
	};	

/** --- UI UTILITIES --- */

	/** Attach data to the context (usually tableView)
	 *
	 * @param object data
	 */
	this.setData = function(data) {		
		this.context.data = data;
	
		return this;
	};

	/** Attach options to the context
	 *
	 * @param object opts
	 */
	this.setOpts = function(opts) {		
		if(opts) {
			for(var prop in opts) {
				if (opts.hasOwnProperty(prop)) {
					this.context[prop] = opts[prop];
				}
			}			
		}
	
		return this;
	};		

	/** Append current context to the indicated element
	 *
	 * @param object
	 */
	this.appendTo = function(element) {
		element.context.add(this.context);
	
		return this;
	};
	
	/** Append passed object to current context
	 *
	 * @param object
	 */
	this.append = function(element) {
		if( typeof(element.context) == 'undefined'){
			this.context.add(element);
		}else{
			this.context.add(element.context);
		}
	
		return this;
	};
	
	/** Wrapper for the native appendRow method
	 *
	 * @param object
	 */
	this.addRowTo = function(element) {
		element.context.appendRow(this.context);
	
		return this;
	};		
	
	/** Open the current context
	 *
	 * @param object opts
	 */
	this.open = function(opts) {
		this.context.open(opts);
		
		return this;
	};
	
	/** Helper method of getting the children of an object
	 *
	 * @param int index
	 */
	this.children = function(index) {
		if(index) {
			return this.context.children[index];
		} else if(!index) {
			return this.context.children;
		}
	};
	
	/** Removes child items of specified context
	 *
	 * @param int index
	 */
	this.empty = function(index) {
		// @TODO This currently crashes.  In fact the native .remove() method crashes
		// on any object.  Bug in 1.4.1.1?
		// If optional index provided, remove just that one
		if(index) {
			this.context.children[index].remove();
		} else if(!index) {
			for(var i = 0; i < this.context.children.length; i++) {
				this.context.children[i].remove();
			}
		}
		
		return this;
	};
	
	/** Wrapper for native hideNavBar method
	 *
	 */
	this.hideNavBar = function() {
		
		this.context.hideNavBar();
		
		return this;
	};
	
	/** Wrapper for native hideTabBar method
	 *
	 */
	this.hideTabBar = function() {
		
		this.context.hideTabBar();
		
		return this;
	};		

/** --- UI ELEMENTS --- */
	
	/** Create a general view object
	 *
	 * @param object opts
	 */
	this.view = function(opts) {
		var view = Ti.UI.createView(opts);
	
		this.context.add(view);
	
		return this;
	};

	/** Create and add a tableview
	 *
	 * @param object opts
	 */
	this.table = function(opts) {
		var tableview = Ti.UI.createTableView(opts);
		
		this.context.add(tableview);
		
		return this;
	};
	
	/** Create and add a row to an existing table
	 *
	 * @param object opts
	 * @param object props	
	 */
	this.row = function(opts, props) {
		var row = Ti.UI.createTableViewRow(opts);
		
		if(!props) {
			this.context.appendRow(row);			
		} else {
			this.context.appendRow(row, props);
		}
		
		return this;
	};		
	
	/** Create and add a label
	 *
	 * @param object opts
	 */
	this.label = function(opts) {
		var label = Ti.UI.createLabel(opts);
		
		this.context.add(label);
		
		return this;
	};
	
	/** Create and add an image view
	 *
	 * @param object opts
	 */
	this.image = function(opts) {
		var image = Ti.UI.createImageView(opts);
		
		this.context.add(image);
		
		return this;
	};	
	
	/** Create and add a PayPal button
	 *
	 * @required PayPal module
	 * @param object opts
	 */
	this.paypal = function(opts) {
		var paypalBtn = Ti.Paypal.createPaypalButton(opts);
		
		this.context.add(paypalBtn);
		
		return this;
	};	
	
	/** Create and add a tab to a tab group
	 *
	 * @param object opts
	 */
	this.tab = function(opts) {
		var tab = Ti.UI.createTab(opts);
		
		this.context.addTab(tab);
		
		return this;
	};			

/** --- ANIMATION METHODS --- */
	/** Slide an element in
	 *
	 * @param object opts
	 * @param function callback		
	 */	
	this.slideIn = function(opts, callback) {	
		this.context.left = -Ti.Platform.displayCaps.platformWidth;
		this.context.opacity = 0;
		
		if(opts == null) {
			opts = {
				left: 0,
				opacity: 1,
				duration: 700
			};		
		} else {
			opts.left 		= (!opts.hasOwnProperty('left')) 		? 0 : opts.left;
			opts.opacity 	= (!opts.hasOwnProperty('opacity')) 	? 1 : opts.opacity;
			opts.duration 	= (!opts.hasOwnProperty('duration')) 	? 700 : opts.duration;			
		}
		
		this.context.animate(opts, function() {
			if(typeof callback == 'function') {
				callback(this.context);
			}
		});
		
		return this;
	};
	
	/** Slide an element out
	 *
	 * @param object opts
	 * @param function callback	
	 */	
	this.slideOut = function(opts, callback) {
		if(opts == null) {
			opts = {
				left: -Ti.Platform.displayCaps.platformWidth,
				opacity: 0,
				duration: 700
			};			
		} else {
			opts.left 		=	(!opts.hasOwnProperty('left')) 		? -Ti.Platform.displayCaps.platformWidth : opts.left;
			opts.opacity 	=	(!opts.hasOwnProperty('opacity')) 	? 0 : opts.opacity;
			opts.duration 	=  	(!opts.hasOwnProperty('duration')) 	? 700 : opts.duration;			
		}
		
		this.context.animate(opts, function() {
			if(typeof callback == 'function') {
				callback(this.context);
			}
		});
		
		return this;
	};
	
	/** Fade in an element
	 *
	 * @param object opts
	 * @param function callback	
	 */	
	this.fadeIn = function(opts, callback) {
		this.context.opacity = 0;
		
		if(opts == null) {
			opts = {
				opacity: 1,
				duration: 700
			};			
		} else {
			opts.opacity 	= (!opts.hasOwnProperty('opacity'))	? 1 : opts.opacity;
			opts.duration 	= (!opts.hasOwnProperty('duration')) ? 700 : opts.duration;			
		}
		
		this.context.animate(opts, function() {
			if(typeof callback == 'function') {
				callback(this.context);
			}
		});
		
		return this;
	};	
	
	/** Fade out an element
	 *
	 * @param object opts
	 * @param function callback	
	 */	
	this.fadeOut = function(opts, callback) {
		if(opts == null) {
			opts = {
				opacity: 0,
				duration: 700
			};			
		} else {
			opts.opacity 	= (!opts.hasOwnProperty('opacity')) 	? 0 : opts.opacity;
			opts.duration 	= (!opts.hasOwnProperty('duration')) 	? 700 : opts.duration;			
		}
		
		this.context.animate(opts, function() {
			if(typeof callback == 'function') {
				callback(this.context);
			}
		});
		
		return this;
	};		

	
/** --- Return the global object --- */
	return this;
};

// Re-assign the Tiframework prototype to the main namespace for access
TiFramework.prototype = TiFramework;

/** UTILITIY EXTENSTIONS **/
/**
 * Allows for extending the framework while keeping it in context
 *
 * @param string 	name 		Name of the new extension
 * @param function 	extension 	The extension function 	
 */
TiFramework.prototype.extend = function(name, extension) {
	var extName = name;

	// Note: The reason why I extend the prototype of TiFramework AND the core
	// is so it can be chainable or stand alone (i.e. $.YourExt())
	// I'm not sure of another way to do this.
	TiFramework.prototype[extName] = TiFramework.core.prototype[extName] = function(args) {
		extension(args);

		// Detect if the extension will create a new context (must be defined
		// in the extension to work, currently)
		if(typeof context == 'object') {
			return new TiFramework.core(context);
		} else {
			return this;
		}
	};
};

/**
 * Basic XHR connection
 *
 * @param object opts
 * @param function callback	
 */	
TiFramework.extend('ajax', function(opts) {
	// Setup the xhr object
	var xhr = Ti.Network.createHTTPClient();

	/**
		AVAILABLE OPTIONS
		
		timeout 	: int Timeout request
		type		: string GET/POST
		data		: mixed The data to pass
		url			: string The url source to call
		onerror		: funtion A function to execute when there is an XHR error
	*/

	// Set the timeout or a default if one is not provided
	xhr.timeout = (opts.timeout) ? opts.timeout : 10000;	

	// Error Handling
	xhr.onerror = function(e) {
		if(opts.onerror) {
			opts.onerror(e);				
		} else {
			Ti.API.info(e.error);
		}
		
		return e;
	};


	// Execute when xhr is loaded
	xhr.onload = function() {
		// If successful
		try 
		{
			if (this.responseText == 'null') {
				Ti.API.info(this);
			} else {
			
				// Store the response
				var data = eval('('+this.responseText+')');

				if(opts.callback) {
					// Execute a callback function
					opts.callback(data);					
				} else {
					return data;
				}
			}
		}
		// If not successful
		catch(e) 
		{
			if(opts.onerror) {
				opts.onerror(e);				
			} else {
				Ti.API.info(e);
			}
		}
		
		return true;
	};

	// Open the remote connection
	xhr.open(opts.type, opts.url);

	// send the data
	xhr.send(opts.data);
});


/**
 * Rapid UI Builder
 *
 * @param string element
 * @param object opts	
 */	
TiFramework.core.prototype.Builder = function(element, opts) {
	this.opts = opts;
};