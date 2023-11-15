<template>
  <div class="swiper-container" ref="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="img,index in skuImageList" :key="img.id">
        <img :src="img.imgUrl" :class="{ 'active': isActive == index }" @click="getActive(index)">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>

<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props: ['skuImageList'],
    data() {
      return {
        isActive: 0
      }
    },
    watch: {
      skuImageList: {
        handler() {
          this.$nextTick(()=>{
            new Swiper(this.$refs['swiper-container'], {
              // 如果需要前进后退按钮
              navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
              },
              // 轮播图容器一次性展现几张
              slidesPerView: 3,
              // 一次切换几张
              slidesPerGroup: 2,
            })
          })
        }
      }
    },
    methods: {
      getActive(index) {
        this.isActive = index;
        this.$bus.$emit("getIndex", index)
      }
    },
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>