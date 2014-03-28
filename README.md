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

### todo
* register new files without needing to restart gulp
* clear /dist before gulp build
* add dev folder (unminified assets + no liveReload)
* add gulp build to default task 
* add in gh-pages export
* html validation
* alert(sound) on errors
* style success/error msgs
* SASS only version?