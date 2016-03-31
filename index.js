function nodeLast(f, args) {
  if (args === undefined) {
    args = [];
  }
  return new Promise((resolve, reject) => {
    f(...args, (err, val) => {
      if (err) {
        return reject(err);
      }
      resolve(val);
    });
  });
}

function nodeFirst(f, args) {
  if (args === undefined) {
    args = [];
  }
  return new Promise((resolve, reject) => {
    f((err, val) => {
      if (err) {
        return reject(err);
      }
      resolve(val);
    }, ...args);
  });
}

module.exports = {nodeFirst, nodeLast};
