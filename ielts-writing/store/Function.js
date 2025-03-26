import { state } from "./DataStore";

export function useMyFunction() {
    const fetchResults = async (answer, question) => {
        try {
            const response = await $fetch('/api/chatgpt', {
                method: 'post',
                body: { answer, question },
            });

            state.apiResult.scoringResult = parseResultText(response.scoringResult);
            state.apiResult.correctionResult = parseCorrectionText(response.correctionResult);
        } catch (error) {
            console.error("Lỗi khi lấy dữ liệu:", error);
            alert('Đã xảy ra lỗi khi gọi API.');
        }
    };

    const parseResultText = (resultText) => {
        const resultObjects = {
            taskAchievement: {},
            coherenceCohesion: {},
            lexicalResource: {},
            grammaticalRangeAccuracy: {},
            overallBand: {},
            overallComment: '',
        };

        const lines = resultText.split('\n').filter((line) => line.trim() !== '');

        lines.forEach((line) => {
            if (line.includes('Task Achievement')) {
                const [score, comment] = line.split(':')[1].split(' - ');
                resultObjects.taskAchievement = { score: score.trim(), comment: comment.trim() };
            } else if (line.includes('Coherence and Cohesion')) {
                const [score, comment] = line.split(':')[1].split(' - ');
                resultObjects.coherenceCohesion = { score: score.trim(), comment: comment.trim() };
            } else if (line.includes('Lexical Resource')) {
                const [score, comment] = line.split(':')[1].split(' - ');
                resultObjects.lexicalResource = { score: score.trim(), comment: comment.trim() };
            } else if (line.includes('Grammatical Range and Accuracy')) {
                const [score, comment] = line.split(':')[1].split(' - ');
                resultObjects.grammaticalRangeAccuracy = { score: score.trim(), comment: comment.trim() };
            } else if (line.includes('Overall Band')) {
                resultObjects.overallBand = { score: line.split(':')[1].trim() };
            } else if (line.includes('Nhận xét tổng thể')) {
                resultObjects.overallComment = line.split(':')[1].trim();
            }
        });

        return resultObjects;
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
        parseResultText,
        parseCorrectionText,
        fetchResults,
        state,
    };
}
