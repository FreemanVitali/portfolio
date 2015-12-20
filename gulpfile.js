var gulp = require("gulp"),
    wiredep = require('wiredep').stream,
    browserSync = require('browser-sync');

// сборка html css javascript + удаление папки dist
var rimraf = require('gulp-rimraf'),    
    useref = require('gulp-useref'),    
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'), 
    minifyCss = require('gulp-minify-css');

    // финальная сборка
var filter = require('gulp-filter'), 
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size'); 

gulp.task('server', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'Ls-web'
    }
  });
});

// Перенос шрифтов
    gulp.task('fonts', function() {
      gulp.src('Ls-web/fonts/*')
        .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
        .pipe(gulp.dest('dist/fonts/'))
    });

    // Картинки
    gulp.task('images', function () {
      return gulp.src('Ls-web/img/**/*')
        .pipe(imagemin({
          progressive: true,
          interlaced: true
        }))
        .pipe(gulp.dest('dist/img'));
    });

// Остальные файлы, такие как favicon.ico и пр.
    gulp.task('extras', function () {
      return gulp.src([
        'Ls-web/*.*',
        '!app/*.html'
      ]).pipe(gulp.dest('dist'));
    });

// Слежка
gulp.task('watch', function () {
  gulp.watch([
    'Ls-web/*.php',
  	'Ls-web/*.css',
    'Ls-web/*.html',
    'Ls-web/js/**/*.js',
    'Ls-web/css/**/*.css'
  ]).on('change', browserSync.reload);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('default', ['server', 'watch']);


// Следим за bower
  gulp.task('wiredep', function () {
    gulp.src('Ls-web/*.html')
      .pipe(wiredep())
      .pipe(gulp.dest('Ls-web/'))
  });

  // Переносим HTML, CSS, JS в папку dist 
  gulp.task('useref', function () {
    return gulp.src('Ls-web/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
      .pipe(gulp.dest('dist'));
  });

  // Переносим HTML, CSS, JS в папку dist 
  gulp.task('useref', function () {
    return gulp.src('Ls-web/*.html')
      .pipe(useref())
      .pipe(gulpif('*.js', uglify()))
      .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
      .pipe(gulp.dest('dist'));
  });