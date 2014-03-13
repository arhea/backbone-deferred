module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            all: ['tests/*.html']
        },

        coffee: {
            dist: {
                files: {
                    'backbone-deferred-jquery.js': [
                        'src/backbone-deferred.coffee',
                        'src/reject.coffee',
                        'src/resolve.coffee',
                        'src/jquery/*.coffee',
                        'src/model.coffee',
                        'src/collection.coffee'
                    ],
                    'backbone-deferred-q.js': [
                        'src/backbone-deferred.coffee',
                        'src/reject.coffee',
                        'src/resolve.coffee',
                        'src/q/*.coffee',
                        'src/model.coffee',
                        'src/collection.coffee'
                    ]
                }
            },
            tests: {
                files: {
                    'tests/tests/tests-jquery.js': [
                        'tests/tests/core/*.coffee',
                        'tests/tests/jquery/*.coffee'
                    ],
                    'tests/tests/tests-q.js': [
                        'tests/tests/core/*.coffee',
                        'tests/tests/q/*.coffee'
                    ]
                }
            }
        },

        concat: {
            jquery: {
                src: ['src/amd-jquery-init.js', 'backbone-deferred-jquery.js', 'src/amd-end.js'],
                dest: 'backbone-deferred-jquery-amd.js'
            },
            q: {
                src: ['src/amd-q-init.js', 'backbone-deferred-q.js', 'src/amd-end.js'],
                dest: 'backbone-deferred-q-amd.js'
            }
        },

        uglify: {
            options: {
                report: 'min'
            },
            min: {
                files: {
                    'backbone-deferred-jquery.min.js': ['backbone-deferred-jquery.js'],
                    'backbone-deferred-q.min.js': ['backbone-deferred-q.js']
                }
            }
        },

        watch: {
            src: {
                files: ['src/**/*.coffee'],
                tasks: ['coffee:dist'],
            },
            tests: {
                files: ['tests/**/*.coffee'],
                tasks: ['coffee:tests'],
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['coffee', 'concat', 'uglify', 'qunit']);
    grunt.registerTask('test', ['coffee', 'qunit']);

};
