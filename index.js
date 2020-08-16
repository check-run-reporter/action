'use strict';

require('./babel-register');
// as our typescript entrypoint, eslint-plugin-import doesn't know src/index
// exists
// eslint-disable-next-line import/no-unresolved
require('./src/index');
