const Recipe = require("../recipe/index")
const Item = require("../item")
const Template = require("../Template")
const Namespace = require("./Namespace")
const Usings = require("./Usings")
const WorldObject = require("../worldObject")

/**opedocs 
 * hallo
 */

module.exports = class Mod{
    requiredKeys = ["recipes", "items", "namespace", "usings","worldObjects"]
        
    constructor(modData){
        this.modData = modData
        this.validate(modData)
        this.template = new Template("./template/mod/mod.txt")
        this.created = {}
    }

    validate(data){
        this.requiredKeys.forEach(key => {
            if(!data[key]){
                throw `[Mod] Required key "${key}" is not provided`
            }
        })
    }


    getCodeString(){
        this.created["items"] = []
        this.modData.items.forEach(itemData => {
            this.created["items"].push(itemData.classname)
        })

        this.created["worldObjects"] = []
        this.modData.worldObjects.forEach(data => {
            this.created["items"].push(data.item.classname)
            this.created["worldObjects"].push(data.classname)
        })

        return this.template.mergeData({
            usings: new Usings(this.modData.usings).getCodeString(),
            namespace: new Namespace(this.modData.namespace).getCodeString(),
            code: this.#getRecipeItemCode()
        })
    }

    #getRecipeItemCode(){
        return [
            ...this.modData.recipes.map(recipeData => {
                console.log(`[MOD]: Generating recipe "${recipeData.classname}"`)
                return new Recipe(recipeData).getCodeString()
            }),
            ...this.modData.items.map(itemData => {
                console.log(`[MOD]: Generating item "${itemData.classname}"`)
                return new Item(itemData).getCodeString()
            }),
            ...this.modData.worldObjects.map(data => {
                console.log(`[MOD]: Generating worldObject "${data.classname}"`)
                return new WorldObject(data).getCodeString()
            })
        ].join("\n\n")
    }
}
