const Template = require("../Template")

module.exports = class Usings{
    constructor(usings){
        this.usings = usings
        this.template = new Template("./template/mod/usings.txt")
    }

    getCodeString(){
        return this.template.mergeData(this.usings)
    }
}
