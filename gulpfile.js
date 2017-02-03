"use strict";

var gulp = require("gulp");
var browserify = require("browserify");
var babelify = require("babelify");
var source = require("vinyl-source-stream");

gulp.task("build", function () {
    return browserify({entries: "./src/js/main.js", debug: true})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("example", function () {
    return browserify({entries: "./src/js/example.js", debug: true})
        .transform("babelify", {presets: ["es2015"]})
        .bundle()
        .pipe(source("example.js"))
        .pipe(gulp.dest("./"));
});

gulp.task("watch", ["build"], function () {
    gulp.watch("./src/js/*.js", ["build"]);
});

gulp.task("default", ["build", "watch"]);