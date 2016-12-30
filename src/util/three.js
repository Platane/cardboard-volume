const THREE     = require('three')

// expose THREE as global ( needed to instanciate three plugins )
const g = ( 'undefined' != typeof window && window ) || ( 'undefined' != typeof GLOBAL && GLOBAL ) || ( 'undefined' != typeof global && global ) || {}
g.THREE = THREE

module.exports = THREE
