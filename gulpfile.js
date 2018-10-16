const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const uglify = require('gulp-uglify');
const saveLicense = require('uglify-save-license');
const babel = require('gulp-babel');
const through = require('through2');
const path = require('path');
const argv = require('yargs').argv;

gulp.task('js', () => {
  return gulp.src(['./src/*.js'])
    .pipe(babel(
      {
        presets: [
          [
            '@babel/preset-env',
            {
              modules: false
            }
          ]
        ]
      }
    ))
    .pipe(argv.dev ? through.obj() : uglify({
      output: {
        comments: saveLicense
      }
    }))
    .pipe(gulp.dest('./demo/'))
    .pipe(gulp.dest('./dist/'));
});

gulp.task('demo', () => {
  return gulp.src(['./demo/demo.scss'])
    .pipe(sass({
      'includePaths': ['node_modules'],
      'outputStyle': argv.dev ? 'development' : 'compressed'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('./demo/'));
});

gulp.task('default', ['js', 'demo'], () => {});

gulp.task('watch', ['default'], () => {
  gulp.watch(['./src/js/*.js'], ['js']);
  gulp.watch(['./src/scss/*.scss'], ['demo']);
});