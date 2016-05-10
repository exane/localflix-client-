var gulp = require("gulp");
var sass = require("gulp-sass");
var babel = require("gulp-babel")
var sourcemaps = require("gulp-sourcemaps")
var concat = require("gulp-concat")

gulp.task("sass", function() {
  gulp.src("./scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./public"))
})

gulp.task("babel", function() {
  gulp.src("./js/**/*.js")
    .pipe(sourcemaps.init())
    .pipe(babel()).on("error", function(err) {
      console.log(err);
    })
    .pipe(sourcemaps.write())
    //.pipe(sourcemaps.write("", {sourceRoot: "public"}))
    .pipe(gulp.dest("public"))

  gulp.src("./js/**/*.html")
    .pipe(gulp.dest("public"))
})

gulp.task("watch", function() {
  gulp.watch("./scss/**/*.scss", ['sass'])
  gulp.watch("./js/**/*.*", ['babel'])
})

gulp.task("default", ['watch', 'sass', 'babel'])