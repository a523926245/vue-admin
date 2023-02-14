<template>
  <div class="page">
    <div class="list">
      <p
        :class="isUserSelected(user) ? 'active' : ''"
        v-for="(user, index) in users"
        @click="onClick(user, index)"
        :key="index"
      >
        <span>{{ user.name }}</span>
        <span>{{ user.sex }}</span>
      </p>
    </div>
    <div class="buttons">
      <Button @click="cancel">取消</Button>
      <Button type="danger" @click="confirm">确定</Button>
    </div>
  </div>
</template>

<script>
import { Button } from "element-ui";
import { mapActions, mapState } from "vuex";
export default {
  name: "HomeView",
  components: {
    Button,
  },
  data() {
    return {
      users: [],
      selectUser: [],
    };
  },
  computed: {
    ...mapState({
      editList: (state) => state.editList,
    }),
  },
  mounted() {
    this.init();
  },
  // beforeDestroy() {
  //   this.emit();
  // },
  methods: {
    ...mapActions(["storeEditLists"]),
    init() {
      setTimeout(() => {
        this.users = [
          {
            id: 123,
            name: "张三",
            sex: "女",
          },
          {
            id: 456,
            name: "李四",
            sex: "男",
          },
          {
            id: 789,
            name: "王五",
            sex: "女",
          },
          {
            id: 2145,
            name: "麻六",
            sex: "男",
          },
        ];
      });
    },

    isUserSelected(user) {
      const { selectUser } = this;
      return selectUser.some((item) => {
        return item.id === user.id;
      });
    },

    findSelectUserIdx(user) {
      const { id } = user;
      const { selectUser } = this;
      const userIds = selectUser.map((item) => {
        return item.id;
      });
      return userIds.indexOf(id);
    },

    onClick(user) {
      const isSelected = this.isUserSelected(user);
      if (isSelected) {
        const idx = this.findSelectUserIdx(user);
        this.selectUser.splice(idx, 1);
        return;
      }
      this.selectUser.push(user);
    },

    builtSelectResutl() {
      const { selectUser } = this;
      const hunterIds = selectUser
        .map((item) => {
          return item.id;
        })
        .join(",");
      const hunterNames = selectUser
        .map((item) => {
          return item.name;
        })
        .join(",");
      return {
        hunterIds,
        hunterNames,
      };
    },

    updateStoreLists(newVal) {
      const { rowId } = this.$route.query || {};
      const { editList, value } = this;
      let listTemplate = editList
        ? editList
        : JSON.parse(JSON.stringify(value));
      listTemplate.forEach((list) => {
        if (list.id === Number(rowId)) {
          Object.keys(newVal).forEach((key) => {
            this.$set(list, key, newVal[key]);
          });
        }
      });
      this.storeEditLists(listTemplate);
    },

    cancel() {
      this.$router.go(-1);
    },

    confirm() {
      const { selectUser } = this;
      const selectUserLen = selectUser.length;
      if (!selectUserLen) {
        console.log("请选择数据!");
        return;
      }
      const result = this.builtSelectResutl();
      this.updateStoreLists(result);
      this.$nextTick(() => {
        this.$router.go(-1);
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
      height: 24px;
      font-size: 14px;
      color: #333;
      &.active {
        background: #ff6600;
        color: #fff;
      }
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
  .buttons {
    background: #fff;
    margin-top: 1px;
    padding: 8px 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
