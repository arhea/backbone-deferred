'use strict';

module.exports = function(grunt) {

	grunt.initConfig({
		
		pkg: grunt.file.readJSON('package.json'),

		jshint: {
			options: {
		    	browser: true,
		    	globals: {
		    		jQuery: true
		    	}
		    },

			src: ['<%= pkg.name %>.js']
		},

		uglify: {
			options: {
				banner: '// <%= pkg.name %> <%= pkg.version %> \n' +
				'// (c) <%= grunt.template.today("yyyy") %> Alex Rhea \n' +
				'// backbone-deferred may be freely distributed under the MIT license. \n' +
				'// <%= pkg.repository.url %> \n',
        		report: true
		    },
			src: {
				files: {
					'<%= pkg.name %>.min.js': ['<%= pkg.name %>.js']
				}
			}
		},

		qunit: {
			all: ['tests/*.html']
		},

		watch: {
			src: {
				files: ['<%= pkg.name %>.js'],
				tasks: ['jshint', 'qunit', 'uglify']
			}
		}

	});

	grunt.registerTask('default', ['jshint', 'qunit', 'uglify']);
	grunt.registerTask('test', ['jshint', 'qunit']);
	
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-qunit');


}