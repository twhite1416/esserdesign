var gulp = require('gulp');
    plugins = require('gulp-load-plugins')(),
    browserSync = require('browser-sync').create(),
    del = require('del');

var styles =  [
                './source/styles/main.scss'
              ]

var scripts = [
                './node_modules/waypoints/lib/jquery.waypoints.js',
                './source/scripts/main.js'
              ]


gulp.task('sass', function(){
  return gulp.src(styles)
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(plugins.sass()) // Using gulp-sass
    .pipe(plugins.autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(plugins.cssnano())
    .pipe(plugins.size())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('scripts', function(){
  return gulp.src(scripts)
    .pipe(plugins.concat('main.js'))
    .pipe(plugins.minify({
      ext:{
        min:'.js'
      },
      noSource: true
    }))
    .pipe(plugins.jshint())
    .pipe(plugins.plumber({
      errorHandler: plugins.notify.onError("Error: <%= error.message %>")
    }))
    .pipe(gulp.dest('dist/scripts'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('fonts', function(){
  return gulp.src([
      './source/fonts/*'
    ])
    .pipe(gulp.dest('dist/fonts'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('clean', function () {
  return del([
    'dist',
  ]);
});

// gulp.task('browserSync', function() {
//   browserSync.init({
//     proxy: "http://localhost:8080/",
//     host: "localhost:8080",
//     files: "*.html"
//   });
// })

gulp.task('watch', ['sass', 'scripts', 'fonts'], function() {

  browserSync.init({
    proxy: "http://esser-reports.dev/",
    host: "esser-reports.dev",
    files: "*.html"
  });

  gulp.watch('./source/styles/*.scss', ['sass']);
  gulp.watch('./source/styles/**/*.scss', ['sass']);
  gulp.watch('./source/scripts/*.js', ['scripts']);
});

gulp.task('default', ['sass', 'scripts', 'fonts']);