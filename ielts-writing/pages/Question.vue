<template>
    <NuxtLink
        to="/"
        class="btn btn-outline ml-10 px-3 mt-10 sm:px-5 py-1 sm:py-2 text-md sm:text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
    >
        Quay lại
    </NuxtLink>

    <div class="flex justify-center items-center">
        <div class="text-center py-10 mt-16 w-5/6 sm:w-1/2 border-2 border-gray-900 rounded-xl">
            <h1 class="text-xl sm:text-2xl font-semibold text-center">Luyện tập writing task 2!</h1>
            <p class="mt-12 mb-3 text-left ml-7 sm:ml-20 font-semibold">Câu hỏi:</p>

            <div class="mb-10 mx-5 sm:mx-32 flex flex-row">
                <textarea 
                class="textarea basis-11/12 h-16 text-md sm:text-lg border-b-2 border-gray-400 focus:border-black focus:outline-none"
                placeholder="Nhập câu hỏi của bạn..."
                v-model="question"
                @input="adjustHeight"
                required
                ></textarea>
                <img class="w-4 sm:w-5 h-4 sm:h-5 ml-2 mt-4 cursor-pointer" v-if="question"  src="/images/clear_button.png" alt="clear" @click="clearText">
            </div>

            <button
            class="btn btn-wide btn-md btn-accent py-2 sm:py-3 font-bold rounded-xl shadow-xl"
            @click="checkQuestion"
            >
                Bắt đầu
            </button>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            question: ''
        };
    },
    methods: {
        adjustHeight(event) {
            const textarea = event.target;
            textarea.style.height = 'auto';
            textarea.style.height = textarea.scrollHeight + 'px';
        },
        clearText() {
            this.question = '';
        },
        checkQuestion() {
            if(this.question === '') {
                alert('Bạn chưa nhập câu hỏi!')
            } else {
                question = this.question
            }
        }
    }
}
</script>

<style scoped>
  textarea {
    outline: none;
    border-top: none;
    border-left: none;
    border-right: none;
    resize: none;
  }
  textarea:focus {
    box-shadow: none;
  }
  button {
    transition: background-color 0.3s ease
  }
  button.hover {
    background-color: #86efac;
  }
  </style>

