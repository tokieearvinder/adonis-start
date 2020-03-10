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
      "required": "The {{ field }} is required",
      "email.email": "You must provide a valid email address."
    };
  }

  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = loginUser;
