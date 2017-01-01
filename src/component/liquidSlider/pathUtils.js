export const slice = ( arr, e ) => {
    if ( e <= arr[0].x )
        return [ [], arr ]

    if ( arr[ arr.length-1 ].x <= e )
        return [ arr, [] ]

    let b = 0
    while ( arr[ b ].x <= e )
        b = b+1

    const a = b-1

    const k = ( e - arr[a].x )/( arr[b].x - arr[a].x )

    const u = {
        x : e,
        y : arr[a].y + k * ( arr[b].y - arr[a].y ),
    }

    return [ [ ...arr.slice(0,b), u ], [ u, ...arr.slice( b ) ] ]
}

export const toSvgPath = ( arr, width ) =>
    'M'+arr.map( ({ x, y }) => Math.round( x * width )+' '+Math.round( y * 2 ) ).join('L')

export const interpolate = ( arr, e ) => {
    let b = 0
    while ( b+1 < arr.length && arr[ b ].x <= e )
        b = b+1

    const a = b-1

    const k = ( e - arr[a].x )/( arr[b].x - arr[a].x )

    return arr[a].y + k * ( arr[b].y - arr[a].y )
}