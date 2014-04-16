var gulp = require( 'gulp' );

// gulp plugins
var sass = require( 'gulp-sass' );

var paths = {
  sass: 'src/sass/**/*.scss',
  sassOutput: 'dist/css/'
};

// sass task
gulp.task( 'sass', function() {
  return gulp.src( paths.sass )
    .pipe( sass({
      sourceComments: 'normal',
      errLogToConsole: true
    }))
    .pipe( gulp.dest( paths.sassOutput ) );
});

// watch task
gulp.task( 'watch', function() {
  gulp.watch( paths.sass, ['sass'] );
});

// default task
gulp.task( 'default', ['watch'] );