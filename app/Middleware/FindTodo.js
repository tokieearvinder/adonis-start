"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Todo = use("App/Models/Todo");

class FindTodo {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({ request, params, response, session }, next) {
    const checkEntry = await Todo.findOne({ _id: params._id });
    if (!checkEntry) {
      session.flash({ findTodo: "Todo Was  Not Found" });
      return response.redirect("/dashboard");
    }
    request.checkEntry = checkEntry;
    // call next to advance the request
    await next();
  }
}

module.exports = FindTodo;
