//* 관계 n 테이블
module.exports = (sequelize, DataTypes) => {
  const UserAgeSta = sequelize.define(
    'user_age_statics',
    {
      count: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    },
    {
      freezeTable: true,
      tableName: 'user_age_statics',
      timeStamps: true,
      paranoid: true
    }
  );

  return UserAgeSta;
};
