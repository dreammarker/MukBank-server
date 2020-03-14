//* 다대다 테이블
module.exports = (sequelize, DataTypes) => {
  const UserReview = sequelize.define(
    'user_review',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      message: {
        type: DataTypes.STRING(500),
        allowNull: true
      },

      score: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableName: true,
      tableName: 'user_review',
      timeStamps: true,
      paranoid: true
    }
  );

  return UserReview;
};
