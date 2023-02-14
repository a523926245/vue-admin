<template>
  <div class="page">
    <Child v-model="lists" @inpout="test"></Child>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Child from "./Child.vue";
export default {
  name: "HomeView",
  data() {
    return {
      lists: null,
    };
  },
  components: {
    Child,
  },
  computed: {
    ...mapState({
      editList: (state) => state.editList,
    }),
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["storeEditLists"]),
    init() {
      setTimeout(() => {
        const { editList } = this;
        const mockData = [
          {
            id: 1,
            name: "需求一",
            level: "L1",
            number: 6,
            hunterNames: "",
          },
          {
            id: 2,
            name: "需求二",
            level: "L2",
            number: 3,
            hunterNames: "",
          },
        ];
        this.storeEditLists(editList ? editList : mockData);
        this.lists = editList ? editList : mockData;
      });
    },
    test(val) {
      console.log("[ val ]", val);
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
