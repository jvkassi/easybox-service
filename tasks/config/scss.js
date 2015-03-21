/**
 * Compiles LESS files into CSS.
 *
 * ---------------------------------------------------------------
 *
 * Only the `assets/styles/importer.less` is compiled.
 * This allows you to control the ordering yourself, i.e. import your
 * dependencies, mixins, variables, resets, etc. before other stylesheets)
 *
 */
module.exports = function(gulp, plugins, growl) {

	gulp.task('sass:dev', function() {
		return gulp.src('assets/styles/*.scss')
				.pipe(
					plugins.sass()
					// 	expand: true,
					// 	ext: '.css'
					// })
				)
				.pipe(gulp.dest('.tmp/public/styles/'))
				.pipe(plugins.if(growl, plugins.notify({ message: 'less dev task complete' })));
	});
};
