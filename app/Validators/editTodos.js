"use strict";

class editTodos {
  // Validation rules

  get rules() {
    return {
      text: "required"
    };
  }

  // Custom messages for validation

  get messages() {
    return {
      "required": "The {{ field }} is required"
    };
  }

  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = editTodos;
