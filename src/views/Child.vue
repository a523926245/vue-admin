<template>
  <div class="page">
    <div class="list" v-for="(list, index) in value" :key="index">
      <p>需求名称：{{ list.name }}</p>
      <p>层级：{{ list.level }}</p>
      <p>需求人数：{{ list.number }}</p>
      <p @click="onClick(list, index)">
        服务猎手：{{ list.hunterNames || "请选择" }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeView",
  props: {
    value: Array,
  },
  data() {
    return {
      activeRow: null,
    };
  },
  methods: {
    onClick(list, index) {
      this.activeRow = list;
      this.$router.push({
        path: "/about",
        query: {
          rowId: list.id,
          index,
        },
      });
    },
  },
};
</script>

<style lang="less" scoped>
.page {
  width: 100%;
  margin: 0;
  padding: 0;
  background: #e5e5e5;
  .list {
    margin-bottom: 16px;
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 8px 16px;
    p {
      display: flex;
      align-items: center;
      justify-content: space-between;
      text-align: left;
      display: block;
      position: relative;

      line-height: 24px;
      font-size: 14px;
      color: #333;
      &::after {
        content: "";
        position: absolute;
        bottom: 0;
        left: 0;
        background: #ccc;
        width: 100%;
        height: 1px;
        transform: scaleY(0.5);
      }
    }
  }
}
</style>
