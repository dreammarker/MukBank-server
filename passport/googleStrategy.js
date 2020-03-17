const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const { User } = require('../models');

module.exports = passport => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
        callbackURL: '/auth/google/callback'
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log('profile~~: ', profile);
        try {
          const exUser = await User.findOne({
            where: { snsId: profile.id, provider: 'google' }
          });
          if (exUser) {
            done(null, exUser);
          } else {
            const newUser = await User.create({
              nick: profile.displayName,
              snsId: profile.id,
              email: profile._json.email,
              provider: 'google'
            });
            done(null, newUser);
          }
        } catch (err) {
          console.error(err);
          done(err);
        }
      }
    )
  );
};
