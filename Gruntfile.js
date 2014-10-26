module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
		// JSHINTING
		jshint: {
			files: ['src/server/**/*.js'],
			options: {
				globals: {
					jQuery: true,
					console: true,
					module: true
				}
			}
		},
		compass: {
			dev: {
				options: {
					sassDir: 'src/client/scss',
					cssDir: 'src/client/css'
				}
			}
		},
		watch: {
			files: ['<%= jshint.files %>'],
			tasks: ['jshint', 'express:dev'],
			options: {
				spawn: false
			}
		},
		express: {
			options: {
				spawn: false,
				cmd: process.argv[0],
				background: true
			},
			dev: {
				options: {
					script: 'src/server/app.js',
					node_env: 'dev'
				}
			},
			prod: {
				options: {
					script: 'src/server/app.js',
					node_env: 'production'
				}
			}
		}
  });

  // Load the plugins that provides the tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-compass');

  // Default task(s).
  grunt.registerTask('default', ['jshint']);
  grunt.registerTask('server', ['express:dev', 'watch']);

};
