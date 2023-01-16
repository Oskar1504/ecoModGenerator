const fs = require("fs")

module.exports = class Requirements{
    // easy array of objects with type, content and they specify which template string mit content genutzt werden soll
    constructor(requirements){
        this.templatesStrings = JSON.parse(fs.readFileSync("./template/requirements.json"))
        this.requirements = requirements

    }

    getCodeString(){
        let output = this.requirements.map(req => {
            if(this.templatesStrings[req.type]){
                return this.mergeData(this.templatesStrings[req.type], req.content)
            }else{
                throw `[Requirements]: ${req.type} is not defined in template object`
            }
        }).join("\n")

        return output
    }

    mergeData(string, data){
        let o = string

        Object.entries(data).forEach(([key, val]) => {
            o = o.replace(new RegExp(`{{${key}}}`,"g"), val)
        })

        return o
    }


}