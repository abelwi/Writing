<template>
    <div>
        <p v-if="source === 'writing'">
            <NuxtLink
            to="/writing"
            class="btn btn-outline ml-10 px-3 mt-10 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
            >
                Quay lại
            </NuxtLink>
        </p>

        <p v-if="source === 'demo'">
            <div class="mt-10 mr-10 flex justify-between">
                <NuxtLink
                to="/"
                class="btn btn-outline ml-5 px-3 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
                >
                Quay lại
                </NuxtLink>
                <button class="btn btn-base-200 px-3 py-1 sm:px-5 sm:py-2 rounded-lg drop-shadow-lg shadow hover:shadow-xl hover:bg-base-300 hover:border-base-200">
                    <NuxtLink to="/question" class="font-semibold text-md sm:text-lg">Nhập câu hỏi mới >></NuxtLink>
                </button>
            </div>
        </p>
    </div>
    <div class="p-5">    
        <h2 class="text-lg font-bold">Kết quả đánh giá</h2>

        <!-- Display question -->
        <p class="mt-4">
            <strong>Câu hỏi:</strong>
            {{ currentQuestion }}
        </p>

        <!-- Display answer -->
        <p class="mt-4">
            <strong>Câu trả lời:</strong>
            {{ currentAnswer }}
        </p>
        <div v-if="state.apiResult" class="mt-4">
            <p><strong>Task Achievement (TA):</strong> {{ state.apiResult.taskAchievement.score }}</p>
            <p class="text-sm">{{ state.apiResult.taskAchievement.comment }}</p>

            <p class="mt-4"><strong>Coherence and Cohesion (CC):</strong> {{ state.apiResult.coherenceCohesion.score }}</p>
            <p class="text-sm">{{ state.apiResult.coherenceCohesion.comment }}</p>

            <p class="mt-4"><strong>Lexical Resource (LR):</strong> {{ state.apiResult.lexicalResource.score }}</p>
            <p class="text-sm">{{ state.apiResult.lexicalResource.comment }}</p>

            <p class="mt-4"><strong>Grammatical Range and Accuracy (GRA):</strong> {{ state.apiResult.grammaticalRangeAccuracy.score }}</p>
            <p class="text-sm">{{ state.apiResult.grammaticalRangeAccuracy.comment }}</p>

            <p class="mt-4"><strong>Overall Band:</strong> {{ state.apiResult.overallBand.score }}</p>
            <p class="mt-4"><strong>Nhận xét tổng thể:</strong> {{ state.apiResult.overallComment }}</p>

            <div class="mt-4">
                <h3 class="font-semibold">Các lỗi cụ thể:</h3>
                <ul>
                    <li v-for="(error, index) in state.apiResult.errors" :key="index">{{ error }}</li>
                </ul>
            </div>
        </div>

        <p v-else class="text-gray-500">Chưa có dữ liệu đánh giá.</p>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { useRoute } from 'vue-router';

export default {
    setup() {
        const route = useRoute();
        const source = route.query.source || 'unknown';

        // Use centralized state for question and answer
        const currentQuestion = source === 'demo' 
            ? state.question 
            : state.question;
        const currentAnswer = source === 'demo' 
            ? state.answer 
            : state.answer;

        return {
            state,
            source,
            currentQuestion,
            currentAnswer
        };
    },
    mounted() {
        console.log(state.answer)
    }
};
</script>
