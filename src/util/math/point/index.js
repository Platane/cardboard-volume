const epsylon = 0.00001

const intersection = ( A ,vA, B, vB ) => {

    // compute k, such as
    // A + vA * k = B + vB * k

    // determinant = 0   =>   the two line are colinears
    // if they are confused, return the point A ( which is indeed on both lines )
    // if not, return false
    if ( Math.abs( vA.x * vB.y - vA.y * vB.x ) < epsylon )
        return Math.abs( vA.x * (A.y-B.y) - vA.y * (A.y-B.y) ) < epsylon && { x:A.x, y:A.y }

    let k
    if ( Math.abs(vB.x) < epsylon )
        k = ( B.x - A.x ) / vA.x

    else if ( Math.abs(vB.y) < epsylon )
        k = ( B.y - A.y ) / vA.y

    else
        k = ( ( A.x - B.x ) / vB.x  - ( A.y - B.y ) / vB.y  ) / ( vA.y / vB.y - vA.x / vB.x )

    return {
        x: A.x + vA.x * k,
        y: A.y + vA.y * k,
        k,
    }
}


const intersectionSegmentLine = ( A, B, O, v ) => {

    const AB = {
        x   : B.x - A.x,
        y   : B.y - A.y,
    }
    const l = Math.sqrt( AB.x*AB.x + AB.y*AB.y )

    if ( l < epsylon )
        return null

    AB.x /= l
    AB.y /= l

    const P = intersection( A, AB, O, v )

    if ( !P || !( 'k' in P ) || P.k < -epsylon || P.k > l + epsylon )
        return null

    const k = Math.abs( v.x ) < epsylon
        ? ( P.y - O.y ) / v.y
        : ( P.x - O.x ) / v.x

    P.k_ = k

    return P
}


const intersectionSegmentSegment = ( A1, B1,  A2, B2 ) => {

    const AB1 = {
        x   : B1.x - A1.x,
        y   : B1.y - A1.y,
    }
    const l1 = Math.sqrt( AB1.x*AB1.x + AB1.y*AB1.y )

    if ( l1 < epsylon )
        return null

    AB1.x /= l1
    AB1.y /= l1


    const AB2 = {
        x   : B2.x - A2.x,
        y   : B2.y - A2.y,
    }
    const l2 = Math.sqrt( AB2.x*AB2.x + AB2.y*AB2.y )

    if ( l2 < epsylon )
        return null

    AB2.x /= l2
    AB2.y /= l2



    const P = intersection( A1, AB1, A2, AB2 )

    if ( !P || !( 'k' in P ) || P.k < -epsylon || P.k > l1 + epsylon )
        return null

    const k2 = Math.abs( AB2.x ) < epsylon
        ? ( P.y - A2.y ) / AB2.y
        : ( P.x - A2.x ) / AB2.x

    if ( k2 < -epsylon || k2 > l2 + epsylon )
        return null

    P.k1 = P.k
    P.k2 = k2

    return P
}



module.exports = { intersection, intersectionSegmentLine, intersectionSegmentSegment }