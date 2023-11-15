<!-- 全局组件 -->
<template>
    <div class="type-nav">
    <div class="container" @mouseleave="hideSort"  @mouseenter="showSort">
        <h2 class="all">全部商品分类</h2>
        <nav class="nav">
            <a href="###">服装城</a>
            <a href="###">美妆馆</a>
            <a href="###">尚品汇超市</a>
            <a href="###">全球购</a>
            <a href="###">闪购</a>
            <a href="###">团购</a>
            <a href="###">有趣</a>
            <a href="###">秒杀</a>
        </nav>
        <transition name="sort">
            <div class="sort" v-show="isShowSort">
                <div class="all-sort-list2">
                    <div class="item" :class="{ 'cur': curIndex == index }" 
                        v-for=" (c1, index) in categoryList" :key="c1.categoryId"
                        @click="goSearch($event)"
                    >
                        <h3 @mouseenter="getIndex(index)">
                            <a data-go="c1" :data-categoryName="c1.categoryName" :data-categoryId="c1.categoryId">{{ c1.categoryName }}</a>
                        </h3>
                        <div class="item-list clearfix" :style="{ 'display': curIndex == index ? 'block' : 'none' }">
                            <div class="subitem" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                                <dl class="fore">
                                    <dt>
                                        <a data-go="c2" :data-categoryName="c2.categoryName" :data-categoryId="c2.categoryId">{{ c2.categoryName }}</a>
                                    </dt>
                                    <dd>
                                        <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                                            <a data-go="c3" :data-categoryName="c3.categoryName" :data-categoryId="c3.categoryId">{{ c3.categoryName }}</a>
                                        </em>
                                    </dd>
                                </dl>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
    </div>
</template>

<script>
    import throttle from "lodash/throttle";
    import { mapState } from 'vuex';

    export default {
        name: 'TypeNav',
        data() {
            return {
                curIndex: -1,
                isShowSort: false,
            }
        },
        beforeMount() {
            if(this.$route.path.slice(0, 5) == '/home') {
                this.isShowSort = true
            }
        },
        computed: {
            ...mapState({
                categoryList: (state) => {
                    return state.home.categoryList
                }
            })
        },
        methods: {
            getIndex: throttle(function(index){
                this.curIndex = index;
            }, 10),
            goSearch(e) {
                let { go, categoryname, categoryid } = e.target.dataset;
                if(go) {
                    const option = {
                        name: 'search',
                        query: {}
                    };
                    if(go == 'c1') {
                        option.query.categoryName = categoryname;
                        option.query.category1Id = categoryid;
                    }
                    else if (go === 'c2') {
                        option.query.categoryName = categoryname;
                        option.query.category2Id = categoryid;
                    }
                    else if (go === 'c3') {
                        option.query.categoryName = categoryname;
                        option.query.category3Id = categoryid;
                    }
                    // 
                    if(this.$route.params) {
                        option.params = this.$route.params
                    }
                    this.$router.push(option)
                }
            },
            showSort() {
                if (this.$route.path.slice(0, 5) != '/home') {
                    this.isShowSort = true;
                }
            },
            hideSort() {
                this.curIndex = -1;
                if (this.$route.path.slice(0, 5) != '/home') {
                    this.isShowSort = false;
                }
            }
        },
    }
</script>

<style lang="less" scoped>
    .type-nav {
        border-bottom: 2px solid #e1251b;
        cursor: pointer;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 470px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .item {
                        h3 {
                            line-height: 29px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }
                    }
                    .cur {
                        background-color: rgba(255, 13, 0, 0.2);
                    }
                }
            }

            @keyframes sortAnimate {
                0% {
                    height: 0;
                } 100% {
                    height: 470px;
                }
            }

            .sort-enter-active {
                animation: sortAnimate .1s;
            }

            .sort-leave-active {
                animation: sortAnimate .1s reverse;
            }
        }
    }
</style>