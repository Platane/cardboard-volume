const epsylon = 0.00001

import intersectionLineLine from './lineLine'

module.exports = ( A1, B1,  o, v ) => {

    const AB1 = {
        x   : B1.x - A1.x,
        y   : B1.y - A1.y,
    }
    const l1 = Math.sqrt( AB1.x*AB1.x + AB1.y*AB1.y )

    if ( l1 < epsylon )
        return null

    AB1.x /= l1
    AB1.y /= l1


    const P = intersectionLineLine( A1, AB1, o, v )

    if (
        !P
        ||
        !( - epsylon < P.k1 && P.k1 < l1 + epsylon )
    )
        return null

    P.k1 /= l1

    return P
}