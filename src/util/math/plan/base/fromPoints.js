const THREE = require('three')


// // build the transformation matrix P
// // P * A = a    with A in the world, and a in the plan ( a.z should be null is A in in the plan )

module.exports = ( A,B,C,  origin ) => {

    origin = origin || A

    const u = new THREE.Vector3()
    u.subVectors( B, A )
    u.normalize()

    const AC = new THREE.Vector3()
    AC.subVectors( C, A )

    const n = new THREE.Vector3()
    n.crossVectors( u, AC )
    n.normalize()

    const v = new THREE.Vector3()
    v.crossVectors( n, u )

    const P = new THREE.Matrix4()
    P.set(
        u.x, v.x, n.x,  origin.x,
        u.y, v.y, n.y,  origin.y,
        u.z, v.z, n.z,  origin.z,
        0  , 0  , 0  ,  1,
    )

    return P
}
