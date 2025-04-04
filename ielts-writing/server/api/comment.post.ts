import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { answer, question, scores } = body as {
    answer: string;
    question: string;
    scores: {
      TA: string;
      CC: string;
      LR: string;
      GRA: string;
    };
  };

  if (!answer || !question || !scores) {
    return { error: 'Missing required fields: answer, question, or scores' };
  }

  const commentPrompt = `
    Evaluate this Vietnamese IELTS response:
    Question: "${question}"
    Answer: "${answer}"
    Scores: TA=${scores.TA}, CC=${scores.CC}, LR=${scores.LR}, GRA=${scores.GRA}

    Feedback in Vietnamese, provide:
    • Strengths and weaknesses based on the given band (not too long, no need to separate strengths and weaknesses)
    • Advice for improvement
    • Do not mention the band scores in your feedback

    Use headings:
    Task Achievement (TA):
    Coherence and Cohesion (CC):
    Lexical Resource (LR):
    Grammatical Range and Accuracy (GRA):
    Nhận xét tổng thể:
  `;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: commentPrompt }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      }
    );

    clearTimeout(timeout);
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error('🔥 Comment API Error:', error);
    throw createError({ statusCode: 500, statusMessage: 'OpenAI timeout or failure' });
  }
})