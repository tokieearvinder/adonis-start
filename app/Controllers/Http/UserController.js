"use strict";
const User = use("App/Models/Users");
const Encryption = use("Encryption");

class UserController {
  // This function are used for signup user

  async saveUsers({ request, response, auth }) {
    let userInfo = request.only(["fullName", "mobile", "email", "password"]);
    var userData = userInfo;
    userData.password = Encryption.encrypt(userInfo.password);
    const new_user = new User(userData);
    const userSave = await new_user.save();
    await auth.login(userSave);
    return response.redirect("/dashboard");
  }

  // This function are used for login into app

  async loginUser({ view, request, response, auth, session }) {
    const userInfo = request.only(["email", "password"]);
    const userExist = await User.findOne({ email: userInfo.email });
    if (userExist) {
      if (userInfo.password == Encryption.decrypt(userExist.password)) {
        await auth.login(userExist);
        session.flash({ notification: "Login Successfully" });
        return response.redirect("/dashboard");
      } else {
        session.flash({ passwordMismatch: "Password mismatch" });
        return response.redirect("back");
      }
    } else {
      session.flash({ emailNotFound: "User was not found" });
      return response.redirect("back");
    }
  }
}

module.exports = UserController;
