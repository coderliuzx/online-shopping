<template>
  <div class="swiper-container" id="floor1Swiper" ref="mySwiper">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="p in CarouselImages" :key="p.id">
        <img :src="`.${p.imgUrl}`">
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>

    <!-- 如果需要导航按钮 -->
    <div class="swiper-button-prev"></div>
    <div class="swiper-button-next"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper';
  export default {
    name: 'Carousel',
    props: ['CarouselImages'],
    watch: {
      CarouselImages: {
        immediate: true, // 立即执行Handler()
        handler(){
          this.$nextTick(function () {
            const mySwiper = new Swiper(this.$refs.mySwiper, {
              loop: true, // 循环模式选项
              speed: 500,
              autoplay: {
                delay: 2000
              },

              // 如果需要分页器
              pagination: {
                el: '.swiper-pagination',
                clickable: true
              },

              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              }
            })
          })
        }
      }
    }
  }
</script>

<style scoped>

</style>