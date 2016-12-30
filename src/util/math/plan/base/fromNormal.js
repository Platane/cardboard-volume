const THREE = require('three')



const x = new THREE.Vector3(1,0,0)
const y = new THREE.Vector3(0,1,0)


const u = new THREE.Vector3()
const v = new THREE.Vector3()

const dot = ( a, b ) =>
    THREE.Vector3.prototype.dot.call( a, b )

// // build the transformation matrix P
// // P * a = A    with A in the world, and a in the plan ( a.z should be null if A in in the plan )
module.exports = ( n, M ) => {


    // find a vector u in the plan

    const hx = dot( n, x )
    const hy = dot( n, y )

    if ( Math.abs( hx ) < Math.abs( hy ) ){

        u.x = x.x - hx * n.x
        u.y = x.y - hx * n.y
        u.z = x.z - hx * n.z

    } else {

        u.x = y.x - hy * n.x
        u.y = y.y - hy * n.y
        u.z = y.z - hy * n.z

    }

    u.normalize()


    // find the vector v, which complete the base
    v.crossVectors( n, u )

    const P = M || new THREE.Matrix4()
    P.set(
        u.x, v.x, n.x,  - n.x * ( n.d || 0 ),
        u.y, v.y, n.y,  - n.y * ( n.d || 0 ),
        u.z, v.z, n.z,  - n.z * ( n.d || 0 ),
        0  , 0  , 0  ,  1,
    )

    return P
}
