const path = require('path');
const ncp = require('ncp').ncp;
const buildPatch =  path.resolve(__dirname, '../../build/')
const firefoxStatic = buildPatch + '/firefox/static';
const chromeStatic = buildPatch + '/chrome/static';
const file_system = require('fs');
const archiver = require('archiver');
const manifest = require(buildPatch + '/firefox/manifest.json');

console.log('Copying builded files to Chrome extension directory...');
ncp(firefoxStatic, chromeStatic, function (err) {
  if (err) {
    return console.error(err);
  } else {
    console.log('done!');
  }
});
 
console.log('Creating zip packages...');
const extVersion = manifest['version'];
const browsers = ['firefox', 'chrome'];
browsers.forEach( browser => {
  const output = file_system.createWriteStream(`${buildPatch}/hohser-${extVersion}_${browser}.zip`);
  const archive = archiver('zip', {zlib: { level: 9 } });
  archive.pipe(output);
  archive.directory(`${buildPatch}/${browser}`, false);
  archive.finalize();  
});
