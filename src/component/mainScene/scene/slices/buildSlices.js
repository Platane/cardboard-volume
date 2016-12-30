const THREE = require('util/three')

const toTHREE = vector2Array =>
    vector2Array.map( p => new THREE.Vector2( p.x, p.y ) )

const buildSlices = ( { u, v }, h=0.5, mat ) =>
    [].concat(
        ...[
            ...u.map( (x,i) => ({ ...x, axe: 'u', i }) ),
            ...v.map( (x,i) => ({ ...x, axe: 'v', i }) )
        ]
            .map( ({ axe, shapes, i, P, _P }) =>

                shapes.map( (s,k) => {

                    const shape = new THREE.Shape( toTHREE( s.hull ) )
                    shape.holes = s.holes.map( arr => new THREE.Shape( toTHREE( arr ) ) )

                    const geometry = new THREE.ExtrudeGeometry( shape, { amount: h, bevelEnabled: false })
                    geometry.applyMatrix( ( new THREE.Matrix4() ).makeTranslation( 0, 0, -h/2 ) )

                    // bake the transformation directly to vertices
                    geometry.applyMatrix( P )

                    const mesh      = new THREE.Mesh( geometry, mat )
                    mesh.castShadow = true
                    mesh.name       = `slice-${ axe }${ i }-${ (k+10).toString(34)}`
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