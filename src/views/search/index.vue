<template>
  <div class="search">
    <van-nav-bar title="商品搜索" left-arrow @click-left="$router.go(-1)" />

    <van-search v-model.trim="historyData" show-action placeholder="请输入搜索关键词" clearable>
      <template #action>
        <div @click="searchHistory(historyData)">搜索</div>
      </template>
    </van-search>

    <!-- 搜索历史 -->
    <div class="search-history" v-if="history.length > 0">
      <div class="title">
        <span>最近搜索</span>
        <van-icon @click="clear" name="delete-o" size="16" />
      </div>
      <div class="list">
        <div v-for="item in history" :key="item" class="list-item"
        @click="searchHistory(item)">{{ item }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSearch, setSearch } from '@/utils/storage'
import router from '@/router'
import { Toast } from 'vant'

export default {
  name: 'SearchIndex',
  data () {
    return {
      history: getSearch(),
      historyData: '' // 输入框数据
    }
  },
  methods: {
    // 搜索历史
    searchHistory (key) {
      // console.log('点击率', key)
      const search = this.history.indexOf(key)
      if (key === '') {
        Toast('请输入内容')
        return
      }
      if (search !== -1) {
        // 若存在先删除，在追加
        this.history.splice(search, 1)
      }
      this.history.unshift(key)
      // 保存本地搜索记录
      setSearch(this.history)
      // 跳转页面带参数
      router.push(`./searchlist?search=${key}`)
    },
    clear () {
      // 清空本地历史搜索记录
      this.history = []
      setSearch([])
    }
  }
}
</script>

<style lang="less" scoped>
.search {
  .searchBtn {
    background-color: #fa2209;
    color: #fff;
  }
  ::v-deep .van-search__action {
    background-color: #c21401;
    color: #fff;
    padding: 0 20px;
    border-radius: 0 5px 5px 0;
    margin-right: 10px;
  }
  ::v-deep .van-icon-arrow-left {
    color: #333;
  }
  .title {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 15px;
  }
  .list {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    padding: 0 10px;
    gap: 5%;
  }
  .list-item {
    width: 30%;
    text-align: center;
    padding: 7px;
    line-height: 15px;
    border-radius: 50px;
    background: #fff;
    font-size: 13px;
    border: 1px solid #efefef;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-bottom: 10px;
  }
}
</style>
