'use strict'

const Home = use('App/Models/Homes')
const { validate } = use('Validator')

class HomeController {


    async createTodo({ request, response, session }) {
        console.log('storeData hit')

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
            // console.log('validation message',validation.messages())
            session
                .withErrors([{ field: 'text', message: 'Error message' }])
                .flashAll()
            return response.redirect('/');
            // return response.redirect('back')
        } else {
            console.log('body data', data)
            const saveQuery = new Home(data);
            await saveQuery.save();
            session.flash({ notification: 'Entry Create Successfully' })
            return response.redirect('/');

        }

    }

    
    async TodoList({ view, auth }) {

        // console.log('auth user', await auth.getUser());
        let dummyData = await Home.find();
        console.log('taskUser', dummyData)
        return view.render('home', {
            dummyData
        })

    }

    async deleteEntry({ response, params, session }) {
        // const { _id } = params;
        console.log('paramss id', params._id);
        const checkQuery = await Home.findOne({ _id: params._id });
        console.log('entry found', checkQuery);
        if (checkQuery) {
            console.log('entry not found')
            const removeEntry = await Home.remove({ _id: checkQuery._id });
            session.flash({ deleteEntry: 'Entry Deleted Successfully' })
            return response.redirect('/');
        } else {
            console.log('no entry found')
        }
    }

    async editEntry({ view, response, params }) {

        console.log('id params', params._id);

        const checkEntry = await Home.findOne({ _id: params._id });

        if (checkEntry) {
            console.log('entry is here', checkEntry);
            // console.log('entry check', checkEntry);

            return view.render('edit-list', { checkEntry })
        } else {
            console.log('entry not here');
            return response.redirect('/')
        }

    }



    async updateList({ response, request, params, view }) {
        console.log('parameter', params._id)
        const checkEntry = await Home.findOne({ _id: params._id });

        if (checkEntry) {
            console.log('entry is here', checkEntry);

            checkEntry.text = request.all().text;
            await checkEntry.save();
            return response.redirect('/')
        } else {
            console.log('entry not here');
            return response.redirect('/')
        }
    }
}

module.exports = HomeController
