var gulp = require('gulp'),
  postcss = require('gulp-postcss'),
  cssnext = require('postcss-cssnext'),
  rimraf = require('rimraf'),
  browserSync = require('browser-sync').create(),
  autoprefixer = require('autoprefixer'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify');


var path = {
  src: {
    html: 'src/index.html',
    css: ['src/css/main.css',
          'src/css/media.css'],
    cssLibs: ['src/css/libs/bootstrap*.css',
              'src/css/libs/jquery.mmenu*.css',
              'src/css/libs/hamburgers.css'],
    js: 'src/js/main.js',
    libs: [
      'src/libs/jquery.mmenu.all.js'
    ],
    images: 'src/img/**/*.*',
  },
  build: {
    html: 'build/',
    css: 'build/css/',
    js: 'build/js/',
    images: 'build/img/'
  },
  watch: {
    reload: 'build/**/*.*',
    html: 'src/**/*.html',
    css: 'src/css/**/*.css',
    js: 'src/js/**/*.js'
  },
  clean: 'build/'
};


gulp.task('server', function (done) {
  browserSync.init({
    server: {
      baseDir: 'build'
    },
    open: false
  });

  gulp.watch(path.watch.reload).on('change', browserSync.reload);

  done();
});

gulp.task('html', function () {
  return gulp.src(path.src.html)
    .pipe(gulp.dest(path.build.html));
});

gulp.task('css', function () {
  var proccessors = [cssnext];
  return gulp.src(path.src.css)
    .pipe(postcss(proccessors))
    .pipe(gulp.dest(path.build.css));
});

gulp.task('css-libs', function () {
  return gulp.src(path.src.cssLibs)
    .pipe(concat('libs.min.css'))
    .pipe(gulp.dest(path.build.css))
});

gulp.task('libs', function () {
  return gulp.src(path.src.libs)
    .pipe(concat('libs.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(path.build.js));
});

gulp.task('scripts', function () {
  return gulp.src(path.src.js)
    .pipe(gulp.dest(path.build.js));
});

gulp.task('images', function () {
  return gulp.src(path.src.images)
    .pipe(gulp.dest(path.build.images));
});

gulp.task('clean', function (cb) {
  rimraf(path.clean, cb);
});

gulp.task('watch',
  function (done) {
    gulp.watch(path.watch.html, gulp.series('html'));
    gulp.watch(path.watch.css, gulp.series('css'));
    gulp.watch(path.watch.js, gulp.series('scripts'));

    done();
  });

gulp.task('default', gulp.series(
  'clean',
  gulp.parallel('images', 'html', 'css-libs', 'css', 'libs', 'scripts'),
  gulp.parallel('server', 'watch')
));