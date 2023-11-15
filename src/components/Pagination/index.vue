<template>
  <div class="pagination">
    <button :disabled="pageNo == 1" @click="changePageNo(pageNo - 1)">
      上一页
    </button>
    <button v-show="startAndEnd.start > 1" @click="changePageNo(1)" :class="{'active': pageNo == 1}">
      1
    </button>
    <button v-show="startAndEnd.start > 2" class="btn-text">
      ···
    </button>

    <button 
      v-for="page,index in startAndEnd.end" 
      :key="index" 
      v-show="page >= startAndEnd.start" 
      @click="changePageNo(page)"
      :class="{ 'active': pageNo == page }"
    >
      {{ page }}
    </button>

    <button v-if="startAndEnd.end < totalPage - 1" class="btn-text">
      ···
    </button>
    <button v-if="startAndEnd.end < totalPage" @click="changePageNo(totalPage)" :class="{ 'active': pageNo == totalPage }">
      {{ totalPage }}
    </button>
    <button :disabled="pageNo == totalPage" @click="changePageNo(pageNo + 1)">
      下一页
    </button>

    <button style="margin-left: 30px">
      共 {{ total }} 条
    </button>
  </div>
</template>

<script>

  export default {
    name: "Pagination",
    props: ['pageSize', 'pageNo', 'total', 'continues'],
    mounted() {
      // console.log(this);
    },
    computed: {
      totalPage() {
        return Math.ceil(this.total/this.pageSize)
      },
      startAndEnd() {
        let start = 1, end = 5;
        const { continues, pageNo, totalPage } = this;
        if(totalPage < continues) {
          start = 1;
          end = totalPage;
        } else {
          start = pageNo - parseInt(continues / 2);
          end = pageNo + parseInt(continues / 2);
          if(start < 1) {
            start = 1;
            end = continues;
          }
          if(end > totalPage) {
            start = totalPage - continues + 1;
            end = totalPage;
          }
        }
        return {start, end}
      },
    },
    methods: {
      changePageNo(page) {
        this.$emit("getPageNoEvent", page);
      }
    },
  }
</script>

<style lang="less" scoped>
  .pagination {
    text-align: center;
    .btn-text {
      cursor: text;
    }
    .active {
      background-color: skyblue;
    }
    button {
      margin: 0 5px;
      background-color: #f4f4f5;
      color: #606266;
      outline: none;
      border-radius: 2px;
      padding: 0 4px;
      vertical-align: top;
      display: inline-block;
      font-size: 13px;
      min-width: 35.5px;
      height: 28px;
      line-height: 28px;
      cursor: pointer;
      box-sizing: border-box;
      text-align: center;
      border: 0;

      &[disabled] {
        color: #c0c4cc;
        cursor: not-allowed;
      }

      &.active {
        cursor: not-allowed;
        background-color: #409eff;
        color: #fff;
      }
    }
  }
</style>