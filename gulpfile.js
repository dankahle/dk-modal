var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	log = console.log.bind(console),
	runSequence = require('run-sequence'),
	jshintConfig = require('./jshintConfig.json'),
	jshintStylish = require('jshint-stylish')



gulp.task('js', ['clean-dist'], function () {
	return gulp.src(['src/dkModal.js'])
		.pipe($.jshint(jshintConfig))
		.pipe($.jshint.reporter(jshintStylish))
		.pipe($.jshint.reporter('fail'))
		.pipe($.ngAnnotate())
		.pipe($.uglify())
		.pipe(gulp.dest('dist'))
})

gulp.task('less', ['clean-dist'], function() {
	gulp.src('src/dkModal.less')
		.pipe(gulp.dest('dist'))
});

gulp.task('css', ['clean-dist'], function () {
	return gulp.src(['src/dkModal.less'])
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: [
				"Android 2.3",
				"Android >= 4",
				"Chrome >= 20",
				"Firefox >= 24",
				"Explorer >= 8",
				"iOS >= 6",
				"Opera >= 12",
				"Safari >= 6"
			]
		}))
		.pipe(gulp.dest('dist'))
		.pipe($.csso())
		.pipe($.extReplace('.min.css'))
		.pipe(gulp.dest('dist'))
});

///////////////////// dist

gulp.task('clean-dist', function (cb) {
	del('dist', cb)
});

gulp.task('build', ['js', 'css', 'less']);

