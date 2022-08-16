const args = require('../yargs')
const os = require('os');
const numeroCpu = os.cpus().length;

const recuperarInfo = (_, res) => {
  const info = {
    args: args,
    sistema: process.platform,
    nodeVersion: process.version,
    memory: process.memoryUsage.rss(),
    path: process.cwd(),
    processId: process.pid,
    file: __dirname,
    numeroCpu: numeroCpu,
  }


  info.keys = Object.keys(info.args)
  res.render("info", { info: info })
}
module.exports = { recuperarInfo }