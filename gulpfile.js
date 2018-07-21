var path = require("path");
var gulp = require("gulp");
var imagemin = require("gulp-imagemin");
var uglify = require("gulp-uglify");
var rename = require("gulp-rename");
var cleanCss = require("gulp-clean-css");
var autoprefixer = require("gulp-autoprefixer");
var htmlmin = require("gulp-htmlmin");
var inject = require("gulp-inject");
var purifyCss = require("gulp-purifycss");
var cachebust = require("gulp-buster");
var del = require("del");
var readYaml = require("read-yaml");
var series = require("stream-series");

var cacheBustingOptions = {
    fileName: "cache-bust.json",
    length: 5,
    relativePath: "jekyll-dist"
};

gulp.task("clean:prebuild", function() {
    return del(["dist/**/*", "!dist"]);
});

gulp.task("clean:postbuild", function() {
    var filesToClean = ["dist/*.min.{css,js}", "dist/*.json"];
    return del(filesToClean);
});

gulp.task("minify:images", function() {
    return gulp
        .src("jekyll-dist/assets/img/*")
        .pipe(
            imagemin(
                [
                    imagemin.gifsicle({ interlaced: true }),
                    imagemin.jpegtran({ progressive: true }),
                    imagemin.optipng({ optimizationLevel: 5 }),
                    imagemin.svgo({
                        plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
                    })
                ],
                { verbose: true }
            )
        )
        .pipe(gulp.dest("dist/assets/img"));
});

gulp.task("minify:js", function() {
    var hashes = require("./" + path.join("dist", cacheBustingOptions.fileName));
    return gulp
        .src("jekyll-dist/*.js")
        .pipe(uglify())
        .pipe(
            rename(function(path) {
                path.basename = path.basename + ".min" + "." + hashes[path.basename + path.extname];
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:css", function() {
    var hashes = require("./" + path.join("dist", cacheBustingOptions.fileName));
    return gulp
        .src("jekyll-dist/*.css")
        .pipe(purifyCss(["jekyll-dist/**/*.html"], { info: true }))
        .pipe(
            autoprefixer({
                browsers: ["last 2 versions"],
                cascade: false
            })
        )
        .pipe(cleanCss())
        .pipe(
            rename(function(path) {
                path.basename = path.basename + ".min" + "." + hashes[path.basename + path.extname];
            })
        )
        .pipe(gulp.dest("dist"));
});

gulp.task("minify:html", function() {
    return gulp
        .src("jekyll-dist/**/*.html")
        .pipe(htmlmin({ collapseWhitespace: true, minifyJs: true, minifyCss: true }))
        .pipe(gulp.dest("dist"));
});

gulp.task("inject", function() {
    return new Promise(function(resolve, reject) {
        readYaml("_config.yml", function(err, data) {
            if (err) {
                return reject(err.message);
            }
            resolve(data.url);
        });
    })
        .then(function(url) {
            var vendorsStream = gulp.src(["dist/vendors.*"], { read: false });
            var siteStream = gulp.src(["dist/site.*"], { read: false });
            return gulp
                .src("dist/**/*.html")
                .pipe(
                    inject(series(vendorsStream, siteStream), {
                        relative: true,
                        addPrefix: url
                    })
                )
                .pipe(gulp.dest("dist"));
        })
        .catch(function(err) {
            throw new Error(err);
        });
});

gulp.task("copy:admin", function() {
    return gulp.src(["jekyll-dist/admin/**/*"], { base: "jekyll-dist" }).pipe(gulp.dest("dist"));
});

gulp.task("copy:assets", function() {
    return gulp
        .src(["jekyll-dist/static/**/*", "jekyll-dist/feed.xml"], { base: "jekyll-dist" })
        .pipe(gulp.dest("dist"));
});

gulp.task("copy:root-files", function() {
    var rootFiles = ["jekyll-dist/sitemap.xml", "jekyll-dist/robots.txt"];
    return gulp.src(rootFiles).pipe(gulp.dest("dist"));
});

gulp.task("get-hash", function() {
    return gulp
        .src("jekyll-dist/*.{css,js}")
        .pipe(cachebust(cacheBustingOptions))
        .pipe(gulp.dest("dist"));
});
