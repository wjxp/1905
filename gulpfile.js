const gulp = require('gulp');
const sass = require('gulp-sass');
const connect = require('gulp-connect');
const sourcemaps = require('gulp-sourcemaps');

gulp.task('server', done => {
    connect.server({
        root: 'dist',
        livereload: true
    })
    done();
})

gulp.task('html', done => {
    gulp.src('src/html/*.html')
        .pipe(gulp.dest('dist/html'))
        .pipe(connect.reload());
    done();
})

gulp.task('js', done => {
    gulp.src('src/js/*.js')
        .pipe(gulp.dest('dist/js'))
        .pipe(connect.reload());
    done();
})

gulp.task('sass', done => {
    gulp.src('src/style/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({ outputStyle: 'compact' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/css'))
        .pipe(connect.reload());
    done();
})

gulp.task('watch', done => {
    gulp.watch('src/style/*.scss', gulp.series('sass'));
    gulp.watch('src/html/*.html', gulp.series('html'));
    gulp.watch('src/js/*.js', gulp.series('js'));
    done();
})


gulp.task('default', gulp.parallel('server', 'watch'));