
const dep = [
    require('state/cut/param/toSchedule'),
    require('state/timeline/toSchedule'),
]

module.exports = ( ...args ) =>
    [].concat( ...args.slice(0,dep.length) )

module.exports.dependencies = dep