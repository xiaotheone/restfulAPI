const routes = require('./router');

module.exports = function(app,db){
  routes(app,db)
}
