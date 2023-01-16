const fs = require("fs")

module.exports = class Namespace{
    constructor(namespace){
        this.namespace = namespace
    }

    getCodeString(){
        return `namespace `+this.namespace
    }
}
