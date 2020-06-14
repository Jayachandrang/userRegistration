"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _mongoose = require("mongoose");

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bcryptjs = require("bcryptjs");

var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

var _jsonwebtoken = require("jsonwebtoken");

var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _keys = require("../config/keys");

var _keys2 = _interopRequireDefault(_keys);

var _mongooseUniqueValidator = require("mongoose-unique-validator");

var _mongooseUniqueValidator2 = _interopRequireDefault(_mongooseUniqueValidator);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// TODO: add uniqueness and email validations to email field
var schema = new _mongoose2.default.Schema({
  email: {
    type: String,
    required: true,
    lowercase: true,
    index: true,
    unique: true
  },
  passwordHash: { type: String, required: true },
  firstname: { type: String, required: true },
  username: { type: String, required: true },
  lastname: { type: String, required: true },
  gender: { type: String, required: true },
  country: { type: String, required: true }
}, { timestamps: true });

schema.methods.isValidPassword = function isValidPassword(password) {
  return _bcryptjs2.default.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = _bcryptjs2.default.hashSync(password, 10);
};

schema.methods.generateJWT = function generateJWT() {
  return _jsonwebtoken2.default.sign({
    email: this.email,
    firstname: this.firstname
  }, _keys2.default.JWT_SECRET);
};

schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    firstname: this.firstname,
    lastname: this.lastname,
    token: this.generateJWT()
  };
};

schema.plugin(_mongooseUniqueValidator2.default, { message: "This email is already taken" });

exports.default = _mongoose2.default.model("User", schema);
//# sourceMappingURL=User.js.map