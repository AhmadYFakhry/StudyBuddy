const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
require('../middleware/auth')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }]
  // timestamps: true
})

userSchema.methods.genJWT = async function () {
  const user = this;
  const token = jwt.sign({
    _id: user._id.toString(),
    expiresIn: '7d'
  }, process.env.JWTS);
  user.tokens = user.tokens.concat({
    token
  });
  await user.save();
  return token;
};

// Encypts the password before its pushed to the DB.
// Saving passwords in plain text is never a good idea
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

userSchema.statics.login = async (email, password) => {
  const user = await User.findOne({ email });
  console.log(user);
  if (!user) throw new Error("Unable to login");
  const isValid = await bcrypt.compare(password, user.password)
  if (!isValid) throw new Error("Unable to login");
  else return user;
}

userSchema.virtual('userId').get(function() {
  return this._id;
});

const User = mongoose.model("User", userSchema);


module.exports = User
