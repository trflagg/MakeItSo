const util = require('util');
const exec = util.promisify(require('child_process').exec);

module.exports = async function() {

  var rand = Math.floor(Math.random() * 20000) + 1;

  const { stdout, stderr } = await exec("sed '"+rand+"!d' names.txt");

  var name = stdout.trim();
  return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
}

