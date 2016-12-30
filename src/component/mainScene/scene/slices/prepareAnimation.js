const THREE = require('util/three')

import computeAnimationKeys from './computeAnimationKeys'


const findInterval = ( arr, x, a=0, b=arr.length-1 ) => {
    const e = Math.floor( ( b + a ) / 2 )
    if ( e == a )
        return [a,b]
    return arr[ e ].k <= x
        ? findInterval( arr, x, e, b )
        : findInterval( arr, x, a, e )
}


const prepareInterpolation = ( keys, k ) => {

    const [a,b] = findInterval( keys, k )

    const alpha = ( k - keys[a].k )/( keys[b].k - keys[a].k )

    return { alpha, A:keys[a], B:keys[b] }
}


const animateSlice = ( count, { mesh, axe, i, P, _P }) => {

    const _keys = computeAnimationKeys( count, axe, i, _P, P )

    const rotationKeys      = _keys.filter( x => x.rotation )
    const translationKeys   = _keys.filter( x => x.translation )

    return k => {
        {
            const { A, B, alpha } = prepareInterpolation( rotationKeys, k )
            THREE.Quaternion.slerp( A.rotation, B.rotation, mesh.quaternion, alpha )
        }
        {
            const { A, B, alpha } = prepareInterpolation( translationKeys, k )
            mesh.position.lerpVectors( A.translation, B.translation, alpha )
        }

        mesh.matrixWorldNeedsUpdate = false
    }

}



module.exports = animateSlice