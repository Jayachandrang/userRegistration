import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import keys from "../config/keys";
import uniqueValidator from "mongoose-unique-validator";

// TODO: add uniqueness and email validations to email field
const schema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      index: true,
      unique: true
    },
    passwordHash: { type: String, required: true },
    firstname:{ type: String, required: true },
    username:{ type: String, required: true },
    lastname:{ type: String, required: true },
    gender:{ type: String, required: true },
    country:{ type: String, required: true },
  },
  { timestamps: true }
);

schema.methods.isValidPassword = function isValidPassword(password) {
  return bcrypt.compareSync(password, this.passwordHash);
};

schema.methods.setPassword = function setPassword(password) {
  this.passwordHash = bcrypt.hashSync(password, 10);
};


schema.methods.generateJWT = function generateJWT() {
  return jwt.sign(
    {
      email: this.email,
      firstname: this.firstname,
    },
    keys.JWT_SECRET
  );
};


schema.methods.toAuthJSON = function toAuthJSON() {
  return {
    email: this.email,
    firstname: this.firstname,
    lastname : this.lastname,
    token: this.generateJWT()
  };
};

schema.plugin(uniqueValidator, { message: "This email is already taken" });

export default mongoose.model("User", schema);