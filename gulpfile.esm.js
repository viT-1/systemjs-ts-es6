import path from 'path';
import typescript from 'gulp-typescript';
// import del from 'del';
import {
	src,
	dest,
	task,
	parallel,
} from 'gulp';
import uglifyES from 'gulp-uglify-es';

import appConf from './app.conf';

const root = appConf.rootFolderPath;
const absSrc = path.resolve(root, appConf.srcFolderName);
const absDest = path.resolve(root, appConf.destFolderName);

// Transpiling for browser tsconfig
const tsConfPath = path.resolve(absSrc, 'tsconfig.json');

// Вместо этого predeploy rimraf в командной строке (package.json)
// task('clean',
// done => del([conf.dest], done));

task('transpile',
	() => {
		const tsApp = typescript.createProject(tsConfPath);
		const tsResult = tsApp.src()
			.pipe(tsApp()).js;

		return tsResult
			.pipe(uglifyES())
			.pipe(dest(absDest));
	});

task('copyEntry',
	() => src([path.resolve(absSrc, appConf.entryFileName)])
		.pipe(dest(absDest)));

task('copySystemJs',
	() => src([
		path.resolve('node_modules', 'systemjs', 'dist', 'system.js'),
		path.resolve('node_modules', 'systemjs', 'dist', 'extras', 'named-register.js'),
		path.resolve(absSrc, 'importmap.json'),
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('deploy', parallel('transpile', 'copyEntry', 'copySystemJs'));
