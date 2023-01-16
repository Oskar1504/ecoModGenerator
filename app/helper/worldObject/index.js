const fs = require("fs")
const WorldObjectItem = require("../item/WorldObjectItem")
const Template = require("../Template")
const Validator = require("../Validator")
const RequiredComponents = require("../worldObject/RequiredComponents")

module.exports = class WorldObject extends Validator{
    constructor(data){
        //call validator constructor
        super(
            "WorldObject", 
            data, 
            {
                "item": "object",
                "classname":"string",
                "name":"string",
                "requiredComponents": "array",
                "vectorSize":"string",
                "subPageName":"string"
            }
        )


        this.templateObjectAndItem = new Template("./template/worldObject/objectAndItem.txt")
        this.templateObject = new Template("./template/worldObject/object.txt")

        this.init(data)
    }

    init(data){
        this.data = data

    }

    getCodeString(){
        return this.templateObjectAndItem.mergeData({
            itemCode: new WorldObjectItem(this.data.item).getCodeString(),
            objectCode: this.#getObjectCodeString()
        })
    }

    #getObjectCodeString(){
        return this.templateObject.mergeData({
            classname: this.data.classname,
            name: this.data.name,
            requiredComponents: new RequiredComponents(this.data.requiredComponents).getCodeString(),
            subPageName: this.data.subPageName,
        })
    }
}
