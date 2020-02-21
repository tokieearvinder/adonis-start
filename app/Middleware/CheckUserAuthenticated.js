"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class CheckUserAuthenticated {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ response, auth, session }, next) {
    if (auth.user) {
      session.flash({ notification: "You are already login" });
      return response.redirect("/dashboard");
    }
    // call next to advance the request
    await next();
  }
}

module.exports = CheckUserAuthenticated;
