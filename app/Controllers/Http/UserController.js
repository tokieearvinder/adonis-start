'use strict'
const User = use('App/Models/Users')
const { validate } = use('Validator')
const Encryption = use('Encryption')

class UserController {

    async saveUsers({ request, response, view, auth, session }) {
        let userInfo = request.only(['fullName', 'mobile', 'email', 'password'])
        const rules = {
            fullName: 'required',
            mobile: 'required',
            email: 'required|unique:users',
            password: 'required|min:8',
        }

        const messages = {
            'email.required': 'Please Provide input',
            'email.min': 'Please Provide min lenght',
            'mobile.required': 'Please Provide Input',
            'fullName.required': 'Please Provide input',
            'password.required': 'Please Provide input',
            'password.min': 'Please Provide min length'
        }


        const validation = await validate(userInfo, rules, messages)

        if (validation.fails()) {
            session
                .withErrors(validation.messages())
                .flashAll()
            return response.redirect('back');
        } else {
            var userData = userInfo
            userData.password = Encryption.encrypt(userInfo.password)
            const new_user = new User(userData);
            const userSave = await new_user.save()
            await auth.login(userSave)
            return response.redirect('/');
        }
    }

    async loginUser({ view, request, response, auth, session }) {
        const userInfo = request.only(['email', 'password']);
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
            session
                .withErrors(validation.messages())
                .flashAll()
            return response.redirect('back');
        } else {
            const userExist = await User.findOne({ email: userInfo.email });
            if (userExist) {
                if (userInfo.password == Encryption.decrypt(userExist.password)) {
                    await auth.login(userExist)
                    session.flash({ loginSuccess: 'Login Successfully' })
                    return response.redirect('/')
                } else {
                    session.flash({ passwordMismatch: 'Password mismatch' })
                    return response.redirect('back')
                }

            } else {
                session.flash({ emailNotFound: 'User was not found' })
                return response.redirect('back')
            }
        }
    }

}

module.exports = UserController
