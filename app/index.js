const fs = require("fs")

const Mod = require("./helper/mod")

let modName = "mod_gen_2"

let modDate = JSON.parse(fs.readFileSync("./data/"+modName+".json"))

try{
    let mod = new Mod(modDate)
    fs.writeFileSync(modName+"_out.cs", mod.getCodeString())
    fs.writeFileSync(modName+"_createdItems.json", JSON.stringify(mod.created, null, 2))
}catch(e){
    console.error(e.toString())
}
 
//TODO world object adden
//world object item creating when world object added

//bei world objects check if object work in game first
//found error with upgrade modules i guess that requires auth component