//* 다대다 테이블
module.exports = (sequelize, DataTypes) => {
  const UserSelectRest = sequelize.define(
    'user_select_rest',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },

      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTableNam: true,
      tableName: 'user_select_rest',
      timeStamps: true,
      paranoid: true
    }
  );

  return UserSelectRest;
};
