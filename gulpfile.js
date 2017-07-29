var gulp = require("gulp");
var babel = require("gulp-babel");
var through = require('through2');
var path = require('path');
var sourcemaps = require('gulp-sourcemaps');
var watch = require('gulp-watch');
var clean = require('gulp-clean');

function prefixStream(prefixText) {
    var stream = through();
    stream.write(prefixText);
    return stream;
}

function gulpAddRequireRuntime() {
    // 创建一个让每个文件通过的 stream 通道
    return through.obj(function(file, enc, cb) {
        var prefixText = ``;
        var rel = path.relative(path.dirname(file.path), path.join(file.base, 'lib/runtime.js'));
        rel = rel.replace(/\\/g, '/');
        if (rel === 'runtime.js') {
            prefixText = new Buffer(prefixText); // 预先分配
        } else {
            prefixText = `var regeneratorRuntime = require("${rel}");`;
            prefixText = new Buffer(prefixText); // 预先分配
        }


        if (file.isNull()) {
            // 返回空文件
            cb(null, file);
        }
        if (file.isBuffer()) {
            file.contents = Buffer.concat([prefixText, file.contents]);
        }
        if (file.isStream()) {
            file.contents = file.contents.pipe(prefixStream(prefixText));
        }

        cb(null, file);
    });

}

gulp.task('compile', () => {
    return watch(['./src/**/*.js'], { ignoreInitial: false })
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(gulpAddRequireRuntime())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', () => {
    return gulp.src(['./src/**/*.js'])
        .pipe(babel())
        .pipe(gulpAddRequireRuntime())
        .pipe(gulp.dest('./dist'));
});

gulp.task('css', () => {
    return gulp.src('./src/**/*.wxss')
        .pipe(gulp.dest('./dist'));
});

gulp.task('xml', () => {
    return gulp.src('./src/**/*.wxml')
        .pipe(gulp.dest('./dist'));
});

gulp.task('json', () => {
    return gulp.src('./src/**/*.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('jpg', () => {
    return gulp.src('./src/**/*.jpg')
        .pipe(gulp.dest('./dist'));
});

gulp.task('png', () => {
    return gulp.src('./src/**/*.png')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-css', () => {
    return watch('./src/**/*.wxss')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-xml', () => {
    return watch('./src/**/*.wxml')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-json', () => {
    return watch('./src/**/*.json')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-jpg', () => {
    return watch('./src/**/*.jpg')
        .pipe(gulp.dest('./dist'));
});

gulp.task('watch-png', () => {
    return watch('./src/**/*.png')
        .pipe(gulp.dest('./dist'));
});

gulp.task("clean", function() {
    return gulp.src('./dist')
        .pipe(clean());
});

gulp.task('res', ['css', 'xml', 'json', 'jpg', 'png']);


gulp.task('build', ['clean'], function() {
    gulp.start( 'scripts', 'res');
});

gulp.task('watch', [
    'watch-css',
    'watch-css',
    'watch-xml',
    'watch-json',
    'watch-jpg',
    'watch-png',
    'compile',
]);
