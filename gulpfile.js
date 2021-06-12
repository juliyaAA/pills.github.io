const gulp = require('gulp'),
    browserSync = require('browser-sync'),
    sass = require('gulp-sass'),
    rename = require("gulp-rename"),
    cleanCSS = require('gulp-clean-css'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    cssMin = require('gulp-cssmin');

gulp.task('sass', function () {
    return gulp.src('./scss/style.scss')
        .pipe(sass({ outputStyle: 'compressed' }))
        .pipe(rename({ suffix: '.min' }))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 8 versions']
        }))
        .pipe(cleanCSS({ compatibility: 'ie8' }))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('html', function () {
    return gulp.src('./*.html')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('style', function () {
    return gulp.src([
        'node_modules/normalize.css/normalize.css'
    ])
        .pipe(concat('libs.min.css'))
        .pipe(cssMin())
        .pipe(gulp.dest('./css'))
});

gulp.task('browser-sync', function () {
    browserSync.init({
        server: {
            baseDir: "./"
        }
    });
});
gulp.task('script', function() {
    return gulp.src([
            'node_modules/ddslick/src/jquery.ddslick.js'
        ])
        .pipe(concat('libs.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./js'))
});

gulp.task('js', function () {
    return gulp.src('./*.js')
        .pipe(browserSync.reload({ stream: true }))
});

gulp.task('watch', function () {
    gulp.watch('./scss/*.scss', gulp.parallel('sass'))
    gulp.watch('./*.html', gulp.parallel('html'))
    gulp.watch('./*.js', gulp.parallel('js'))
});

gulp.task('default', gulp.parallel('style', 'js', 'script', 'sass', 'browser-sync', 'watch'));