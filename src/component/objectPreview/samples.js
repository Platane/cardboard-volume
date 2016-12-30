const extractGeometry   = require('util/extractGeometry')

module.exports = [
    {
        name        : 'cube',
        geometry    : extractGeometry( require('raw-loader!../../asset/obj/cube.obj') ),
    },
    {
        name        : 'skull',
        geometry    : extractGeometry( require('raw-loader!../../asset/obj/skull.obj') ),
    },
    {
        name        : 'sphere',
        geometry    : extractGeometry( require('raw-loader!../../asset/obj/sphere.obj') ),
    },
]