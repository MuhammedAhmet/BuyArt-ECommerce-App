"use strict";
module.exports = (sequelize, DataTypes) => {
  const order = sequelize.define(
    "order",
    {
      product_id: DataTypes.INTEGER,
      order_status: DataTypes.INTEGER,
      city: DataTypes.STRING,
      phone: DataTypes.STRING,
      address: DataTypes.STRING
    },
    {}
  );
  order.associate = function(models) {
    order.belongsTo(models.product, {
      targetKey: "id",
      foreignKey: "product_id",
      as: "product"
    });
  };
  return order;
};
