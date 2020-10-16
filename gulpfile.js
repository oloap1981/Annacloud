var gulp = require('gulp');
var jshint = require('gulp-jshint');
var jscs = require('gulp-jscs');
var minifyHtml = require('gulp-minify-html');
var angularTemplatecache = require('gulp-angular-templatecache');
var useref = require('gulp-useref');
var ngAnnotate = require('gulp-ng-annotate');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var del = require('del');

var config = {
    js: 'src/app/**/*.js',
    js_ext: 'src/lib/**/*.js',
    hta: '.htaccess',
    sitemap: 'sitemap.xml',
  	images: 'images/*.*',
    fonts: 'fonts/*.*',
    assets: 'assets/*.*',
    html: 'views/*.html',
    views: 'views/*.*',
    temp: 'temp/',
    eb: '.ebextensions/*.*'
};

var dist = {
	path: 'dist/',
	images: 'images/',
	fonts: 'fonts/',
    assets: 'assets/',
    views: 'views/',
    eb: '.ebextensions/'
};

gulp.task( 'default', [ 'build' ] );

gulp.task('build', ['copy-views', 'copy-eb', 'copy-assets', 'copy-fonts', 'copy-images', 'copy-sitemap', 'copy-htaccess', 'minifyjs'], function(){
    del(config.temp);
});

gulp.task('minifyjs', ['useref', 'templatecache'], function(){
    return gulp.src(['dist/js/scripts.js', 'temp/templates.js'])
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/js/'));
});

gulp.task('useref', ['vet', 'clean-js', 'clean-styles'], function(){
    var assets = useref.assets();

    return gulp.src('index.html')
    .pipe(assets)
    .pipe(assets.restore())
    .pipe(useref())
    .pipe(gulp.dest('dist'));
});

gulp.task('copy-images', ['clean-images'], function(){
  return gulp.src([config.images])
    .pipe(gulp.dest(dist.path + dist.images));
});

gulp.task('copy-sitemap', ['clean-map'], function(){
    return gulp.src([config.sitemap])
      .pipe(gulp.dest(dist.path));
  });

  gulp.task('copy-htaccess', ['clean-hta'], function(){
    return gulp.src([config.hta])
      .pipe(gulp.dest(dist.path));
  });

gulp.task('copy-fonts', ['clean-fonts'], function(){
  return gulp.src([config.fonts])
    .pipe(gulp.dest(dist.path + dist.fonts));
});

gulp.task('copy-assets', ['clean-assets'], function(){
    return gulp.src([config.assets])
      .pipe(gulp.dest(dist.path + dist.assets));
});

gulp.task('copy-views', ['clean-views'], function(){
    return gulp.src([config.views])
      .pipe(gulp.dest(dist.path + dist.views));
});

gulp.task('copy-eb', ['clean-eb'], function () {
    return gulp.src([config.eb])
        .pipe(gulp.dest(dist.path + dist.eb));
});

gulp.task('vet', function(){
    return gulp.src([
      config.js
    ])
    .pipe(jshint())
    .pipe(jscs(), {verbose: true})
    .pipe(jshint.reporter('jshint-stylish'), {verbose: true})
    .pipe(jshint.reporter('fail'));
});
  
gulp.task('templatecache', function() {
    return gulp.src(config.html)
    .pipe(minifyHtml({empty: true}))
    .pipe(angularTemplatecache(
        'templates.js', {
            module: 'applicationModule',
            standAlone: false,
            root: 'templates/'
        }
    ))
    .pipe(gulp.dest(config.temp));
});

//Helper Tasks
gulp.task('clean-images', function(){
    del.sync(dist.path + dist.images);
});

gulp.task('clean-map', function(){
    del.sync(dist.path + "sitemap.xml");
});

gulp.task('clean-hta', function(){
    del.sync(dist.path + ".htaccess");
});

gulp.task('clean-fonts', function(){
    del.sync(dist.path + dist.fonts);
});

gulp.task('clean-js', function(){
    del.sync(dist.path + dist.js);
});

gulp.task('clean-styles', function(){
    del.sync(dist.path + dist.css);
});

gulp.task('clean-assets', function(){
    del.sync(dist.path + dist.assets);
});

gulp.task('clean-views', function(){
    del.sync(dist.path + dist.views);
});

gulp.task('clean-eb', function(){
    del.sync(dist.path + dist.eb);
});