const gulp = require('gulp');
const del = require("del");
const panini = require("panini");
const webpack = require('webpack-stream');
const named = require('vinyl-named');
const browsersync = require('browser-sync').create();
const rename = require('gulp-rename');
const svgstore = require('gulp-svgstore');

/*
[ START GENERAL TASKS ]
*/

// Clean dist folder
function clean() {
	return del(['./dist**', '!./dist'], { force: true });
}

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: './dist/',
    },
    port: 3000,
  });
  done();
}

/*
[ END GENERAL TASKS ]
*/

/*
[ START HTML TASKS ]
*/

// Clean HTML files
function cleanHtml() {
	return del(['./dist/*.html', '!./dist'], { force: true });
}

// Compile HTML
function compileHtml() {
  return gulp.src("./src/html/pages/*.html")
    .pipe(panini({
      root: "./src/html/pages",
      layouts: "./src/html/layouts",
      partials: "./src/html/partials",
      helpers: "./src/html/helpers"
    }))
    .pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream());
}

function resetPages(done) {
  panini.refresh();
  done();
}

/*
[ END HTML TASKS ]
*/

/*
[ START JS + CSS TASKS ]
*/

// Clean js folder
function cleanJs() {
	return del(['./dist/js/**', '!./dist/js'], { force: true });
}

// Clean css folder
function cleanCss() {
	return del(['./dist/css/**', '!./dist/css'], { force: true });
}

function compileJsCss() {
  return gulp.src('./src/assets/js/main.js')
    .pipe(named())
    .pipe(webpack(require('./webpack.config.js')))
    .pipe(gulp.dest("./dist"))
    .pipe(browsersync.stream());
}

/*
[ END JS + CSS TASKS ]
*/

/*
[ START ASSETS TASKS ]
*/

function cleanImages() {
  return del(['./dist/img/*.{png,jpg,gif,ico}', '!./dist/img'], { force: true });
}

function moveImages() {
  return gulp.src('./src/assets/img/*')
    .pipe(gulp.dest('./dist/img'))
    .pipe(browsersync.stream());
}

function cleanSprite() {
  return del(['./dist/img/*.svg', '!./dist/img'], { force: true });
}

function createSprite() {
  return gulp.src('./src/assets/svg/*')
    .pipe(svgstore())
    .pipe(rename('sprite.svg'))
    .pipe(gulp.dest('./dist/img'))
    .pipe(browsersync.stream());
}

/*
[ END ASSETS TASKS ]
*/

/*
[ START WATCH TASKS ]
*/

// Watch files
function watch() {
  gulp.watch("./src/html/pages/*", gulp.series(cleanHtml, compileHtml));
  gulp.watch(["./src/html/layouts/*", "./src/html/partials/*"], gulp.series(cleanHtml, resetPages, compileHtml));
  gulp.watch(["./src/assets/js/**/*.js", "./src/assets/sass/**/*.scss"], gulp.series(cleanJs, cleanCss, compileJsCss));
  gulp.watch("./src/assets/img/*", gulp.series(cleanImages, moveImages));
  gulp.watch("./src/assets/svg/*.svg", gulp.series(cleanSprite, createSprite));
}

/*
[ END WATCH TASKS ]
*/

/*
[ START TASK DEFS ]
*/

// Define tasks
const html = gulp.series(cleanHtml, compileHtml);
const jscss = gulp.series(cleanJs, cleanCss, compileJsCss);
const images = gulp.series(cleanImages, moveImages);
const sprite = gulp.series(cleanSprite, createSprite);
const build = gulp.series(clean, html, jscss, images, sprite, browserSync, watch);

// Export tasks
exports.html = html;
exports.jscss = jscss;
exports.images = images;
exports.sprite = sprite;
exports.default = build;

/*
[ END TASK DEFS ]
*/