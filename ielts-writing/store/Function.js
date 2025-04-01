// ✅ Function.js
import { state } from "./DataStore";

export function useMyFunction() {
  const fetchResults = async (answer, question) => {
    state.apiResult = {
      scoringResult: {},
      commentResult: {},
      correctionResult: {},
    };

    try {
      // Step 1: Get scores
      const scoringText = await $fetch('/api/score', {
        method: 'post',
        body: { answer, question },
      });

      const scoringResult = parseScoreOnlyText(scoringText);
      state.apiResult.scoringResult = scoringResult;

      // Step 2: Get comment based on scores
      const commentText = await $fetch('/api/comment', {
        method: 'post',
        body: {
          answer,
          question,
          scores: {
            TA: scoringResult.taskAchievement.score,
            CC: scoringResult.coherenceCohesion.score,
            LR: scoringResult.lexicalResource.score,
            GRA: scoringResult.grammaticalRangeAccuracy.score,
          },
        },
      });

      state.apiResult.commentResult = parseCommentOnlyText(commentText);

      // Step 3: Get correction
      const correctionResponse = await $fetch('/api/correct', {
        method: 'post',
        body: { answer, question },
      });

      state.apiResult.correctionResult = parseCorrectionText(correctionResponse);
    } catch (error) {
      console.error("🚨 Lỗi khi gọi API:", error);
      alert('Lỗi kết nối đến máy chủ. Hãy thử lại sau vài phút nhé 🥲');
    }
  };

  const parseScoreOnlyText = (text) => {
    const result = {
      taskAchievement: { score: '' },
      coherenceCohesion: { score: '' },
      lexicalResource: { score: '' },
      grammaticalRangeAccuracy: { score: '' },
      overallBand: { score: '' },
    };

    const lines = text.split('\n').filter(line => line.trim() !== '');

    lines.forEach((line) => {
      if (line.includes('Task Achievement')) {
        result.taskAchievement.score = line.split(':')[1].trim();
      } else if (line.includes('Coherence and Cohesion')) {
        result.coherenceCohesion.score = line.split(':')[1].trim();
      } else if (line.includes('Lexical Resource')) {
        result.lexicalResource.score = line.split(':')[1].trim();
      } else if (line.includes('Grammatical Range and Accuracy')) {
        result.grammaticalRangeAccuracy.score = line.split(':')[1].trim();
      } else if (line.includes('Overall Band')) {
        result.overallBand.score = line.split(':')[1].trim();
      }
    });

    return result;
  };

  const parseCommentOnlyText = (text) => {
    const result = {
      taskAchievement: { comment: '' },
      coherenceCohesion: { comment: '' },
      lexicalResource: { comment: '' },
      grammaticalRangeAccuracy: { comment: '' },
      overallComment: '',
    };

    const lines = text.split('\n').filter(line => line.trim() !== '');
    let currentSection = null;

    lines.forEach((line) => {
      if (line.includes('Task Achievement')) {
        currentSection = 'taskAchievement';
      } else if (line.includes('Coherence and Cohesion')) {
        currentSection = 'coherenceCohesion';
      } else if (line.includes('Lexical Resource')) {
        currentSection = 'lexicalResource';
      } else if (line.includes('Grammatical Range and Accuracy')) {
        currentSection = 'grammaticalRangeAccuracy';
      } else if (line.includes('Nhận xét tổng thể')) {
        currentSection = 'overallComment';
      } else if (currentSection) {
        if (currentSection === 'overallComment') {
          result[currentSection] += line + '\n';
        } else {
          result[currentSection].comment += line + '\n';
        }
      }
    });

    // Trim all comments
    for (const key in result) {
      if (typeof result[key] === 'object') {
        result[key].comment = result[key].comment.trim();
      } else {
        result[key] = result[key].trim();
      }
    }

    return result;
  };

  const parseCorrectionText = (resultText) => {
    const resultObjects = { errors: [] };
    const lines = resultText.split('\n').filter((line) => line.trim() !== '');

    const errorStartIndex = lines.findIndex((line) => line.includes('(Error Start)'));
    const errorEndIndex = lines.findIndex((line) => line.includes('(Error End)'));

    if (errorStartIndex !== -1 && errorEndIndex !== -1) {
      const errorLines = lines.slice(errorStartIndex + 1, errorEndIndex);
      resultObjects.errors = errorLines
        .filter((entry) => entry.includes('->'))
        .map((entry) => {
          const parts = entry.split('->').map((part) => part.trim());
          if (parts.length === 2) {
            const errorPart = parts[0].replace(/^-/, '').replace(/"/g, '').trim();
            const correctionSplit = parts[1].split(':').map((part) => part.trim());
            const correctPart = correctionSplit[0].replace(/[()\"]+/g, '').trim();
            const explainPart = correctionSplit.length > 1
              ? correctionSplit[1].replace(/[()\"]+/g, '').trim()
              : '';

            return {
              error: errorPart,
              correct: correctPart,
              explain: explainPart,
            };
          }
          return null;
        })
        .filter(Boolean);
    }
    return resultObjects;
  };

  return {
    fetchResults,
    parseScoreOnlyText,
    parseCommentOnlyText,
    parseCorrectionText,
    state,
  };
}
