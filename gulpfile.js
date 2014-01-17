// Plugins
var     gulp = require( 'gulp' ),
       gutil = require( 'gulp-util' ),
     connect = require( 'connect' ),
          lr = require( 'tiny-lr' ),
  livereload = require( 'gulp-livereload' ),
      server = lr(),
        sass = require( 'gulp-sass' );

// source and distribution folders 
var  src = './src/';
var dist = './dist/';

// localhost port
var LocalPort = 9876;

// start local server
gulp.task( 'server', function(){
  connect.createServer(
      connect.static( dist )
  ).listen( LocalPort );
  console.log( "\nlocal server runing at http://localhost:" + LocalPort + "/\n" );
});

// watch & livereload
gulp.task( 'watch', function () {
  server.listen( 35729, function ( err ) {
    if ( err ) return console.log( err );

    gulp.watch( src + 'sass/*.scss', function () {
        gulp.run( 'sass' );
    });
  });
});

// sass task
gulp.task( 'sass', function () {
  gulp.src( src + 'sass/*.scss' )
    .pipe( sass({
      includePaths: [ src + 'sass/includes' ],
      outputStyle: [ 'compressed' ]
    }))
    .pipe( gulp.dest( dist + 'css' ) )
    .pipe( livereload( server ) );
});

gulp.task( 'default', function(){
  // place code for your default task here
});