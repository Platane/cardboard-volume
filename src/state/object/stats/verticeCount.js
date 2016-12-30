import geometry      from '../geometry'

const verticeCount = geometry =>
    geometry && geometry.vertices.length || 0

verticeCount.dependencies = [ geometry ]
verticeCount.stateless    = true

module.exports = verticeCount
