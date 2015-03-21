module.exports = function (gulp, plugins) {
	gulp.task('linkAssetsBuild', function(cb) {
		plugins.sequence(
		   'inject:dev:app',
           'inject:dev:vendor',
			cb
		);
	});
};
