var gulp = require("gulp");
var babel = require("gulp-babel");

gulp.task('scripts', () => {  
  return gulp.src('./src/**/*.js')    
    .pipe(babel())
    .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('./src/**/*.js', ['scripts']);
});