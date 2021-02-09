

Topic/Title | Getting Location Data From Across Platforms
--- | ---
Keywords/Questions | Geolocator, Permissions, Async, Await
Notes | Use Geolocator plugin to get high/ low precision geo location. It is necessary to add entry to android manifesto/ IOS info to gain permission.
Summary | Get location on press button

Topic/Title | Dart Futures, Async & Await
--- | ---
Keywords/Questions | Async, Await, Future
Notes | Async methods must return a Future<type\>. void foo() async \{ String blubb = await fun();}
Summary | Adding scratch file to project

Topic/Title | Stateful Widget Lifecycle Methods
--- | ---
Keywords/Questions | initState, build, deactivate, @override
Notes | super.initState
Summary | Load location at loading the screen

Topic/Title | Dart Exception Handling & Null Aware Operators
--- | ---
Keywords/Questions | try catch, ??, throw
Notes | **??** check if variable if is **null** (myvar ?? defaultValue). try \{ } catch (e) \{print(e);}. **throw** <message\>;
Summary | Try catch getLocation

Topic/Title | Networking in Flutter Apps with the HTTP Package
--- | ---
Keywords/Questions | http, Response status, JSON
Notes | Status: 1) Hango on. 2) You're good to go. 3) Go away. 4) You're screwed. 5) I'm screwed. http.Response resp = http.get(url), returns JSON
Summary | add getData funtion

Topic/Title | JSON Parsing and Dynamic Types
--- | ---
Keywords/Questions | JSON extension for Chrome, jsonDecode
Notes | import 'dart:convert';
Summary | Create networking.dart file for getting data

Topic/Title | Showing a Spinner While the User Waits
--- | ---
Keywords/Questions | spinkit
Notes | 
Summary | Loading animation while fetching weather data. Then link to location screen

Topic/Title | Passing Data to a State Object
--- | ---
Keywords/Questions | 
Notes | Passing data from stateless widget to its state. State points to its parent StateFul widget. State has a **widget** property.
Summary | Adding temperature etc to state variables in location screen, function updateUI called from initState

Topic/Title | Updating the Weather with the WeatherModel
--- | ---
Keywords/Questions | 
Notes | 
Summary | Using the WeatherModel class to get weather icon and weather message

Topic/Title | Refactoring the Location Methods
--- | ---
Keywords/Questions | 
Notes | Changing location requires to open google maps
Summary | add getLocationWeather to the weather model class. Add funtionality to update location on press button.

Topic/Title | Creating and Styling a TextField Widget for Text Entry in city screen
--- | ---
Keywords/Questions | TextField
Notes | 
Summary | creating TextField and decorating it

Topic/Title | Passing Data Backwards Through the Navigation Stack
--- | ---
Keywords/Questions | pop, push
Notes | pass back by addin result to .pop(context, result) method. push() method return a Future with the result.
Summary | getCityWeather to weather model. return cityName property

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 

Topic/Title | 
--- | ---
Keywords/Questions | 
Notes | 
Summary | 