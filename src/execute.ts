import { createCanvas, registerFont } from 'canvas'
import { SIZE, drawToCanvas } from './drawToCanvas'
import fs from 'fs'
import path from 'path'

registerFont(path.resolve(__dirname, '../fonts/g_comickoin_freeR.ttf').toString(), { family: 'g_comickoin_freeR' })

const canvas = createCanvas(SIZE, SIZE)

drawToCanvas(canvas as any, '山田')

console.log('============')
console.log(canvas.toDataURL().replace('data:image/png;base64,', ''))
console.log('============')
console.log(canvas.toBuffer('image/png').toString('base64'))

const out = fs.createWriteStream(__dirname + '/test.png')
const stream = canvas.createPNGStream()
stream.pipe(out)
out.on('finish', () => console.log('The PNG file was created.'))
