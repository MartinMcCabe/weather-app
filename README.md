React and Redux based Weather app
=================================

This little weather app is built with [React](https://reactjs.org/) and [Redux](redux.js.org) for state management.

Workflow
--------

Some of the technologies used include:

- [gulp](https://gulpjs.com/) as the task runner with:
  - [browserify](http://browserify.org/)  to bundle the javaScript
  - [babel](https://babeljs.io/) to compile my JS to I can use es6 features that may not yet be available in some browsers
  - [sass](http://sass-lang.com/) as my CSS preprocessor

Other resources
---------------

Some other resources I used include

- [Weather-icons](https://github.com/erikflowers/weather-icons) for beautiful weather icons
- [Open weather map](openweathermap.org) api to get the latest weather
- [freegeoip.net](http://freegeoip.net/json/) to try guess user's location if geolocation permission is denied

Run it yourself
---------------

Clone this repo and run `npm  install` (if you have [Node](https://nodejs.org/en/) installed) in your terminal. After installation, install [gulp](https://gulpjs.com/) globally by running `npm install -g gulp`. 
When that's done, just run the default gulp task by typing `gulp` 
