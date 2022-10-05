const Joi = require("joi");
const mongoose = require("mongoose");
const userSchema = mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    //fullName:{type:String, required:true},
    password: { type: String, required: true, min: 8, max: 255 },
    phone: { type: Number, required: true },
    isAdmin: { type: Boolean, default: false },
    email: { type: String },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

function ValidateUsers(user) {
  const schema = Joi.object({
    username: Joi.string().alphanum().min(3).max(30).required(),

    password: Joi.string().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),

    phone: Joi.string(),
    isAdmin: Joi.boolean(),
    email: Joi.string()
      .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
      .required(),
  });
  return schema.validate(user);
}

exports.User = User;
exports.validate = ValidateUsers;
