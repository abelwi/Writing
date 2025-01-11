<template>
    <div class="h-full">
      <div class="mt-10 mr-10 flex justify-end">
        <button class="btn btn-base-200 px-3 py-1 sm:px-5 sm:py-2 rounded-lg drop-shadow-lg shadow hover:shadow-xl hover:bg-base-300 hover:border-base-200">
          <NuxtLink to="/question" class="font-semibold text-md sm:text-lg">Chọn bài làm >></NuxtLink>
        </button>
      </div>

      <div class="flex justify-center items-center flex-col">
        <div>
          <div class="flex justify-center">
            <img class="w-40 h-40 mt-10 sm:w-52 sm:h-52" src="/images/home_logo.png" alt="home_logo">
          </div>
          <h1 class="font-medium text-xl sm:text-3xl my-4 sm:my-7">Luyện tập Ielts Writing Task 2!</h1>
          <p class="text-sm sm:text-md font-light text-center">Một trang web giúp bạn cải thiện trình độ Writing task 2 của mình!</p>
          <div class="mb-4 sm:mb-7 mt-10 sm:mt-16 flex justify-center">
            <NuxtLink
            to="/demo"
            class="btn btn-wide btn-accent px-8 py-3 sm:px-14 sm:py-4 rounded-lg drop-shadow-xl shadow hover:shadow-xl"
          >
              DÙNG THỬ
          </NuxtLink>
          </div>
        </div>
      </div>
      
      <div class="mt-10 sm:mt-10 bg-base-300 h-screen p-4 shadow-inner">
        <p class="font-semibold text-left ml-2 sm:ml-8 pt-2">P/s:</p>
        <p class="text-left mx-2 sm:mx-14 font-thin">Mình là Lam - người tạo chiếc web nhỏ này cho cậu, hi vọng nó sẽ giúp cậu phần nào.
          Sẽ có khá nhiều thiếu sót, hãy cho mình biết để mình cải thiện nha! ^^
        </p>

        <p class="text-right mt-5 mr-4 sm:mr-3">Liên hệ mình qua 
          <a href="https://www.facebook.com/huyenhuong.nguyen.77" target="_blank" class="link link-accent">
            Facebook
          </a>
          này nhaaaa!!
        </p>
      </div>
    </div>
</template>


<script>

</script>