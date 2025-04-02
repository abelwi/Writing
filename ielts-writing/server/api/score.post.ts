import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { answer, question } = body as { answer: string; question: string };

  if (!answer || !question) {
    return { error: 'Missing required fields: answer or question' };
  }

  const scoringPrompt = `
    You are an expert examiner for IELTS Writing Task 2. The prompt is "${question}" and you are assessing the response "${answer}". 

    Below are the strict criteria for the 4 IELTS Writing bands. Be conservative: if there are any noticeable weaknesses or errors, do not award a high band. Only award bands 8.0 or 9.0 if the response is virtually error-free, extremely coherent, and thoroughly developed. If in doubt, assign a lower band.

    1) Task Achievement (TA) - How fully and effectively the prompt is addressed:
    - Band 9.0: Fully addresses all parts with insightful ideas and highly relevant examples; no irrelevant content.
    - Band 8.0: Addresses all parts thoroughly; minor details may be missing but overall development is strong.
    - Band 7.0: Covers the task well; some lapses in clarity or development, but main ideas are relevant.
    - Band 6.0: Addresses the task but with limited detail or clarity; some irrelevant or partially developed points.
    - Band 5.0: Limited response; large parts may be irrelevant or unsupported.

    2) Coherence and Cohesion (CC) - Organization and clarity of linking:
    - Band 9.0: Flawless organization; seamless transitions and logical flow.
    - Band 8.0: Well-organized, cohesive with only minor lapses.
    - Band 7.0: Generally coherent, but occasional issues in structure or linking.
    - Band 6.0: Some use of cohesive devices but not always effective; can be awkward or unclear at times.
    - Band 5.0: Disorganized or unclear flow; links are often missing or confusing.

    3) Lexical Resource (LR) - Range and accuracy of vocabulary:
    - Band 9.0: Very wide range of vocabulary used with precision; virtually no errors.
    - Band 8.0: Broad range, mostly accurate with only minor slips.
    - Band 7.0: Sufficient range for the task; some noticeable errors that do not impede understanding.
    - Band 6.0: Adequate but limited vocabulary; frequent errors or lack of precision.
    - Band 5.0: Very basic word choice; frequent errors may obscure meaning.

    4) Grammatical Range and Accuracy (GRA) - Variety and correctness of grammar:
    - Band 9.0: Wide range of structures with near-perfect accuracy.
    - Band 8.0: Good variety and mostly accurate; minor mistakes.
    - Band 7.0: Some variety but errors are visible; may still be intelligible.
    - Band 6.0: Limited range and noticeable errors; can cause confusion.
    - Band 5.0: Very basic grammar; many serious errors often affecting comprehension.

    Be strict. If the response shows multiple grammar or vocabulary errors, do not award more than Band 6 or 7. If ideas are underdeveloped or disorganized, mark lower TA and CC accordingly. Do not inflate scores.

    Now provide final scores. Use the following format (without extra symbols or numbering; do not restate anything in parentheses). For each criterion (TA, CC, LR, GRA), first determine its approximate band. Then:
    • Subtract 1 full band from that approximate rating
    • Round to the nearest 0.5 band
    • List them as: “Task Achievement (TA): …” and so on
    • For the Overall Band, take the average of all four adjusted scores and round to the nearest 0.5

    Output ONLY in this format:

    Task Achievement (TA): 
    Coherence and Cohesion (CC):
    Lexical Resource (LR):
    Grammatical Range and Accuracy (GRA):
    Overall Band:

  `

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [{ role: 'user', content: scoringPrompt }],
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
    console.error('🔥 Scoring API Error:', error);
    throw createError({ statusCode: 500, statusMessage: 'OpenAI timeout or failure' });
  }
});