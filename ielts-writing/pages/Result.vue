<template>
    <div>
        <div v-if="source === 'writing'">
            <NuxtLink
            to="/writing"
            class="btn btn-outline ml-10 px-3 mt-10 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
            >
                Quay lại
            </NuxtLink>
        </div>

        <div v-if="source === 'demo'">
            <div class="mt-10 mr-10 flex justify-between">
                <NuxtLink
                to="/demo"
                class="btn btn-outline ml-5 px-3 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
                >
                Quay lại
                </NuxtLink>

                <NuxtLink to="/question" 
                class="font-semibold text-md sm:text-lg btn btn-base-200 px-3 py-1 sm:px-5 sm:py-2 rounded-lg drop-shadow-lg shadow hover:shadow-xl hover:bg-base-300 hover:border-base-200">
                    Bắt đầu viết >>
                </NuxtLink>
            </div>
        </div>
    </div>
    <div class="p-5 flex space-x-10">    
        <div class="w-2/3">
            <!-- Display question -->
            <p class="mt-4 mb-10 italic font-semibold border border-base-content px-5 py-2 rounded-md">
                {{ currentQuestion }}
            </p>

            <!-- Display answer -->
            <p class="mt-4">
                {{ currentAnswer }}
            </p>
        </div>
        
        <div v-if="state.apiResult" class="mt-4 w-1/3">
            <div class="grid grid-cols-5 gap-x-1 text-center mb-10">
                <div class="border bg-green-600 p-2 rounded-lg text-white space-y-2">
                    <p class="text-xs px-5">Band Score</p>
                    <p class="text-3xl font-semibold">{{ state.apiResult.overallBand.score }}</p>
                </div>
                <div class="border bg-base-300 p-2 rounded-lg space-y-5">
                    <p class="text-xs font-thin">Task Response</p>
                    <p class="font-semibold">{{ state.apiResult.taskAchievement.score }}</p>
                </div>
                <div class="border bg-base-300 p-2 rounded-lg space-y-1 px-4">
                    <p class="text-xs font-thin">Coherence & Cohesion</p>
                    <p class="font-semibold">{{ state.apiResult.coherenceCohesion.score }}</p>
                </div>
                <div class="border bg-base-300 p-2 rounded-lg space-y-5">
                    <p class="text-xs font-thin">Lexical Resource</p>
                    <p class="font-semibold">{{ state.apiResult.lexicalResource.score }}</p>
                </div>
                <div class="border bg-base-300 p-2 rounded-lg space-y-1">
                    <p class="text-xs font-thin">Grammatical Range & Accuracy</p>
                    <p class="font-semibold">{{ state.apiResult.grammaticalRangeAccuracy.score }}</p>
                </div>
            </div>
    
            <div>
                <div class="tabs tabs-lifted tabs-lg" role="tablist">
                    <button class="tab tab-bordered tab-active text-base" role="tab" aria-selected="true" id="tab-1" aria-controls="panel-1">Nhận xét chung</button>
                    <button class="tab tab-bordered text-base" role="tab" aria-selected="false" id="tab-2" aria-controls="panel-2">Nhận xét chi tiết</button>
                </div>

                <div id="panel-1" 
                role="tabpanel" 
                aria-labelledby="tab-1" 
                class="p-5 pt-10 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-8 overflow-y-auto"
                style="max-height: calc(75vh - 120px);"
                >
                    <p>{{ state.apiResult.overallComment }}</p>
                    <div>
                        <p class="font-semibold pb-5">Những lỗi sai cần lưu ý:</p>
                        <ul>
                            <li v-for="(error, index) in state.apiResult.errors" :key="index">{{ error }}</li>
                        </ul>
                    </div>

                </div>
                <div id="panel-2" 
                role="tabpanel" 
                aria-labelledby="tab-2" 
                class="p-5 pt-10 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-5 overflow-y-auto" 
                style="max-height: calc(75vh - 120px);"
                hidden
                >
                    
                    <p class="font-semibold">Task Response:</p>
                    <p>{{ state.apiResult.taskAchievement.comment }}</p>
            
                
                    <p class="font-semibold">Coherence & Cohesion:</p>
                    <p>{{ state.apiResult.coherenceCohesion.comment }}</p>
                
                    <p class="font-semibold">Lexical Resource:</p>
                    <p>{{ state.apiResult.lexicalResource.comment }}</p>
                
                    <p class="font-semibold">Grammatical Range & Accuracy:</p>
                    <p>{{ state.apiResult.grammaticalRangeAccuracy.comment }}</p>
               
                </div>
            </div>
        </div>

        <p v-else class="text-gray-500">Chưa có dữ liệu đánh giá.</p>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { useRoute } from 'vue-router';
// import { onMounted } from 'vue';

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
            currentAnswer,
        };
    },
    mounted() {
        // Tab-switching logic
        const tabs = document.querySelectorAll('[role="tab"]');
        const panels = document.querySelectorAll('[role="tabpanel"]');

        tabs.forEach((tab) => {
            tab.addEventListener('click', () => {
                // Remove active states from all tabs
                tabs.forEach((t) => {
                    t.classList.remove('tab-active');
                    t.setAttribute('aria-selected', 'false');
                });

                // Add active state to the clicked tab
                tab.classList.add('tab-active');
                tab.setAttribute('aria-selected', 'true');

                // Hide all panels
                panels.forEach((panel) => panel.setAttribute('hidden', true));

                // Show the corresponding panel
                const panelId = tab.getAttribute('aria-controls');
                document.getElementById(panelId).removeAttribute('hidden');
            });
        });
    },

};
</script>
