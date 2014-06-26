"use strict";

// define modules
var            gulp = require( 'gulp' ),
            connect = require( 'connect' ),
  // connectLivereload = require( 'connect-livereload' ),
     gulpLivereload = require( 'gulp-livereload' );

// define ports
var localPort = 4000,
       lrPort = 35729;

// define directories
var publicDir = 'public/';

// local server
gulp.task( 'server', function() {
  var app = connect();

  app.use( require( 'connect-livereload' )( { port: lrPort } ) );
  app.use( connect.static( publicDir ) );
  app.listen( localPort );

  console.log( "\nlocal server running at http://localhost:" + localPort + "/\n" );
});

// watch for changes & trigger liveReload
// gulp.task( 'watch', function() {
//   gulp.watch( publicDir + '/**/*.html' )
//     .on( 'change', function( file ) {
//       gulpLivereload().changed( file.path );
//     });
// });

// gulp.task( 'watch', function(done) {
//   var liveReload = gulpLivereload();

//   gulp.watch( publicDir + '**/*.html' )
//     .on( 'change', function( file ) {
//       liveReload.changed( file.path );
//     }
//   );
// });