import geometry      from '../geometry'

const triangleCount = geometry =>
    geometry && geometry.faces.length || 0

triangleCount.dependencies = [ geometry ]
triangleCount.stateless    = true

module.exports = triangleCount
