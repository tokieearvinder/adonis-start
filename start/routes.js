'use strict'

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
const Route = use('Route')

// Route.on('/').render('welcome')
Route.on('/signup').render('user.signup')
Route.on('/login') .render('user.login');

Route.get('/logout',
async ({response,auth}) =>{
        await auth.logout();
        return response.redirect('/');
})
Route.get('/','HomeController.TodoList')
Route.get('/todo/delete/:_id','HomeController.deleteEntry')
Route.get('/todo/edit/:_id','HomeController.editEntry')

Route.post('/signsUp', 'UserController.saveUsers');
Route.post('/login', 'UserController.loginUser');
Route.post('/todo/update/:_id','HomeController.updateList')
Route.post('/', 'HomeController.createTodo');


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