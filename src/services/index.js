const { lstatSync, readdirSync } = require('fs');
const { join, basename } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const serviceNames = getDirectories(__dirname).map(dir => basename(dir));

module.exports = function (app) {
  serviceNames.forEach((serviceName) => {
    const service = require(`./${serviceName}/${serviceName}.service.js`);
    app.configure(service);
  });
};
