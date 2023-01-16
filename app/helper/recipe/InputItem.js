
const Item = require("./Item")
const Template = require("../Template")

module.exports = 

class InputItem extends Item{    
    constructor(data){
        super(data, ["item", "amount","skill"])
        
        this.template = new Template("./template/recipe/input_item.txt")
    }

    getCodeString(){
        return this.template.mergeData(this.sourceData)
    }

}