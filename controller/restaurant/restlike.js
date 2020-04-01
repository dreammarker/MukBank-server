const jwt = require('jsonwebtoken');
const { user_like } = require('../../models');
require('dotenv').config();
const { sequelize } = require('../../models/index');
const { QueryTypes } = require('sequelize');
module.exports = {
  post: (req, res) => {
    try {
      let rest_id = req.body.rest_id;
      let query =
        'SELECT rest_id, count(rest_id) as count FROM user_likes where rest_id = ' +
        rest_id +
        ' AND likecheck = 1 group by rest_id';
      rest_id;
      sequelize
        .query(query, {
          type: QueryTypes.SELECT
        })
        .then(result => {
          console.log(result);
          res.send(result[0]);
        });
    } catch (err) {
      console.log(err);
      res.send('failed');
    }
  }
};
