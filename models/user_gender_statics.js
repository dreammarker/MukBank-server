//* 관계 n 테이블
module.exports = (sequelize, DataTypes) => {
  const UserGenderSta = sequelize.define(
    'user_gender_statics',
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTable: true,
      tableName: 'user_gender_statics',
      timeStapms: true,
      paranoid: true
    }
  );

  return UserGenderSta;
};
