const express = require('express');
const passport = require('passport');

const router = express.Router();

const { authController } = require('../controller');

router.get('/', authController.info.get);

//* google
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: 'http://localhost:5001/auth',
    session: false
  }),
  authController.google.get
);

//* kakao
router.get('/kakao', passport.authenticate('kakao'));

router.get(
  '/kakao/callback',
  passport.authenticate('kakao', {
    failureRedirect: 'http://localhost:5001/auth',
    session: false
  }),
  authController.kakao.get
);

//* facebook
router.get(
  '/facebook',
  passport.authenticate('facebook', {
    // https://developers.facebook.com/docs/facebook-login/permissions/?translation#reference-default
    scope: ['email', 'user_age_range', 'user_gender']
  })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: 'http://localhost:5001/auth',
    session: false
  }),
  authController.facebook.get
);

module.exports = router;
