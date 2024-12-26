<template>
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
    <div class="relative">
        <div class="flex justify-center items-center">
            <div class="box-content w-full text-center">
                <p class="ml-1 pl-5 sm:ml-4 sm:pl-52 text-left font-semibold mt-4">Câu hỏi demo:</p>
                <p class="w-5/6 sm:w-2/3 mt-4 px-5 py-3 mx-auto border border-primary-content rounded-lg text-left shadow-inner">
                    {{ demoQuestion }}
                </p>

                <div class="flex justify-between items-center mt-4">
                    <p class="ml-1 pl-5 sm:ml-4 sm:pl-52 text-left font-semibold">Câu trả lời demo:</p>
                    <p class="mr-1 pr-5 sm:mr-4 sm:pr-60">285/250</p>
                </div>
                <p
                class="w-5/6 sm:w-2/3 mt-4 px-5 py-3 mx-auto text-left"
        
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
    <div v-if="state.loading" class="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
        <div class="text-white text-lg font-semibold">
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
        const { checkAnswer } = useMyFunction();
        const router = useRouter();

        return {
            state,
            checkAnswer,
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

    methods: {
        async handleClick() {
            state.loading = true; // Show loading overlay

            try {
                // Store demo data in state
                state.question = this.demoQuestion;
                state.answer = this.demoAnswer;

                // Call the API with demo data
                await this.checkAnswer(state.answer, state.question);

                // Navigate to Result.vue after API response
                this.router.push({
                    path: '/result',
                    query: { source: 'demo' }
                });
            } catch (error) {
                console.error('Error:', error);
                alert('Có lỗi xảy ra khi chấm điểm.');
            } finally {
                state.loading = false; // Hide loading overlay
            }
        }
    }
}
</script>