module.exports = function (gulp, plugins) {
	gulp.task('linkAssets', function(cb) {
		plugins.sequence(
           'inject:dev:app',
            'inject:dev:vendor',
			cb
		);
	});
};
