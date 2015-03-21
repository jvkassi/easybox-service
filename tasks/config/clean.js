/**
 * Clean files and folders.
 *
 * ---------------------------------------------------------------
 *
 * This gulp task is configured to clean out the contents in the .tmp/public of your
 * sails project.
 *
 */
 var del = require('del')
module.exports = function(gulp, plugins, growl) {
    gulp.task('clean:dev', function(cb) {
        return del('.tmp/public', {
            force: true
        }, cb);
    });
    gulp.task('clean:build', function() {
        return gulp.src(['www/**/*.*', 'www{,/**}'], {
                read: false
            })
            .pipe(del({
                force: true
            }))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'Clean task complete'
            })));
    });
};
