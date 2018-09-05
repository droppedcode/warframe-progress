var fs = require('fs');
var path = require('path');

var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'gulp.*'],
  replaceString: /^(gulp)(-|\.)/
});

var webpack = require('webpack');

//Root path for script files
var sourceRoot = './src/';
//Blob path for script files
var sourcePath = [
  sourceRoot + '**/*.ts'
];

var destinationPath = './release';

//TS project for build
var project = plugins.typescript.createProject('./tsconfig.json');

gulp.task('default', ['clean'], function () {
  return gulp.start(['webpack', 'ssl', 'data', 'watch']);
});
gulp.task('ssl', function () {
  return gulp.src(['./sslcert**/host.*'])
    .pipe(gulp.dest(destinationPath));
});
gulp.task('data', function () {
  return gulp.src(['./data**/**/*.*', './package*.json', './node_modules/warframe-items**/data/**/*.*'])
    .pipe(gulp.dest(destinationPath));
});
// gulp.task('build', function () {
//   return project.src()
//     .pipe(plugins.sourcemaps.init())
//     .pipe(project())
//     .pipe(plugins.sourcemaps.write('.', { includeContent: true, sourceRoot: '.' }))
//     .pipe(gulp.dest(destinationPath));
// });
gulp.task('webpack', function (cb) {
  var externals = {};
  fs.readdirSync('node_modules')
    .filter(function (x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function (mod) {
      externals[mod] = 'commonjs ' + mod;
    });

  webpack({
    mode: 'development',
    //mode: 'production',
    entry: './src/index.ts',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/
        }
      ]
    },
    resolve: {
      extensions: [ '.tsx', '.ts', '.js' ]
    },
    target: 'node',
    node: {
      __filename: false,
      __dirname: false
    },
    output: {
      path: path.join(__dirname, 'release'),
      filename: 'server.js'
    },
    externals: externals,
    plugins: [
      new webpack.IgnorePlugin(/\.(css|less)$/),
      //new webpack.BannerPlugin({ banner: 'require("source-map-support").install();', raw: true, entryOnly: false })
      new webpack.BannerPlugin({ banner: '', raw: true, entryOnly: false })
    ],
    devtool: 'inline-source-map'
  }).run(function (err, stats) {
    if (err) {
      console.log('Error', err);
    }
    else {
      console.log(stats.toString());
    }
    cb();
  });
});
gulp.task('clean', function () {
  return gulp.src(['./release/**/*.*', '!./release/wwwroot/**', '!./release/data/data.db', '!./release'])
    .pipe(plugins.clean({ force: true }));
});
gulp.task('watch', function () {
  return plugins.watch(sourcePath, function () {
    gulp.start('webpack');
  });
});
