import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { answer, question } = body as { answer: string; question: string };

  if (!answer || !question) {
    return { error: 'Missing required fields: answer or question' };
  }

  const scoringPrompt = `
    You are an expert evaluator for IELTS Writing Task 2. The prompt provided is "${question}" and you are assessing the response "${answer}". 

      Below are the criteria for the scope and accuracy of the 4 criteria in the IELTS Writing section:
      1.Task Achievement (TA) - Answering the Prompt:
      -Band 9.0: Fully addresses all parts with insightful ideas and highly relevant examples.
      -Band 8.0: Addresses all parts with clear ideas and good support; minor details may be missing.
      -Band 7.0: Covers the task with relevant ideas, but lacks clarity or completeness in parts.
      -Band 6.0: Answers the task but with limited development or clarity; some irrelevant points.
      -Band 5.0: Limited response to the task with significant irrelevant or undeveloped ideas.
      2.Coherence and Cohesion (CC) - Logical Flow and Connections:
      -Band 9.0: Skillful use of cohesive devices with logical flow; easy to follow.
      -Band 8.0: Generally well-organized; cohesive devices used effectively with minor issues.
      -Band 7.0: Satisfactory cohesion but occasional lapses in structure or linking.
      -Band 6.0: Uses linking words but not always effectively; can be hard to follow at times.
      -Band 5.0: Poor cohesion; hard to follow due to weak organization or linking.
      3.Lexical Resource (LR) - Vocabulary Range and Accuracy:
      -Band 9.0: Wide and precise vocabulary with no errors.
      -Band 8.0: Good range with few minor errors.
      -Band 7.0: Sufficient range with some mistakes.
      -Band 6.0: Sufficient vocabulary but with frequent errors.
      -Band 5.0: Very basic vocabulary with frequent mistakes affecting understanding.
      4.Grammatical Range and Accuracy (GRA) - Grammar:
      -Band 9.0: Varied structures with full accuracy.
      -Band 8.0: Good range with some minor errors.
      -Band 7.0: Some variety; noticeable errors.
      -Band 6.0: Limited structures with noticeable errors affecting understanding.
      -Band 5.0: Very basic grammar with many serious errors making text hard to understand.

      Provide scores for the range and accuracy of the 4 criteria in the following format:

      Task Achievement (TA): (score - rounded to the nearest 0.5 and scored 1 band lower)  
      Coherence and Cohesion (CC): (score - rounded to the nearest 0.5 and scored 1 band lower) 
      Lexical Resource (LR): (score - rounded to the nearest 0.5 and scored 1 band lower)  
      Grammatical Range and Accuracy (GRA): (score - rounded to the nearest 0.5 and scored 1 band lower)  
      Overall Band: (score average of all 4 criteria, rounded to the nearest 0.5) 

      Focus particularly on the 4 criteria in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,…) and don't call words in ().
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