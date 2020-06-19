<template>
  <div class="todo">
    <div class="container">
      <TopHeader :todos="todos" :calc-day="calcDay" :remaining="remaining"></TopHeader>
      <div class="box">
        <div class="todo-left">
          <!-- todoがあるときに表示する。 -->

          <transition>
            <div v-if="todos.length" class="todo-container">
              <div class="btns">
                <!-- 完了したtodoを削除 -->
                <button @click="purgeItem" class="common-btn purge">purge</button>
                <button @click="allDelete" class="common-btn delete">all delete</button>
              </div>

              <transition-group name="slide" tag="ul" class="todo-list">
                <li v-for="(todo, index) in todos" :class="{done: todo.isDone, pinch: canLink(todo)}" :key="todo.id">
                  <p class="data">Posted date：{{todo.today}}</p>
                  <p class="deadline">dead-line：{{todo.deadline}}</p>
                  <div class="change-btns">
                    <span class="edit" @click="editForm(index)">edit</span>
                    <span class="delete" @click="deleteItem(index)">delete</span>
                  </div>
                  <p class="title">
                    <label class="text">
                      <input type="checkbox" class="check" v-model="todo.isDone"/>
                      <span>{{todo.title}}</span>
                    </label>
                  </p>
                  <p class="content">{{todo.content}}</p>
                </li>
              </transition-group>
            </div>

            <!-- todoがないときに表示する。 -->
            <ul class="no-todo-list" v-else>
              <li>No todo!</li>
            </ul>
          </transition>
          <!-- </transition> -->
        </div>
        <!--/ todo-left -->

        <div class="todo-right">
          <h3>FORM</h3>
          <!-- <transition name="slide02" mode="out-in"> -->
            <AddForm :todos="todos" :calc-day="calcDay" :edit="edit" :show="show"></AddForm>
            
              <Modal
              v-if="edit"
              :propsNewTitle="newTitle"
              :props-new-content="newContent"
              :props-selected="selected"
              :deadlines="deadlines"
              :edit="edit"
              :edit-target-task="editTargetTask"
              @chage-edit="edit = false"
              @edit-todo="editItem"
              ></Modal>
          
            <!-- <EditForm
              v-else
              :propsNewTitle="newTitle"
              :props-new-content="newContent"
              :props-selected="selected"
              :deadlines="deadlines"
              :edit="edit"
              :edit-target-task="editTargetTask"
              @chage-edit="edit = false"
              @edit-todo="editItem"
            ></EditForm> -->
          <!-- </transition> -->
        </div>
        <!-- /todo-right -->
      </div>
    </div>
    <footer>
      <div class="page-top" v-scroll="handleScroll" @click="toTop">top</div>
      <p>Copyright © keisei otsuka.</p>
    </footer>
  </div>
</template>

<script>
import TopHeader from "./component/TopHeader.vue";
import AddForm from "./component/AddForm.vue";
// import EditForm from "./component/EditForm.vue";
import Modal from "./component/Modal.vue";
const STORAGE_KEY = 'vue-todo02'
const todoStorage = {
  fetch: function () {
    const todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}
export default {
  components: {
    TopHeader,
    AddForm,
    // EditForm,
    Modal,
  },
  data() {
    return {
      todos: [],
      newTitle: "",
      newContent: "",
      selected: 0,
      editTargetTask: 0,
      show: true,
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
      edit: false,
      showModal: false,
      pinch: false,
      isActive: true,
      error: null,
      fadein: true
    };
  },
  computed: {
    canLink: function () {
        return function (key) {
            if(this.todos.hasOwnProperty([key])){
                return false;
            }
            return true;
        };
    },
    // 残ったtodoの数を表示
    remaining() {
      return this.todos.filter(function(todo) {
        return !todo.isDone;
      });
    },
    // 終了したtodoの数を表示
    finish() {
      return this.todos.filter(function(todo) {
        return todo.isDone;
      });
    },
  },
  methods: {
    // footerのスクロールボタンのfadein
    handleScroll(evt, el) {
      if (window.scrollY > 200) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    },
    //編集で使うtodosの日付順に変更
    deadlineSort(a,b){
      const deadlineA = new Date(a.deadline);
      const deadlineB = new Date(b.deadline);
      let comparison = 0;
      if (deadlineA > deadlineB) {
        comparison = 1;
      } else if (deadlineA < deadlineB) {
        comparison = -1;
      }
      return comparison;
    },
    // footerのスクロールボタンのスクロールトップ
    toTop: function() {
      const scrolled = window.pageYOffset;
      window.scrollTo(0, Math.floor(scrolled * 0.8));
      if (scrolled > 0) {
        window.setTimeout(this.toTop, 20);
      }
    },

    // 日付のフォーマットとtodoの締め切りを設定する日数計算の関数
    calcDay(day, created_at) {
      const today = (created_at == null || created_at == "")
                ? new Date()
                : new Date(created_at);

      today.setDate(today.getDate() + day);
      const year = today.getFullYear();
      const month = today.getMonth() + 1;
      day = today.getDate();
      const formatDay = year + "/" + month + "/" + day;
      return formatDay;
    },
    // todoの削除
    deleteItem(index) {
      confirm("delete ok?") ? this.todos.splice(index, 1) : true;
    },
    // todoの全削除
    allDelete() {
      confirm("all delete ok?") ? (this.todos = []) : true;
    },
    //編集フォームの表示
    editForm(index) {
      this.fade = false;
      this.edit = true;
      this.newTitle = this.todos[index].title;
      this.newContent = this.todos[index].content;
      this.selected = this.todos[index].selected;
      this.editTargetTask = index;
    },
    //編集の実施
    editItem(value){
      if (value.title == "" || value.content == "" || value.selected == "") {
        window.alert("Some items have not been entered.");
        return false;
      }
      this.todos[this.editTargetTask].title = value.title;
      this.todos[this.editTargetTask].content = value.content;
      this.todos[this.editTargetTask].deadline = this.calcDay(value.selected, this.todos[this.editTargetTask].today);
      this.todos.sort(this.deadlineSort);
      this.edit = false;
    },
    // 終了したタスクのみ削除
    purgeItem() {
      this.finish.length === 0
        ? window.alert("No checked")
        : confirm("purgeItem delete ok?")
        ? (this.todos = this.remaining)
        : true;
    }
  },
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function(todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    },
    
  },
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  }
};
</script>

<style lang="scss">



// ==============================---
.fade-enter {
  opacity: 0;
}
.fade-enter-active {
  transition: opacity 0.5s;
}
.fade-enter-to {
  opacity: 1;
}
.fade-leave {
  opacity: 1;
}
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-leave-to {
  opacity: 0;
}

// --------------------------------
.slide-move {
  transition: transform .5s;
}
.slide-enter-active {
  animation: slide-in 0.5s;
}
.slide-leave-active {
  animation: slide-in 0.5s reverse;
}
@keyframes slide-in {
  from {
    transform: translate(-100px);
    opacity: 0;
  }
  to {
    transform: translate(0);
    opacity: 1;
  }
}

// --------------------------------

.slide02-move {
  trasition: transform;
}
.slide02-enter-active {
  animation: slide-out 0.5s;
}
.slide02-leave-active {
  animation: slide-out 0.5s reverse;
}
@keyframes slide-out {
  from {
    transform: translate(80%);
    opacity: 0;
  }
  to {
    transform: translate(0);
    opacity: 1;
  }
}
// -------------------------------
* {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}

body {
  font-size: 16px;
}

ul li {
  list-style: none;
}

.common-btn {
  font-size: 1.4em;
  font-weight: bold;
  padding: 5px 10px;
  color: #fff;
  border-style: none;
  outline-width: 2px;
  cursor: pointer;
}

.todo {
  .container {
    width: 80%;
    margin: 50px auto;
  }
  header {
    display: flex;
    justify-content: space-between;
    h1 {
      font-size: 30px;
      line-height: 30px;
      color: red;
      span {
        color: #000;
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
    }
  }
  .box {
    display: flex;
    justify-content: space-between;
    margin-top: 60px;
    .todo-left {
      width: 50%;
      .btns {
        display: flex;
        button:nth-of-type(n + 2) {
          margin-left: 10px;
        }
        .purge {
          background-color: #245;
        }
        .delete {
          background-color: rgb(139, 0, 93);
        }
      }
      .todo-list {
        margin-top: 30px;
        li {
          &.done{
            opacity: 0.5;
          }
          &.done .title{
            text-decoration: line-through;
          }
          &:nth-of-type(n + 2) {
            margin-top: 20px;
          }
          .change-btns {
            span:nth-of-type(n + 2) {
              margin-left: 5px;
            }
            .edit {
              color: skyblue;
              cursor: pointer;
            }
            .delete {
              color: red;
              cursor: pointer;
            }
          }
          .title {
            display: flex;
            justify-content: space-between;
            border-bottom: 1px solid #ddd;
            .check {
              vertical-align: 2px;
              margin-right: 7px;
            }
          }
          .content {
            margin-top: 10px;
            border: 1px solid #ddd;
            padding: 5px;
            min-height: 70px;
          }
        }
        li:nth-of-type(n + 2) {
          margin-top: 20px;
        }
      }
      .no-todo-list {
        margin-top: 30px;
        li {
          font-size: 22px;
          line-height: 28px;
          text-align: center;
        }
      }
    }
    div.todo-right {
      width: 40%;
      h3 {
        font-size: 30px;
      }
      form {
        margin-top: 20px;
        p:nth-of-type(n + 2) {
          margin-top: 30px;
        }
        .title {
          input {
            padding: 6px;
            margin-top: 5px;
            width: 100%;
            outline-width: 2px;
            font-size: 20px;
          }
        }
        .content {
          textarea {
            width: 100%;
            margin-top: 5px;
            outline-width: 2px;
            padding: 6px;
            font-size: 20px;
          }
        }
        .deadline {
          select {
            position: relative;
            z-index: 2;
            height: 48px;
            padding: 0 16px;
            border-radius: 4px;
            border: 1px solid #ccc;
            background: 0;
            font-size: 16px;
            line-height: 1.5;
            cursor: pointer;
            display: block;
            margin-top: 5px;
            width: 100%;
            outline-width: 2px;
          }
        }
        .submit {
          margin-top: 10px;
          display: flex;
          .edit {
            background: green;
            margin-left: 10px;
          }
          .add {
            background-color: #248;
          }
          .return {
            background-color: rgb(136, 109, 34);
          }
        }
      }
    }
  }
  footer {
    background: rgb(70, 139, 136);
    text-align: center;
    padding: 20px;
    .page-top {
      &.active {
        opacity: 1;
      }
      position: fixed;
      bottom: 70px;
      right: 20px;
      width: 60px;
      background: skyblue;
      border-radius: 50px;
      color: #fff;
      text-align: center;
      padding: 16px;
      opacity: 0;
      transition: opacity 0.5s;
    }
  }
}

@media screen and (max-width: 750px) {
  .todo {
    header {
      display: block;
      .clock {
        margin-top: 10px;
      }
    }
    .container {
      width: 90%;
    }
    .box {
      display: block;
      margin-top: 20px;
      .todo-left {
        width: 100%;
      }
      div.todo-right {
        width: 100%;
        margin-top: 30px;
        form {
          p:nth-of-type(n + 2) {
          margin-top: 20px;
          }
          input {
            border: 1px solid #999;
          }
          textarea {
            border: 1px solid #999;
          }
        }
      }
    }
    footer {
      padding: 10px;
      .page-top{
        bottom: 55px;
      }
      p {
        font-size: 12px
      }
    }
  }
}

</style>
