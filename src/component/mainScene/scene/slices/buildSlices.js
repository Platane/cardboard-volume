const THREE = require('util/three')

const toTHREE = vector2Array =>
    vector2Array.map( p => new THREE.Vector2( p.x, p.y ) )


const createUVGenerator = ( origin, step, y ) => {

    return {

    	generateTopUV: ( geometry, vertices, indexA, indexB, indexC ) =>
            [ indexA, indexB, indexC ]
                .map( i => {

                    const x = vertices[ i * 3 + 1 ]

                    const k = (x - origin)/step*2

                    return new THREE.Vector2( k, y )
                })
        ,

    	generateSideWallUV: ( geometry, vertices, indexA, indexB, indexC, indexD ) =>
            [ indexA, indexB, indexC, indexD ]
                .map( i => {

                    const x = vertices[ i * 3 + 1 ]

                    const k = (x - origin)/step*2

                    return new THREE.Vector2( k, y )
                })
        ,
    }
}


const buildSlices = ( slices, origin, stepWidth, h=0.5, mat ) =>
    [].concat(
        ...[
            ...slices.u.map( (x,i) => ({ ...x, axe: 'u', origin: origin.v, stepWidth: stepWidth.v, i }) ),
            ...slices.v.map( (x,i) => ({ ...x, axe: 'v', origin: origin.u, stepWidth: stepWidth.u, i }) )
        ]
            .map( ({ axe, origin, stepWidth, i, shapes, P, _P }) =>

                shapes.map( (s,k) => {

                    const shape = new THREE.Shape( toTHREE( s.hull ) )
                    shape.holes = s.holes.map( arr => new THREE.Shape( toTHREE( arr ) ) )

                    const UVGenerator = createUVGenerator( origin, stepWidth, axe == 'u' ? -100 : 100 )
                    const geometry = new THREE.ExtrudeGeometry( shape, { amount: h, bevelEnabled: false, UVGenerator })

                    geometry.applyMatrix( ( new THREE.Matrix4() ).makeTranslation( 0, 0, -h/2 ) )




                    // bake the transformation directly to vertices
                    geometry.applyMatrix( P )

                    const mesh      = new THREE.Mesh( geometry, mat )
                    mesh.castShadow = true
                    mesh.name       = `slice-${ axe }${ i }-${ (k+10).toString(34)}`


                    mesh.geometry.faceVertexUvs[0]
                    mesh.geometry.faceVertexUvs[1] =
                    mesh.geometry.faceVertexUvs[2] =
                    mesh.geometry.faceVertexUvs[3] = mesh.geometry.faceVertexUvs[0]

                    mesh.geometry.uvsNeedUpdate = true

                    return {
                        P,
                        _P,
                        mesh,
                        axe,
                        i,
                    }
                })
            )
    )


module.exports = buildSlices