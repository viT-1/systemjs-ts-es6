import typescript from 'gulp-typescript';
// import del from 'del';
import {
	src,
	dest,
	task,
	parallel,
} from 'gulp';

import uglifyES from 'gulp-uglify-es';

import { conf } from './app.conf';

// Вместо этого predeploy rimraf в командной строке (package.json)
// task('clean',
// done => del([conf.dest], done));

task('transpile',
	() => {
		const tsApp = typescript.createProject(`${conf.src}/tsconfig.json`);
		const tsResult = tsApp.src()
			.pipe(tsApp()).js;

		return tsResult
			.pipe(uglifyES())
			.pipe(dest(conf.dest));
	});

// не js/ts файлы прогонять через transpile (tsconfig include) не будем
task('copyIndex',
	() => src([
		`${conf.src}/index.htm`,
	])
		.pipe(dest(conf.dest)));

task('deploy', parallel('transpile', 'copyIndex'));
