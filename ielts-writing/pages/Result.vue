<template>
    <div class=" bg-orange-100 pt-5">
        <div v-if="source === 'writing'">
            <NuxtLink
            to="/writing"
            class="btn btn-outline btn-orange-400 text-orange-400 ml-10 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
            >
                Quay lại
            </NuxtLink>
        </div>

        <div v-if="source === 'demo'">
            <div class="mr-10 flex justify-between">
                <NuxtLink
                to="/demo"
                class="btn btn-outline text-orange-500 ml-5 px-5 py-2 text-lg rounded-lg hover:bg-orange-300 hover:text-white hover:border-orange-300"
                >
                Quay lại
                </NuxtLink>

                <NuxtLink to="/question" 
                class="font-semibold text-lg btn btn-outline text-orange-500 px-5 py-2 rounded-lg drop-shadow-lg hover:bg-orange-300 hover:border-orange-300 hover:text-white">
                    Bắt đầu viết >>
                </NuxtLink>
            </div>
        </div>
    
        <div class="p-5 flex space-x-10">    
            <div class="w-2/3 bg-base-100 py-5 px-10 rounded-xl">
                <!-- Display question -->
                <p class="mt-4 mb-10 italic font-semibold border border-base-content px-5 py-2 rounded-md">
                    {{ currentQuestion }}
                </p>

                <!-- Display answer -->
                <p class="mt-4">
                    {{ currentAnswer }}
                </p>
            </div>
            
            <div v-if="localApiResult" class="w-1/3">
                <div class="grid grid-cols-5 gap-x-1 text-center mb-10 bg-base-100 py-4 px-5 rounded-xl">
                    <div class="border bg-green-600 p-2 rounded-lg text-white space-y-2">
                        <p class="text-xs px-3">Band Score</p>
                        <p class="text-3xl font-semibold">{{ state.apiResult.overallBand.score }}</p>
                    </div>
                    <div class="border bg-base-300 p-2 rounded-lg space-y-5">
                        <p class="text-xs font-thin">Task Response</p>
                        <p class="font-semibold">{{ state.apiResult.taskAchievement.score }}</p>
                    </div>
                    <div class="border bg-base-300 p-2 rounded-lg space-y-1 px-2">
                        <p class="text-xs font-thin">Coherence & Cohesion</p>
                        <p class="font-semibold">{{ state.apiResult.coherenceCohesion.score }}</p>
                    </div>
                    <div class="border bg-base-300 p-2 rounded-lg space-y-5">
                        <p class="text-xs font-thin">Lexical Resource</p>
                        <p class="font-semibold">{{ state.apiResult.lexicalResource.score }}</p>
                    </div>
                    <div class="border bg-base-300 py-2 px-1 rounded-lg space-y-1">
                        <p class="text-xs font-thin">Grammatical Range & Accuracy</p>
                        <p class="font-semibold">{{ state.apiResult.grammaticalRangeAccuracy.score }}</p>
                    </div>
                </div>
        
                <div>
                    <div class="tabs tabs-lifted tabs-lg font-semibold" role="tablist">
                        <button 
                            class="tab tab-bordered text-base"
                            :class="{ 'tab-active': activeTab === 1 }"
                            role="tab" 
                            :aria-selected="activeTab === 1" 
                            id="tab-1" 
                            aria-controls="panel-1"
                            @click="showTab(1)"
                        >
                            <label class="label cursor-pointer space-x-3">
                                <input type="radio" name="radio-10" class="radio radio-sm checked:bg-orange-500" checked />
                                <span>Nhận xét chung</span>
                            </label>
                        </button>
                        <button 
                            class="tab tab-bordered text-base"
                            :class="{ 'tab-active': activeTab === 2 }"
                            role="tab" 
                            :aria-selected="activeTab === 2" 
                            id="tab-2" 
                            aria-controls="panel-2"
                            @click="showTab(2)"
                        >
                            <label class="label cursor-pointer space-x-3">
                                <input type="radio" name="radio-10" class="radio radio-sm checked:bg-orange-500" />
                                <span>Nhận xét chi tiết</span>
                            </label>
                        </button>
                    </div>

                    <div v-if="activeTab === 1" 
                        id="panel-1"
                        ref="panel1"
                        role="tabpanel" 
                        aria-labelledby="tab-1"
                        class="px-5 pb-10 pt-8 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-8 overflow-y-auto bg-base-100"
                        style="max-height: calc(75vh - 120px);"
                    >
                        <p>{{ state.apiResult.overallComment }}</p>
                        <div>
                            <div class="flex pb-5 space-x-2 items-center">
                                <img src="/images/attention.png" alt="attention" class="w-7 h-7">
                                <p class="font-semibold">Những câu cần lưu ý:</p>
                            </div>
                            <ul class="space-y-10">
                                <li v-for="(error, index) in state.apiResult.errors" :key="index" class="space-y-3">
                                    <p class="border p-2 rounded-lg border-orange-500">
                                        <strong class="italic">Câu của bạn:</strong> {{ error.error }}
                                    </p>
                                    <p class="border p-2 rounded-lg bg-orange-200">
                                        <strong class="italic">Câu AI sửa cho bạn:</strong> {{ error.correct }}
                                    </p>
                                    <p><strong class="italic">==> Giải thích:</strong> {{ error.explain }}</p>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div v-if="activeTab === 2" 
                        id="panel-2" 
                        ref="panel2"
                        role="tabpanel" 
                        aria-labelledby="tab-2" 
                        class="px-5 pt-6 pb-10 border-2 border-base-300 rounded-b-lg mt-[-2px] space-y-5 overflow-y-auto bg-base-100" 
                        style="max-height: calc(75vh - 120px);"
                    >
                        <p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Task Response</p>
                        <p>{{ state.apiResult.taskAchievement.comment }}</p>

                        <p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Coherence & Cohesion</p>
                        <p>{{ state.apiResult.coherenceCohesion.comment }}</p>

                        <p class="font-semibold border border-orange-500 w-1/2 p-2 text-center text-orange-500 rounded-lg">Lexical Resource</p>
                        <p>{{ state.apiResult.lexicalResource.comment }}</p>

                        <p class="font-semibold border border-orange-500 w-2/3 p-2 text-center text-orange-500 rounded-lg">Grammatical Range & Accuracy</p>
                        <p>{{ state.apiResult.grammaticalRangeAccuracy.comment }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { useRoute } from 'vue-router';
import { ref, watch, onMounted } from 'vue';

export default {
    setup() {
        const route = useRoute();
        const source = route.query.source || 'unknown';

        const currentQuestion = source === 'demo' ? state.question : state.question;
        const currentAnswer = source === 'demo' ? state.answer : state.answer;

        const activeTab = ref(1);
        const panel1 = ref(null);
        const panel2 = ref(null);

        // Local reference for API result
        const localApiResult = ref(null);

        // Load stored data from localStorage when the component mounts
        onMounted(() => {
            const storedData = localStorage.getItem('apiResult');
            if (storedData) {
                localApiResult.value = JSON.parse(storedData);
                state.apiResult = localApiResult.value; // Restore state.apiResult
            }
        });

        // Watch for changes in state.apiResult and store in localStorage
        watch(() => state.apiResult, (newVal) => {
            if (newVal) {
                localApiResult.value = newVal;
                localStorage.setItem('apiResult', JSON.stringify(newVal));
            }
        }, { deep: true });

        const showTab = (tabNumber) => {
            activeTab.value = tabNumber;

            // Reset scroll position
            if (tabNumber === 1 && panel1.value) {
                panel1.value.scrollTop = 0;
            }
            if (tabNumber === 2 && panel2.value) {
                panel2.value.scrollTop = 0;
            }
        };

        return {
            state,
            source,
            currentQuestion,
            currentAnswer,
            activeTab,
            showTab,
            panel1,
            panel2,
            localApiResult,
        };
    },
};
</script>
