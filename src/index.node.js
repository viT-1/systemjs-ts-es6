// Вынуждены этот файл оставлять js, а не ts с транспиляцией, из-за require
// @link: https://github.com/ilearnio/module-alias/issues/59
require('module-alias/register');
/* eslint-disable import/first */
import GreeterUse from '@common/GreeterUse';

GreeterUse.say();
