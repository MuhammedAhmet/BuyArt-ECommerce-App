"use strict";
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define(
    "user",
    {
      email: DataTypes.STRING,
      phone: DataTypes.STRING,
      profile_picture: DataTypes.STRING,
      name: DataTypes.STRING,
      password: DataTypes.STRING,
      is_admin: DataTypes.BOOLEAN,
      artist_id: DataTypes.INTEGER
    },
    {}
  );
  user.associate = function(models) {
    user.hasMany(models.user_token, {
      foreignKey: "id",
      targetKey: "user_id",
      as: "tokens",
      onDelete: "cascade"
    });
    user.belongsTo(models.artist_profile, {
      foreignKey: "artist_id",
      targetKey: "id",
      as: "artist",
      onDelete: "cascade"
    });
    // associations can be defined here
  };

  user.prototype.generateToken = function() {
    var token = jwt.sign(
      {
        username: this.username,
        email: this.email
      },
      "beyazleblebi"
    );
    return token;
  };

  return user;
};
