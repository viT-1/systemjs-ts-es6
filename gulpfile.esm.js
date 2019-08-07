import { src, dest, task } from 'gulp';
import { conf } from './app.conf';

task('deploy',
    () => src([
        `${conf.src}/index.js`,
        `${conf.src}/index.htm`,
    ])
        .pipe(dest(conf.dest)));
