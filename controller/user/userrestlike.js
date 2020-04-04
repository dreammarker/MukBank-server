const jwt = require('jsonwebtoken');
const { user_like } = require('../../models');
require('dotenv').config();

module.exports = {
  post: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const userobj = jwt.verify(token, process.env.JWT_KEY).data;
      const rest_id = req.body.rest_id;
      //user정보 가져오기..
      if (userobj.id) {
        let usercheck = await user_like.findOne({
          where: {
            user_id: userobj.id,
            rest_id: rest_id
          }
        });
        if (usercheck) {
          let check;
          //값이 있다면 업데이트 시키기..
          if (usercheck.dataValues.likecheck === false) {
            check = true;
          } else if (usercheck.dataValues.likecheck === true) {
            check = false;
          }
          console.log('datavalues' + usercheck.dataValues.id);
          //update ...
          user_like.update(
            {
              likecheck: check
            },
            {
              where: {
                id: usercheck.dataValues.id
              }
            }
          );
          res.send({ likecheck: check });
        } else {
          //없다면 없을떄 클릭했으므로...
          user_like.create({
            rest_id: rest_id,
            user_id: userobj.id,
            likecheck: 1
          });

          res.send({ likecheck: true });
        }
      } else {
        console.log('wrong');
        res.status(400).send('wrong');
      }
    } catch (err) {
      console.log(err);
      res.send('failed');
    }
  },
  get: async (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const userobj = jwt.verify(token, process.env.JWT_KEY).data;
      const rest_id = req.body.rest_id;
      //user정보 가져오기..
      if (userobj.id) {
        let usercheck = await user_like
          .findOne({
            where: {
              user_id: userobj.id,
              rest_id: rest_id
            }
          })
          .then(result => {
            return result.dataValues;
          });
        if (usercheck) {
          res.send(usercheck.likecheck);
        } else {
          res.status(400).send(false);
        }
      } else {
        res.status(400).send('userid가 없습니다.');
      }
    } catch (err) {
      console.log(err);
      res.send('failed');
    }
  }
};
