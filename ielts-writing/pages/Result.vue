<template>
    <div class="p-5">
        <h2 class="text-lg font-bold">Kết quả đánh giá</h2>

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

export default {
    setup() {
        return {
            state
        };
    }
};
</script>
