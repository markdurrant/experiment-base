// Plugins
var     gulp = require( 'gulp' ),
       gutil = require( 'gulp-util' ),
     connect = require( 'connect' ),
        sass = require( 'gulp-sass' );

// source and distribution folders 
var  src = './src/';
var dist = './dist/';

// localhost port
var LocalPort = 9876;

// SASS task
gulp.task( 'sass', function () {
  gulp.src( src + 'sass/*.scss' )
    .pipe( sass({
      includePaths: [ src + 'sass/includes' ],
      outputStyle: [ 'compressed' ]
    }))
    .pipe( gulp.dest( dist + 'css' ) );
});

// start local server
gulp.task( 'server', function(){
  connect.createServer(
      connect.static( dist )
  ).listen( LocalPort );
  console.log( "\nlocal server runing at http://localhost:" + LocalPort + "/\n" );
});

gulp.task( 'default', function(){
  // place code for your default task here
});