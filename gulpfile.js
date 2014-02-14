// Plugins
var     gulp = require( 'gulp' ),
       gutil = require( 'gulp-util' ),
        path = require( 'path' ),
     connect = require( 'connect' ),
          lr = require( 'tiny-lr' ),
  livereload = require( 'gulp-livereload' ),
      server = lr(),
     embedlr = require( "gulp-embedlr" ),
      jshint = require( "gulp-jshint" ),
     stylish = require( 'jshint-stylish' );
      uglify = require( 'gulp-uglify' ),
      rename = require( 'gulp-rename' ),
        sass = require( 'gulp-sass' ),
    imagemin = require( 'gulp-imagemin' ),
      svgmin = require( 'gulp-svgmin' );

// source and distribution folders 
var  src = './src/';
var dist = path.resolve( './dist/' );

// localhost port
var LocalPort = 4000;

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
    .pipe( gulp.dest( dist ) )
    .pipe( livereload( server ) );
});

// copy html
gulp.task( 'copyHtml', function() {
  gulp.src( src + "*.html" )
    .pipe( gulp.dest( dist ) )
});

// JShint
gulp.task( 'lint', function() {
  gulp.src( src + 'js/*.js' )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) );
});

// minify JS
gulp.task( 'minifyJS', function() {
  gulp.src( src + 'js/**/*.js' )
    .pipe( uglify() )
    .pipe( rename( { ext: '.min.js' } ) )
    .pipe( gulp.dest( dist + '/js' ) )
    .pipe( livereload( server ) );
});

// sass task
gulp.task( 'sass', function () {
  gulp.src( src + 'sass/*.scss' )
    .pipe( sass({
      outputStyle: [ 'compressed' ],
      errLogToConsole: true
    }))
    .pipe( gulp.dest( dist + '/css' ) )
    .pipe( livereload( server ) );
});

// build task
gulp.task( 'build', function () {
  gulp.run( 'embedlr', 'minifyJS', 'sass', 'minifyImg', 'minifySvg' );
});

// minify SVG
gulp.task( 'minifySvg', function() {
  gulp.src( src + 'img/*.svg' )
    .pipe( svgmin() )
    .pipe( gulp.dest( dist + '/img' ) )
    .pipe( livereload( server ) );
});

// minify raster images
gulp.task( 'minifyImg', function () {
  gulp.src( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ] )
    .pipe( imagemin() )
    .pipe( gulp.dest( dist + '/img' ) )
    .pipe( livereload( server ) );
});

// watch & liveReload
gulp.task( 'watch', function () {
  server.listen( 35729, function ( err ) {
    if ( err ) return console.log( err );

    gulp.watch( src + '*.html', function () {
      gulp.run( 'copyHtml', 'embedlr' );
    });    

    gulp.watch( [ src + 'js/*.js', './gulpfile.js' ], function () {
      gulp.run( 'lint', 'minifyJS' );
    });

    gulp.watch( src + 'sass/*.scss', function () {
      gulp.run( 'sass' );
    });

    gulp.watch( [ src + 'img/*.png', src + 'img/*.gif', src + 'img/*.jpg' ], function () {
      gulp.run( 'minifyImg' );
    });  

    gulp.watch( src + 'img/*.svg', function () {
      gulp.run( 'minifySvg' );
    });
  });
});

// default task
gulp.task( 'default', function(){
  gulp.run( 'server', 'watch' );
});