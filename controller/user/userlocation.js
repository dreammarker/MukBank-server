// const { user } = require('../../models');
require('dotenv').config();
const axios = require('axios');

module.exports = {
  post: (req, res) => {
    //좌표 정보를 가지고 온다..
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let url = 'https://dapi.kakao.com/v2/local/geo/coord2address.json';
    url += '?x=' + encodeURI(longitude);
    url += '&y=' + encodeURI(latitude);
    console.log(url);
    axios
      .get(url, {
        headers: {
          Authorization: 'KakaoAK ' + process.env.KAKAO_REST_ID,
          'Content-Type': 'application/json;charset=UTF-8'
        }
      })
      .then(result => {
        return result.data;
      })
      .then(data => {
        if (data.meta.total_count < 1) {
          res.status(500);
          res.send('올바른 좌표값이 아닙니다.');
        } else {
          console.log(data.documents);
          res.send('user location update');
        }
      });
  }
};
