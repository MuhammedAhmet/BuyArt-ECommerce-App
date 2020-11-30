"use strict";
module.exports = (sequelize, DataTypes) => {
  const artist_profile = sequelize.define(
    "artist_profile",
    {
      nick_name: DataTypes.STRING,
      slug: DataTypes.STRING,
      biography: DataTypes.STRING
    },
    {}
  );
  artist_profile.associate = function(models) {
    // associations can be defined here
    artist_profile.hasOne(models.user, {
      foreignKey: "id",
      targetKey: "artist_id",
      as: "user"
    });
    artist_profile.hasMany(models.product, {
      foreignKey: "id",
      targetKey: "artist_id",
      as: "products",
      onDelete: "cascade"
    });
  };
  return artist_profile;
};
