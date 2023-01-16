const GeneralItem = require("./index")

module.exports = class WorldObjectItem extends GeneralItem{
    allowedAttributesExtend = {
        "AllowPluginModules": {
            value:"string"
        },
    }

    specialRequireRenderer = {
        AllowPluginModules: function(attribute, value){
            return `[AllowPluginModules(Tags = new[] { "${value}" })]`
        }
    }

    constructor(itemData){
        super(itemData, "./template/item/worldObject.txt")

        this.allowedAttributes =  {...this.allowedAttributes, ...this.allowedAttributesExtend}
        
        this.validate(itemData)
    }
}

