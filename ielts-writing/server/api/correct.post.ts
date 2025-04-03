import axios from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { answer, question } = body as { answer: string; question: string };

    if ( !answer || !question ) {
       return { error: 'Missing required fields: answer or question' };
    }

    const correctionPrompt = `
        You are an expert IELTS Writing evaluator. The prompt is "${question}". Identify mistakes in the response "${answer}" and provide corrections.

        For each mistake, give:
        • The original incorrect sentence
        • The corrected sentence
        • A brief explanation in Vietnamese of why it was wrong and how to fix it

        Use this exact format (no extra symbols or numbering):
        (Error Start)
        (Original sentence) -> (Corrected sentence): (Giải thích lỗi, ngắn gọn và rõ ràng bằng Tiếng Việt).
        (Original sentence) -> (Corrected sentence): (Giải thích lỗi, ngắn gọn và rõ ràng bằng Tiếng Việt).
        (Error End)
    `

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);

    try {
        const response = await axios.post(
            'https://api.openai.com/v1/chat/completions',
            {
            model: 'gpt-4o-mini',
            messages: [{ role: 'user', content: correctionPrompt }],
            },
            {
            headers: {
                Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
            signal: controller.signal
        }
    );

    clearTimeout(timeout);
    return response.data.choices[0].message.content;
    } catch (error) {
        console.error('🔥 Correction API Error:', error);
        throw createError({ statusCode: 500, statusMessage: 'OpenAI timeout or failure' });
    }
})