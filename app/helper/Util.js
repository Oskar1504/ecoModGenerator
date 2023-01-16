module.exports = {
    charToUpperCase(str, index = 0){
        return str.split("").map((element, i) => {
            if(i == index){
                return element.toUpperCase()
            }else{
                return element
            }
        }).join("")
    },
    charToLowerCase(str, index = 0){
        return str.split("").map((element, i) => {
            if(i == index){
                return element.toLowerCase()
            }else{
                return element
            }
        }).join("")
    }
}