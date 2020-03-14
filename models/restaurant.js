module.exports = (sequelize, DataTypes) => {
  const Restaurant = sequelize.define(
    'restaurant',
    {
      name: {
        type: DataTypes.STRING(250),
        allowNull: false
      },

      phone: {
        type: DataTypes.STRING(100),
        allowNull: true
      },

      address: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      roadAddress: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      image: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      reviewsort: {
        type: DataTypes.INTEGER,
        allowNull: true
      },

      //? string??
      xmap: {
        type: DataTypes.STRING(250),
        allowNull: true
      },

      ymap: {
        type: DataTypes.STRING(250),
        allowNull: true
      }
    },
    {
      freezeTableName: true,
      tableName: 'restaurant',
      timeStamps: true,
      paranoid: true
    }
  );

  return Restaurant;
};
