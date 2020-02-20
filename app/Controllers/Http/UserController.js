'use strict'
const User = use('App/Models/Users')
// const Home = use('App/Models/Homes')
const { validate } = use('Validator')
const Encryption = use('Encryption')

class UserController {

    async saveUsers({ request, response, view, auth,session }) {
        let userInfo = request.only(['fullName', 'mobile', 'email', 'password'])
        console.log('userInfo paramter', userInfo)
        const rules = {
            fullName: 'required',
            mobile:'required',
            email: 'required|unique:users',
            password: 'required|min:8',
        }

        const messages = {
            'email.required': 'Please Provide input',
            'email.min': 'Please Provide min lenght',
            'mobile.required':'Please Provide Input',
            'fullName.required': 'Please Provide input',
            'password.required': 'Please Provide input',
            'password.min': 'Please Provide min length'
        }


        const validation = await validate(userInfo, rules, messages)

        if (validation.fails()) {
            // console.log('validation message',validation.messages())
            session
                .withErrors(validation.messages())
                .flashAll()
            return response.redirect('back');
            // return response.redirect('back')
        } else {
            var userData = userInfo
            userData.password = Encryption.encrypt(userInfo.password)
            const new_user = new User(userData);
            const userSave = await new_user.save()
            console.log('new user not found', userSave)
            await auth.login(userSave)
            return response.redirect('/');
        }
        // const userExist = await User.findOne({ email: userInfo.email });
        // console.log('userExist', userExist);
        // if (userExist == null) {

        // } else {
        //     return response.status(400).json({
        //         message: 'Email Already Exists'
        //     })
        // }
    }

    async loginUser({ view, request, response, auth, session }) {
        const userInfo = request.only(['email', 'password']);
        console.log('userInfo', userInfo);
        const rules = {
            email: 'required|email',
            password: 'required',
        }

        const messages = {
            'email.required': 'You must provide a email address.',
            'email.email': 'You must provide a valid email address.',
            'password.required': 'You must provide a password'
        }

        const validation = await validate(userInfo, rules, messages)

        if (validation.fails()) {
            // console.log('validation message',validation.messages())
            session
                .withErrors(validation.messages())
                .flashAll()
            return response.redirect('back');
            // return response.redirect('back')
        } else {
        const userExist = await User.findOne({ email: userInfo.email });
        console.log('usre data', userExist);
        if (userExist) {
            if (userInfo.password == Encryption.decrypt(userExist.password)) {
                await auth.login(userExist)
                session.flash({loginSuccess:'Login Successfully'})
                return response.redirect('/')
            } else {
                session.flash({ passwordMismatch: 'Password mismatch' })
                return response.redirect('back')
                // return response.status(400).json({
                //     message: 'Invaild password'
                // })
            }

        } else {
            session.flash({ emailNotFound: 'User was not found' })
            return response.redirect('back')


        }
        // console.log('email', email);
        // console.log('password', password)
        // try {
        //     const result = await auth.attempt(email, password);
        //     console.log('result', result)
        //     return response.redirect('/');

        // } catch (error) {
        //     console.log('Error', error);
        //     return response.redirect('back')
        // }
        // console.log('userInfo', userInfo);
        // const userExist = await User.findOne({ email: userInfo.email });
        // console.log('usre data', userExist);
        // if (userExist) {
        //     if (userInfo.password == Encryption.decrypt(userExist.password)) {
        //         var userData = userExist
        //         return response.redirect('home')
        //     } else {
        //         return response.status(400).json({
        //             message: 'Invaild password'
        //         })
        //     }

        // } else {
        //     return response.status(400).json({
        //         message: 'User not Exist or Invalid Email'
        //     })
        // }
    }
    }



    // async getUsers({ request, response }) {

    //     let taskUser = await User.find()
    //     return response.json({
    //         message: 'data not found',
    //         data: taskUser
    //     })

    // }

}

module.exports = UserController
