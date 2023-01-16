const InputItem = require("./InputItem")
const OutputItem = require("./OutputItem")
const Template = require("../Template")
const Requirements = require("./Requirements")

module.exports = 

class Recipe{
    
    requiredRecipeDataAttributes = ["skill", "skillLevel","classname","name","table","input","output","requirements","experienceOnCraft","createLaborInCaloriesValue","createCraftTimeValue"]
    
    constructor(recipeData){
        this.sourceData = this.validate(recipeData)
        this.template = new Template("./template/recipe/recipe.txt")
    }

    validate(recipeData){
        let o = {}
        this.requiredRecipeDataAttributes.forEach(key => {
            if(recipeData[key]){
                o[key] = recipeData[key]
            }else{
                throw `Required key "${key}" is not provided`
            }
        })

        return o
    }

    getCodeString(){
        this.sourceData["inputItems"] = this.sourceData.input.map(item => {
            item["skill"] = this.sourceData.skill
            return new InputItem(item).getCodeString()
        }).join(",\n")

        this.sourceData["outputItems"] = this.sourceData.output.map(item => {
            return new OutputItem(item).getCodeString()
        }).join(",\n")

        this.sourceData["requirements"] = new Requirements(this.sourceData.requirements).getCodeString()

        return this.template.mergeData(this.sourceData)
    }


}