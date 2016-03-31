const test = require('ava');
const promisify = require('./index.js');

test.cb('node style callbacks', t => {
  function resolveAsFirstArgument(cb, x, y) {
    cb(null, x + y);
  }

  function resolveAsLastArgument(x, y, cb) {
    cb(null, x + y);
  }

  function rejectAsOnlyArgument(cb) {
    cb(new Error('just'));
  }

  promisify.nodeFirst(resolveAsFirstArgument, [1, 2]).then(val => {
    t.is(val, 3);
    return promisify.nodeLast(resolveAsLastArgument, [3, 4]);
  }).then(val => {
    t.is(val, 7);
    return promisify.nodeFirst(rejectAsOnlyArgument);
  }).catch(err => {
    t.is(err.message, 'just');
    t.end();
  });

});
