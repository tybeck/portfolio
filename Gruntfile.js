'use strict';

module.exports = function (grunt) {

  var pkg = {

    grunt: null,

    /**
      * Load grunt tasks automatically
      * Time how long tasks take. Can help when optimizing build times
      * @method init
      * @type Function
    */

    init: function (grunt) {

      this.grunt = grunt;

      require('load-grunt-tasks')(this.grunt);

      require('time-grunt')(this.grunt);

      return this;

    },

    /**
      * Configure grunt
      * @method config
      * @type Function
    */

    config: function () {

      var grunt = this.grunt;

      grunt.initConfig({

        'paths': {

            'app': 'app',

            'scripts': 'scripts',

            'styles': 'styles',

            'dist': 'www',

            'images': 'images'

        },
        
        'nodemon': {

          'dev': {

            'script': 'server.js'

          }

        },

        // Automatically inject bower_components into the app

        'bowerInstall': {
         
          'target': {
         
            'src': [

              '<%= paths.dist %>/*.html'

            ]

          }

        },

        // Empties folders to start fresh

        'clean': {

            'dist': {

                'files': [
                    {

                        'dot': true,

                        'src': [

                            '.tmp',

                            '<%= paths.dist %>/*',

                            '!<%= paths.dist %>/.git*'

                        ]

                    }
                ]

            },

            'server': '.tmp'

        },

        // Constants for Tyler+Beck

        'ngconstant': {

            'development': {

                'options': {

                    'dest': '<%= paths.app %>/scripts/config.js',

                    'wrap': '\'use strict\';\n\n{%= __ngModule %}',

                    'name': 'tyb.config'

                },

                'constants': grunt.file.readJSON('config/development.json')

            },

            'production': {

                'options': {

                    'dest': '<%= paths.app %>/scripts/config.js',

                    'wrap': '\'use strict\';\n\n{%= __ngModule %}',

                    'name': 'tyb.config'

                },

                'constants': grunt.file.readJSON('config/production.json')

            }

        },

        // Compile templates

        'ngtemplates': {

            'options': {

                'module': 'TylerBeck'

            },

            'app': {

                'cwd': '<%= paths.app %>',

                'src': 'views/**/*.html',

                'dest': '<%= paths.app %>/scripts/templates.js'

            }

        },

        'autoprefixer': {

            'options': {

                'browsers': ['last 2 versions', 'ios 6', 'android >= 2.3']

            },

            'dist': {

                'files': [
                    {

                        'expand': true,

                        'cwd': '.tmp/<%= paths.styles %>/',

                        'src': '{,*/}*.css',

                        'dest': '.tmp/<%= paths.styles %>/'

                    }
                ]

            }

        },

        // Make sure code styles are up to par and there are no obvious mistakes

        'jshint': {

            'options': {

                'jshintrc': '.jshintrc',

                'reporter': require('jshint-stylish')

            },

            'all': [

                'Gruntfile.js',

                '<%= paths.app %>/<%= paths.scripts %>/**/*.js',

                '!<%= paths.app %>/<%= paths.scripts %>/libs/**/*.js',

                '!<%= paths.app %>/<%= paths.scripts %>/templates.js',

                '!<%= paths.app %>/<%= paths.scripts %>/overrides/**/*.js'

            ],

            'test': {

                'options': {

                    'jshintrc': 'test/.jshintrc'

                },

                'src': ['test/unit/**/*.js']

            }

        },

        // Copies remaining files to places other tasks can use
        
        'copy': {

          'main': {
            
            'files': [

              {

                'expand': true,
            
                'cwd': '<%= paths.app %>/',
            
                'dest': '<%= paths.dist %>/',
            
                'src': 'index.html'

              }

            ]

          },

          'styles': {
        
            'expand': true,
        
            'cwd': '.tmp/',
        
            'dest': '<%= paths.dist %>/',
        
            'src': '{,*/}*.css'
          
          },

          'scripts': {
            
            'files': [

              {

                'expand': true,
            
                'cwd': '<%= paths.app %>/<%= paths.scripts %>/',
            
                'dest': '<%= paths.dist %>/<%= paths.scripts %>/',
            
                'src': '{,*/}*.js'

              }

            ]

          }
        
        },

        'watch': {

            'js': {

                'files': ['<%= paths.app %>/<%= paths.scripts %>/**/*.js'],

                'tasks': ['newer:jshint:all']

            },

            'html': {

                'files': ['<%= paths.app %>/*.html', '<%= paths.app %>/templates/**/*.html'],

                'tasks': ['copy:main', 'ngtemplates', 'bowerInstall']

            },

            'gruntfile': {

                'files': ['Gruntfile.js'],

                'tasks': ['ngconstant:development']

            },

            'compass': {

                'files': ['<%= paths.app %>/<%= paths.styles %>/**/*.{scss,sass}'],

                'tasks': [

                  'compass:server',

                  'autoprefixer',

                  'copy:styles'

                ]

            }

        },

        // Compiles Sass to CSS and generates necessary files if requested

        'compass': {

            'options': {

                'sassDir': '<%= paths.app %>/<%= paths.styles %>',

                'specify': '<%= paths.app %>/<%= paths.styles %>/app.scss',

                'cssDir': '.tmp/<%= paths.styles %>',

                'imagesDir': '<%= paths.app %>/img',

                'javascriptsDir': '<%= paths.app %>/<%= paths.scripts %>',

                'fontsDir': '<%= paths.app %>/<%= paths.styles %>/fonts',

                'importPath': '<%= paths.app %>/bower_components',

                'httpFontsPath': '/<%= paths.styles %>/fonts',

                'relativeAssets': false,

                'assetCacheBuster': false,

                'raw': 'Sass::Script::Number.precision = 10\n'

            },

            'server': {

                'options': {

                    'debugInfo': true

                }

            }

        }

      });

      return this;

    },

    tasks: function () {

      var self = this,

          grunt = self.grunt;

      grunt.registerTask('serve', function (target) {

        target = (!target || !target.length) ? 'development' : target;

        grunt.task.run([

          'clean:server',

          'copy:main',

          'bowerInstall',

          'ngconstant:' + target,

          'ngtemplates',

          'compass:server',

          'autoprefixer',

          'copy:styles',

          'copy:scripts',

          'nodemon',

          'watch'

        ]);

      });

      grunt.registerTask('run', function (target) {

        target = (!target || !target.length) ? 'development' : target;

        grunt.task.run([

          'nodemon:dev'

        ]);

      });

      return self;

    }

  };

  pkg
    .init(grunt)
    .config()
    .tasks();

};