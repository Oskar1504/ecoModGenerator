const Item = require("./Item")
const Template = require("../Template")

module.exports = class OutputItem extends Item{    

    constructor(data){
        super(data)
        
        this.template = new Template("./template/recipe/output_item.txt")
    }

    getCodeString(){
        return this.template.mergeData(this.sourceData)
    }

}