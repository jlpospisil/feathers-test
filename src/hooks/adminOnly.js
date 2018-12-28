const errors = require('feathers-errors');

module.exports = function(context) {
  if(!context.params.user.isAdmin) {
    throw new errors.NotFound();
  }

  return Promise.resolve(context);
};
