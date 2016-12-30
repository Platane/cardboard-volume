import u    from './u'
import v    from './v'
import h    from './h'

const base = ( u, v, h ) =>
    ({
        u, v, h
    })

base.dependencies = [ u, v, h ]

module.exports  = base
