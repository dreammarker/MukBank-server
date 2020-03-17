module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'user',
    {
      email: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      nick: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      snsId: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      provider: {
        type: DataTypes.STRING(250),
        allowNull: false
      },

      age: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true
      },

      gender: {
        type: DataTypes.STRING(100),
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      tableName: 'user',
      timestamps: true,
      paranoid: true
    }
  );

  return User;
};
