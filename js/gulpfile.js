var gulp = require("gulp"),
    sass = require("gulp-sass"),
    postcss = require("gulp-postcss"),
    autoprefixer = require("autoprefixer"),
    sourcemaps = require("gulp-sourcemaps"),
    inlinesource = require('gulp-inline-source'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require("browser-sync").create();

function scss() {
    return (
        gulp
        .src('../scss/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass()).on("error", sass.logError)
        .pipe(postcss([autoprefixer()]))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('../'))
        .pipe(browserSync.stream())
    );    
}

function reload() {
    browserSync.reload();
}

function copy() {
    return (
        gulp.src([
            '../**/*.**',
            '!../**/*.css',
            '!../**/*.js',
            '!../img/**/*.**',
            '!../scss/**/*.scss'])
            .pipe(gulp.dest('./../dist/'))
    );
}

function min() {
    return gulp.src('./../dist/*.html')
      .pipe(htmlmin({ collapseWhitespace: true }))
      .pipe(gulp.dest('./../dist'));
}

function inline() {
    return gulp.src('../*.html')
        .pipe(inlinesource())
        .pipe(gulp.dest('./../dist/'));
} 

function watch() {
    browserSync.init({
        server: {
            baseDir: "../"
        },
        notify: false
    });
    
    gulp.watch('../scss/**/*.scss', scss);
    gulp.watch("../**/*.html").on('change', reload);
    gulp.watch("../**/*.js").on('change', reload);
}

var fim = gulp.series(scss,copy,inline,min);

exports.default = watch;
exports.fim = fim;