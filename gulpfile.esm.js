import path from 'path';
import replace from 'gulp-replace';
// import del from 'del';
import {
	src,
	dest,
	task,
	parallel,
} from 'gulp';

import appConf from './app.conf';

const root = appConf.rootFolderPath;
const absSrc = path.resolve(root, appConf.srcFolderName);
const absDest = path.resolve(root, appConf.destFolderName);

// Вместо этого predeploy rimraf в командной строке (package.json)
// task('clean',
// done => del([conf.dest], done));

task('postdeploy.dev:copyEntry',
	() => src([path.resolve(absSrc, appConf.entryDevFileName)])
		.pipe(dest(absDest)));

task('postdeploy.dev:replace-paths-not-index',
	() => src([
		`${absDest}/**/!(index).js`,
	])
		// typescript-transform-paths replaced alias with doublequoted paths
		.pipe(replace(/(from "\.)((?:(?!\.js|\.conf|\.html).)*)(";)/g, '$1$2/index.js$3'))
		.pipe(replace('.conf";', '.conf.js";'))
		.pipe(dest(absDest)));

task('postdeploy.dev:replace-paths-index',
	() => src([
		`${absDest}/**/index.js`,
	])
		.pipe(replace('";', '.js";'))
		.pipe(dest(absDest)));

task('postdeploy.dev', parallel(
	'postdeploy.dev:copyEntry',
	'postdeploy.dev:replace-paths-index',
	'postdeploy.dev:replace-paths-not-index',
));

task('copyEntry',
	() => src([path.resolve(absSrc, appConf.entryFileName)])
		.pipe(dest(absDest)));

task('copySystemJs',
	() => src([
		path.resolve('node_modules', 'systemjs', 'dist', 's.min.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-register.js'),
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('iePromisePolyfill',
	() => src([
		path.resolve('node_modules', 'bluebird', 'js', 'browser', 'bluebird.core.min.js'),
	])
		.pipe(dest(absDest)));

task('postdeploy', parallel(
	'copyEntry',
	'copySystemJs',
	'iePromisePolyfill',
));
