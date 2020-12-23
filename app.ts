import { APIGatewayEvent, Context } from 'aws-lambda'
import { createCanvas, registerFont } from 'canvas'
import { SIZE, drawToCanvas } from './src/drawToCanvas'
import path from 'path'

exports.handler = async (event: APIGatewayEvent, _context: Context) => {
  const text = event.queryStringParameters?.text ?? ''

  if (text.length === 0 || text.length > 6) {
    return { statusCode: 400 }
  }

  registerFont(path.resolve(__dirname, './fonts/g_comickoin_freeR.ttf').toString(), { family: 'g_comickoin_freeR' })

  const canvas = createCanvas(SIZE, SIZE)
  drawToCanvas((canvas as any) as HTMLCanvasElement, text)

  return {
    statusCode: 200,
    headers: { 'Content-Type': "'image/png'" },
    body: canvas.toBuffer('image/png').toString('base64'),
    isBase64Encoded: true,
  }
}
