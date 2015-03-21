module.exports = function(gulp, plugins) {
    gulp.task('prod', function(cb) {
        plugins.sequence(
            'compileAssets', [
                'concat:vendor:js',
                'concat:vendor:css',
                'concat:app:js',
                'concat:app:css',
            ],
            'inject:prod:vendor',
            'inject:prod:app',
            cb
        );
    });
};
