const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { DateTime } = require("luxon");
const { createError } = require("./error");

//has the password
exports.hashPassWord = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

//create a token
exports.createToken = async (userid, isAdmin) => {
  const expiryTime = DateTime.local().plus({ day: 30 });
  return (token = await jwt.sign(
    { userid, isAdmin, expiryTime },
    process.env.jwtSecretKey
  ));
};

// verify the token
exports.verifyToken = async (req, res, next) => {
  let token = req.body.token;
  if (!req.body.token)
    return createError(req, res, next, {
      message: "No token was sent",
      status: 400,
    });

  await jwt.verify(token, process.env.jwtSecretKey, (err, user) => {
    if (err)
      return createError(req, res, next, {
        message: "Invalid token was sent",
        status: 403,
      });
    req.user = user;
    next();
  });
};

// verify user
exports.verifyUser = async (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.id == req.params.id || req.user.isAdmin) {
      next();
    } else {
      return createError(req, res, next, {
        status: 403,
        message: "You are not authorized",
      });
    }
  });
};

//verify if the user is admin
exports.verifyAdmin = async (req, res, next) => {
  this.verifyToken(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      return createError(req, res, next, {
        status: 403,
        message: "You are not authorized",
      });
    }
  });
};
