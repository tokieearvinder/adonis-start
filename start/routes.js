"use strict";

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route");

Route.on("/").render("index");
Route.on("/signup").render("user.signup").middleware("CheckUserAuthenticated");
Route.on("/login").render("user.login").middleware("CheckUserAuthenticated");

Route.get("/logout", async ({ response, auth }) => {
  await auth.logout();
  return response.redirect("/login");
});
Route.get("/dashboard", "TodoController.todoList").middleware("auth");
Route.get("/todo/delete/:_id", "TodoController.deleteTodo").middleware("findTodo");
Route.get("/todo/edit/:_id", "TodoController.editTodo").middleware("findTodo");

Route.post("/signup", "UserController.saveUsers").validator("createUser").middleware("CheckUserAuthenticated");
Route.post("/login", "UserController.loginUser").validator("loginUser").middleware("CheckUserAuthenticated");
Route.post("/todo/update/:_id", "TodoController.updateTodo").validator("editTodos").middleware("findTodo");
Route.post("/dashboard", "TodoController.createTodo").validator("saveTodos").middleware("auth");

// Route.get('/home',({request,response,view}) =>{
//     return view.render('home',{
//         username:'arvinder'
//     })
//     });

// Route.get('/', ({ request, response, view }) => {
//     return response.json({
//         message:'hii'
//     })
// });
