const epsylon = 0.00001

module.exports = ( A ,vA, B, vB ) => {

    // compute k1, k2 such as
    // A + vA * k1 = B + vB * k2

    // determinant = 0   =>   the two line are colinears
    // if they are confused, return the point A ( which is indeed on both lines )
    // if not, return false
    if ( Math.abs( vA.x * vB.y - vA.y * vB.x ) < epsylon )
        return Math.abs( vA.x * (A.y-B.y) - vA.y * (A.y-B.y) ) < epsylon && { x:A.x, y:A.y, same: true }

    let k1
    if ( Math.abs(vB.x) < epsylon )
        k1 = ( B.x - A.x ) / vA.x

    else if ( Math.abs(vB.y) < epsylon )
        k1 = ( B.y - A.y ) / vA.y

    else
        k1 = ( ( A.x - B.x ) / vB.x  - ( A.y - B.y ) / vB.y  ) / ( vA.y / vB.y - vA.x / vB.x )

    const P = {
        x: A.x + vA.x * k1,
        y: A.y + vA.y * k1,
        k1,
        k2 : 0
    }

    P.k2 = Math.abs( vB.x ) > Math.abs( vB.y )
        ? ( P.x - B.x ) / vB.x
        : ( P.y - B.y ) / vB.y

    return P
}