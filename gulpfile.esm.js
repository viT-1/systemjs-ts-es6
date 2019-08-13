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

// Путь к основному (тому, что для браузера) tsconfig
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

// не js/ts файлы прогонять через transpile (tsconfig include) не будем
task('copyEntry',
	() => src([path.resolve(absSrc, appConf.entryFileName)])
		.pipe(dest(absDest)));

task('copySystemJs',
	() => src([
		'node_modules/systemjs/dist/system.js',
	])
		.pipe(dest(path.resolve(absDest, 'systemjs'))));

task('deploy', parallel('transpile', 'copyEntry', 'copySystemJs'));
