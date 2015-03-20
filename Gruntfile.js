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

        mocha_istanbul: {
            options: {
                coverage: true,
                coverageFolder: "<%= config.coverageDir %>",
                reportFormats: ["cobertura","lcov"],
                root: "<%= config.appDir %>",
                timeout: 4000,
                mochaOptions: {
                    reporter: "spec",
                    growl: true,
                    recursive: true
                }
            },
            spec: {
                src: ["<%= config.testDir %>bootstrap.spec.js", "<%= config.testDir %>**/*.spec.js"]
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
    grunt.loadNpmTasks("grunt-mocha-istanbul");

    grunt.registerTask("dev", [
        "connect:server",
        "watch:javascript"
    ]);

    grunt.registerTask("test", [
        "clean:test",
        "jshint",
        "mocha_istanbul"
    ]);

    grunt.registerTask("default", ["dev"]);

};
