/*
 * Default gulp taskbuilder for Titan
 */

// gulp node_module imports
var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	uglify = require('gulp-uglify'),
	concat = require('gulp-concat'),
	imagemin = require('gulp-imagemin'),
	jpegcompress = require('imagemin-jpeg-recompress');

// watcher
gulp.task('watch', function(){
	gulp.watch('dev/sass/**/*.scss', ['sass']);
	gulp.watch('dev/javascripts/**/*.js', ['scripts']);
	gulp.watch('dev/images/*', ['compress', 'compressjpeg']);
});

// compass
gulp.task('sass', function(){
	sass('dev/sass', { compass: true, style: 'compressed' })
	.pipe(gulp.dest('app/stylesheets'));
});

// minify and concatenate javascripts
gulp.task('scripts', function(){
	gulp.src('dev/javascripts/*.js')
		.pipe(uglify())
		.pipe(concat('concatenation.js'))
		.pipe(gulp.dest('app/javascripts'));
});

// compress images
gulp.task('compress', function(){
	gulp.src('dev/images/*')
		.pipe(imagemin({ progressive: true }))
		.pipe(gulp.dest('app/images'))
});

// jpeg compressor - crunch those huge hero images.
gulp.task('compressjpeg', function(){
	// to watch multipe file extensions pass an array to gulp.src()
    gulp.src(['dev/images/**/*.jpeg', 'dev/images/**/*.jpg'])
        .pipe(jpegcompress({ loops: 10, min: 40, max: 60 })())
        .pipe(gulp.dest('app/images'));
});

// default task - watches and runs all task atleast once on startup of gulp
gulp.task('default', ['watch', 'sass', 'scripts', 'compress', 'compressjpeg']);