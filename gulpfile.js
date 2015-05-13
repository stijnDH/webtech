// load gulp
var gulp = require('gulp'),
imagemin = require('gulp-imagemin'),
minifyCSS = require('gulp-minify-css'),
sass = require('gulp-ruby-sass'),
nodemon = require('gulp-nodemon');

gulp.task('sass', function () {
    return sass('public/stylesheets/scss') 
    .on('error', function (err) {
      console.error('Error!', err.message);
   })
    .pipe(gulp.dest('public/stylesheets/css'));
});

gulp.task('imagemin', function(){
    gulp.src('public/images/*') 
        .pipe(imagemin())
        .on('error', function (err) {
            console.error('Error!', err.message);
        })
        .pipe(gulp.dest('public/images/')); 
});

gulp.task('styles', function() {
 gulp.src('public/stylesheets/css/*.css')
 .pipe(minifyCSS())
 .pipe(gulp.dest('public/stylesheets/css'))
}); 

gulp.task('nodemon', function () {
  nodemon({
    script: 'bin/www'
  , ext: 'js html'
  })
})

gulp.task('watch', function(){ 
	gulp.watch('public/stylesheets/scss/*.scss', ['sass']);
	gulp.watch('public/stylesheets/css/*.css', ['styles']);
}) 

gulp.task('go',['watch', 'nodemon', 'imagemin']);