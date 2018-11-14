var autoprefixer    = require('gulp-autoprefixer');
var browserSync     = require('browser-sync');
var cache           = require('gulp-cache');
var cleanCSS        = require('gulp-clean-css');
var gconcat         = require('gulp-concat');
var gulp            = require('gulp');
var imagemin        = require('gulp-imagemin');
var pug             = require('gulp-pug');
var rename          = require("gulp-rename");
var sass            = require('gulp-sass');
var sourcemaps      = require('gulp-sourcemaps');
var uglify          = require('gulp-uglify');
var plumber         = require('gulp-plumber');

// My files
var src             = 'src/';
var srcAssets       = src + 'assets/';

var VendorFiles     = [srcAssets + 'js/vendors/*.js'];
var CSSFiles        = [srcAssets + 'styles/**/*.scss'];
var JSFiles         = [srcAssets + 'js/*.js'];
var IMGFiles        = [srcAssets + 'img/**/*'];
var JSONFiles       = [srcAssets + 'json/*.json'];
var HTMLFiles       = [src + '*.pug'];

var fs              = require('fs');


function findKeyText(data, txt) {
  for (var i = 0; i < data.length; i++) {
    if(data[i].indexOf(txt) > -1) {
      return true;
    }
  }
  return false;
}

gulp.task('styles', function() {
  gulp.src(CSSFiles)
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass({indentedSyntax: false}))
  .pipe(autoprefixer({
    browsers: ['last 5 versions'],
    cascade: false}))
  .pipe(cleanCSS())
  .pipe(sourcemaps.write())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest('build/assets/css'));
});

gulp.task('templates', function() {
  gulp.src(HTMLFiles)
  .pipe(plumber())
  .pipe(pug())
  .pipe(gulp.dest('build/'));
});

gulp.task('scripts', function() {
  return gulp.src(VendorFiles.concat(JSFiles))
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(gconcat('bundle.js'))
  .pipe(uglify())
  .pipe(sourcemaps.write())
  .pipe(rename({ suffix: '.min'}))
  .pipe(gulp.dest('build/assets/js'));
});

gulp.task('images', function() {
  gulp.src(IMGFiles)
  .pipe(cache(imagemin({
    optimizationLevel: 3,
    progressive: true,
    interlaced: true})))
  .pipe(gulp.dest('build/assets/img/'));
});

gulp.task('json', function() {
  gulp.src(JSONFiles)
  .pipe(gulp.dest('build/assets/json/'));
});

gulp.task('setup-src', function() {
  var data = fs.readFileSync(src + 'index.pug').toString().split("\n");

  if(data[data.length - 1] === '') {
    data.pop();
  }

  if(data[data.length - 1].indexOf('script(src="js/bundle.min.js")') > -1) {
    data.pop();
  }

  if(!findKeyText(data, 'bundle.min.js')) {
    data.splice(data.length, 0, '    script(src="js/bundle.min.js")');
  }

  var text = data.join("\n");
  fs.writeFile('build/index.html', text, function (err) {
    if (err) throw err;
  });
});

gulp.task('default', function() {
  console.log("Use 'gulp setup' command to initialize the project files");
  gulp.start('setup');
  gulp.start('watch');
});

gulp.task('setup', function() {
  gulp.start('styles', 'templates', 'scripts', 'images', 'json', 'setup-src');
});

gulp.task('watch', function() {
  gulp.watch(CSSFiles,  ['styles']);
  gulp.watch(HTMLFiles, ['templates']);
  gulp.watch(JSFiles,   ['scripts']);
  gulp.watch(IMGFiles,  ['images']);

// init server
  browserSync.init({
    server: {
      proxy: "local.build",
      baseDir: "./build",
      startPath: './index.html',
      directory: true
    }
  });

  gulp.watch(['build/**'], browserSync.reload);
});
