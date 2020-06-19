<template>
<transition
    name="fade"
    appear
    >
  <div class="modal-mask">
    <div @click.self="change" class="modal-wrapper">
      <transition
      enter-active-class="animated fadeInUpBig delay-0.5s"
      appear
      >
      <div class="modal-container">
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
      </div>
      </transition>
    </div>
  </div>
</transition>
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
    },
    fadeOut(){
      this.$emit("chage-fade")   
    }
  }
}
</script>

<style lang="scss" scope>

// .modal-enter {
//   opacity: 0;
// }

// .modal-leave-active {
//   opacity: 0;
// }

// .modal-enter .modal-container,
// .modal-enter-active .modal-container,
// .modal-leave-active .modal-container {
//   -webkit-transform: scale(1.1);
//   transform: scale(1.1);
// }

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
  .modal-wrapper {
    display: table-cell;
    vertical-align: middle;
    .modal-container {
      width: 452px;
      margin: 0px auto;
      padding: 20px 30px;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
      transition: all .3s ease;
      font-family: Helvetica, Arial, sans-serif;
    }
  }
}

@media screen and (max-width: 750px) {
  .modal-mask {
    .modal-wrapper {
      .modal-container {
        width: 92%;
      }
    }
  }
}

</style>