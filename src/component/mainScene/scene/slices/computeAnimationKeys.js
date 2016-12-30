const THREE = require('util/three')

const order = ( count, axe, i ) => {

    let j

    if ( count[ axe ] % 2 == 0 ){
        const k = i - count[ axe ]/2
        j = Math.abs( k ) * 2 + ( k<0 ? 0 : 1 )
    } else {
        const k = i - ( count[ axe ] -1 )/2
        j = Math.abs( k ) * 2 + ( k<0 ? 0 : 1 ) -1
    }

    return j + ( axe == 'u' ? 0 : count.u )
}

const computeAnimationKeys = ( count, axe, i, _P, P ) => {

    const duration_phase_one    = 0.33
    const duration_phase_two    = 0.33
    const duration_phase_three  = 1 - duration_phase_two - duration_phase_one

    const duration_move_one     = 0.1
    const duration_move_two     = 0.08
    const duration_move_three   = 0.08

    const l = 45

    const n_max = count.u + count.v
    const n     = n_max - order( count, axe, i )

    const keys = []

    // key 1
    // flat stack
    {
        const rotation    = new THREE.Quaternion()
        const translation = new THREE.Vector3()

        const M = new THREE.Matrix4()
        M.makeRotationAxis ( new THREE.Vector3(1,0,0), Math.PI/2 )

        M.multiply( _P )

        M.decompose ( translation, rotation, new THREE.Vector3() )


        const h = 0.6
        const y = ( n_max - n ) * h

        translation.y += y - l
        translation.x += l

        keys.push({
            rotation,
            translation,
            k           : 0,
        })
    }

    // key 2
    // flat stack end
    {
        keys.push({
            ...keys[ keys.length-1 ],
            k           : ( duration_phase_one - duration_move_one ) * n / n_max ,
        })

        // lock the rotation only
        keys.push({
            rotation    : keys[ keys.length-1 ].rotation,
            k           : keys[ keys.length-1 ].k + duration_move_one*0.2,
        })
    }

    // key 2
    // below position
    {

        const rotation    = new THREE.Quaternion()
        const translation = new THREE.Vector3()

        if ( axe == 'v' )
            translation.y = ( i%2 ? -1 : 1 ) * l

        else
            translation.x = l

        keys.push({
            rotation,
            translation,
            k           : keys[ keys.length-1 ].k + duration_move_one,
        })
    }

    {
        keys.push({

            ...keys[ keys.length-1 ],

            k           : axe == 'u'
                ? duration_phase_one + ( duration_phase_two - duration_move_two ) * ( i/count.u )
                : duration_phase_one + duration_phase_two*0.75 + ( duration_phase_two*0.25 + duration_phase_three - duration_move_three ) * ( 1-i/count.v )
        })
    }

    {
        keys.push({

            rotation    : new THREE.Quaternion(),
            translation : new THREE.Vector3(),
            k           : keys[ keys.length-1 ].k + duration_move_two,
        })
    }

    keys.push({
        ...keys[ keys.length-1 ],
        k           : 1,
    })

    return keys
}

module.exports = computeAnimationKeys