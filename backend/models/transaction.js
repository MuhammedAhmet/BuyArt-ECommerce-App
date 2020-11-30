'use strict';
module.exports = (sequelize, DataTypes) => {
  const transaction = sequelize.define('transaction', {
    external_data: DataTypes.STRING,
    status: DataTypes.INTEGER
  }, {});
  transaction.associate = function(models) {
    // associations can be defined here
  };
  return transaction;
};