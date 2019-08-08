import typescript from 'gulp-typescript';
// import del from 'del';
import {
	src,
	dest,
	task,
	parallel,
} from 'gulp';

import { conf } from './app.conf';

// Вместо этого predeploy rimraf в командной строке (package.json)
// task('clean',
// done => del([conf.dest], done));

task('transpile',
	() => {
		const tsApp = typescript.createProject(`${conf.src}/tsconfig.json`);
		const tsResult = tsApp.src()
			.pipe(tsApp()).js;

		return tsResult.pipe(dest(conf.dest));
	});

task('copyIndex',
	() => src([
		`${conf.src}/index.js`,
		`${conf.src}/index.htm`,
	])
		.pipe(dest(conf.dest)));

task('deploy', parallel('transpile', 'copyIndex'));
