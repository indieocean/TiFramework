[TiFramework](http://xidlabs.com/) - Wrapper framework for Titanium
================================

What is it?
---------------------------------------
TiFramework is a helper framework for Appcelerator's Titanium.  It's currently in early (yeah really early) alpha.  Actually, if there's was a letter before alpha then it'd probably be that.

TiFramework condenses the Titanium API further and allows you to chain commands together in a jQuery-esque fashion. This will allow you to keep your code condensed and stay within the familiar methods jQuery to accomplish similar things.

Goals
--------------

The following are the goals of the project:

* **`Tidy Code`**: The biggest reason for this framework is to keep the code condensed and organized.  Allowing many of the TI API to be chain-able is the most obvious representation of this goal.

* **`Familiarity`**: This library should not take away you away from learning how Titanium works but rather help you develop in Titanium by using familiar methods and approaches similar to jQuery and Mootools.

* **`OOP`**: The end goal is not to just have a few wrapper methods that allow others to chain UI objects together but to have an OO framework which can be used for an entire app.  This includes things as models, controllers, event driven, etc.

* **`Remove barrier to entry`**: The Titanium API is a really simple concept but some people have a difficult time getting their head wrapped around the concepts.  This library is meant to lessen the learning curve and barrier to entry.

If you want to make it better
-----------------------------
I'm definitely not the smartest on Github so if you see a way to make the framework much better, add more functionality, etc.  Please contribute!  As the framework grows I'd love to post some info on best practices, proper naming and coding conventions, etc.  This thing will evolve as long as others are contributing and helping improve it!


How do I use it?
-----------------------------

Here are some examples on how to use the framework.  More will be documented in the wiki as support for the Titanium API is fleshed out.

In this case we're just re-assigning the TiFrameowrk namespace to $ sign for a faux-jQuery appearance
    
    var $ = TiFramework;

Create a new window.  Notice .context is appended.  That way the variable is actually
storing the window object itself and not the full TiFramework class.  Probably
should be rewritten so this isn't necessary.

NOTE:  It will take two types for it's argument.  You can pass it a string such as "window", "label", "view", etc.  This will create a new UI object of that name.  Or you can pass an already created, native Titanium object as the argument.*

    var main_window 	= $('window');
    var second_window 	= $('window');

Create a new tabgroup, add new tabs, assign tabs the appropriate window, open the tab group.  Notice that the window values have .context appended.  This is because we need to pass in the literal Titanium object, not the framework object.

    $('tabgroup')
    		.tab({title: 'Examples', window: main_window.context})
    		.tab({title: 'Second Tab', window: second_window.context})
    	.open();

Just some dummy data for examples

    var data = [
    	{ title: 'Test' },
    	{ title: 'Test', hasDetail: true },
    	{ title: 'Test', hasChild: true }
    ];

Put a table with data in an already created window

    main_window.tableView({data: data});

Put a new label on an existing window

    main_window
    	.label({text: 'New Label', zIndex: 9999, color: '#333', textAlign: 'center', height: 50, bottom: 10})
    	.click(function(e) {
    		alert('Label Clicked');
    	});

Create a new view, add a label to it, append the view to the existing window, add a click function

    $('view').label({text: 'New Label', color: '#eee', textAlign: 'center'})
    	.appendTo(second_window)
    	.click(function(e) {
    		alert('View Clicked');
    	});
    	
    	
Use the AJAX method to create rows that are populated from a twitter feed

      $.ajax({
      	timeout: 3000, 
      	type: 'GET',		
      	url: 'http://search.twitter.com/search.json?q=from:appcelerator',
      	callback: function(data) {
      		var customTableView = $('table').appendTo(second_window);

      		for (var i = 0; i < data.results.length; i++) {
      			customTableView.row({title: data.results[i].text});
      		};		
      	}
      });
    
slideIn() / slideOut() can be used to hide / show elements using animation.  The the methods take two optional arguments: (1) an options object with any custom animation settings, (2) A callback

    var main_window = $('currentWin');

    var label = $('label').setOpts({text: 'New Label'}).appendTo(main_window).slideIn();

    label.click(function() {
	    label.slideOut({duration: 1000}, function(){
          alert('Label Slid Out);
	    });
    });
   
   
Extending the framework is very similar to jQuery:

      (function() {
      	var options = { string: 'Default String' };
	
      	TiFramework.extend('test', function(string) {
      		if (string == undefined) {
      			alert(options.string);
      		} else {
      			alert(string);			
      		}
      	});
	
      })(TiFramework);
      
Now, you have a plugin called `test()` that can be chained or used as a stand-alone function (i.e. `$.test('some test')` or `someWindow.test('cool!')` )      

Roadmap
-----------------------------
**Version 0.1 `Zergling`**
Version 0.1 is an evolving version.  When 0.2 is reached the code will be stable and won't incur any broken functionality if subsequent versions are implemented (hopefully).  The following list is a tentative list of things I'd like to see get implemented for **0.1**

* **`.clone()`**:  Duplicate the selected object for reuse
* **`.empty()`**:  Remove all child objects of the current context
* **`.emptyTable()`**:  Remove all rows of a given table
* **`.filter()`**: Select a specific child object from the context (by type or index).  This will, by default make the filterable object the new context.
* **`.getProp()`**: Gets a specific property from the current context (just a quick helper method.  the same can already be achieved by doing `someObj.context.someProp`)
* More Ti.UI support: dialogs, buttons, animation, ActivityIndicator, imageView, OptionDialog, Picker, ScrollView, SearchBar, Slider, Switch, Tab (partially implemented already), TableViewSection, Textarea / TextField, WebView
* Object helpers (i.e. .each() to loop through object properties.  .merge() to merge different objects, etc.)
* Array helpers
* String helpers
* Interface builder:  To help rapidly create specific interfaces / UI.  Might be a plugin / extension down the road though.
* MVC helpers (for creating models, views, controllers)


