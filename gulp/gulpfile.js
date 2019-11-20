'use strict';

var gulp = require('gulp'),
    basePath = require('path'),
    svgmin = require('gulp-svgmin'),
    svgstore = require('gulp-svgstore');

gulp.task('svgIcons', function () {
    return gulp
        .src('../src/img/icons/*.svg')
        .pipe(svgmin(function (file) {
            var prefix = basePath.basename(file.relative, basePath.extname(file.relative));
            return {
                plugins: [{
                    cleanupIDs: {
                        prefix: prefix + '-',
                        minify: true
                    }
                }]
            }
        }))
        .pipe(svgstore())
        .pipe(gulp.dest('../src/img/'));
});
