import axios from 'axios';

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { answer, question } = body as { answer: string; question: string };

  if (!answer || !question) {
    return { error: 'Missing required fields: answer or question' };
  }

  const getScoringPrompt = (answer: string, question: string) => {
    return `
      You are an expert evaluator for IELTS Writing Task 2. The prompt provided is "${question}" and you are assessing the response "${answer}". 

        Below are the criteria for the scope and accuracy of the 4 criteria in the IELTS Writing section:
        1.Task Achievement (TA) - Answering the Prompt:
        -Band 9.0: Fully addresses all parts with insightful ideas and highly relevant examples.
        -Band 8.5: Effectively addresses all parts; ideas are clear and well-supported with minor gaps.
        -Band 8.0: Addresses all parts with clear ideas and good support; minor details may be missing.
        -Band 7.5: Mostly addresses the task well with logical ideas, but some may lack detail or clarity.
        -Band 7.0: Covers the task with relevant ideas, but lacks clarity or completeness in parts.
        -Band 6.5: Addresses the task, but ideas are underdeveloped or partially relevant.
        -Band 6.0: Answers the task but with limited development or clarity; some irrelevant points.
        -Band 5.5: Attempts the task but has many unclear or incomplete ideas; some may be off-topic.
        -Band 5.0: Limited response to the task with significant irrelevant or undeveloped ideas.
        2.Coherence and Cohesion (CC) - Logical Flow and Connections:
        -Band 9.0: Skillful use of cohesive devices with logical flow; easy to follow.
        -Band 8.5: Mostly skillful with linking; minor lapses in flow or clarity.
        -Band 8.0: Generally well-organized; cohesive devices used effectively with minor issues.
        -Band 7.5: Good use of linking words; minor problems with organization or clarity.
        -Band 7.0: Satisfactory cohesion but occasional lapses in structure or linking.
        -Band 6.5: Some cohesion; lacks smooth flow or consistent structure.
        -Band 6.0: Uses linking words but not always effectively; can be hard to follow at times.
        -Band 5.5: Limited cohesion; frequent lapses in organization make it difficult to follow.
        -Band 5.0: Poor cohesion; hard to follow due to weak organization or linking.
        3.Lexical Resource (LR) - Vocabulary Range and Accuracy:
        -Band 9.0: Wide and precise vocabulary with no errors.
        -Band 8.5: Strong range, very few minor errors.
        -Band 8.0: Good range with few minor errors.
        -Band 7.5: Adequate range with occasional inaccuracies.
        -Band 7.0: Sufficient range with some mistakes.
        -Band 6.5: Limited but adequate vocabulary; noticeable errors.
        -Band 6.0: Sufficient vocabulary but with frequent errors.
        -Band 5.5: Limited vocabulary with many errors.
        -Band 5.0: Very basic vocabulary with frequent mistakes affecting understanding.
        4.Grammatical Range and Accuracy (GRA) - Grammar:
        -Band 9.0: Varied structures with full accuracy.
        -Band 8.5: Wide range, mostly accurate with minor errors.
        -Band 8.0: Good range with some minor errors.
        -Band 7.5: Reasonable range with occasional mistakes.
        -Band 7.0: Some variety; noticeable errors.
        -Band 6.5: Limited range; frequent but generally understandable errors.
        -Band 6.0: Limited structures with noticeable errors affecting understanding.
        -Band 5.5: Basic structures with frequent errors that affect understanding.
        -Band 5.0: Very basic grammar with many serious errors making text hard to understand.

        Provide scores and comments for the range and accuracy of the 4 criteria in the following format:

        Task Achievement (TA): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nhận xét chi tiết cụ thể bằng Tiếng Việt, giải thích tại sao bài làm lại được band điểm như vậy, đưa ra giải pháp để nâng band điểm, cho thêm ví dụ cải thiện bằng Tiếng Việt)
        Coherence and Cohesion (CC): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nhận xét chi tiết cụ thể bằng Tiếng Việt, giải thích tại sao bài làm lại được band điểm như vậy, đưa ra giải pháp để nâng band, cho thêm ví dụ cải thiện bằng Tiếng Việt)
        Lexical Resource (LR): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nhận xét chi tiết cụ thể bằng Tiếng Việt, giải thích tại sao bài làm lại được band điểm như vậy, đưa ra giải pháp để nâng band điểm, cho thêm ví dụ cải thiện bằng Tiếng Việt)
        Grammatical Range and Accuracy (GRA): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nhận xét chi tiết cụ thể bằng Tiếng Việt, giải thích tại sao bài làm lại được band điểm như vậy, đưa ra giải pháp để nâng band điểm, cho thêm ví dụ cải thiện bằng Tiếng Việt)
        Overall Band: (score average of all 4 criteria, rounded to the nearest 0.5) 
        Nhận xét tổng thể: (đưa lời khuyên chính xác tổng quát cho bài làm, nêu ra những hạn chế và ưu điểm của bài làm,... bằng Tiếng Việt)

        Focus particularly on the 4 criteria in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,…) and don't call words in ().
    `
  };

  const getCorrectionPrompt = (answer: string, question: string) => {
    return `
      You are an expert IELTS Writing evaluator. The prompt provided is "${question}" identify mistakes in the response "${answer}" and provide corrections.

        For each mistake, provide:  
        - The original incorrect sentence  
        - The corrected version  
        - A clear explanation of why it is incorrect and how to fix it.

        Example of Errors: 
        Error Start
        "He has a high knowledge of history" -> "He has a deep knowledge of history": Cụm từ "Deep knowledge" chính xác hơn, thể hiện sự hiểu biết sâu sắc hơn.
        "She don’t like coffee" -> "She doesn’t like coffee": Câu chủ ngữ "she" yêu cầu động từ "doesn't," chứ không phải "don't".
        "We should do an effort to help" -> "We should make an effort to help": Câu đúng là "Make an effort," không phải "do an effort".
        Error End

        **Format the output as follows:**
        (Error Start)
        (Original error sentence - 1st sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n
        (Original error sentence - 2nd sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n
        (Original error sentence - 3rd sentence) -> (Correct sentence): (Giải thích lỗi cụ thể, tại sao lại có lỗi sai này, đưa ra dẫn chứng và chữa lại cho chính xác bằng Tiếng Việt).\n 
        (Error End)

        Focus particularly on provide corrections in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,…) and don't call words in ().
    `
  };

  const callOpenAI = async (prompt: string): Promise<string> => {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'user', content: prompt }
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data.choices[0].message.content;
  };

  try {
    const [scoringResult, correctionResult] = await Promise.all([
      callOpenAI(getScoringPrompt(answer, question)),
      callOpenAI(getCorrectionPrompt(answer, question))
    ]);

    return {
      scoringResult,
      correctionResult
    };
  } catch (error) {
    console.error('Error calling OpenAI:', error);
    return { error: 'API call failed.' };
  }
});