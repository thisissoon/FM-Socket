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
                coverageFolder: "<%= config.coverageDir %>",
                reportFormats: ["cobertura","lcov"],
                root: "fmsocket/",
                mochaOptions: ["--reporter spec", "--recursive"]
            },
            unit: {
                src: ["<%= config.testDir %>bootstrap.spec.js", "<%= config.testDir %>unit/*.spec.js"]
            },
            integration: {
                src: ["<%= config.testDir %>bootstrap.spec.js", "<%= config.testDir %>websockets.spec.js"]
            }
        },

        coveralls: {
            test: {
                src: "<%= config.coverageDir %>lcov.info",
                force: true
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
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-mocha-istanbul");
    grunt.loadNpmTasks("grunt-coveralls");

    grunt.registerTask("dev", [
        "connect:server",
        "watch:javascript"
    ]);

    grunt.registerTask("test", [
        "clean:test",
        "jshint",
        "mocha_istanbul:unit"
    ]);

    grunt.registerTask("test:integration", [
        "clean:test",
        "jshint",
        "mocha_istanbul:integration"
    ]);

    grunt.registerTask("ci", [
        "test",
        "coveralls"
    ]);

    grunt.registerTask("default", ["dev"]);

};
