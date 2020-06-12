const path = require('path');
const ncp = require('ncp').ncp;
const source = path.resolve(__dirname, '../../build/firefox/static');
const destination = path.resolve(__dirname, '../../build/chrome/static');

console.log('Copying builded files to Chrome extension directory...');
ncp(source, destination, function (err) {
  if (err) {
    return console.error(err);
  } else {
    console.log('done!');
  }
 });
 