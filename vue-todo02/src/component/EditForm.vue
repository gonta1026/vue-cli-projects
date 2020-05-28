<template>
  <form @submit.prevent="editItem">
    <p class="title">
      <label for="title">title</label>
      <input type="text" id="title" v-model="newTitle">
    </p>
    
    <p class="content">
      <label for="content">content</label>
      <textarea cols="30" id="content" rows=" 10" v-model="newContent"></textarea>
    </p>

    <p class="deadline">
      <label for="edit-deadline">deadline</label>
      <select id="edit-deadline" v-model="selected" options="deadlines">
        <option :value="value" v-for="(value, key) in deadlines" :key=value>{{key}}</option>
      </select>
    </p>

    <p class="submit">
      <span @click="change" class="common-btn return">return</span>
      <input type="submit" class="common-btn edit" value="edit">
    </p>
  </form><!-- /editform -->
</template>

<script>
export default {
  props: {/*これはバリデーションを定義した書き方*/
    propsNewTitle: String,
    edit: Boolean,
    propsNewContent: String,
    propsSelected: Number,
    deadlines: Object,
    editTargetTask: Number
  },
  data(){
    return {
      newTitle: this.propsNewTitle,
      newContent: this.propsNewContent,
      selected: this.propsSelected,
    }
  },
  methods: {
    // 編集フォームの内容を代入し変更する。
    editItem(){
      this.$emit("edit-todo", {
        title: this.newTitle,
        content: this.newContent,
        selected: this.selected,
      });
    },
    change(){
      this.$emit("chage-edit")   
    }
  }
}
</script>