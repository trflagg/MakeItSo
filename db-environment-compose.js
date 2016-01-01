
module.exports.appName = 'MakeItSo'
module.exports.db = {
  // build the mongo URL from the env vars exposed by docker
  URL: 'mongodb://' + process.env.MONGO_PORT_27017_TCP_ADDR + ':' + process.env.MONGO_PORT_27017_TCP_PORT
}
