module.exports = function(grunt) {

	// Load grunt plugins.
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-postcss');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-watch');
 
	grunt.initConfig({
		sass: {
			dist: {
				options: {
					style: 'expanded'
				},
				files: [{
					expand: true,
					cwd: 'src/sass/',
					src: ['**/**/*.scss'],
					dest: 'src/css/',
					ext: '.css'
				}]
			}
		},
		postcss: {
			options: {
				processors: [
					require('autoprefixer')({
						browsers: ['> 1%', 'last 10 versions', 'ie 8', 'ie 9', 'ie 10']
					})
				]
			},
			dist: {
				src: 'src/css/style.css',
				dest: 'dist/css/style.css',
			}
		},
		cssmin: {
			minify: {
				src: 'dist/css/style.css',
				dest: 'dist/css/style.min.css'
			}
		},
		uglify: {
			my_target: {
				// files: {
				// 	'dist/js/script.min.js': [
				// 		'src/js/lib/*.js',
				// 		'src/js/*.js'
				// 	]
				// }
				files: {
					'dist/js/liveScript.min.js': [
						'src/js/live/lib/*.js',
						'src/js/live/*.js'
					],
					'dist/js/buildScript.min.js': [
						'src/js/build/lib/*.js',
						'src/js/build/*.js'
					]
				}
			}
		},
		watch: {
			options: { livereload: true },
			css: {
				files: ['src/sass/*.scss', 'src/sass/**/*.scss', 'src/sass/**/**/*.scss'],
				tasks: ['sass', 'postcss', 'cssmin']
			},
			script: {
				files: ['src/js/live/*.js', 'src/js/live/lib/*.js', 'src/js/build/*.js', 'src/js/build/lib/*.js'],
				tasks: ['uglify']
			},
			// html: {
			// 	files: ['*.html', 'build/*.html']
			// }
			// script: {
			// 	files: ['src/js/*.js', 'src/js/lib/*.js'],
			// 	tasks: ['uglify']
			// },
			html: {
				files: ['*.html']
			}
		}
	});
 
	grunt.registerTask('default', ['watch']); 
};