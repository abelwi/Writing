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
              DÙNG THỬ
          </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="flex mt-10 bg-base-300 h-52 p-10 shadow-inner">
        <div class="avatar">
          <div class="w-32 h-32 rounded-full shadow-inner drop-shadow-xl">
            <img src="../public/images/personal_avatar.jpg" />
          </div>
        </div>
        <div class="mt-5">
          <p class="text-left mx-14 font-thin">My name is Lam, and I am the creator of this website. This is my personal project, and I have spent nearly a year developing it for you. 
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
</template>


<script>

</script>