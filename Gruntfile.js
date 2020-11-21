module.exports = function (grunt) {
	require('time-grunt')(grunt);
	require('jit-grunt')(grunt, {
		useminPrepare: 'grunt-usemin'
	});
	grunt.initConfig({
		sass: {
			dist: {
				files: [{
					expand: true,
					cwd: 'css',
					src: ['*.scss'],
					dest: 'css',
					ext: '.css'
				}]
			}
		},

		watch: {
			files: ['css/*.scss'],
			tasks: ['css'],
		},
		browserSync: {
			dev: {
				bsFiles: { //browser files
					src: [
						'css/*.css',
						'*.html',
						'js/*.js'
					]
				},
				options: {
					watchTask: true,
					server: {
						baseDir: './' //Directorio base para nuestro servidor

					}

				}

			}
		},
		imagemin: {
			dynamic: {
				files: [{
					expand: true,
					cwd: './',
					src: '/images/*.{png,jpg,jpeg,gif}',
					dest: 'dist'
			}]
			}
		},
		copy: {
			html: {
				files: [{
					expand: true,
					dot: true,
					cwd: './', //current working directory
					src: ['*.html'],
					dest: 'dist'
				}]
			},
			font: {
				files: [{
					expand: true,
					dot: true,
					cwd: 'node_modules/open-iconic/font', //current working directory
					src: ['fonts/*.*'],
					dest: 'dist'
				}]
			}
		},
		clean: {
			build: {
				src: ['dist/'] //clean the distribution folder
			}
		},
		cssmin: {
			dist: {}
		},
		uglify: {
			dist: {}
		},
		filerev: {
			options: {
				encoding: 'uft8',
				algorithm: 'md5',
				length: 20
			},
			release: {
				files: [{
					src: [
						'dist/js/*.js',
						'dist/css/*.css'
					]
				}]
			},
		},
		concat: {
			options: {
				separator: ';'
			},
			dist: {}
		},
		useminPrepare: {
			foo: {
				dest: 'dist',
				src: ['index.html', 'about.html', 'precios.html', 'contacto.html']
			},
			options: {
				flow: {
					steps: {
						css: ['cssmin'],
						js: ['uglify']
					},
					post: {
						css: [{
							name: 'cssmin',
							createConfig: function (context, block) {
								var generated = context.options.generated;
								generated.options = {
									keepSpecialComments: 0,
									rebase: false
								}
							}
						}]
					}
				}
			}
		},
		usemin: {
			html: ['dist/index.html', 'dist/about.html', 'dist/precios.html', 'dist/contacto.html'],
			options: {
				assetsDir: ['dist', 'dist/css', 'dist/js']
			}
		}
	});

	grunt.registerTask('css', ['sass']);
	grunt.registerTask('default', ['browserSync', 'watch']);
	grunt.registerTask('img:compress', ['imagemin']);
	grunt.registerTask('build', [
		'clean', //Borramos el contenido de dist
		'copy', //Copiamos los archivos html a dist
		'imagemin', //Optimizamos imagenes y las copiamos a dist
		'useminPrepare', //Preparamos la configuracion de usemin
		'concat',
		'cssmin',
		'uglify',
		'filerev', //Agregamos cadena aleatoria
		'usemin' //Reemplazamos las referencias por los archivos generados por filerev
	]);
};