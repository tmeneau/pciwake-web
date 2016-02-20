const del = require('del');
const gulp = require('gulp');
const watch = require('gulp-watch');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsConfig = require('./tsconfig.json');

var ASSETS = ['src/**/*', '!src/ts', '!src/**/*.ts'];

gulp.task('clean:libs', function() {
  return del('dist/libs/**/*');
});

gulp.task('clean:compile', function() {
  return del('dist/app/**/*');
});

gulp.task('clean:assets', function() {
  return del(['dist/css/**/*', 'dist/template/**/*', 'dist/**/*.html']);
});

gulp.task('copy:libs', ['clean:libs'], function() {
  return gulp.src([
                'node_modules/es6-shim/es6-shim.min.js',
                'node_modules/systemjs/dist/system-polyfills.js',
                'node_modules/angular2/bundles/angular2-polyfills.js',
                'node_modules/systemjs/dist/system.src.js',
                'node_modules/rxjs/bundles/Rx.js',
                'node_modules/angular2/bundles/angular2.dev.js',
                'node_modules/angular2/bundles/router.dev.js',
                'node_modules/angular2/bundles/http.dev.js',
                'node_modules/ng2-bootstrap/node_modules/moment/min/moment.min.js',
                'node_modules/ng2-bs3-modal/dist/**/*.js'
              ]).pipe(gulp.dest('dist/lib'));
});

gulp.task('compile', ['clean:compile'], function() {
  return gulp.src(tsConfig.files)
             .pipe(sourcemaps.init())
             .pipe(typescript(tsConfig.compilerOptions))
             .pipe(sourcemaps.write('.'))
             .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:assets', ['clean:assets'], function() {
  return gulp.src(ASSETS)
             .pipe(gulp.dest('dist'));
})

gulp.task('watch', function() {
  gulp.watch(ASSETS, ['copy:assets']);
});

gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('default', ['build']);
