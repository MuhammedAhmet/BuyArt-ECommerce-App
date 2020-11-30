"use strict";
module.exports = (sequelize, DataTypes) => {
  const product = sequelize.define(
    "product",
    {
      artist_id: DataTypes.INTEGER,
      type: DataTypes.INTEGER,
      price: DataTypes.INTEGER,
      image_paths: DataTypes.STRING,
      count: DataTypes.INTEGER,
      name: DataTypes.STRING,
      description: DataTypes.STRING
    },
    {}
  );
  product.associate = function(models) {
    product.hasMany(models.order, {
      foreignKey: "id",
      targetKey: "product_id",
      as: "orders"
    });
    product.belongsTo(models.artist_profile, {
      targetKey: "id",
      foreignKey: "artist_id",
      as: "artist"
    });
  };
  return product;
};
