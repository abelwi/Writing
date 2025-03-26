import { d as defineEventHandler, r as readBody } from '../../nitro/nitro.mjs';
import axios from 'axios';
import 'node:http';
import 'node:https';
import 'node:fs';
import 'node:path';

const chatgpt_post = defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { answer, question } = body;
  if (!answer || !question) {
    return { error: "Missing required fields: answer or question" };
  }
  const getScoringPrompt = (answer2, question2) => {
    return `
      You are an expert evaluator for IELTS Writing Task 2. The prompt provided is "${question2}" and you are assessing the response "${answer2}". 

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

        Task Achievement (TA): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nh\u1EADn x\xE9t chi ti\u1EBFt c\u1EE5 th\u1EC3 b\u1EB1ng Ti\u1EBFng Vi\u1EC7t, gi\u1EA3i th\xEDch t\u1EA1i sao b\xE0i l\xE0m l\u1EA1i \u0111\u01B0\u1EE3c band \u0111i\u1EC3m nh\u01B0 v\u1EADy, \u0111\u01B0a ra gi\u1EA3i ph\xE1p \u0111\u1EC3 n\xE2ng band \u0111i\u1EC3m, cho th\xEAm v\xED d\u1EE5 c\u1EA3i thi\u1EC7n b\u1EB1ng Ti\u1EBFng Vi\u1EC7t)
        Coherence and Cohesion (CC): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nh\u1EADn x\xE9t chi ti\u1EBFt c\u1EE5 th\u1EC3 b\u1EB1ng Ti\u1EBFng Vi\u1EC7t, gi\u1EA3i th\xEDch t\u1EA1i sao b\xE0i l\xE0m l\u1EA1i \u0111\u01B0\u1EE3c band \u0111i\u1EC3m nh\u01B0 v\u1EADy, \u0111\u01B0a ra gi\u1EA3i ph\xE1p \u0111\u1EC3 n\xE2ng band, cho th\xEAm v\xED d\u1EE5 c\u1EA3i thi\u1EC7n b\u1EB1ng Ti\u1EBFng Vi\u1EC7t)
        Lexical Resource (LR): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nh\u1EADn x\xE9t chi ti\u1EBFt c\u1EE5 th\u1EC3 b\u1EB1ng Ti\u1EBFng Vi\u1EC7t, gi\u1EA3i th\xEDch t\u1EA1i sao b\xE0i l\xE0m l\u1EA1i \u0111\u01B0\u1EE3c band \u0111i\u1EC3m nh\u01B0 v\u1EADy, \u0111\u01B0a ra gi\u1EA3i ph\xE1p \u0111\u1EC3 n\xE2ng band \u0111i\u1EC3m, cho th\xEAm v\xED d\u1EE5 c\u1EA3i thi\u1EC7n b\u1EB1ng Ti\u1EBFng Vi\u1EC7t)
        Grammatical Range and Accuracy (GRA): (score - rounded to the nearest 0.5 and scored 1 band lower) - (nh\u1EADn x\xE9t chi ti\u1EBFt c\u1EE5 th\u1EC3 b\u1EB1ng Ti\u1EBFng Vi\u1EC7t, gi\u1EA3i th\xEDch t\u1EA1i sao b\xE0i l\xE0m l\u1EA1i \u0111\u01B0\u1EE3c band \u0111i\u1EC3m nh\u01B0 v\u1EADy, \u0111\u01B0a ra gi\u1EA3i ph\xE1p \u0111\u1EC3 n\xE2ng band \u0111i\u1EC3m, cho th\xEAm v\xED d\u1EE5 c\u1EA3i thi\u1EC7n b\u1EB1ng Ti\u1EBFng Vi\u1EC7t)
        Overall Band: (score average of all 4 criteria, rounded to the nearest 0.5) 
        Nh\u1EADn x\xE9t t\u1ED5ng th\u1EC3: (\u0111\u01B0a l\u1EDDi khuy\xEAn ch\xEDnh x\xE1c t\u1ED5ng qu\xE1t cho b\xE0i l\xE0m, n\xEAu ra nh\u1EEFng h\u1EA1n ch\u1EBF v\xE0 \u01B0u \u0111i\u1EC3m c\u1EE7a b\xE0i l\xE0m,... b\u1EB1ng Ti\u1EBFng Vi\u1EC7t)

        Focus particularly on the 4 criteria in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,\u2026) and don't call words in ().
    `;
  };
  const getCorrectionPrompt = (answer2, question2) => {
    return `
      You are an expert IELTS Writing evaluator. The prompt provided is "${question2}" identify mistakes in the response "${answer2}" and provide corrections.

        For each mistake, provide:  
        - The original incorrect sentence  
        - The corrected version  
        - A clear explanation of why it is incorrect and how to fix it.

        Example of Errors: 
        Error Start
        "He has a high knowledge of history" -> "He has a deep knowledge of history": C\u1EE5m t\u1EEB "Deep knowledge" ch\xEDnh x\xE1c h\u01A1n, th\u1EC3 hi\u1EC7n s\u1EF1 hi\u1EC3u bi\u1EBFt s\xE2u s\u1EAFc h\u01A1n.
        "She don\u2019t like coffee" -> "She doesn\u2019t like coffee": C\xE2u ch\u1EE7 ng\u1EEF "she" y\xEAu c\u1EA7u \u0111\u1ED9ng t\u1EEB "doesn't," ch\u1EE9 kh\xF4ng ph\u1EA3i "don't".
        "We should do an effort to help" -> "We should make an effort to help": C\xE2u \u0111\xFAng l\xE0 "Make an effort," kh\xF4ng ph\u1EA3i "do an effort".
        Error End

        **Format the output as follows:**
        (Error Start)
        (Original error sentence - 1st sentence) -> (Correct sentence): (Gi\u1EA3i th\xEDch l\u1ED7i c\u1EE5 th\u1EC3, t\u1EA1i sao l\u1EA1i c\xF3 l\u1ED7i sai n\xE0y, \u0111\u01B0a ra d\u1EABn ch\u1EE9ng v\xE0 ch\u1EEFa l\u1EA1i cho ch\xEDnh x\xE1c b\u1EB1ng Ti\u1EBFng Vi\u1EC7t).

        (Original error sentence - 2nd sentence) -> (Correct sentence): (Gi\u1EA3i th\xEDch l\u1ED7i c\u1EE5 th\u1EC3, t\u1EA1i sao l\u1EA1i c\xF3 l\u1ED7i sai n\xE0y, \u0111\u01B0a ra d\u1EABn ch\u1EE9ng v\xE0 ch\u1EEFa l\u1EA1i cho ch\xEDnh x\xE1c b\u1EB1ng Ti\u1EBFng Vi\u1EC7t).

        (Original error sentence - 3rd sentence) -> (Correct sentence): (Gi\u1EA3i th\xEDch l\u1ED7i c\u1EE5 th\u1EC3, t\u1EA1i sao l\u1EA1i c\xF3 l\u1ED7i sai n\xE0y, \u0111\u01B0a ra d\u1EABn ch\u1EE9ng v\xE0 ch\u1EEFa l\u1EA1i cho ch\xEDnh x\xE1c b\u1EB1ng Ti\u1EBFng Vi\u1EC7t).
 
        (Error End)

        Focus particularly on provide corrections in Writing. Avoid using additional symbols or numbers (#, *, 1, 2, 3,\u2026) and don't call words in ().
    `;
  };
  const callOpenAI = async (prompt) => {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-4o-mini",
        messages: [
          { role: "user", content: prompt }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
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
    console.error("Error calling OpenAI:", error);
    return { error: "API call failed." };
  }
});

export { chatgpt_post as default };
//# sourceMappingURL=chatgpt.post.mjs.map
