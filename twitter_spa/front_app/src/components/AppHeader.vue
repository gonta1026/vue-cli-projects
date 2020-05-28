<template>
  <header id="header">
    <h3>ホーム</h3>
    <div class="right">
      <div class="category-list">
        <p
          class="current-category"
          @click="categoryActive = !categoryActive"
        >{{currentCategory}}</p>
        <ul v-if="categoryActive">
          <li
          @click="changeCategoty('all')"
          class="all"
          >all</li>
          <li
            v-for="category in categoryList"
            :class="category.name"
            :key="category.id"
            @click="changeCategoty(category.name)"
          >{{category.name}}</li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  data: () => ({
    categoryActive: false,
  }),
  props: {
    categoryList: {
      type: Array,
      require: true,
    },
    currentCategory: {
      type: String,
      require,
    },
    validator: function (value) {
      value === "all"
    }
  },
  methods: {
    changeCategoty(categpry) {
      this.$emit("category-change", categpry)
      this.categoryActive = !this.categoryActive;
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../css/mixin.scss";
@import "../css/setting.scss";

header {
  @include between;
  padding: 0  0;
  padding: 20px 4% 20px;
  border-bottom: 1px solid #ddd;
  h3 {
    font-size: 20px;
    color: #00ff00;
  }
  .right {
    .category-list {
      position: relative;
      width: 110px;
      text-align: center;
      .current-category {
        border: 1px solid;
        border-radius: 5px;
      }
      ul {
        position: absolute;
        top: 28px;
        width: 100%;
        background: #fff;

        li {
          border-bottom: 1px solid $border_color;
        }
      }
    }
  }
}
</style>