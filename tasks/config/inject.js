/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files. Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see (the original):
 *      https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(gulp, plugins, growl) {

    // Insert JS, CSS and template dev links into HTML and EJS files in the views folder
    gulp.task('inject:dev:vendor', function() {
        // Read templates
        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // Link the javaScript
            .pipe(plugins.wiredep.stream({
                ignorePath: '../assets',
                fileTypes: {
                    html: {
                        replace: {
                            css: function(filePath) {
                                console.log(filePath);
                                return '<link rel="stylesheet" href="' +
                                    filePath + '">';
                            },
                            js: function(filePath) {
                                return '<script src="' +
                                    filePath + '"></script>';
                            }
                        }
                    }
                }
            }))
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'sails-linker-gulp:devViews task complete'
            })));
    })


    gulp.task('inject:dev:app', function() {

        return gulp.src(['views/**/*.html', 'views/**/*.ejs'])
            // .pipe(inject(gulp.src('./src/importantFile.js', {read: false}), {starttag: '<!-- inject:head:{{ext}} -->'}))
            .pipe(plugins.inject(
                gulp.src(require('../pipeline').jsFilesToInject, {
                    read: true
                }).pipe(plugins.angularFilesort()), {
                    ignorePath: '.tmp/public'
                }))
            .pipe(plugins.inject(
                gulp.src(require('../pipeline').cssFilesToInject, {
                    read: false
                }), {
                    ignorePath: '.tmp/public'
                }))

        // Write modified files...
        .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'sails-linker-gulp:devViews task complete'
            })));
    });

    // Insert JS, CSS and template production links into HTML and EJS files in the views folder
    gulp.task('inject:prod:vendor', function() {
        // Read templates
        return gulp.src(['views/**/*.html',
                'views/**/*.ejs'
            ])
            // Link the JavaScript
            // Link the JavaScript
            .pipe(plugins.inject(
                gulp.src('.tmp/public/{scripts,styles}/vendor*', {
                    read: false
                }), {
                    starttag: '<!-- bower:{{ext}} -->',
                    endtag: '<!-- endbower -->',
                    ignorePath: '.tmp/public'
                }))
            // Write modified files...
            .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'sails-linker-gulp:prodViews task complete'
            })));
    });

    gulp.task('inject:prod:app', function() {
        return gulp.src(['views/**/*.html',
                'views/**/*.ejs'
            ])
            // Link the styles
            .pipe(plugins.inject(
                gulp.src('.tmp/public/{scripts,styles}/app*', {
                    read: false
                }), {
                    ignorePath: '.tmp/public'
                }))

        // Write modified files...
        .pipe(gulp.dest('views/'))
            .pipe(plugins.if(growl, plugins.notify({
                message: 'sails-linker-gulp:prodViews task complete'
            })));
    });


};
