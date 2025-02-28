<template>
    <NuxtLink
        to="/"
        class="btn btn-outline ml-10 px-3 mt-10 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
    >
        Quay lại
    </NuxtLink>

    <div class="mx-20 my-10">
        <!-- <p class="mt-12 mb-3 text-left ml-7 sm:ml-20 font-semibold">Chọn câu hỏi:</p> -->

        <div class="mt-4">
            <ul class="grid grid-cols-2 gap-10">
                <li 
                    v-for="(item, index) in questions" 
                    :key="index" 
                    class="cursor-pointer px-4 py-4 rounded-lg border border-orange-400 shadow-lg drop-shadow-xl hover:bg-base-300"
                    @click="selectQuestion(item.question)"
                >
                    {{ item.question }}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { useRouter } from 'vue-router';

import questions from '~/assets/data.json'
export default {
    setup() {
        const router = useRouter();

        const selectQuestion = (question) => {
            state.question = question; // Save the selected question to state
            localStorage.setItem('question', question); // Store in localStorage
            router.push('/writing'); // Navigate to writing.vue
        };

        return {
            state,
            questions,
            selectQuestion,
        };
    },
};
</script>

<style scoped>
  
</style>

