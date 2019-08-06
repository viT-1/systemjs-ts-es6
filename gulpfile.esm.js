import { conf } from './app.conf';
import { src, dest, task } from 'gulp';

task('deploy',
    () => src([
        conf.src + '/index.js',
        conf.src + '/index.htm',
    ])
    .pipe(dest(conf.dest))
);
