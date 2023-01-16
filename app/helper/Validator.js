module.exports = class Validator{
    constructor(initClassName, data, dataSchema){
        this.dataSchema = dataSchema
        this.initClassName = initClassName
        this.validateData(data, dataSchema)
    }

    validateData(data, dataSchema){
        let providedKeys = Object.keys(data)
        Object.keys(dataSchema).forEach(key => {
            if(!providedKeys.includes(key)){
                throw `[${this.initClassName}:Validator] data missing key "${key}"`
            }

        })
    }
}