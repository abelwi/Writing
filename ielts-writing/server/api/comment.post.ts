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
    You are an expert evaluator for IELTS Writing Task 2. The prompt provided is "${question}" and you are assessing the response "${answer}".
    Based on the essay and the given scores, provide detailed comments in Vietnamese for each criterion:
     - Evaluate the strengths and weaknesses corresponding to the given band score
     - Give advice for improving each skill (you may include a short example if helpful)
     - Do not include the band scores in the feedback

    Scores:
     - Task Achievement (TA): ${scores.TA}
     - Coherence and Cohesion (CC): ${scores.CC}
     - Lexical Resource (LR): ${scores.LR}
     - Grammatical Range and Accuracy (GRA): ${scores.GRA}

    Please respond using the following format: 
    Task Achievement (TA):
    Coherence and Cohesion (CC):
    Lexical Resource (LR):
    Grammatical Range and Accuracy (GRA):
    Nhận xét tổng thể:

    Focus particularly on the 4 criteria in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,…) and don't call words in ().
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