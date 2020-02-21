"use strict";

const mongoose = use("Mongoose");

let todoSchema = mongoose.Schema(
  {
    text: { type: String },
    user_id: { type: String, ref: "User" }
  },
  {
    timestamps: true
  }
);

var Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
