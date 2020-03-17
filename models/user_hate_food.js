//* 다대다 테이블
module.exports = (sequelize, DataTypes) => {
  const UserHateFood = sequelize.define(
    'user_hate_food',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      }
    },
    {
      freezeTable: true,
      tableName: 'user_hate_food',
      timeStamps: true,
      paranoid: false
    }
  );

  return UserHateFood;
};
