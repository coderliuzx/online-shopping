<template>
  <div class="home">
    <TypeNav></TypeNav>
    <ListContainer></ListContainer>
    <Recommend></Recommend>
    <Rank></Rank>
    <Like></Like>
    <Floor v-for="floor in floorList" :key="floor.id" :floorData="floor"></Floor>
    <Brand></Brand>
  </div>
</template>

<script>
  // 引入组件
  import ListContainer from "@/pages/Home/ListContainer";
  import Recommend from "@/pages/Home/Recommend";
  import Rank from "@/pages/Home/Rank";
  import Like from "@/pages/Home/Like";
  import Floor from "@/pages/Home/Floor";
  import Brand from "@/pages/Home/Brand";
  // 
  import { mapState } from 'vuex';

  export default {
    name: 'Home',
    components: {
      ListContainer,
      Recommend,
      Rank,
      Like,
      Floor,
      Brand
    },
    mounted() {
      this.$store.dispatch('getFloorList');
      this.$store.dispatch("getUserInfo");
    },
    computed: {
      ...mapState({
        floorList: state => state.home.floorList,
      })
    }
  }
</script>

<style>

</style>