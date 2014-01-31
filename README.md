# Experiments base

A base [gulp](http://gulpjs.com/) project for web experiments. By [Mark Durrant](https://twitter.com/m6_d6).

* * *

### getting started

Install [node](http://nodejs.org/) & [gulp](http://gulpjs.com/)

`brew install node`, `npm install -g gulp`

Install packages

`npm i`

Build assets (only required once)

`gulp build`

Run Gulp
(Starts local server, LiveReload, SASS compilation, JS hinting & minification, image minification)

`gulp`

### Todos
* ~~Add image tasks to watch~~
* Look at base SASS (steal from [this](http://responsivebp.com/)?)
* Look at inline media queries
* Fix SASS error bug (gulp dies when SASS errors)
* Style JSHint output
* Add precompilation of Handlebars templates
* Fix LiveReload bug (sometimes embedlr will add script after <body>)
* Concatenate JS files
* Add svg to png 
