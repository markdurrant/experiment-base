var gulp = require('gulp');
var gutil = require('gulp-util');
var sass = require('gulp-sass')

// sass 
gulp.task( 'sass', function () {
  gulp.src( './src/sass/*.scss' )
    .pipe( sass({
      includePaths: [ './src/sass/includes' ],
      outputStyle: [ 'compressed' ]
    }))
    .pipe( gulp.dest( './dist/css' ) );
});

gulp.task( 'default', function(){
  // place code for your default task here
});