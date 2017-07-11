// The MIT License (MIT)
//
// Copyright (c) Heath Stewart
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

var gulp = require('gulp');
var clean = require('gulp-clean');
var merge = require('gulp-merge');
var sourcemaps = require('gulp-sourcemaps');
var svgmin = require('gulp-svgmin');
var ts = require('gulp-typescript');

gulp.task('compile', function() {
    var project = ts.createProject('tsconfig.json');
    return merge(
        gulp.src('res/**/*.svg')
            .pipe(svgmin())
            .pipe(gulp.dest('out/res/')),
        project.src()
            .pipe(sourcemaps.init())
            .pipe(ts(project))
            .js
            .pipe(sourcemaps.write('./', { sourceRoot: '../' }))
            .pipe(gulp.dest('out'))
    );
});

gulp.task('watch', ['compile'], function() {
    gulp.watch(['src/**/*.ts', 'test/**/*.ts'], ['compile']);
});

gulp.task('clean', function() {
    return gulp.src(['out', '**/*.vsix'])
        .pipe(clean({read: false}));
});

gulp.task('default', ['compile']);
