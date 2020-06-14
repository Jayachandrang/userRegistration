"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require("express");

var _express2 = _interopRequireDefault(_express);

var _User = require("../models/User");

var _User2 = _interopRequireDefault(_User);

var _keys = require("../config/keys");

var _keys2 = _interopRequireDefault(_keys);

var _parseErrors = require("../utils/parseErrors");

var _parseErrors2 = _interopRequireDefault(_parseErrors);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = _express2.default.Router();

router.post("/", function (req, res) {
  var _req$body$user = req.body.user,
      email = _req$body$user.email,
      password = _req$body$user.password,
      firstname = _req$body$user.firstname,
      lastname = _req$body$user.lastname,
      gender = _req$body$user.gender,
      country = _req$body$user.country,
      username = _req$body$user.username;

  var user = new _User2.default({ email: email, firstname: firstname, lastname: lastname, gender: gender, country: country, username: username });
  user.setPassword(password);
  user.save().then(function (userRecord) {
    res.json({ user: userRecord.toAuthJSON() });
  }).catch(function (err) {
    return res.status(400).json({ errors: (0, _parseErrors2.default)(err.errors) });
  });
});

exports.default = router;
//# sourceMappingURL=users.js.map