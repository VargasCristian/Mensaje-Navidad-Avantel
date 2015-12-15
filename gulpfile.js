var gulp = require("gulp"),
    jade = require("gulp-jade"),
    stylus = require("gulp-stylus"),
    plumber = require("gulp-plumber"),
    inlineCss = require("gulp-inline-css"),
    nib = require("nib")


//----------------------------------------------------------------
//Rutas
//----------------------------------------------------------------
var routes = {
    jade : {
        main: "./src/jade/mensaje.jade",
        watch: "./src/jade/*.jade",
        output: "./src/"
    },
    stylus: {
        main: "./src/stylus/main.styl",
        watch: "./src/stylus/*.styl",
        output: "./src/"
    },
    cssComprimido: {
        main: "./src/mensaje.html",
        watch: ["./src/mensaje.html", "./src/stylus/main.styl"],
        output: "./dist/"
    }
}

gulp.task("build:jade", function(){
    gulp.src(routes.jade.main)
        .pipe(jade({
            pretty: true
            }))
        .pipe(gulp.dest(routes.jade.output))
        .pipe(plumber())
    })

gulp.task("build:styl", function(){
    gulp.src(routes.stylus.main)
        .pipe(stylus({
            use: nib(),
            "include css": true
            }))
        .pipe(gulp.dest(routes.stylus.output))
        .pipe(plumber())
    })

gulp.task("inlineCss", function(){
    gulp.src(routes.cssComprimido.main)
        .pipe(inlineCss())
        .pipe(gulp.dest(routes.cssComprimido.output))
        .pipe(plumber())
    })

gulp.task("watch", function(){
    gulp.watch(routes.jade.watch, ["build:jade"])
    gulp.watch(routes.stylus.watch, ["build:styl"])
    gulp.watch(routes.cssComprimido.watch, ["inlineCss"])
    })

gulp.task("default", ["build:jade", "build:styl", "inlineCss", "watch"])