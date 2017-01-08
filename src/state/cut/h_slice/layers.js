import cut                  from 'util/math/cut'
import toShape              from 'util/math/toShape'
import computeProjection    from 'util/math/plan/base/fromNormal'
const THREE = require('util/three')


const project = ( m, p ) =>
    ( new THREE.Vector2() )
        .fromArray(
            m.applyToVector3Array( p.toArray() )
        )

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

const computeSlice = ( vertices, faces, plan ) => {


    // projection matrix
    // from plan to world
    let P     = computeProjection( plan )

    // from world to plan
    let _P = new THREE.Matrix4()
    _P.getInverse( P )


    // cut object in slice,
    // project the hulls in the plan
    const hulls = cut( vertices, faces, plan )
        .map( vertices => vertices.map( project.bind( null, _P ) ) )

    return {
        shapes: toShape( hulls ),
        P ,
        _P,
    }
}

const slices = ( geometry, boundingBox, base, previousValue ) => {

    if ( !geometry )
        return previousValue

    const plan      = { ...base.h, d: null }
    let top         = dot( boundingBox.min, base.h )
    let bottom      = dot( boundingBox.max, base.h )

    top += ( bottom - top )*0.05
    bottom -= ( bottom - top )*0.05

    return Array.from({ length:17 })
        .map( (_,i,arr) => computeSlice( geometry.vertices, geometry.faces, { ...plan, d: plan.d + (i/(arr.length-1))*( bottom - top ) + top } ) )
}

slices.dependencies = [ 'object.geometry', 'object.boundingBox', 'cut.param.base.complete' ]

module.exports = slices