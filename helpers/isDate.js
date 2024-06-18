const { isValid, parseISO } = require('date-fns');

const isDate = ( value ) => {

    console.log(value)
    //console.log(rest)

    if (!value){
        return false
    }

    const getDate = parseISO(value);

    if (isValid(getDate)) {
        return true; // Es una fecha válida
    } else {
        return false; // No es una fecha válida
    }

}

module.exports = { isDate }