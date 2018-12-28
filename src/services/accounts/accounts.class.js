/* eslint-disable no-unused-vars */
class Service {
  constructor (options) {
    this.options = options || {};
    this.sequelizeClient = null;
  }

  setup(app, path) {
    this.sequelizeClient = app.get('sequelizeClient');
  }

  async find (params) {
    const { user } = params || {};
    const { sequelizeClient } = this;
    const { models } = sequelizeClient || {};
    const { user: userModel, account: accountModel, userAccount: userAccountModel } = models;

    const userAccounts = userAccountModel.findAll({
      where: {
        userId: user.id
      }
    });

    const userAccountIds = userAccounts.map(account => account.accountId);

    return accountModel.findAll({
      id: userAccountIds
    });
  }

  async get (id, params) {
    return {
      id, text: `A new message with ID: ${id}!`
    };
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)));
    }

    return data;
  }

  async update (id, data, params) {
    return data;
  }

  async patch (id, data, params) {
    return data;
  }

  async remove (id, params) {
    return { id };
  }
}

module.exports = function (options) {
  return new Service(options);
};

module.exports.Service = Service;
