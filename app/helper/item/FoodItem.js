const GeneralItem = require("./index")
const util = require("../Util")

module.exports = class FoodItem extends GeneralItem{
    allowedAttributesExtend = {
        "Calories": {
            value:"number"
        },
        "Nutrition": {
            carbs: "number",
            fat: "number",
            protein: "number",
            vitamins: "number",
        },
        "HoursUntilWaste": {
            value: "number"
        },
    }

    specialRequireRenderer = {
        AllowPluginModules: function(attribute, value){
            return `[AllowPluginModules(Tags = new[] { "${value}" })]`
        }
    }

    constructor(itemData){
        super(itemData, "./template/item/food.txt")
        this.requiredKeys = [...super.requiredKeys, ...Object.keys(this.allowedAttributesExtend).map(e => util.charToLowerCase(e))]
        this.allowedAttributes =  {...this.allowedAttributes, ...this.allowedAttributesExtend}
        
        this.validate(itemData)
    }
}

