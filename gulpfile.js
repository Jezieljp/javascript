var gulp = require('gulp');
var browserSync = require('browser-sync').create();

//PRIMEIRA FORMA DE USA O BROWSER-SYNC
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./course"
        }
    });
    gulp.watch("./course/css/bootstrap.min.css");
    gulp.watch("./course/js/**/*.js", ['js']);
    gulp.watch('./course/index.htm', ['html']);
});
//TASK HTML
gulp.task('html', function () {
    return gulp.src('./course/index.html')
        .pipe(browserSync.stream());
});
//TASK JS
gulp.task('js', function () {
    return gulp.src('./course/*.js')
        .pipe(browserSync.stream());
});
gulp.task('default', ['html', 'js', 'server']);