const jwt = require('jsonwebtoken');
require('dotenv').config();
const axios = require('axios');
module.exports = {
  access: (req, res) => {
    let code = req.query.code;
    console.log(req.query.code);
    axios
      .post({
        method: 'post',
        url: 'https://kauth.kakao.com/oauth/token',
        data: {
          grant_type: 'authorization_code',
          client_id: process.env.KAKAO_CLIEND_ID,
          redirect_uri: 'http://localhost:5001/auth/kakao/callack',
          code: code
        },
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
        }
      })
      .then(reuslt => {
        console.log(reuslt);
        // res.send(reuslt);
      });
  },
  get: (req, res) => {
    console.log('req user~~~', req.user);
    const token = jwt.sign(
      {
        data: req.user
      },
      process.env.JWT_KEY,
      { expiresIn: 60000 }
    );

    console.log('token...', token);
    res.cookie('jwt', token);
    res.json({ token });
  },
  callback: (req, res) => {
    console.log(req.body);
    res.send('');
  }
};
