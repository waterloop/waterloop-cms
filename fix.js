// code from https://github.com/brianc/node-postgres/issues/838#issuecomment-670941092
// this fixes docker build issue of requiring pg-native, which isn't recommended unless you want to install python3 in the docker image somehow.

const fs = require('fs');
const pgClientPath = require.resolve('pg/lib/native/client.js');

fs.readFile(pgClientPath, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }

  const result = data.replace(
    "var Native = require('pg-native')",
    'var Native = null',
  );

  fs.writeFile(pgClientPath, result, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});
