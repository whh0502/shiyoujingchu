import express from 'express';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config({ path: join(__dirname, '..', '.env') });

const app = express();
const PORT = process.env.PORT || 3001;

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://shiyoujingchu.vercel.app');
  res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.json());

function cleanAnswer(text) {
  if (!text) return text;
  return text.replace(/<think>[\s\S]*?<\/think>/g, '').trim();
}

app.post('/api/chat', async (req, res) => {
  try {
    const { query } = req.body;

    if (!query || !query.trim()) {
      return res.status(400).json({ error: 'query is required' });
    }

    if (!process.env.DIFY_API_KEY || !process.env.DIFY_API_URL) {
      return res.status(500).json({ error: 'Dify environment variables are missing' });
    }

    const response = await fetch(`${process.env.DIFY_API_URL.replace(/\/$/, '')}/chat-messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.DIFY_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: {},
        query: query.trim(),
        response_mode: 'blocking',
        user: 'shiyou-jingchu-web',
      }),
    });

    if (!response.ok) {
      throw new Error(`Dify API error: ${response.status}`);
    }

    const data = await response.json();
    res.json({ answer: cleanAnswer(data.answer) || '本诗仙暂时醉倒了，请稍后再问。' });
  } catch (err) {
    console.error('Chat proxy error:', err.message);
    res.status(500).json({ error: '本诗仙暂时醉倒了，请稍后再问。' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
