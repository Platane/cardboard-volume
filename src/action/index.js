export const setObject = ( geometry, name ) =>
    ({
        type    : 'object:set',
        payload : { geometry, name },
    })

export const setOrigin = ({ u, v }) =>
    ({
        type    : 'cut:origin:set',
        payload : { u, v },
    })

export const setStepWidth = ({ u, v }) =>
    ({
        type    : 'cut:stepWidth:set',
        payload : { u, v },
    })

export const setTimeline = k =>
    ({
        type    : 'timeline:set',
        payload : { k },
    })

export const setTimelineAuto = auto =>
    ({
        type    : 'timeline:auto:set',
        payload : { auto },
    })
