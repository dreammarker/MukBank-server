//* 관계 n 테이블
module.exports = (sequelize, DataTypes) => {
  const UserLocationSta = sequelize.define(
    'user_location_statics',
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      },

      location: {
        type: DataTypes.STRING(250),
        allowNull: false
      }
    },
    {
      freezeTable: true,
      tableName: 'user_location_statics',
      timeStapms: true,
      paranoid: true
    }
  );

  return UserLocationSta;
};
