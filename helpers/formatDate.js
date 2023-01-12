function dateFormat(value){
    return value.toISOString().substr(0,10)
}

module.exports = dateFormat