// ======== Ici les variables =========
var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var htmlreplace = require('gulp-html-replace');
var minifyCSS = require('gulp-minify-css');
var minifyHTML = require('gulp-minify-html');
var watch = require('gulp-watch');
var wait = require('gulp-wait');
// ==========Fin variables ==============



//========= La tache defaut ==========
gulp.task('default', function() {
  // place code for your default task here
});
//=====Fin tache defaut =============




//=============les autres taches ===================
gulp.task('concatjs', function() {
  	return gulp.src(['!./assets/**/jquery-1.11.0.min.js','!./assets/js/vendor/modernizr.custom.js','assets/js/*.js'])
	    .pipe(concat('alljs.js'))
	    .pipe(gulp.dest('./dist/assets/js/'))
});

gulp.task('JSfinalconcat', function() {
  	return gulp.src(['./assets/**/jquery-1.11.0.min.js','dist/assets/js/alljs.js'])
	    .pipe(concat('alljs.js'))
	    .pipe(gulp.dest('./dist/assets/finaljs/'))
});

gulp.task('concatcss', function() {
  	return gulp.src('assets/css/*.css')
	    .pipe(concat('allcss.css'))
	    .pipe(gulp.dest('./dist/assets/css'))
});

gulp.task('compressJS', function() {
  	return gulp.src('dist/assets/finaljs/alljs.js')
    	.pipe(uglify())
    	.pipe(gulp.dest('dist/assetsmin/js'))
});

gulp.task('compressCSS', function() {
  	return gulp.src('./dist/assets/css/allcss.css')
	    .pipe(minifyCSS({keepBreaks:true}))
	    .pipe(gulp.dest('dist/assetsmin/css'))
});


gulp.task('minifyHTML', function() {
    var opts = {comments:true,spare:true};

  	return gulp.src('application/**/homepage.php')
	    .pipe(htmlreplace({
          'css': 'dist/assetsmin/css/allcss.css',
          'js': 'dist/assetsmin/js/alljs.js'
      }))
      .pipe(minifyHTML(opts))
	    .pipe(gulp.dest('dist/'))
});
//================= Fin taches ===========





//====================== Taches compil =====================

//============ Fin taches compil ==================




//================== La tache watch ===============
gulp.task('watch', function () {
    gulp.src('application/**/views/*.php')
      .pipe(watch(),['minifyHTML'])
});
//================= Fin tache watch ==========