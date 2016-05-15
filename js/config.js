let fs = require("fs")

let config

class Config {
  constructor() {
    //config = config || fs.readFileSync("./config.json")
  }
  load() {
    config = config || JSON.parse(fs.readFileSync("config.json"))
    return config
  }
}

let cfg = new Config()
export default cfg