'use strict'
var gulp = require('gulp');

// js
var browserify = require('browserify');
var watchify = require('watchify');
var babelify = require('babelify');
var gutil = require('gulp-util');
var notify = require('gulp-notify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var buffer = require('vinyl-buffer');

// browser-sync
var browserSync = require ('browser-sync');
var reload = browserSync.reload;

// CSS
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');


/**
 * Errors
 */
function handleErrors() {
  var args = Array.prototype.slice.call(arguments);
  notify.onError({
    title: 'Compile Error',
    message: '<%= error.message %>'
  }).apply(this, args);
  this.emit('end');
}

/**
 * JavaScript
 */
gulp.task('js', ()=>{
  return buildScript ('index.js', false); // run once because watch set to false;
});

function buildScript(file, watch) {
  var props = {
    entries: ['./src/js/' + file],
    debug : true,
    cache: {},
    packageCache: {},
    transform:  [babelify.configure({
        presets: ["es2015", "react"]
    })]
  };
  // watchify() if watch requested, otherwise run browserify() once
  var bundler = watch ? watchify(browserify(props)) : browserify(props);

  function rebundle() {
    var stream = bundler.bundle();
    return stream
      .on('error', handleErrors)
      .pipe(source(file))
      .pipe(buffer())
      .pipe(uglify())
      .pipe(gulp.dest('./js/'))
      .pipe(reload({stream:true}))
  }

  bundler.on('update', function() {
    rebundle();
    gutil.log('Rebundle js...');
  });

  return rebundle();
}

/**
 * SERVE
 */
gulp.task('serve', function(){
  browserSync({
      server: true,
      port: 3000,
      open: true,
      startPath: './',
      reloadOnRestart: true,
      reloadDelay: 500,
      https: true
  });
});

/**
 * SASS
 */
gulp.task('sass', function(){
  gulp.src(['./src/sass/style.scss'])
  .pipe(sourcemaps.init())
  .pipe(sass({outputStyle: 'compressed'}))
  .on('error', handleErrors)
  .pipe(sourcemaps.write())
  .pipe(gulp.dest('./css'))
  .pipe(reload({stream:true}));
});

/**
 * Default
 */
gulp.task('default', ['sass', 'js', 'serve'], function(){
  gulp.watch(['./src/sass/**'], ['sass']);
  return buildScript('index.js', true);
})

/**
 * set NODE_ENV to production
 */
gulp.task('apply-prod-environment', function(){
  process.env.NODE_ENV = 'production';
})

/**
 * BUILD Production
 */
gulp.task('build-production', ['apply-prod-environment', 'sass', 'js', 'serve']);
