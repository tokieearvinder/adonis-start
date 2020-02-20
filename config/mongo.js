const Env = use('Env')
 
module.exports = {
  host: Env.get('MONGO_HOST', 'localhost'),
  port: Env.get('MONGO_PORT', '27017'),
  db: Env.get('MONGO_DATABASE', '')
}
 