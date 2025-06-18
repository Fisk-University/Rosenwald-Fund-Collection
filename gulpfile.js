/*
 * Gulp Build File – Rosenwald Fund Collection Theme
 *
 * This file defines the Gulp tasks for compiling SCSS into CSS, applying autoprefixing, generating sourcemaps, and minifying the output. It watches all SCSS files for changes
 * and outputs to `asset/css/style.css` and `style.min.css`.
 *
 * Usage:
 *   gulp sass      --> Compile once
 *   gulp           --> Start watch mode (rebuilds on file save)
 */

const gulp = require('gulp');
const sass = require('gulp-dart-sass');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const sourcemaps = require('gulp-sourcemaps');
const rename = require('gulp-rename');

// Compile SCSS into CSS
gulp.task('sass', function() {
  return gulp.src('./asset/scss/main.scss')       // Entry point
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(rename('style.css'))
    .pipe(gulp.dest('./asset/css'))               // Unminified style.css
    .pipe(cleanCSS())
    .pipe(rename('style.min.css'))   
    .pipe(sourcemaps.write('.', {
      includeContent: true,
      sourceRoot: '/asset/scss'
    }))
    .pipe(gulp.dest('./asset/css'));              // minified + autoprefixed + sourcemapped style.min.css
});

// Watch SCSS files
gulp.task('watch', function() {
  gulp.watch('./asset/scss/**/*.scss', gulp.series('sass'));
});

// Default task
gulp.task('default', gulp.series('sass', 'watch'));
