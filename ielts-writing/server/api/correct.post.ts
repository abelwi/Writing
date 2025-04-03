import axios from "axios";

export default defineEventHandler(async (event) => {
    const body = await readBody(event);
    const { answer, question } = body as { answer: string; question: string };

    if ( !answer || !question ) {
       return { error: 'Missing required fields: answer or question' };
    }

    const correctionPrompt = `
        You are an expert IELTS Writing evaluator. The prompt provided is "${question}" identify mistakes in the response "${answer}" and provide corrections.

        For each mistake, provide:  
        - The original incorrect sentence  
        - The corrected version  
        - A clear explanation of why it is incorrect and how to fix it.

        **Format the output as follows:**
        (Error Start)
        (Original error sentence - 1st sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n
        (Original error sentence - 2nd sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n
        (Original error sentence - 3rd sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n 
        (Error End)

        Focus particularly on provide corrections in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,…) and don't call words in ().
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