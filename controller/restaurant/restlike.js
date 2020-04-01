const jwt = require('jsonwebtoken');
const { user_like } = require('../../models');
require('dotenv').config();
const { sequelize } = require('../../models/index');
module.exports = {
  post: (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const userobj = jwt.verify(token, process.env.JWT_KEY).data;
      console.log(userobj);
      let rest_id = req.body.rest_id;
      if (userobj.id) {
        let query =
          'SELECT count(rest_id) as count FROM user_likes group by rest_id where rest_id = ' +
          rest_id +
          ' AND check = 1';
        sequelize
          .query(query, {
            type: QueryTypes.SELECT
          })
          .then(result => {
            console.log(result);
            res.send(result);
          });
      } else {
        console.log('wrong');
        res.status(400).send('wrong');
      }
    } catch (err) {
      console.log(err);
      res.send('failed');
    }
  }
};
