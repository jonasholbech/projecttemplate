var gulp = require('gulp');
//npm install --save-dev gulp-remove-html-comments
var removeHtmlComments = require('gulp-remove-html-comments');
//npm i gulp-htmlmin --save-dev
var htmlmin = require('gulp-htmlmin');//can also strip comments

//npm install --save-dev gulp-sourcemaps
var sourcemaps = require('gulp-sourcemaps');
//npm install --save-dev gulp-clean-css
var cleanCSS = require('gulp-clean-css');
//npm install --save-dev gulp-csslint
var csslint = require('gulp-csslint');
//npm install --save-dev gulp-sass
var sass = require('gulp-sass');

//npm install --save-dev gulp-strip-debug
//strip debug leaves "void 0" where it removes something, uglify should remove it
var stripDebug = require('gulp-strip-debug');
//npm install --save-dev google-closure-compiler
//required java jre http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html
var closureCompiler = require('google-closure-compiler').gulp();
//fjern void 0
//npm install --save-dev gulp-replace
var replace = require('gulp-replace');

//npm install jshint gulp-jshint --save-dev
var jshint = require('gulp-jshint');

//npm install --save-dev plato
var plato = require('plato');


var browserSync = require('browser-sync').create();


gulp.task('html', function () {
    return gulp.src('app/*.html')
        .pipe(removeHtmlComments())
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(gulp.dest('www'));
});

gulp.task('css', function () {
    return gulp.src('app/sass/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(csslint())
        .pipe(csslint.reporter())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('www/css'));
});

gulp.task('js', function(){
    return gulp.src('app/js/*.js')
        .pipe(stripDebug())
        .pipe(replace('void 0;', ''))
        .pipe(closureCompiler({
            compilation_level: 'SIMPLE',
            warning_level: 'VERBOSE',
            language_in: 'ECMASCRIPT6_STRICT',
            language_out: 'ECMASCRIPT5_STRICT',
            output_wrapper: '(function(){\n%output%\n}).call(this)',
            js_output_file: 'app.min.js'
        }))

        .pipe(gulp.dest('www/js/'));
});

//TODO use options from package
//gulp debug > Ressources/automation/jshint.txt
gulp.task('debug', function(){
    return gulp.src('app/js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

gulp.task('documentation', function(){
    var options = {
        title: 'Perfect Project, Jonas Holbech'
    };
    plato.inspect('app/js/*.js', 'app/Documentation/platoReports/', options, function(){});
});

//WATCHERS
gulp.task("watch", function() {
    gulp.watch('app/*.html', ['html']);
    gulp.watch('app/sass/*.scss', ['css'])
    gulp.watch('app/js/*.js', ['js'])
});

var reload      = browserSync.reload;

gulp.task('serve', function () {

    // Serve files from the root of this project
    browserSync.init({
        proxy: {
            target: "http://localhost/perfectProject/"
        }
    });

    gulp.watch("app/**/*.php").on("change", reload);
    gulp.watch("app/**/*.html", ['html']).on("change", reload);
    gulp.watch("app/**/*.scss", ['css']).on("change", reload);
    gulp.watch("app/**/*.js", ['js']).on("change", reload);
});