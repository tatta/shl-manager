var gulp = require('gulp');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var xml2js = require('xml2js');
var pug = require('gulp-pug');
var parser = new xml2js.Parser(xml2js.defaults["0.2"]);


gulp.task('sass', function() {
    gulp.src('sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./public/styles/'))
});

gulp.task('pug', function() {
    gulp.src('views/layout.pug').
    pipe(pug())
    .pipe(gulp.dest('public/'))
});

gulp.task('scripts', function(){
   gulp.src('./public/javascripts/*.js')
   .pipe(concat('script.js'))
   .pipe(uglify())
   .pipe(gulp.dest('public'));
});


//Watch task
gulp.task('watch',function() {
    gulp.watch('sass/**/*.scss', ['sass', 'scripts']);
    gulp.watch('views/**/*.pug', ['pug']);
    gulp.watch('javascripts/**/*.js', ['scripts']);
});

// Default Task
gulp.task('default', ['sass', 'scripts', 'watch']);
