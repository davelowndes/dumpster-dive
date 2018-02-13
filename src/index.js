//stream a big wikipedia xml.bz2 file into mongodb
// usage:
//   node index.js afwiki-latest-pages-articles.xml.bz2
const init = require('./00-init-db');
const multithreader = require("./multithreader")
const noop = () => {
}

var jobBegin = 0
process.on('unhandledRejection', up => {
  console.log(up)
})

//open up a mongo db, and start xml-streaming..
const main = async (options, callback = noop ) => {
  params = Object.assign({}, options);
  multithreader.start(params)

  await init(options)
  setInterval(async () => {
    count = await options.db.collection("queue").count()
    console.log(`final doc count: ${count} in last 60 seconds.`)
  }, 60000)

}

module.exports = main;
