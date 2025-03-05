<template>
  <NuxtLink
    to="/"
    class="btn btn-outline btn-orange-400 text-orange-400 px-5 text-lg rounded-lg shadow hover:shadow-xl hover:bg-accent hover:border-accent"
  >
    Quay lại
  </NuxtLink>
    <div>
      <h1>IELTS Writing Task 2 Questions</h1>
      <div v-if="questionsData && questionsData.length">
        <div v-for="(category, index) in questionsData" :key="index">
          <h2>{{ category.title }}</h2>
          <ul>
            <li v-for="(question, qIndex) in category.questions" :key="qIndex">
              {{ question }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  
  export default {
    setup() {
      const questionsData = ref([]); // ✅ Make it reactive
  
      onMounted(async () => {
        try {
            const response = await fetch("/question_data.json");
            questionsData.value = await response.json();
        } catch (error) {
          console.error("Error loading question data:", error);
        }
      });
  
      return { questionsData };
    }
  };
  </script>
  