const fs = require("fs")

module.exports = class Template{
    constructor(templatePath){
        this.templateString = fs.readFileSync(templatePath).toString()
    }

    mergeData(data){
        let o = this.templateString

        Object.entries(data).forEach(([key, val]) => {
            o = o.replace(new RegExp(`{{${key}}}`,"g"), val)
        })

        return o
    }
}
