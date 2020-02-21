"use strict";

class createUser {
  // Validation rules

  get rules() {
    return {
      fullName: "required",
      mobile: "required",
      email: "required|unique:users",
      password: "required|min:8"
    };
  }

  // Custom messages for validation

  get messages() {
    return {
      "email.required": "Please Provide input",
      "email.min": "Please Provide min lenght",
      "mobile.required": "Please Provide Input",
      "fullName.required": "Please Provide input",
      "password.required": "Please Provide input",
      "password.min": "Please Provide min length"
    };
  }

  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = createUser;
