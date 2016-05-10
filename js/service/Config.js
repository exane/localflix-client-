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

Config.$inject = []
export { Config }