//* 다대다 테이블
module.exports = (sequelize, DataTypes) => {
  const UserHateFood = sequelize.define(
    'user_hate_food',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      fd_category_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      }
    },
    },
    {
      timeStamps: true,
      paranoid: false
    }
  );

  UserHateFood.associate = function(models) {
    UserHateFood.belongsTo(models.user, { foreignKey: 'user_id' });
    UserHateFood.belongsTo(models.food_category, {
      foreignKey: 'fd_category_id'
    });
  };

  return UserHateFood;
};
