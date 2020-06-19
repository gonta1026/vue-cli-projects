<template>
  <form @submit.prevent="addItem">
    <p class="title">
      <label for="edit-title">TITLE</label>
      <input type="text" id="edit-title" v-model="newTitle">
    </p>
    
    <p class="content">
      <label for="edit-content">content</label>
      <textarea cols="30" id="edit-content" rows=" 10" v-model="newContent"></textarea>
    </p>

    <p class="deadline">
      <label for="deadline">deadline</label>
      <select id="deadline" v-model.lazy="selected" options="deadlines">
        <option :value="value" v-for="(value, key) in deadlines" :key="value">{{key}}</option>
      </select>
    </p>

    <p class="submit">
      <input type="submit" value="add" class="common-btn add">
    </p>
  </form> <!-- /addform -->
</template>

<script>
export default {
  data() {
    return {
      id: 1,
      newTitle: "",
      newContent: "",
      selected: "",
      deadlines: {
        "--": "",
        "Within 1 day": 1,
        "Within 3 days": 3,
        "Within 5 days": 5,
        "Within 10 days": 10,
        "Within 30 days": 30,
        "Within 60 days": 60,
        "Within 100 days": 100
      },
    }
  },
  props: {/*これはバリデーションを定義した書き方*/
    calcDay: Function,
    todos: Array,
    edit: Boolean,

  },
  methods: {
    // todoの追加関数
    addItem() {
      if (this.newTitle == "" || this.newContent == "" || this.selected == "") {
        window.alert("Some items have not been entered.");
        return;
      }
      //一意なIDを作成
      isNaN(localStorage.uid) ? localStorage.uid = 0 : true;
      localStorage.uid++
      const today = "";
      const item = {
        id: localStorage.uid,
        today: this.calcDay(today),
        title: this.newTitle,
        content: this.newContent,
        selected: this.selected,
        deadline: this.calcDay(this.selected),
        isDone: false,
        pinch: false,
      }
      // 締め切り日の一番近いtodoの抽出
      const result = this.todos.filter((value, index, array)=> {
        const comparison_date = new Date(array[index].deadline)
        const new_item_deadline = new Date(item.deadline)
        if (new_item_deadline <= comparison_date){
          return value;
        }
      });
      // 新しいtodoの追加場所を定義
      const index = !this.todos.length ? 0
                  :(result[0] === undefined
                  ? this.todos.length
                  : this.todos.indexOf(result[0]));
      this.todos.splice( index, 0, item) ;
      this.newTitle = this.newContent = this.selected = "";
    }
  }
}
</script>