module.exports = function(gulp, plugins) {
    gulp.task('compileAssets', function(cb) {
        plugins.sequence(
            'bower:install',
            'bower:copy',
            'clean:dev',
            'jst:dev',
            'copy:devng',
            'html2js:dev',
            // 'less:dev',
            'sass:dev',
            'copy:dev',
            // 'coffee:dev',
            cb
        );
    });
};
