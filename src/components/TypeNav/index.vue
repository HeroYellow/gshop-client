<template>
  <!-- 商品分类导航 -->
  <div class="type-nav">
    <div class="container">
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
      <!-- @mouseleave="currentIndex = -2" 鼠标移出让 currnetIndex的值为-2 -->
      <div class="sort" @mouseleave="currentIndex = -2">
        <div class="all-sort-list2">
          <!-- 
            v-for="(c1, index) in baseCategoryList":遍历生成一级分类列表
            @mouseenter="currentIndex = index":鼠标移入一级分类列表显示二三级分类列表
            :class="{item_on: currentIndex === index}":鼠标移入标记当前的index,改变背景颜色和显示右侧的二三级分类列表
          -->
          <div
            class="item"
            v-for="(c1, index) in baseCategoryList"
            :key="c1.categoryId"
            @mouseenter="currentIndex = index"
            :class="{item_on: currentIndex === index}"
          >
            <h3>
              <!-- <a href>{{ c1.categoryName }}</a> -->
              <!-- 给一级分类列表项改造成路由跳转 -->
              <router-link
                :to="{ path: 'search', query: { categoryName: c1.categoryName, category1Id: c1.categoryId } }"
              >{{ c1.categoryName }}</router-link>
            </h3>
            <div class="item-list clearfix">
              <div class="subitem">
                <!-- 遍历生成二级分类列表项 -->
                <dl class="fore" v-for="c2 in c1.categoryChild" :key="c2.categoryId">
                  <dt>
                    <!-- <a href>{{ c2.categoryName }}</a> -->
                    <!-- 给二级分类列表项改造成路由跳转 -->
                    <router-link
                      :to="{ path: 'search', query: { categoryName: c2.categoryName, category2Id: c2.categoryId } }"
                    >{{ c2.categoryName }}</router-link>
                  </dt>
                  <dd>
                    <!-- 遍历生成三级分类列表项 -->
                    <em v-for="c3 in c2.categoryChild" :key="c3.categoryId">
                      <!-- <a href>{{ c3.categoryName }}</a> -->
                      <!-- 给三级分类列表项改造成路由跳转 -->
                      <router-link
                        :to="{ path: 'search', query: { categoryName: c3.categoryName, category3Id: c3.categoryId } }"
                      >{{ c2.categoryName }}</router-link>
                    </em>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// - 引入vuex辅助函数
import { mapState } from 'vuex'

export default {
  name: 'TypeNav',
  // # 状态数据
  data () {
    return {
      // # 标记鼠标移入移出一级分类列表项
      currentIndex: -2
    }
  },
  // # 页面渲染完毕后
  mounted () {
    // TODO 调用三级分类请求
    this.$store.dispatch('getBaseCategoryList')
  },
  // # 计算属性
  computed: {
    // TODO 获取baseCategoryList
    ...mapState({
      // # 三级分类列表数据
      baseCategoryList: state => state.home.baseCategoryList
    })
  }
}
</script>

<style lang="less" scoped>
.type-nav {
  border-bottom: 2px solid #e1251b;
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
      top: 47px;
      width: 210px;
      height: 460px;
      position: absolute;
      background: #fafafa;
      z-index: 999;
      .all-sort-list2 {
        .item {
          h3 {
            line-height: 30px;
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
            _height: 200px;
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
          &.item_on {
            background-color: #ccc;
            .item-list {
              display: block;
            }
          }
        }
      }
    }
  }
}
</style>