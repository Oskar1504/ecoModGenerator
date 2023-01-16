module.exports = class RequiredComponents{
    
    //TODO
    // some componenets require initializeation
    // this.GetComponent<FuelSupplyComponent>().Initialize(2, fuelTagList);
    // this.GetComponent<FuelConsumptionComponent>().Initialize(10);
    specialRenderer = {
        "RequireRoomContainment": function (){
            return `[RequireRoomContainment]`
        },
        "object": function(element){
            return `[${element.key}(${element.value})]`
        }
    }
    
    constructor(data){
        this.data = data
    }

    getCodeString(){
        return this.data.map(element => {
            if(typeof element != "object"){
                if(this.specialRenderer[element]){
                    return this.specialRenderer[element]()
                }else{
                    return `[RequireComponent(typeof(${element}))]`
                }
            }else{
                return this.specialRenderer["object"](element)
            }
        }).map(e => "\t" + e).join("\n");
    }
}
