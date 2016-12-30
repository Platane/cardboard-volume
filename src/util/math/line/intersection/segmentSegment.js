const epsylon = 0.00001

import intersectionLineLine from './lineLine'

module.exports = ( A1, B1,  A2, B2 ) => {

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



    const P = intersectionLineLine( A1, AB1, A2, AB2 )

    if (
        !P
        ||
        !( - epsylon < P.k1 && P.k1 < l1 + epsylon )
        ||
        !( - epsylon < P.k2 && P.k2 < l2 + epsylon )
    )
        return null

    P.k1 /= l1
    P.k2 /= l2

    return P
}