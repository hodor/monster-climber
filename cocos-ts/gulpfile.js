const gulp = require('gulp');
const chalk = require('chalk')

const stagingId = '487266501692558';
const prodId = '192161084928979';

const localhostPrefix = 'https://www.facebook.com/embed/instantgames/';
const localhostPostfix = '/player?game_url=https://localhost:8080';

const stagingUrl = localhostPrefix + stagingId + localhostPostfix;
const prodUrl = localhostPrefix + prodId + localhostPostfix;

gulp.task('urls', function(){
    console.log(chalk.hex('#FF00FF').bold("STAGE:  ") + chalk.hex('#ff00ff').dim(stagingUrl));
    console.log(chalk.hex('#00FF00').bold("PROD:  ") + chalk.hex('#00ff00').dim(prodUrl));
  });