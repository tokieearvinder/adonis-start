"use strict";

class saveTodos {
  // Validation rules

  get rules() {
    return {
      text: "required"
    };
  }
  // Custom messages for validation

  get messages() {
    return {
      "required":"The {{ field }} is required",
    };
  }
  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("/dashboard");
  }
}

module.exports = saveTodos;
