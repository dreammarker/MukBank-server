const { QueryTypes } = require('sequelize');
const { sequelize } = require('../../models/index');
const { user, user_hate_food } = require('../../models');
const jwt = require('jsonwebtoken');
module.exports = {
  //user의 식당 데이터를 업데이트 및 insert 하는 작업
  post: async (req, res) => {
    let hatefd = req.body.hatefd;
    //토근을 가져온다.
    let loginobj = req.cookies.loginobj;

    //토근을 가지고
    let userobj = jwt.verify(loginobj, process.env.JWT_KEY).data;
    let usercheck = await user_hate_food.findOne({
      where: {
        user_id: userobj.id
      }
    });
    //userhate table에 정보가 있다면 update
    if (usercheck) {
      user_hate_food.update(
        {
          fd_category: hatefd
        },
        {
          where: {
            user_id: userobj.id
          }
        }
      );
    }
    //없다면 insert ..
    else {
      user_hate_food.create({
        user_id: userobj.id,
        fd_category: hatefd
      });
    }
    res.send('sucees');
  },
  get: async (req, res) => {
    let loginobj = req.cookies.loginobj;

    //토근을 가지고
    let userobj = jwt.verify(loginobj, process.env.JWT_KEY).data;
    let usercheck = await user_hate_food.findOne({
      attributes: ['fd_category'],
      where: {
        user_id: userobj.id
      }
    });

    if (usercheck) {
      res.send(usercheck);
    } else {
      res.send('');
    }
  }
};
