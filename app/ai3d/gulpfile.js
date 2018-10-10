const gulp            = require("gulp");
const browserSync     = require("browser-sync").create();
const sass            = require("gulp-sass");
const watch           = require("gulp-watch");
const autoprefixer    = require("gulp-autoprefixer");
const sourcemaps      = require("gulp-sourcemaps");
const plumber         = require("gulp-plumber");
const rename          = require("gulp-rename");
const webpack         = require("webpack");
const colors          = require("ansi-colors");
const notifier        = require("node-notifier");
const wait            = require('gulp-wait');
const csso            = require('gulp-csso');


function showError(err) {
    notifier.notify({
        title: 'Error in sass',
        message: err.messageFormatted
      });

    console.log(colors.red('==============================='));
    console.log(colors.red(err.messageFormatted));
    console.log(colors.red('==============================='));
    this.emit('end');
}


gulp.task("browseSync", function() {
    browserSync.init({
        server: ["templates/ai3d","./"],
        notify: true,
        open: true,
        browser: "chrome",
    });
});


gulp.task("sass", function() {
    return gulp.src("static/src/scss/style.scss")
        .pipe(wait(500))
        .pipe(plumber({
            errorHandler: showError
        }))
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: "compressed" //nested, expanded, compact, compressed
        }))
        .pipe(autoprefixer({
            browsers: ["> 1%"]
        }))
        .pipe(csso())
        .pipe(rename({
            suffix: ".min",
            basename: "style"
        }))
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest("static/ai3d/css"))
        .pipe(browserSync.stream({match: "**/*.css"}));
});


gulp.task("es6", function(cb) {
    return webpack(require("./webpack.config.js"), function(err, stats) {
        if (err) throw err;
        console.log(stats.toString());
        cb();
        browserSync.reload();
    })
})


gulp.task("watch", function() {
    gulp.watch("static/src/scss/**/*.scss", ["sass"]);
    gulp.watch("static/src/js/**/*.js", ["es6"]);
    gulp.watch("templates/ai3d/**/*.html").on("change", browserSync.reload);
});


gulp.task("default", function() {
    console.log(colors.yellow("======================= start ======================="));
    gulp.start(["sass", "es6", "browseSync", "watch"]);
});