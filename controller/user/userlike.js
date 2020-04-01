const jwt = require('jsonwebtoken');
// const { user } = require('../../models');
require('dotenv').config();

module.exports = {
  get: (req, res) => {
    try {
      const token = req.headers.authorization.split(' ')[1];
      console.log(token);
      const userobj = jwt.verify(token, process.env.JWT_KEY).data;
      console.log(userobj);
      if (userobj.id) {
        res.json({
          name: userobj.nick,
          email: userobj.email,
          snsId: userobj.snsId,
          profile: userobj.userimage,
          provider: userobj.provider
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
