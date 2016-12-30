import getOrientation       from './get'

// /!\ side effect
const setOrientation = ( arr, clockWise = true ) =>
    getOrientation( arr ) != clockWise
        ? arr.reverse()
        : arr

module.exports = setOrientation