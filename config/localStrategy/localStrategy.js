const LocalStrategy = require("passport-local").Strategy;
const db = require("../../db/indexQuery");
const bcryptjs = require("bcryptjs");

module.exports = {
  strategy: new LocalStrategy(async function verify(username, password, done) {
    try {
      const usernameGet = await db.findUserByUsername({ username });
      const user = usernameGet[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const match = await bcryptjs.compare(password, user.password);
      if (!match) {
        return done(null, false, { message: "Incorrect password " });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }),

  serializeUserFunc: (user, done) => {
    done(null, user.id);
  },

  deserializeUserFunc: async (id, done) => {
    try {
      const userId = await db.findUserById({ id });
      const user = userId[0];

      done(null, user);
    } catch (err) {
      done(err);
    }
  },
};
