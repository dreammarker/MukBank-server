module.exports = (sequelize, DataTypes) => {
  const FoodMain = sequelize.define(
    'food_main',
    {
      category: {
        type: DataTypes.STRING(100),
        allowNull: false
      }
    },
    {
      freezeTable: true,
      tableName: 'food_main'
    }
  );

  return FoodMain;
};
