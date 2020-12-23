export const SIZE = 500
const LINE_WIDTH = 10
const PADDING = 30
const MIN_CHAR_HEIGHT = 120
const TEXT_BOX = SIZE - PADDING * 2
const BASE_FONT_SIZE = 480

export const drawToCanvas = (canvas: HTMLCanvasElement, text: string) => {
  const ctx = canvas.getContext('2d')!

  ctx.fillStyle = '#FF5555'
  ctx.strokeStyle = '#FF5555'
  ctx.textBaseline = 'middle'

  // Draw outer circle
  ctx.lineWidth = LINE_WIDTH
  ctx.beginPath()
  ctx.arc(SIZE / 2, SIZE / 2, SIZE / 2 - LINE_WIDTH / 2, 0, 360 * Math.PI)
  ctx.closePath()
  ctx.stroke()

  const chars = text.length

  // Shrink when single character
  const fontSize = chars === 1 ? BASE_FONT_SIZE * 0.85 : Math.floor(BASE_FONT_SIZE / chars)

  ctx.font = `${fontSize}px g_comickoin_freeR`

  const analyzeResult = analyzeTest(ctx, text)

  let top = PADDING

  analyzeResult.forEach(({ c, width, heightRatio }) => {
    ctx.fillText(c, (SIZE - width) / 2, top + (TEXT_BOX * heightRatio) / 2)
    top += TEXT_BOX * heightRatio
  })
}

const getTextHeight = (ctx: CanvasRenderingContext2D, text: string) => {
  const metrics = ctx.measureText(text)
  return metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent
}

const getTextWidth = (ctx: CanvasRenderingContext2D, text: string) => {
  const metrics = ctx.measureText(text)
  return metrics.width
}

const analyzeTest = (ctx: CanvasRenderingContext2D, text: string) => {
  const tmp = text.split('').map((c) => {
    const width = getTextWidth(ctx, c)
    let height = getTextHeight(ctx, c)
    if (height < MIN_CHAR_HEIGHT) {
      height = MIN_CHAR_HEIGHT
    }
    return { c, width, height }
  })

  const totalHeight = tmp.reduce((prev, { height }) => prev + height, 0)

  return tmp.map((res) => ({
    ...res,
    heightRatio: res.height / totalHeight,
  }))
}
