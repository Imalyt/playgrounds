var gulp = require('gulp'),
    clean = require('gulp-clean'),
    less = require('gulp-less'),
    runSequence = require('gulp-run-sequence'),
    connect = require('gulp-connect'),
    watch = require('gulp-watch');

var dist = 'dist',
    src = 'src',
    fonts = src + '/fonts',
    lessSrc = src + '/less',
    cssDist = dist + '/css',
    imgSrc = src + '/img',
    imgDist = dist + '/img',
    jsSrc = src + '/js',
    jsDist = dist + '/js';

gulp.task('default', function() {

});

// clean task
gulp.task('clean', function() {
    return gulp.src(dist, {read: false})
        .pipe(clean());
});

// html task
gulp.task('html', function() {
  return gulp.src(src + '/*.html')
    .pipe(gulp.dest(dist))
    .pipe(connect.reload());
});

// font task
gulp.task('fonts', function() {
    return gulp.src('src/fonts/*.**')
        .pipe(gulp.dest(dist + '/webfonts'))
        .pipe(connect.reload());
});

//img task
gulp.task('images', function() {
    return gulp.src(imgSrc + '/**/*.**')
        .pipe(gulp.dest(imgDist))
        .pipe(connect.reload());
});

// task for compiling styles
gulp.task('styles', function() {
    return gulp.src(lessSrc + '/*.**')
        .pipe(less())
        .pipe(gulp.dest(cssDist))
        .pipe(connect.reload());
});

// build static site for local testing
gulp.task('build-static', ['clean'], function(cb) {
    runSequence(['styles', 'images', 'html', 'fonts'], cb);
});

// run server via gulp-connect
gulp.task('server', ['build-static'], function() {
  connect.server({
    root: dist,
    livereload: true,
    port: 8080
  });
});

// watch task
gulp.task('watch', ['server'], function() {
    gulp.watch([lessSrc + '/**/*.**'], ['styles']);
    gulp.watch([src + '/*.html'], ['html']);
    connect.reload();
});