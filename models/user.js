const mongoose = require('mongoose'),
  bcrypt = require('bcrypt-nodejs');

const schema = mongoose.Schema({
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true
  },
  companyName: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  businessPhone: {
    type: String,
    required: true
  },
  businessMail: {
    type: String,
    required: true
  }
}, {
  timestamps: true,
  collection: 'users',
  safe: {
    w: "majority",
    wtimeout: 15000
  },
  read: 'nearest'
});

schema.pre("save", function save(next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, undefined, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});

const comparePassword = function (candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch);
  });
};

schema.methods.comparePassword = comparePassword;

const Model = mongoose.model('user', schema);
module.exports = Model;