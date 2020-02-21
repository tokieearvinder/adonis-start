"use strict";

class loginUser {
  // Validation rules

  get rules() {
    return {
      email: "required|email",
      password: "required"
    };
  }
  // Custom messages for validation

  get messages() {
    return {
      "email.required": "You must provide a email address.",
      "email.email": "You must provide a valid email address.",
      "password.required": "You must provide a password"
    };
  }

  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = loginUser;
