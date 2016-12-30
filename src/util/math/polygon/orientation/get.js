const orientation = ([ a,b,c ]) =>
    ( a.x - b.x ) * ( c.y - b.y ) - ( a.y - b.y ) * ( c.x - b.x ) > 0

module.exports = orientation