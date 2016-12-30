// bind : {
//    list      : 'a.b.list',
export const createSelector    = bind => {

    const keys      = Object.keys( bind )

    return state => {

        const o = {}

        keys.forEach( key =>
            o[ key ] = state[ bind[ key ] ]
        )

        return o
    }
}