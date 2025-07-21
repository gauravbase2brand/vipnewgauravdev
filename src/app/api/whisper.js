import { createReadStream } from 'fs';
import formidable from 'formidable';
import OpenAI from 'openai';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err) return res.status(500).json({ error: err.message });

    const stream = createReadStream(files.audio.filepath);
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

    const transcription = await openai.audio.transcriptions.create({
      file: stream,
      model: 'whisper-1',
      response_format: 'json'
    });

    res.status(200).json({ text: transcription.text });
  });
}
