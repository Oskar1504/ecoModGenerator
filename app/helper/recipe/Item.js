const fs = require("fs")

module.exports = class Item{
    
    constructor(data, requiredAttributes = ["item","amount"]){
        this.requiredAttributes = requiredAttributes

        this.sourceData = this.validate(data)
    }

    //TODO could check if item exist in vanilla
    validate(data){
        let o = {}
        this.requiredAttributes.forEach(key => {
            if(data[key]){
                o[key] = data[key]
            }else{
                throw `Required key "${key}" is not provided`
            }
        })

        return o
    }
}