"use strict";


module.exports = function (grunt){


    grunt.initConfig({

        pkg: grunt.file.readJSON("package.json"),

        config: {
            appDir: "fmsocket/",
            testDir: "tests/",
            nodeDir: "node_modules/",
            coverageDir: "coverage/",
        },

        watch: {
            options: {
                nospawn: false,
                livereload: true
            },
            javascript: {
                files: [
                    "<%= config.appDir %>*.js",
                    "<%= config.appDir %>**/*.js",
                    "<%= config.appDir %>**/**/*.js",
                    "<%= config.testDir %>*.js",
                    "<%= config.testDir %>**/*.js",
                    "<%= config.testDir %>**/**/*.js"
                ],
                tasks: ["test"]
            }
        },

        jshint: {
            options: {
                jshintrc: ".jshintrc"
            },
            dist: {
                src: ["<%= config.appDir %>**/*.js"]
            }
        },

        mochacov: {
            coverage: {
                options: {
                    coveralls: true
                }
            },
            test: {
                options: {
                    reporter: "spec",
                    recursive: true
                }
            },
            options: {
                files: ["<%= config.testDir %>bootstrap.spec.js", "<%= config.testDir %>**/*.spec.js"]
            }
        },

        clean: {
            test: {
                src: ["<%= config.coverageDir %>"]
            }
        },

        connect: {
            options: {
                port: 9000,
                hostname: '0.0.0.0'
            },
            server: {
                livereload: true
            }
        },

    });

    grunt.loadNpmTasks("grunt-contrib-clean");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-cov");

    grunt.registerTask("dev", [
        "connect:server",
        "watch:javascript"
    ]);

    grunt.registerTask("test", [
        "clean:test",
        "jshint",
        "mochacov:test"
    ]);

    grunt.registerTask("ci", [
        "test",
        "mochacov:coverage"
    ]);

    grunt.registerTask("default", ["dev"]);

};
