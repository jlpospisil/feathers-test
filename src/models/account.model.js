// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');
  const model = sequelizeClient.define('account', {

    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    startingBalance: {
      type: DataTypes.STRING,
      allowNull: false
    },
    currentBalance: {
      type: DataTypes.STRING,
      allowNull: false
    }
  
  }, {
    // Enable soft deletes
    paranoid: true,
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  model.associate = function (models) {
    const { user } = models;
    model.belongsToMany(user, { through: 'userAccount' });
  };

  return model;
};
