const util = require("../Util")

const Template = require("../Template")

module.exports = class GeneralItem{
    //available attribute
    // [Serialized] required
    // [LocDisplayName("")]
    // [Tag("")]
    // [Category("")]
    // [Ecopedia("category","page",CreateASSubPage)]
    // [Weight(value)]
    // [MaxStackSize(value)]
    // [Fuel(value)]
    // [Currency]
    // [Compostable]
    // [NotSpawnable]
    // [LawsDropDownIgnore]

    allowedAttributes = {
        "LocDisplayName": {
            value:"string"
        },
        "Tag": {
            value: "string"
        },
        "Category": {
            value: "string"
        },
        "Ecopedia": {
            category: "string",
            page: "string",
            createAsSubPage: "bool"
        },
        "Weight": {
            value: "number"
        },
        "MaxStackSize": {
            value: "number"
        },
        "Fuel": {
            value: "number"
        },
        "Currency": {},
        "Compostable": {},
        "NotSpawnable": {},
        "LawsDropDownIgnore": {}
    }

    requiredKeys = ["classname", "description"]

    specialRequireRenderer = {}
    
    constructor(itemData, templateFilename = "./template/item/item.txt"){
        this.itemData = itemData
        this.validate(itemData)

        

        this.template = new Template(templateFilename)
    }

    validate(data){
        this.requiredKeys.forEach(key => {
            if(!data[key]){
                throw `[GeneralItem] Required key "${key}" is not provided`
            }
        })
    }

    getCodeString(){
        let prefunctionString = ["[Serialized]"]
        let output = ""

        Object.entries(this.itemData).map(([key, val]) => {
            if(!this.requiredKeys.includes(key)){

                key = util.charToUpperCase(key)
    
                this.checkAttribute(key, val)
                prefunctionString.push(this.getStringFromAttribute(key, val))
            }
        })

        output = prefunctionString.map(e => "\t" + e).join("\n")

        output += "\n" + this.getCodeFromTemplate()

        return output
    }

    checkAttribute(key, val){
        if(this.allowedAttributes[key]){
            //check if attribute requires parameter
            //if more than one parameter required val needs to be object
            let requiredKeys = Object.keys(this.allowedAttributes[key])
            if(requiredKeys.length > 1){
                if(typeof val != "object"){
                    throw `[GeneralItem]: attribute ${key} requires multiple parameters so object is required`
                }else{
                    //check if parameter keys are correct
                    requiredKeys.forEach(k => {
                        if(!val[key]){
                            throw `[GeneralItem]: attribute ${key} requires  parameter key ${k}`
                        }
                    })
                }
            }
        }else{
            throw `[GeneralItem]: attribute ${key} is not allowed`
        }
    }

    getStringFromAttribute(attribute, value){
        let output = ""
        //when one paramter needed
        if(typeof value != "object" && value != null){
            if(!this.specialRequireRenderer[attribute]){
                
                if(typeof value == "number"){
                    output = `[${attribute}(${value})]`
                }else{
                    output = `[${attribute}("${value}")]`
                }
            }else{
                output = this.specialRequireRenderer[attribute](attribute, value)
            }
            return output
        }
        //when null / no paramter needed
        else if(typeof value == "object" && value == null){ //null is tyeof object
            return `[${attribute}]`
        }
        else{

            return output
        }
    }


    getCodeFromTemplate(){
        return this.template.mergeData({
            classname: this.itemData.classname,
            description: this.itemData.description
        })
    }
    
}

