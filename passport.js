const Strategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const { User } = require("./database/models");

module.exports = (passport) => {
	passport.use(new Strategy((username, pwd, done) => {
		User.findOne({
			where: {
				username
			}
		}).then(user => {
			if (!user) return done(null, false, { message: "No user found with this username!" })

			bcrypt.compare(pwd, user.password, (err, isMatch) => {
				if (err) throw err;
				if (isMatch) done(null, user);
				else return done(null, false, { message: "Incorrect password" })
			});
		})
	}));

	passport.serializeUser((user, done) => {
		done(null, user.id)
	});

	passport.deserializeUser((userId, done) => {
		User.findByPK(userId)
		.then(user => done(null, user))
		.catch(err => console.log(err))
	})
}