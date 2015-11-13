module.exports = function(grunt) {

  // Project configuration.
grunt.initConfig({
	pkg: grunt.file.readJSON('package.json'),
	uglify: {
		options: {
			banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
		},
		build: {
			src: 'src/js/<%= pkg.name %>.js',
			dest: 'js/<%= pkg.name %>.min.js'
		}
	},
	cssmin: {
		target: {
			files: [{
				expand: true,
				cwd: 'src/css',
				src: ['*.css', '!*.min.css'],
				dest: 'css',
				ext: '.min.css'
			}]
		}
	},
	htmlmin: {
		dist: {                                      
			options: {                                 
				removeComments: true,
				collapseWhitespace: true
			},
			files: {                                   
				'index.html': 'src/proj5mapapp.html'
			}
		}
	},
	imagemin: {
		dist: {
			options: {
				optimizationLevel: 5
		},
		files: [{
			expand: true,
			cwd: 'src/images',
			src: ['**/*.{png,jpg,gif}'],
			dest: 'images'
		}]
	}
}
});
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-htmlmin');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	// Default task(s).
	grunt.registerTask('default', ['uglify','cssmin','htmlmin','imagemin']);

};