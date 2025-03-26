<template>
  <div class="mt-5 mb-20">
    <div class="flex justify-between mx-10">
      <NuxtLink
        to="/"
        class="btn btn-outline btn-orange-400 text-orange-400 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
      >
        Quay lại
      </NuxtLink>

      <div class="space-x-4">
        <input 
          v-model="customQuestion"
          type="question"   
          placeholder="Nhập câu hỏi khác . . ." 
          class="py-2 px-5 w-96 input input-bordered"/>
        <button 
          class="btn"
          :class="customQuestion.trim()
            ? 'bg-orange-300 hover:bg-orange-400'
            : 'bg-orange-300 cursor-not-allowed hover:bg-orange-300'"
          @click="goToWriting"
        >
          Làm bài
        </button>
      </div>

    </div>
    <div class="my-10 mx-20 space-y-10">
      <div v-for="(category, catIndex) in questions" :key="catIndex">
        <h2 class="text-xl font-bold flex items-center mb-4 ml-5 text-orange-600">
          <i :class="`fas ${category.icon} mr-4`"></i>
          {{ category.title }}
        </h2>

        <ul class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-7">
          <li 
            v-for="(q, qIndex) in category.questions" 
            :key="qIndex"
            class="relative block mb-2 border-2 px-4 py-10 rounded-lg group"
          >
            {{ q.text }}
            <div class="absolute -bottom-4 right-2 opacity-100 transition-opacity">
              <NuxtLink
                :to="{ path: '/writing', query: { question: q.text, mode: 'write' } }"
                class="btn btn-md hover:btn-primary mr-2 rounded-lg hover:shadow-lg"
              >
                Tự viết bài
              </NuxtLink>
              <NuxtLink
                :to="{ path: '/writing', query: { question: q.text, mode: 'sample', sampleAnswer: q.sampleAnswer } }"
                class="btn btn-md hover:btn-secondary rounded-lg hover:shadow-lg"
              >
                Chấm điểm bài mẫu
              </NuxtLink>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const router = useRouter();
const questions = ref([]);
const customQuestion = ref('');

onMounted(async () => {
  try {
    const response = await fetch('/question_data.json');
    const jsonData = await response.json();
    
    questions.value = jsonData;
  } catch (error) {
    console.error("Failed to load questions:", error);
  }
});

function goToWriting() {
  if (!customQuestion.value.trim()) return;
  localStorage.setItem('customQuestion', customQuestion.value.trim());

  router.push({
    path: '/writing',
    query: {
      question: customQuestion.value.trim(),
      mode: 'write',
    },
  });
}
</script>
