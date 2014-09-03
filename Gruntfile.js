module.exports = function(grunt) {
    grunt.initConfig({
        watch: {
            styles: {
                files: [
                    'iframe/css/*.less',
                ], // which files to watch
                tasks: [
                    'less', 'autoprefixer'
                ],
                options: {
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 250
                }
            },
            scripts: {
                files: [
                    'widget.js',
                    'iframe/js/*.js',
                ], // which files to watch
                tasks: [
                    'uglify'
                ],
                options: {
                    spawn: false,
                    interrupt: true,
                    debounceDelay: 250
                }
            },
            configFile: {
                files: ['Gruntfile.js'],
                options: {
                    reload: false
                }
            }
        },
        uglify: {
            js: {
                files: {
                    'widget.min.js': ['widget.js'],
                    'iframe/js/min/modal.min.js': ['iframe/js/modal.js'],
                    'iframe/js/min/banner.min.js': ['iframe/js/banner.js'],
                    'iframe/js/min/common.min.js': ['iframe/js/common.js']
                }
            }
        },
        less: {
            development: {
                options: {
                    cleancss: true,
                    compress: true,
                    yuicompress: true,
                    optimization: 2
                },
                files: {
                    // target.css file: source.less file
                    "iframe/css/min/modal.min.css": "iframe/css/modal.less",
                    "iframe/css/min/banner.min.css": "iframe/css/banner.less"
                }
            }
        },
        autoprefixer: {
            options: {
                browsers: ['last 2 versions', 'ie >= 8', '> 1%', 'Firefox ESR', 'Opera 12.1']
            },
            css: {
                // Target-specific file lists and/or options go here.
                src: 'iframe/css/min/*.css'
            },
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: ['iframe/css/min/*.css', 'iframe/js/min/*.js', 'iframe/images/**', 'iframe/*.html']
                },
                options: {
                    server: {
                        baseDir: "./",
                        watchTask: true,
                        notify: false
                    }
                }
            },
            host: {
                bsFiles: {
                    src: ['iframe/css/min/*.css', 'iframe/js/min/*.js', 'iframe/images/**', 'iframe/*.html']
                },
                options: {
                    server: {
                        baseDir: "./",
                        watchTask: false,
                        ghostMode: false,
                        notify: false
                    }
                }
            }
        },
        imageoptim: {
            images: {
                options: {
                    jpegMini: false,
                    imageAlpha: false,
                    quitAfter: true
                },
                src: ['iframe/images', 'demos/']
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-imageoptim');
    grunt.loadNpmTasks('grunt-newer');

    grunt.registerTask('default', ['newer:uglify:js', 'newer:less:development', 'newer:autoprefixer:css', 'newer:imageoptim:images']);

    grunt.registerTask('build', ['uglify', 'less', 'autoprefixer', 'imageoptim']);
    grunt.registerTask('watching', ['default', 'watch']);
    grunt.registerTask('serve', ['browserSync:dev', 'watching']);
    grunt.registerTask('host', ['browserSync:host']);
};
