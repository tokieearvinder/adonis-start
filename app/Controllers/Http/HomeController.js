'use strict'

const Home = use('App/Models/Homes')
const { validate } = use('Validator')

class HomeController {


    async createTodo({ request, response, session }) {

        const data = request.all();

        const rules = {
            text: 'required'
        }
        const messages = {
            'text.required': 'Please Provide input',
            'text.min': 'Your text not long enough'
        }

        const validation = await validate(data, rules, messages)

        if (validation.fails()) {
            session
                .withErrors([{ field: 'text', message: 'Error message' }])
                .flashAll()
            return response.redirect('/');
        } else {
            const saveQuery = new Home(data);
            await saveQuery.save();
            session.flash({ notification: 'Entry Create Successfully' })
            return response.redirect('/');

        }

    }

    async TodoList({ view, auth }) {
        let dummyData = await Home.find();
        return view.render('home', {
            dummyData
        })

    }

    async deleteEntry({ response, params, session }) {
        const checkQuery = await Home.findOne({ _id: params._id });
        if (checkQuery) {
            const removeEntry = await Home.remove({ _id: checkQuery._id });
            session.flash({ deleteEntry: 'Entry Deleted Successfully' })
            return response.redirect('/');
        } else {
            session.flash({ deleteEntry: 'Entry Was  Not Found' })
            return response.redirect('/');
        }
    }

    async editEntry({ view, response, params }) {

        const checkEntry = await Home.findOne({ _id: params._id });

        if (checkEntry) {
            return view.render('edit-list', { checkEntry })
        } else {
            return response.redirect('/')
        }

    }



    async updateList({ response, request, params, view }) {
        const checkEntry = await Home.findOne({ _id: params._id });

        if (checkEntry) {
            checkEntry.text = request.all().text;
            await checkEntry.save();
            return response.redirect('/')
        } else {
            return response.redirect('/')
        }
    }
}

module.exports = HomeController
