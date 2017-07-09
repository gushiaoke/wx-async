var gulp = require("gulp");
var babel = require("gulp-babel");
var through = require('through2');
var path = require('path');

function gulpAddRequireRuntime() {
    // 创建一个让每个文件通过的 stream 通道
    return through.obj(function (file, enc, cb) {

        var rel = path.relative(path.dirname(file.path), path.join(file.base, 'lib/runtime.js'))
        rel = rel.replace(/\\/g, '/');
        if (rel === 'runtime.js') {
            var prefixText = ``;
            prefixText = new Buffer(prefixText); // 预先分配
        } else {
            var prefixText = `var regeneratorRuntime = require("${rel}");`;
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

};

gulp.task('scripts', () => {
    return gulp.src('./src/**/*.js')
        .pipe(babel())
        .pipe(gulpAddRequireRuntime())
        .pipe(gulp.dest('./dist'))
});

gulp.task('watch', ['scripts'], function () {
    gulp.watch('./src/**/*.js', ['scripts']);
});