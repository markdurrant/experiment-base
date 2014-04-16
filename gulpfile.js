var gulp = require( 'gulp' );

// gulp plugins
var gutil = require( 'gulp-util' );
     sass = require( 'gulp-sass' ),
   jshint = require( 'gulp-jshint' ),
  stylish = require( 'jshint-stylish' );

// var paths = {
//   sass: 'src/sass/**/*.scss',
//   sassOutput: 'dist/css/',
//   js: 'src/js/**/*.js',
//   jsVendor: '!src/js/vendor/**/*.js',
//   jsOutput: 'dist/js/'
// };

function beepy () {
  gutil.beep();
}

var paths = {
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

// complie sass
gulp.task( 'sass', function() {
  return gulp.src( paths.sass.src )
    .pipe( sass({
      sourceComments: 'normal',
      errLogToConsole: true,
      onError: gutil.beep
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