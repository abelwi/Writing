<template>
    <NuxtLink
        to="/question"
        class="btn btn-outline ml-10 px-3 mt-10 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
    >
        Quay lại
    </NuxtLink>

    <div class="relative">
        <div class="flex justify-center items-center">
            <div class="box-content w-full sm:w-2/3 text-center">
                <p class="ml-1 pl-5 sm:ml-4 sm:pl-40 text-left font-semibold mt-4">Câu hỏi:</p>
                <p 
                    class="w-5/6 sm:w-2/3 mt-4 px-5 py-3 mx-auto border border-base-content rounded-lg bg-base-300 text-left drop-shadow-lg shadow-inner"
                >
                    {{ question }}
                </p>

                <div class="flex justify-between items-end mx-6 sm:mx-44 mt-4">
                    <p class="font-semibold">Câu trả lời của bạn:</p>
                    <p>{{ wordCount }}/250</p>
                </div>
                <textarea 
                    class="textarea w-5/6 sm:w-2/3 text-md sm:text-md mt-2 px-3 pb-96 pt-4 rounded-xl drop-shadow-xl shadow-inner border-2 border-base-200 focus:border-base-content focus:outline-none"
                    required
                    placeholder="Nhập câu trả lời của bạn..."
                    v-model="state.answer"
                ></textarea>

                <button 
                    class="btn btn-wide btn-md btn-accent px-12 sm:w-2/5 sm:px-20 py-2 sm:py-3 mt-4 mb-14 font-bold rounded-xl drop-shadow-xl shadow-xl"
                >
                    Chấm điểm
                </button>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { ref, onMounted } from 'vue';

export default {
    setup() {
        const question = ref('');

        onMounted(() => {
            // Retrieve question from localStorage
            const storedQuestion = localStorage.getItem('question');
            if (storedQuestion) {
                question.value = storedQuestion;
            }
        });

        return {
            question,
            state,
        };
    },

    computed: {
        wordCount() {
            return state.answer.trim().split(/\s+/).filter(word => word.length > 0).length;
        }
    },
};
</script>

<style scoped>
/* Add any specific styles for Writing.vue here */
</style>
