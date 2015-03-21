/**
 * Concatenate files.
 *
 * ---------------------------------------------------------------
 *
 * Concatenates files javascript and css from a defined array. Creates concatenated files in
 * .tmp/public/contact directory
 *
 */
module.exports = function(gulp, plugins, growl) {

    gulp.task('concat:app:js', function() {
        return gulp.src(require('../pipeline').jsFilesToInject)
            .pipe(plugins.jshint('.jshintrc'))
            .pipe(plugins.jshint.reporter('default'))
            .pipe(plugins.angularFilesort())
            .pipe(plugins.concat('app.js'))
            .pipe(plugins.ngAnnotate())
            .pipe(plugins.uglify())
            .pipe(plugins.rev())
            .pipe(gulp.dest('.tmp/public/scripts'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'Concatenate App Scripts task complete'
            })));

    })

    gulp.task('concat:app:css', function() {
        return gulp.src(require('../pipeline').cssFilesToInject)
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(plugins.concat('app.css'))
            .pipe(plugins.cssmin())
            .pipe(plugins.rev())
            .pipe(gulp.dest('.tmp/public/styles'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'Concatenate App Styles task complete'
            })));
    })

    gulp.task('concat:vendor:js', function() {

        var
            stream = plugins.streamqueue({
                objectMode: true
            }),
            wiredep = plugins.wiredep();

        if (wiredep.js) {
            stream.queue(gulp.src(wiredep.js));
        }

        return stream.done()
            .pipe(plugins.plumber())
            .pipe(plugins.concat('vendor.js'))
            .pipe(plugins.uglify({
                preserveComments: plugins.uglifySaveLicense
            }))
            .pipe(plugins.rev())
            .pipe(gulp.dest('.tmp/public/scripts'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'Concatenate vendor Scripts task complete'
            })));
    });

    gulp.task('concat:vendor:css', function() {

        var
            stream = plugins.streamqueue({
                objectMode: true
            }),
            wiredep = plugins.wiredep();

        if (wiredep.css) {
            stream.queue(gulp.src(wiredep.css));
        }

        return stream.done()
            .pipe(plugins.autoprefixer('last 2 version', 'safari 5', 'ie 10', 'opera 12.1', 'ios 6', 'android 4'))
            .pipe(plugins.concat('vendor.css'))
            .pipe(plugins.cssmin({
                keepSpecialComments: 0
            } ))
            .pipe(plugins.rev())
            .pipe(gulp.dest('.tmp/public/styles'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'Concatenate vendor CSS task complete'
            })));
    });

};
