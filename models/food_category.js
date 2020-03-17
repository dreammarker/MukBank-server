module.exports = (sequelize, DataTypes) => {
  const FoodCategory = sequelize.define(
    'food_category',
    {
      parent: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      firstchild: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      secondchild: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      thirdchild: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      fourthchild: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      longword: {
        type: DataTypes.STRING(200),
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      tableName: 'food_category',
      timeStampls: true,
      paranoid: true
    }
  );

  return FoodCategory;
};
