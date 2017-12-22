// Grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    cssnano = require('gulp-cssnano'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    plumber = require('gulp-plumber'),
    bower = require('gulp-bower'),
    babel = require('gulp-babel'),
    browserSync = require('browser-sync').create();

// Compile Sass, Autoprefix and minify
gulp.task('styles', function() {
    return gulp.src('./assets/scss/**/*.scss')
    // error handling
        .pipe(plumber(function(error) {
            gutil.log(gutil.colors.red(error.message));
            this.emit('end');
        }))
        // source mapping
        .pipe(sourcemaps.init()) // Start Sourcemaps
        // start sass
        .pipe(sass())
        // auto prefix
        .pipe(autoprefixer({
            browsers: ['last 4 versions'],
            cascade: false
        }))
        // define destination
        .pipe(gulp.dest('./assets/css/'))
        // rename css file to make a difference between minimized and non minimized
        .pipe(rename({suffix: '.min'}))
        // minimize the css
        .pipe(cssnano())
        // create sourcemaps for minimized css
        .pipe(sourcemaps.write('.'))
        // define destination for minimized css
        .pipe(gulp.dest('./assets/css/'))
});

// JSHint, concat, and minify JavaScript
gulp.task('site-js', function() {
    return gulp.src([

        // Grab your custom scripts
        './assets/js/scripts/*.js'

    ])
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('./assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(sourcemaps.write('.')) // Creates sourcemap for minified JS
        .pipe(gulp.dest('./assets/js'))
});


// Browser-Sync watch files and inject changes
gulp.task('browsersync', function() {
    // Watch files
    var files = [
        './assets/css/*.css',
        './assets/js/*.js',
        '**/*.php',
        'assets/images/**/*.{png,jpg,gif,svg,webp}',
    ];

    browserSync.init(files, {
        // Replace with URL of your local site
        proxy: "http://localhost/WP-load-more-posts",
    });

    gulp.watch('./assets/scss/**/*.scss', ['styles']);
    gulp.watch('./assets/js/scripts/*.js', ['site-js']).on('change', browserSync.reload);

});

// Watch files for changes (without Browser-Sync)
gulp.task('watch', function() {

    // Watch .scss files
    gulp.watch('./assets/scss/**/*.scss', ['styles']);

    // Watch site-js files
    gulp.watch('./assets/js/scripts/*.js', ['site-js']);

});

// Run styles and site-js
gulp.task('default', function() {
    gulp.start('styles', 'site-js');
});
