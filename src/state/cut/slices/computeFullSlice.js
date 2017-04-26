import cut                  from 'util/math/cut'
import toShape              from 'util/math/toShape'
import computeProjection    from 'util/math/plan/base/fromNormal'
const THREE = require('util/three')


const project = ( m, p ) =>
    p
        .clone()
        .applyMatrix4( m )


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


module.exports = ( geometry, base, positions ) =>
    ({
        u : positions.u
            .map( k => computeSlice( geometry.vertices, geometry.faces, { ...base.u, d:-k } ) )
        ,
        v : positions.v
            .map( k => computeSlice( geometry.vertices, geometry.faces, { ...base.v, d:-k } ) )
    })
