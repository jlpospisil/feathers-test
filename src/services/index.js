const { lstatSync, readdirSync } = require('fs');
const { join, basename } = require('path');

const isDirectory = source => lstatSync(source).isDirectory();
const getDirectories = source => readdirSync(source).map(name => join(source, name)).filter(isDirectory);
const serviceNames = getDirectories(__dirname).map(dir => basename(dir)).filter(serviceName => serviceName !== 'admin');
const adminServiceNames = getDirectories(join(__dirname, 'admin')).map(dir => basename(dir));

module.exports = function (app) {
  // Register non-admin services
  serviceNames.forEach((serviceName) => {
    const service = require(`./${serviceName}/${serviceName}.service.js`);
    app.configure(service);
  });

  // Register admin services
  adminServiceNames.forEach((serviceName) => {
    const service = require(`./admin/${serviceName}/${serviceName}.service.js`);
    app.configure(service);
  });
};
