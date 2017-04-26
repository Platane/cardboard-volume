
const drawGradient = ( ctx, k, color ) => {
    const grd = ctx.createLinearGradient(0, 0, 32, 1)
    grd.addColorStop(0  , color)
    grd.addColorStop(Math.min(1,k)  , 'rgba(0,0,0,0)')
    grd.addColorStop(1  , 'rgba(0,0,0,0)')

    ctx.fillStyle = grd
    ctx.beginPath()
    ctx.rect(0,0,32,16)
    ctx.fill()
}

export const generateLightMap = (  ) => {

    const canvas = document.createElement('canvas')
    canvas.width = 32
    canvas.height = 32


    // document.body.appendChild(canvas)
    // canvas.style.position = 'fixed'
    // canvas.style.zIndex   = 10
    // canvas.style.width    = '200px'
    // canvas.style.height   = '200px'
    // canvas.style.border   = 'solid red 1px'


    const ctx = canvas.getContext('2d')

    return {
        image : canvas,
        update : ( u = 0.2, v = 0.2 ) => {

            ctx.clearRect(0,0,999,999)

            ctx.fillStyle = 'rgb(128,128,128)'
            ctx.fillStyle = '#fff'
            ctx.beginPath()
            ctx.rect(0,0,999,999)
            ctx.fill()

            ctx.save()
            drawGradient(ctx, u, 'black')

            ctx.translate(0,16)

            drawGradient(ctx, v, 'black')
            ctx.restore()
        }
    }
}
