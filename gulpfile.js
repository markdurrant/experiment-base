var gulp = require( 'gulp' );

var connect = require( 'connect' );
var localhostPort = 4000;

// gulp plugins
var gutil = require( 'gulp-util' );
     sass = require( 'gulp-sass' ),
   jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' );

var paths = {
  src: 'src/',
  dist: 'dist/',
  sass: {
    src: 'src/sass/**/*.scss',
    dist: 'dist/css/'
  },
  js: {
    src: 'src/js/**/*.js',
    vendor: 'src/js/vendor/**/*.js',
    dist: 'dist/js/'
  }
};

// start localhost server
gulp.task( 'server', function() {
  connect.createServer( 
    connect.static( paths.dist )
  ).listen( localhostPort );
  console.log( "\nlocal server runing @ http://localhost:" + localhostPort + "\n" );
});

// complie sass
gulp.task( 'sass', function() {
  return gulp.src( paths.sass.src )
    .pipe( sass({
      sourceComments: 'normal',
      errLogToConsole: true
    }))
    .pipe( gulp.dest( paths.sass.dist ) )
});

// hint JS
gulp.task( 'jshint', function() {
  return gulp.src( [paths.js.src, '!' + paths.js.vendor] )
    .pipe( jshint() )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( gutil.beep ) );
});

// copy JS
gulp.task( 'copyJs', function() {
  return gulp.src( paths.js.src )
    .pipe( gulp.dest( paths.js,dist ) );
});

// watch task
gulp.task( 'watch', function() {
  gulp.watch( paths.sass, ['sass'] );
  gulp.watch( paths.js, ['jshint'] );
});

// default task
gulp.task( 'default', ['watch'] );