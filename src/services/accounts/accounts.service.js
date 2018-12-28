const createService = require('./accounts.class.js');
const hooks = require('./accounts.hooks');

module.exports = function (app) {
  
  const paginate = app.get('paginate');

  const options = {
    paginate
  };

  // Initialize our service with any options it requires
  app.use('/accounts', createService(options));

  // Get our initialized service so that we can register hooks
  const service = app.service('accounts');

  service.hooks(hooks);
};
