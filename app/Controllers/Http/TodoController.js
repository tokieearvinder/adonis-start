"use strict";

const Todo = use("App/Models/Todo");

class TodoController {
  // This function are used for create todo list

  async createTodo({ request, response, session, auth }) {
    const data = request.all();
    data.user_id = auth.user._id;
    const saveQuery = new Todo(data);
    await saveQuery.save();
    session.flash({ notification: "Todo Create Successfully" });
    return response.redirect("/dashboard");
  }

  // This function are used for getting a list of todos

  async todoList({ view, auth }) {
    let listData = await Todo.find({ user_id: auth.user._id });
    return view.render("dashboard", {
      listData
    });
  }

  // This function are used for delete todo with todo Id

  async deleteTodo({ response, session, request }) {
    await Todo.remove({ _id: request.checkEntry._id });
    session.flash({ findTodo: "Todo Deleted Successfully" });
    return response.redirect("/dashboard");
  }

  // This function are used to find todo with todo Id

  async editTodo({ view, request }) {
    var checkEntry = request.checkEntry;
    return view.render("editTodo", { checkEntry });
  }

  // This function are used for update todo

  async updateTodo({ response, request, session }) {
    var checkEntry = request.checkEntry;
    checkEntry.text = request.all().text;
    await checkEntry.save();
    session.flash({ findTodo: "Todo updated successfully" });
    return response.redirect("/dashboard");
  }
}

module.exports = TodoController;
