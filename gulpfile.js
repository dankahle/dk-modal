var gulp = require('gulp'),
	$ = require('gulp-load-plugins')(),
	del = require('del'),
	log = console.log.bind(console),
	runSequence = require('run-sequence'),
	jshintConfig = require('./jshintConfig.json'),
	jshintStylish = require('jshint-stylish')


gulp.task('js-tmp', function () {
	del.sync('tmp/*.js');
	return gulp.src(['src/dkModal.js', 'demo/demo.js'])
		.pipe($.jshint(jshintConfig))
		.pipe($.jshint.reporter(jshintStylish))
		.pipe($.jshint.reporter('fail'))
		.pipe($.ngAnnotate())
		.pipe(gulp.dest('tmp'))
})

gulp.task('js-dist', function () {
	return gulp.src(['src/dkModal.js'])
		.pipe($.jshint(jshintConfig))
		.pipe($.jshint.reporter(jshintStylish))
		.pipe($.jshint.reporter('fail'))
		.pipe($.ngAnnotate())
		.pipe(gulp.dest('dist'))
		.pipe($.uglify())
		.pipe($.extReplace('.min.js'))
		.pipe(gulp.dest('dist'))
})

gulp.task('copy-tmp', function() {
	del.sync(['tmp/demo.html', 'tmp/*.png'])
	gulp.src(['demo/demo.html', 'demo/*.png'])
		.pipe(gulp.dest('tmp'))
})

gulp.task('copy-dist', function() {
	return gulp.src(['src/dkModal.less'])
		.pipe(gulp.dest('dist'))
});

gulp.task('less-tmp', function () {
	del.sync('tmp/*.css');
	return gulp.src(['src/dkModal.less', 'demo/demo.less'])
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
		.pipe(gulp.dest('tmp'))
});

gulp.task('less-dist', function () {
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
		.pipe($.concat('dkModal.css'))
		.pipe(gulp.dest('dist'))
		.pipe($.csso())
		.pipe($.extReplace('.min.css'))
		.pipe(gulp.dest('dist'))
});

///////////////////// dist

gulp.task('build-tmp', ['js-tmp', 'less-tmp', 'copy-tmp'])

gulp.task('build-dist', function(cb) {
	del.sync('dist');
	runSequence(['js-dist', 'less-dist', 'copy-dist'], cb)
});

//////////////////// watch

gulp.task('watch', ['js-tmp', 'less-tmp'], function() {
	gulp.watch(['src/*.js', 'demo/*.js'], ['js-tmp']);
	gulp.watch(['src/*.less', 'demo/*.less'], ['less-tmp']);
	gulp.watch(['demo/demo.html', 'demo/*.png'], ['copy-tmp']);
})

