//* 다대다 테이블
module.exports = (sequelize, DataTypes) => {
  const UserLike = sequelize.define(
    'user_like',
    {
      user_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      rest_id: {
        type: DataTypes.INTEGER,
        foreignKey: true
      },
      check: {
        type: DataTypes.BOOLEAN
      }
    },

    {
      timeStamps: true,
      paranoid: false
    }
  );

  UserLike.associate = function(models) {
    UserLike.belongsTo(models.user, { foreignKey: 'user_id' });
    UserLike.belongsTo(models.restaurant, { foreignKey: 'rest_id' });
  };

  return UserLike;
};
