import OpenAI from 'openai';

const openRouterApiKey = process.env.OPENROUTER_API_KEY || '';

if (!openRouterApiKey) {
    console.warn('OpenRouter API Key is missing. Check your .env.local file.');
}

export const openai = new OpenAI({
    baseURL: 'https://openrouter.ai/api/v1',
    apiKey: openRouterApiKey,
    defaultHeaders: {
        'HTTP-Referer': 'https://localhost:3000', // Optional, for OpenRouter rankings
        'X-Title': 'ProResume Builder', // Optional
    },
});
