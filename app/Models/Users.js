"use strict";

const mongoose = use("Mongoose");

let userSchema = mongoose.Schema(
  {
    fullName: { type: String, default: "" },
    email: { type: String, default: "" },
    mobile: { type: String, default: "" },
    password: { type: String, default: "" },
    profile_pics: { type: String, default: "" }
  },
  {
    timestamps: true
  }
);

var User = mongoose.model("User", userSchema);

module.exports = User;
