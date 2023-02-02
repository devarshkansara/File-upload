import Fastify from 'fastify';
import multipart from '@fastify/multipart'; 
import fs from 'fs';
import util from 'util';
import { pipeline } from 'stream';

const pump = util.promisify(pipeline)


export const app = Fastify({
    logger: true
})

app.register(multipart)


app.post('/upload', async function (req, reply) {
    const parts = req.parts({ limits: { fileSize: 5 * 1000 * 1000 } })
    //const parts = req.parts({ limits: { fileSize: 100 * 1000 * 1000 } })
    for await (const part of parts) {

 // upload and save the file
await pump(part.file, fs.createWriteStream(`./upload/${part.filename}`))
}
return {message : 'files uploaded' }
})