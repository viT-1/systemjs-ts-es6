// Вынуждены этот файл оставлять js, а не ts с транспиляцией, из-за require
// @link: https://github.com/ilearnio/module-alias/issues/59
require('module-alias/register');
/* eslint-disable import/first */
import Greeter from '@common/Greeter';

const gr = new Greeter('world');
console.log(gr.greet());
