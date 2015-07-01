module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        uglify: {
            options: {
                banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
            },
            build: {
                src: 'public/js/bundle.js',
                dest: 'public/js/bundle.min.js'
            }
        },
        browserify: {
            options: {
                transform:  [ require('grunt-react').browserify ]
            },
            app: {
                src: 'jsx/index.jsx',
                dest: 'public/js/bundle.js'
            }
        },
        watch: {
            src: {
                files: ['jsx/*.jsx','!public/js/bundle*.js'],
                tasks: ['browserify', 'uglify'],
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-react');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task(s).
    grunt.registerTask('default', ['browserify', 'uglify']);

};
