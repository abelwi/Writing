<template>
  <div class="">
    <NuxtLink
    to="/writing"
    class="btn btn-outline btn-orange-400 text-orange-400 ml-10 mt-5 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
    >
        Quay lại
    </NuxtLink>

    <div class="my-10 mx-20 space-y-10">
      <div v-for="(category, index) in questions" :key="index" class="">
        <h2 class="text-xl font-bold flex items-center mb-4 ml-5 text-primary">
          <i :class="`fas ${category.icon} mr-4`"></i>
          {{ category.title }}
        </h2>

        <ul class="grid grid-cols-1 lg:grid-cols-2 gap-x-16 gap-y-7">
          <NuxtLink
            v-for="(q, qIndex) in category.questions"
            :key="qIndex"
            :to="{ path: '/writing', query: { question: q } }"
            @click="localStorage.setItem('question', q)"
            class="block mb-2 border-2 drop-shadow-lg p-5 rounded-lg cursor-pointer hover:bg-gray-100"
          >
              {{ q }}
          </NuxtLink>
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
    questions.value = await response.json();
    console.log("Loaded Data:", questions.value); 
  } catch (error) {
    console.error("Failed to load questions:", error);
  }
});
</script>
