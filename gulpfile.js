var gulp = require('gulp')
var shell = require('gulp-shell')

gulp.task('publish', shell.task([
  'git add . -A',
  'git commit -m "dev"',
  'git push origin master',
  'npm publish'
]))


