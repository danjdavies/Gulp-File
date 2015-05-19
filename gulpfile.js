// include gulp
var gulp = require('gulp');
var changed = require('gulp-changed');
var imagemin = require('gulp-imagemin');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');
var autoprefix = require('gulp-autoprefixer');
var minifyCSS = require('gulp-minify-css');
var rename    = require('gulp-rename'); // to rename any file*/

// include plug-ins
var jshint = require('gulp-jshint');

// JS hint task
gulp.task('jshint', function() {
  gulp.src('./src/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// minify new images
gulp.task('imagemin', function() {
  var imgSrc = './assets/img/**/*',
      imgDst = './assets/img/';

  gulp.src(imgSrc)
    .pipe(changed(imgDst))
    .pipe(imagemin())
    .pipe(gulp.dest(imgDst));
});

// include plug-ins
var minifyHTML = require('gulp-minify-html');

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
  gulp.src('./assets/js/scripts.js')

    .pipe(stripDebug())
    .pipe(uglify())
    .pipe(rename('scripts.min.js'))
    .pipe(gulp.dest('./assets/js/'));
});

gulp.task('sass', function () {
        gulp.src('./assets/scss/base.scss')
        .pipe(sass())
        .pipe(gulp.dest('./assets/css'))
        .pipe(concat('base.css'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(minifyCSS())
        .pipe(rename('base.min.css'))
        .pipe(gulp.dest('./assets/css'));
});

gulp.task('default', ['sass']);

// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'sass'], function() {
});

// default gulp task
gulp.task('default', ['imagemin', 'scripts', 'sass'], function() {

  // watch for JS changes
  gulp.watch('./assets/js/*.js', function() {
    gulp.run('jshint', 'scripts');
  });

  // watch for CSS changes
  gulp.watch('./assets/scss/*.scss', function() {
    gulp.run('sass');
  });
});
