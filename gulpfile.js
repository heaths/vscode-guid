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

'use strict';

const gulp = require('gulp');
const clean = require('gulp-clean');
const sourcemaps = require('gulp-sourcemaps');
const svg2png = require('gulp-svg2png');
const ts = require('gulp-typescript');

gulp.task('compile:res', () => {
    return gulp.src('res/**/*.svg')
        .pipe(svg2png())
        .pipe(gulp.dest('out/res/'));
});

gulp.task('compile:src', () => {
    const project = ts.createProject('tsconfig.json');
    return project.src()
        .pipe(sourcemaps.init())
        .pipe(project()).js
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('out'));
});

gulp.task('compile', gulp.parallel('compile:res', 'compile:src'));

gulp.task('watch', gulp.series('compile:src'), () => {
    gulp.watch('src/**/*.ts', ['compile:src']);
});

gulp.task('clean', () => {
    return gulp.src(['out', '**/*.vsix'])
        .pipe(clean({read: false}));
});

gulp.task('default', gulp.series('clean', 'compile'));
