var gulp    = require('gulp')
var pug     = require('gulp-pug')
var stylus  = require('gulp-stylus')
var coffee  = require('gulp-coffee')

gulp.task('css', function() {
    gulp.src('*.styl')
        .pipe(stylus())
        .pipe(gulp.dest('../css'))
})

gulp.task('index', function() {
    var LOCALS = {
        title: 'Приглашение в мир JavaScript',
        requireConfig: 'js/index',
        description: 'JavaScript: online-занятия'
    }
    gulp.src('*.pug')
        .pipe(pug({locals: LOCALS}))
        .pipe(gulp.dest('..'))
})

gulp.task('js', function() {
        gulp.src('coffee_modules/*.coffee')
            .pipe(coffee())
            .pipe(gulp.dest('../js'))
})

gulp.task('default', ['css', 'index', 'js'])
