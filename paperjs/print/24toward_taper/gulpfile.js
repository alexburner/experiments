var gulp = require('gulp');
var shell = require('gulp-shell');

gulp.task('default', shell.task(['sh svg2pdf.sh']));