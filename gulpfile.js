var gulp = require('gulp');
var watch = require('gulp-watch');
var clean = require('gulp-clean');
var minifyCSS = require('gulp-csso');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyjs = require('gulp-js-minify');
var babel = require('gulp-babel');


/************** CSS **************/

gulp.task('clean-css', function () {
    return gulp.src('content/Themes/build/compressed.css')
        .pipe(clean());

});


gulp.task('css', function () {
    return gulp.src(['Scripts/bootstrap/bootstrap.min.css', 'Scripts/jquery-confirm/jquery-confirm.min.css', 'Scripts/OwlCarousel2-2.3.4/dist/assets/owl.carousel.min.css', 'Scripts/OwlCarousel2-2.3.4/dist/assets/owl.theme.default.min.css', 'content/Themes/Css/main.css', 'content/Themes/Css/responsive.css', 'content/Themes/Css/ie_11.css'])
        .pipe(concat('compressed.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('content/Themes/build'))
});

gulp.task('clean-scripts', function () {
    return gulp.src('buildScripts/compressed.js')
        .pipe(clean());

});
/***************************/



/************** SCRIPTS **************/

gulp.task('scripts', function () {
    return gulp.src(['Scripts/jquery-3.2.1.min.js', 'Scripts/jquery-confirm/jquery-confirm.min.js', 'Scripts/jquery.easy-pie-chart.js', 'Scripts/bootstrap/bootstrap.min.js', 'Scripts/OwlCarousel2-2.3.4/dist/owl.carousel.min.js', 'Scripts/form.js', 'Scripts/main.js'])
        .pipe(concat('compressed.js'))
        .pipe(gulp.dest('Scripts/build/js/'))
        //.pipe(rename('compressed.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('buildScripts/'));
});


//gulp.task('minify-scripts', function () {
//    return gulp.src('Scripts/compressed.js')
//        .pipe(babel({ presets: ['@babel/env'] }))
//        // .pipe(uglify())
//        .pipe(minifyjs())
//        .pipe(gulp.dest('Scripts/build/js/min'))
//});

/***************************/




gulp.task('watch', function () {
    gulp.watch('content/Themes/css/*.css', gulp.series('clean-css', 'css'));
    gulp.watch('Scripts/*.js', gulp.series('clean-scripts', 'scripts'));
});


gulp.task('default', gulp.series('watch', function (done) {
    done()
}))