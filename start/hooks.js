const { hooks } = require('@adonisjs/ignitor')

hooks.after.providersBooted(() => {
  const Exception = use('Exception')

  Exception.handle('InvalidSessionException', async (error, { response, session }) => {
    session.withErrors(error.messages).flashAll()
    await session.commit()
    response.redirect('/login')
    return
  })
})