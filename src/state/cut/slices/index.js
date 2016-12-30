import computeFullSlice         from './computeFullSlice'
import computeIntersection      from './computeIntersection'
import computeSlidingCut        from './computeSlidingCut'

const slices = ( geometry, base, positions, positions_mature, previousValue ) => {

    if ( !geometry || !positions || !positions_mature )
        return previousValue

    const fullSlices    = computeFullSlice( geometry, base, positions )

    const intersection  = computeIntersection( fullSlices, base, positions )

    const slicesWithSlidingCut = computeSlidingCut( base, positions, fullSlices, intersection )

    return slicesWithSlidingCut
}

slices.dependencies = [ 'object.geometry', 'cut.param.base.complete', 'cut.param.positions', 'cut.param.positions_mature' ]

module.exports = slices