var gulp = require("gulp");
var browserSync = require("browser-sync").create();
//var del = require("del");
//var notify = require('gulp-notify');

//LIMPANDO O CACHE
gulp.task("cache:css", function(){
    del("./course/css/style.css")
});

//LIMPANDO CACHE
gulp.task("cache:js", function(){
    del("./course/css/*.css")
});

//PRIMEIRA FORMA DE USA O BROWSER-SYNC
gulp.task('server', function () {
    browserSync.init({
        server: {
            baseDir: "./course"
        }
    });
    gulp.watch("./course/css/bootstrap.min.css");
    gulp.watch("./course/js/**/*.js", ['js']);
    gulp.watch('./course/index.html', ['html']);
});
//TASK HTML
gulp.task('html', function () {
    return gulp.src('./course/index.html')
        .pipe(browserSync.stream());
});
//TASK CSS
gulp.task('css', function () {
    return gulp.src('./course/css/style.css')        
        .on('error', notify.onError({title: "erro css", message: "<%= erro.message%>"}))
        .pipe(browserSync.stream());
});
//TASK JS
gulp.task('js', function () {
    return gulp.src('./course/*.js')
        .pipe(browserSync.stream());
});
gulp.task('default', ['html', 'js', 'server']);