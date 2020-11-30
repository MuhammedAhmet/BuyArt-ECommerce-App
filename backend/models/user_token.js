"use strict";
module.exports = (sequelize, DataTypes) => {
  const user_token = sequelize.define(
    "user_token",
    {
      user_id: DataTypes.INTEGER,
      token: DataTypes.STRING
    },
    {}
  );
  user_token.associate = function(models) {
    user_token.belongsTo(models.user, {
      foreignKey: "user_id",
      targetKey: "id",
      as: "user"
    });
  };
  return user_token;
};
