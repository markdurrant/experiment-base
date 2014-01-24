// Plugins
var     gulp = require( 'gulp' ),
       gutil = require( 'gulp-util' ),
     connect = require( 'connect' ),
          lr = require( 'tiny-lr' ),
  livereload = require( 'gulp-livereload' ),
      server = lr(),
     embedlr = require( "gulp-embedlr" ),
      jshint = require( "gulp-jshint" ),
      uglify = require( 'gulp-uglify' ),
      rename = require( 'gulp-rename' ),
        sass = require( 'gulp-sass' ),
     declare = require( 'gulp-declare' ),
      concat = require( 'gulp-concat' ),
  handlebars = require( 'gulp-handlebars' );


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

// add liveReload script
gulp.task( 'embedlr', function() {
  gulp.src( src + "*.html" )
      .pipe( embedlr() )
      .pipe( gulp.dest( dist ) );
});

// JShint
gulp.task( 'lint', function() {
  gulp.src( src + 'js/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( 'default' ) );
});

// minify JS
gulp.task( 'minifyJS', function() {
  gulp.src( src + 'js/**/*.js' )
    .pipe( uglify() )
    .pipe( rename( { ext: '.min.js' } ) )
    .pipe( gulp.dest( dist + 'js' ) )
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

// handlebars task
gulp.task( 'handlebars', function() {
  gulp.src( ['src/templates/*.hbs'] )
    .pipe( handlebars() ) // returns a bare function
    .pipe( declare({
      namespace: 'MyApp.templates'
    }))
    .pipe( concat( 'templates.js') )
    .pipe( gulp.dest( 'dist/js/') );
});

// watch & liveReload
gulp.task( 'watch', function () {
  server.listen( 35729, function ( err ) {
    if ( err ) return console.log( err );

    gulp.watch( src + '*.html', function () {
      gulp.run( 'embedlr' );
    });    

    gulp.watch( src + 'js/*.js', function () {
      gulp.run( 'lint', 'minifyJS' );
    });

    gulp.watch( src + 'sass/*.scss', function () {
      gulp.run( 'sass' );
    });
  });
});

gulp.task( 'default', function(){
  gulp.run( 'server', 'watch' );
});