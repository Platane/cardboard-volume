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
            ...slices.v.map( (x,i) => ({ ...x, axe: 'v', origin: -origin.u, stepWidth: stepWidth.u, i }) )
        ]
            .map( ({ axe, origin, stepWidth, i, shapes, P, _P }) =>

                shapes.map( (s,k) => {

                    const shape = new THREE.Shape( toTHREE( s.hull ) )
                    shape.holes = s.holes.map( arr => new THREE.Shape( toTHREE( arr ) ) )

                    const UVGenerator = createUVGenerator( origin, stepWidth, axe == 'u' ? -100 : 100 )
                    const geometry = new THREE.ExtrudeGeometry( shape, { amount: h, bevelEnabled: false, UVGenerator })

                    // aomap
                    geometry.faceVertexUvs[1] = geometry.faceVertexUvs[0].slice()

                    // texture map
                    {
                        if( !geometry.boundingBox )
                            geometry.computeBoundingBox()

                        const bb = geometry.boundingBox


                        // project the point on a random square in [0,1]x[0,1]
                        const proj = (() => {
                            const w = 0.5 + Math.random()*0.2
                            const h = w * ( bb.max.y - bb.min.y ) / ( bb.max.x - bb.min.x )

                            const ox = ( 1 - w )* Math.random()
                            const oy = ( 1 - h )* Math.random()

                            return p =>
                                new THREE.Vector2(
                                    ox + ( p.x - bb.min.x ) / ( bb.max.x - bb.min.x ) * w,
                                    oy + ( p.y - bb.min.y ) / ( bb.max.y - bb.min.y ) * h
                                )
                        })()


                        // apply a random determined rotation
                        const rot = (() => {
                            const rot_y = Math.random() > 0.5
                            const rot_x = Math.random() > 0.5
                            return p =>
                                new THREE.Vector2( rot_x ? p.x : 1-p.x , rot_y ? p.y : 1-p.y )
                        })()

                        // apply a random determined rotation
                        const rot2 = (() => {
                            const inv   = Math.random() > 0.5
                            return p =>
                                new THREE.Vector2( inv ? p.x : p.y, inv ? p.y : p.x )
                        })()

                        // project the 3d point as if it was a band wrapped around a circle centered with the bounding box
                        const projCyl = p => {

                            const angle = Math.atan2( p.y - ( bb.max.y + bb.min.y )/2, p.x - ( bb.max.x + bb.min.x )/2 )

                            return new THREE.Vector2(
                                angle * 2.4,
                                p.z > ( bb.max.z + bb.min.z )/2 ? 1 : 0
                            )
                        }


                        geometry.faceVertexUvs[0] = geometry.faces.map( face =>
                            [ face.a, face.b, face.c ].map( vertex_id =>

                                Math.abs( face.normal.z ) > 0.9
                                    ? rot2( rot( proj( geometry.vertices[vertex_id] ) ) )
                                    : projCyl( geometry.vertices[vertex_id] )
                            )
                        )

                        // set material
                        geometry.faces.forEach( face =>
                            face.materialIndex = Math.abs( face.normal.z ) < 0.9
                                // side material
                                ? 0
                                // one of the card board variation material
                                : (i%4)+1
                        )
                    }


                    geometry.applyMatrix( ( new THREE.Matrix4() ).makeTranslation( 0, 0, -h/2 ) )




                    // bake the transformation directly to vertices
                    geometry.applyMatrix( P )

                    const mesh      = new THREE.Mesh( geometry, mat )
                    mesh.castShadow = true
                    mesh.name       = `slice-${ axe }${ i }-${ (k+10).toString(34)}`




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