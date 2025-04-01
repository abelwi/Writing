<template>
    <div class="h-full mt-10">
      <div class="flex justify-center items-center flex-col">
        <div>
          <div class="flex justify-center">
            <img class="w-40 h-40 mt-10 sm:w-52 sm:h-52" src="/images/home_logo.png" alt="home_logo">
          </div>
          <h1 class="font-medium text-xl sm:text-3xl my-4 sm:my-7">Chấm điểm & Phản hồi Ielts Writing Task 2!</h1>
          <p class="text-sm sm:text-md font-light text-center">Một trang web giúp bạn cải thiện trình độ Writing task 2 của mình!</p>
          <div class="mb-4 sm:mb-7 mt-10 sm:mt-16 flex justify-center">
            <NuxtLink
            to="/question"
            class="btn btn-wide btn-accent px-8 py-3 sm:px-14 sm:py-4 rounded-lg drop-shadow-xl shadow hover:shadow-xl"
          >
              BẮT ĐẦU
          </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="flex mt-10 bg-base-300 p-5 sm:p-10 shadow-inner space-x-2 sm:space-x-0 h-80 lg:h-full">
        <div class="avatar">
          <div class="w-32 h-32 rounded-full shadow-inner drop-shadow-xl">
            <img src="../public/images/personal_avatar.jpg" />
          </div>
        </div>
        <div class="mt-2 sm:mt-5">
          <p class="text-left mx-5 sm:mx-14 font-thin">My name is Lam, and I am the creator of this website. This is my personal project, and 
            I hope you have a great experience using my website! Thanks a lot! >.<
          </p>

          <p class="text-right mt-2 mr-3">Contact me via this
            <a href="https://www.facebook.com/huyenhuong.nguyen.77" target="_blank" class="link link-accent">
              Facebook
            </a> ^^
          </p>
        </div>
      </div>
    </div>

    <!-- Mobile warning -->
    <div v-if="isMobile" class="fixed top-0 left-0 w-full h-full bg-black bg-opacity-90 z-50 flex flex-col justify-center items-center text-white p-10 text-center">
      <h2 class="text-xl font-bold mb-4">Upss, bạn ơi hãy chuyển sang màn hình máy tính nha ^^</h2>
      <p>Trang web này được thiết kế tốt nhất cho màn hình lớn!!!</p>
    </div>

</template>


<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const isMobile = ref(false);

function checkScreenSize() {
  isMobile.value = window.innerWidth < 768; // Mobile if screen width < 768px
}

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkScreenSize);
});
</script>