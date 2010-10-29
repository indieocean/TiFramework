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

NOTE:  It will take two types for it's arguement.  You can pass it a string such as "window", "label", "view", etc.  This will create a new UI object of that name.  Or you can pass an already created object as the argument.  Below we're creating two new windows.  If I wanted to reference one of the windows below for the framework's use I would use **'$(main_window)'** or **'$(second_window)'**

    var main_window 	= $('window').context;
    var second_window 	= $('window').context;

Create a new tabgroup, add new tabs, assign tabs the appropriate window, open the tab group

    $('tabgroup')
    		.tab({title: 'Examples', window: main_window})
    		.tab({title: 'Second Tab', window: second_window})
    	.open();

Just some dummy data for examples

    var data = [
    	{ title: 'Test' },
    	{ title: 'Test', hasDetail: true },
    	{ title: 'Test', hasChild: true }
    ];

Put a table with data in an already created winow

    $(main_window).tableView({data: data});

Put a new label on an existing window

    $(main_window)
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

