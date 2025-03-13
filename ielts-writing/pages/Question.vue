<template>
  <div class="mt-5 mb-20">
    <NuxtLink
      to="/"
      class="btn btn-outline btn-orange-400 text-orange-400 ml-10 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
    >
      Quay lại
    </NuxtLink>

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
            class="relative block mb-2 border-2 drop-shadow-lg px-4 py-10 rounded-lg group"
          >
            {{ q.text }}
            <div class="absolute -bottom-4 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <NuxtLink
                :to="{ path: '/writing', query: { question: q.text, mode: 'write' } }"
                class="btn btn-md btn-primary mr-2 rounded-lg shadow-lg"
              >
                Tự viết bài
              </NuxtLink>
              <NuxtLink
                v-if="q.globalIndex < 4"
                :to="{ path: '/writing', query: { question: q.text, mode: 'sample', sampleAnswer: q.sampleAnswer || '' } }"
                class="btn btn-md btn-secondary rounded-lg shadow-lg"
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

const questions = ref([]);

onMounted(async () => {
  try {
    const response = await fetch('/question_data.json'); 
    const data = await response.json();

    // Flatten the questions and convert each string to an object
    let globalCount = 0;
    data.forEach(category => {
      category.questions = category.questions.map(q => {
        if (typeof q === 'string') {
          return { text: q, globalIndex: globalCount++ }; // Convert string to object
        }
        return { ...q, globalIndex: globalCount++ }; // Keep object format if already correct
      });
    });

    questions.value = data;
  } catch (error) {
    console.error("Failed to load questions:", error);
  }
});
</script>
