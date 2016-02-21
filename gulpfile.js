const del = require('del');
const gulp = require('gulp');
const watch = require('gulp-watch');
const plumber = require('gulp-plumber');
const typescript = require('gulp-typescript');
const sourcemaps = require('gulp-sourcemaps');
const tsConfig = require('./tsconfig.json');


var PATHS = {
  ASSETS: ['src/**/*', '!src/**/*.ts'],
  TS: ['src/**/*.ts']
}

/*
 * dependency building
 */

gulp.task('clean:libs', function() {
  return del('dist/assets/libs/**/*');
});

gulp.task('copy:libs', ['clean:libs'], function() {
  gulp.src([
        'node_modules/es6-shim/es6-shim.min.js',
        'node_modules/systemjs/dist/system-polyfills.js',
        'node_modules/angular2/bundles/angular2-polyfills.js',
        'node_modules/systemjs/dist/system.src.js',
        'node_modules/rxjs/bundles/Rx.js',
        'node_modules/angular2/bundles/angular2.dev.js',
        'node_modules/angular2/bundles/router.dev.js',
        'node_modules/angular2/bundles/http.dev.js',
        'node_modules/ng2-bootstrap/node_modules/moment/min/moment.min.js'])
      .pipe(gulp.dest('dist/assets/libs'));

   /*
    * ng2-bs3-modal doesn't declare a module name in it's export, so we do
    * a mildly hacky thing here. It's a small evil for the big tradeoff of
    * false-negative-free typescript compilation
    */
    return gulp.src(['node_modules/ng2-bs3-modal/dist/**/*.js'])
               .pipe(gulp.dest('dist/assets/libs/ng2-bs3-modal/dist'));
});

/*
 * TypeScript source code building
 */

gulp.task('clean:compile', function() {
  return del(['dist/app/**/*.js', 'dist/app/**/*.js.map']);
});

gulp.task('compile', ['clean:compile'], function() {
  return gulp.src(tsConfig.files)
                    .pipe(sourcemaps.init())
                    .pipe(plumber({
                      handleError: function(error) {
                        console.log("error while generating sourcemaps: ", error);
                        this.emit("end");
                      }
                    }))
                    .pipe(typescript(tsConfig.compilerOptions))
                    .pipe(plumber({
                      handleError: function(error) {
                        console.log("error while compiling: ", error);
                        this.emit("end");
                      }
                    }))
                    .pipe(sourcemaps.write('.'))
                    .pipe(plumber({
                      handleError: function(error) {
                        console.log("error while writing sourcemaps: ", error);
                        this.emit("end");
                      }
                    }))
                    .pipe(gulp.dest('dist/app'));
});

/*
 * asset building
 */

gulp.task('clean:assets', function() {
  return del([
    'dist/assets/**',
    'dist/**/*.css',
    'dist/**/*.html',

    /* ensure dependencies aren't removed */
    '!dist/assets',
    '!dist/assets/libs/**'
  ]);
});

gulp.task('copy:assets', ['clean:assets'], function() {
  return gulp.src(PATHS.ASSETS)
             .pipe(gulp.dest('dist'));
})

/*
 * Aggregation tasks
 */


gulp.task('build', ['compile', 'copy:libs', 'copy:assets']);
gulp.task('default', ['build']);

/*
 * "Development Mode" tasks
 */

gulp.task('watch', function() {
  gulp.watch(PATHS.ASSETS, ['copy:assets']);
  gulp.watch(PATHS.TS,     ['compile']);
});
