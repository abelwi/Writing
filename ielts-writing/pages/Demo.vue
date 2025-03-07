<template>
    <div class="mt-5 mx-10 flex justify-between">
        <NuxtLink
          to="/"
          class="btn btn-outline btn-orange-400 text-orange-400 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
        >
          Quay lại
        </NuxtLink>
        
        <NuxtLink to="/question" class="btn btn-outline btn-orange-400 text-orange-400 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent">
            Bắt đầu viết
        </NuxtLink>
    </div>
    <div class="relative">
        <div class="flex justify-end mt-4">
            <p class="mr-1 pr-5 sm:mr-4 sm:pr-60"><span class="">Word Count:</span>  285/250</p>
        </div>
        <div class="flex justify-center items-center">
            <div class="box-content w-full text-center">
                <p class="w-2/3 my-4 px-5 py-3 mx-auto border border-primary-content font-semibold italic rounded-lg text-left shadow-inner">
                    {{ demoQuestion }}
                </p>

                <p
                class="w-2/3 mt-4 px-5 py-3 mx-auto text-left"
                >
                    {{ demoAnswer }}
                </p>

                <button
                    class="btn btn-wide btn-md btn-accent px-12 sm:w-2/5 sm:px-20 py-2 sm:py-3 mt-10 mb-14 font-bold rounded-xl drop-shadow-xl shadow-xl"
                    @click="handleClick"
                >
                    Chấm điểm
                </button>
            </div>
        </div>
    </div>

    <!-- Loading Overlay -->
    <div v-if="state.loading" class="fixed inset-0 bg-base-300 flex justify-center items-center">
        <div class="text-lg font-semibold">
            Đang chấm điểm, vui lòng đợi...
        </div>
    </div>
</template>

<script>
import { state } from '~/store/DataStore';
import { useMyFunction } from '~/store/Function';
import { useRouter } from 'vue-router';

export default {
    setup() {
        const { getScoringPrompt } = useMyFunction();
        const { getCorrectionPromt } = useMyFunction();
        const { getScoringRes } = useMyFunction();
        const { getCorrectionRes } = useMyFunction();
        const { parseResultText } = useMyFunction();
        const { parseCorrectionText } = useMyFunction();
        const router = useRouter();

        return {
            state,
            getScoringPrompt,
            getCorrectionPromt,
            getScoringRes,
            getCorrectionRes,
            parseResultText,
            parseCorrectionText,
            router,
        }
    },

    data() {
        return {
            demoAnswer: `Advertising is a powerful tool used by businesses to promote their products and services. 
                        Some people believe it brings positive economic benefits, while others argue that it has negative social impacts. 
                        This essay will discuss both views before presenting my opinion.
                        On one hand, advertising plays a significant role in boosting the economy. 
                        It encourages consumers to buy products and services, leading to increased sales and profits for companies.
                        As businesses grow, they create more jobs and contribute to the economy's overall development. 
                        For example, when new products are advertised, they attract buyers, which helps industries expand. 
                        Moreover, advertising helps small businesses gain visibility, allowing them to compete in the market. 
                        Therefore, it is clear that advertising has economic benefits.
                        On the other hand, some argue that advertising can negatively affect society. 
                        Advertisements often present unrealistic ideals of beauty, success, and happiness, which can make people feel dissatisfied with their lives. 
                        For instance, when people see ads featuring luxurious lifestyles or perfect bodies, they may feel inferior or unhappy with their current situation. 
                        Additionally, advertising can encourage overconsumption, leading people to buy things they do not need, which can cause financial stress. 
                        These negative impacts show how advertising can harm individuals and society.
                        In my opinion, advertising has both positive and negative effects, but its social impacts should not be ignored. 
                        While it helps the economy grow, it is important to regulate advertising to prevent harmful messages. 
                        Companies should focus on promoting products honestly and avoid creating unrealistic expectations.
                        In conclusion, advertising has economic advantages by driving business growth and creating jobs. 
                        However, it also has social drawbacks, such as promoting dissatisfaction and unnecessary spending. 
                        To minimize its negative effects, stricter rules on advertising content are necessary.`,

            demoQuestion: `Some people say advertising has positive economic effects. 
                    Others think it has negative social effects because it will make people dissatisfied with who they are and what they have. 
                    Discuss both these views and give your own opinion.`
        }
    },

    mounted() {
        watch(() => state.loading, (newaction, oldaction) => {
            if (state.loading) {
                this.getScoringRes(this.getScoringPrompt(state.answer, state.question)).then(response => {
                    console.log('get scoring data', this.parseResultText(response));
                });

                this.getCorrectionRes(this.getCorrectionPromt(state.answer, state.question)).then(response => {
                    console.log('get correction data', this.parseCorrectionText(response));
                });

            }
        })
    },
    methods: {
        async handleClick() {
            state.answer = this.demoAnswer;
            state.question = this.demoQuestion;
            state.loading = true; // Show loading overlay
        }
    }
}
</script>