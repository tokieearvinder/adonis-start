"use strict";
const User = use("App/Models/Users");
const Encryption = use("Encryption");
const Helpers = use("Helpers");
const Mail = use("Mail");

// const removeFile = Helpers.promisify(fs.unlink);

class UserController {
  // This function are used for signup user with profile image

  async saveUsers({ request, response, view, auth }) {
    const finalArray = [];
    let userInfo = request.only(["fullName", "mobile", "email", "password"]);
    var userData = userInfo;

    const profilePics = request.file("profile_pics", {
      types: ["image"],
      size: "2mb"
    });
    userData.profile_pics = new Date().getTime() + "." + profilePics.subtype;
    await profilePics.move(Helpers.publicPath("uploads/image"), {
      name: userData.profile_pics
    });

    if (!profilePics.moved()) {
      return profilePics.errors();
    }
    userData.password = Encryption.encrypt(userInfo.password);
    userData.profile_pics = userData.profile_pics;
    const new_user = new User(userData);
    const userSave = await new_user.save();
    await auth.login(userSave);

    await Mail.send("emails.welcome", userSave.toJSON(), message => {
      message.from("arvindersinghvicky6@gmail.com");
      message.to(userSave.email);
      message.subject("Welcome to yardstick");
    });

    return response.redirect("/dashboard");
  }

  // This function are used for login into app

  async loginUser({ request, response, auth, session }) {
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
      session.flash({ userNotFound: "User was not found" });
      return response.redirect("back");
    }
  }
}

module.exports = UserController;
