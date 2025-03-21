<template>
    <div class="bg-orange-100 h-screen">
        <NuxtLink
            to="/question"
            class="btn btn-outline btn-orange-400 text-orange-400 ml-10 px-5 mt-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
        >
            Quay lại
        </NuxtLink>

        <div class="flex flex-col items-center">
            <p 
                class="w-2/3 mt-0 px-5 py-3 mx-auto border border-gray-400 rounded-lg bg-white text-left italic font-semibold"
            >
                {{ question }}
            </p>

            <div v-if="state.mode === 'write'" class="w-5/6 text-center">
                <div class="flex justify-end items-end mx-32 mt-5 mb-1">
                    <p>{{ wordCount }}/300</p>
                </div>
                <textarea 
                    class="textarea w-4/5 text-base mt-2 px-3 pb-96 pt-4 rounded-xl drop-shadow-xl shadow-inner border-2 border-base-300 focus:outline-none"
                    required
                    placeholder="Nhập câu trả lời của bạn..."
                    v-model="state.answer"
                ></textarea>

                <button 
                    class="btn btn-wide btn-md btn-accent px-12 sm:w-2/5 sm:px-20 py-2 sm:py-3 mt-4 font-bold rounded-xl drop-shadow-xl shadow-xl"
                    @click="validateAndCheckAnswer"
                >
                    Chấm điểm
                </button>
            </div>

            <div v-if="state.mode === 'sample'" class="w-5/6 text-center mt-6">
                <div class="flex justify-end items-end mx-32 mb-1">
                    <p>{{ wordCount }}/300</p>
                </div>
                <div class="flex justify-center">
                    <textarea 
                        class="textarea text-base w-4/5 h-[480px] px-5 py-5 rounded-xl drop-shadow-xl shadow-inner border-2 border-base-300 focus:outline-none leading-relaxed"
                        v-model="state.answer"
                        style="display: flex; align-items: center; text-align: justify;"
                    ></textarea>
                </div>
                <button 
                    class="btn btn-accent w-2/5 px-20 py-3 mt-5 font-bold rounded-xl drop-shadow-xl shadow-xl"
                    @click="scoreSampleAnswer"
                >
                    Chấm điểm bài mẫu
                </button>
            </div>
        </div>
    
        <!-- Loading Overlay -->
        <div v-if="state.loading" class="fixed inset-0 bg-base-300 flex justify-center items-center">
            <div class="text-lg font-semibold">
                Đợi chút nha, đang chấm rùi nè<span class="loading loading-dots loading-md ml-3 align-bottom"></span>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { ref, onMounted, computed } from 'vue';
import { useMyFunction } from '~/store/Function';
import { useRouter, useRoute } from 'vue-router';

export default {
    setup() {
        const question = ref('');
        const router = useRouter();
        const route = useRoute();
        const { fetchResults } = useMyFunction();

        onMounted(() => {
            state.answer = '';
            state.mode = route.query.mode || 'write';

            if (route.query.question) {
                question.value = route.query.question;
                localStorage.setItem('question', route.query.question);
            } else {
                const storedQuestion = localStorage.getItem('question');
                question.value = storedQuestion || 'Không có câu hỏi nào được chọn.';
            }

            if (route.query.sampleAnswer) {
                state.answer = route.query.sampleAnswer;
            }
        });

        const wordCount = computed(() => {
            return (state.answer || '').trim().split(/\s+/).filter(word => word.length > 0).length;
        });

        const validateAndCheckAnswer = async () => {
            if (wordCount.value < 200) {
                alert('Bạn phải nhập ít nhất 200 từ!');
                return;
            }
            state.loading = true;
            try {
                state.question = question.value;
                await fetchResults(state.answer, state.question);
                router.push({ path: '/result', query: { source: 'writing' }  });
            } catch (error) {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi chấm điểm.');
            } finally {
                state.loading = false;
            }
        };

        const scoreSampleAnswer = async () => {
            state.loading = true;
            try {
                state.question = question.value;
                await fetchResults(state.answer, state.question);
                router.push({ path: '/result', query: { source: 'sample' } });
            } catch (error) {
                console.error('Error:', error);
                alert('Đã xảy ra lỗi khi chấm điểm.');
            } finally {
                state.loading = false;
            }
        };

        return {
            question,
            state,
            wordCount,
            validateAndCheckAnswer,
            scoreSampleAnswer,
            fetchResults,
        };
    },
};
</script>
