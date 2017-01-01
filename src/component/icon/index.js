import React        from 'react'

const path = {
    'play'      : 'M16 8 L16 58 L50 32 Z',
    'pause'     : 'M10 8 L10 58 L24 58 L24 8 Z M40 8 L54 8 L54 58 L40 58 Z',
}

const icon = props =>
    <svg width={ props.width || 'auto' } height={ props.height || 'auto' } viewBox="0 0 64 64">
        <path d={ path[ props.icon ] } { ...props } />
    </svg>

module.exports = icon