const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];

const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config
);

//* models
db.User = require('./user')(sequelize, Sequelize);
db.Restaurant = require('./restaurant')(sequelize, Sequelize);
db.FoodMain = require('./food_main')(sequelize, Sequelize);
db.FoodCategory = require('./food_category')(sequelize, Sequelize);

db.UserAgeSta = require('./user_age_statics')(sequelize, Sequelize);
db.UserGenderSta = require('./user_gender_statics')(sequelize, Sequelize);
db.UserLocationSta = require('./user_location_statics')(sequelize, Sequelize);

db.UserSelectRest = require('./user_select_rest')(sequelize, Sequelize);
db.UserReview = require('./user_review')(sequelize, Sequelize);
db.UserHateFood = require('./user_hate_food')(sequelize, Sequelize);

//* assosiation

//* User -< UserSelectRest >- Restaurant
db.User.belongsToMany(db.Restaurant, {
  through: db.UserSelectRest,
  foreignKey: 'user_id',
  otherKey: 'rest_id'
});

//* User -< UserReview >- Restaurant
db.User.belongsToMany(db.Restaurant, {
  through: db.UserReview,
  foreignKey: 'user_id',
  otherKey: 'rest_id'
});

//* User -< UserHateFood >- FoodCategory
db.User.belongsToMany(db.FoodCategory, {
  through: db.UserHateFood,
  foreignKey: 'user_id',
  otherKey: 'fd_category_id'
});

//* User -< UserAgeSta
db.User.hasMany(db.UserAgeSta, {
  foreignKey: 'user_id'
});

db.UserAgeSta.belongsTo(db.User, {
  foreignKey: 'user_id'
});

//* User -< UserGenderSta
db.User.hasMany(db.UserGenderSta, {
  foreignKey: 'user_id'
});

db.UserGenderSta.belongsTo(db.User, {
  foreignKey: 'user_id'
});

//* User -< UserLocationSta
db.User.hasMany(db.UserLocationSta, {
  foreignKey: 'user_id'
});

db.UserLocationSta.belongsTo(db.User, {
  foreignKey: 'user_id'
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
