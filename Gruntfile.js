module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        qunit: {
            all: ['tests/*.html']
        },

        coffee: {
            compile: {
                files: {
                    'backbone-deferred-jquery.js': [
                        'src/deferred.coffee',
                        'src/jquery/*'
                    ],
                    'backbone-deferred-q.js': [
                        'src/deferred.coffee',
                        'src/q/*'
                    ]
                }
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
                tasks: ['coffee'],
            }
        }

    });

    grunt.loadNpmTasks('grunt-contrib-coffee');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-qunit');

    grunt.registerTask('default', ['coffee', 'uglify', 'qunit']);
    grunt.registerTask('test', ['coffee', 'qunit']);

};
