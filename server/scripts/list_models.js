import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

async function listModels() {
  try {
    const url = `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`;
    const res = await fetch(url);
    const data = await res.json();
    if (data.models) {
      console.log('Available Models:', data.models.map(m => m.name));
    } else {
      console.error('Response data:', data);
    }
  } catch (err) {
    console.error('Error listing models:', err);
  }
}

listModels();
