const passport = require('passport'),
	request = require('request'),
	config = require('../config'),
	userModel = require('../models/user'),
	passportLocal = require('passport-local'),
	passportJWT = require("passport-jwt");

const LocalStrategy = passportLocal.Strategy;
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.serializeUser((user, done) => {
	done(undefined, user.id);
});


passport.deserializeUser((id, done) => {
	userModel.findById(id, (err, user) => {
		done(err, user);
	});
});


passport.use(new LocalStrategy({
	usernameField: "email"
}, (email, password, done) => {
	userModel.findOne({
		email: email.toLowerCase()
	}, (err, user) => {
		if (err) {
			return done(err);
		}
		if (!user) {
			return done(undefined, false, {
				message: `Email ${email} not found.`
			});
		}
		user.comparePassword(password, (err, isMatch) => {
			if (err) {
				return done(err);
			}
			if (isMatch) {
				return done(undefined, user);
			}
			return done(undefined, false, {
				message: "Invalid email or password."
			});
		});
	});
}));

passport.use(new JWTStrategy({
	jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
	secretOrKey: config.authSecret
}, function (jwtPayload, next) {
	return next(null, "Success");
}));