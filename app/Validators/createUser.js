"use strict";

class createUser {
  // Validation rules

  get rules() {
    return {
      fullName: "required",
      mobile: "required",
      email: "required|unique:users",
      password: "required|min:8",
      profile_pics:'required|file_ext:png,jpg|file_size:2mb|file_types:image'
    };
  }

  // Custom messages for validation

  get messages() {
    return {
      "required":"The {{ field }} is required",
      "min": "please provide min length {{ field }}",
      "profile_pics.file_ext": "file extention should be png or jpg",
      "profile_pics.file_size": "file size not more the 2 mb",
      "profile_pics.file_types": "It should be valid file"
    };
  }

  // This function handle failure for validation check

  async fails(errorMessages) {
    this.ctx.session.withErrors(errorMessages).flashAll();
    return this.ctx.response.redirect("back");
  }
}

module.exports = createUser;
