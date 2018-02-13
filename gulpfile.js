var gulp = require('gulp');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['hmlt'], function(){
    browserSync.init({
        server: "/course"
    });
    gulp.watch(['css/*.css', 'js/*.js', 'html']);
    gulp.watch("html").on('change', browserSync.reload);
});

gulp.task('default', ['html', 'sarve']);