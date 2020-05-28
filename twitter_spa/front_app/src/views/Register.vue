<template>
  <div class="register">
    <h2>新規ユーザー登録</h2>
    <!-- <form action=""> -->
      <ul>
        <li>
          <label for="name">name</label>
          <input :class="{ error : $v.name.$error}" id="name" v-model="name" @blur="$v.name.$touch()" type="text">
          <!-- <template v-if="isError"> -->
          <template v-if="$v.name.$error">
            <p v-if="!$v.name.required">空白です！</p>
            <p v-if="!$v.name.minLength">5文字以上の名前にしてください。</p>
          </template>
            <!-- <p class="error" v-if="!$v.name.minLength">5文字以上の名前にしてください。</p> -->
          <!-- </template> -->
        </li>
        <li>
          <label for="email">email</label>
          <input :class="{ error : $v.email.$error}" id="email"  v-model="email" @blur="$v.email.$touch()" type="email">
          <!-- <template v-if="isError"> -->
          <template v-if="$v.email.$error">
            <p class="error" v-if="!$v.email.required">空白になっています</p>
            <p class="error" v-if="!$v.email.email">正しい形式で入力してください。</p>
          </template>
        </li>
        <li>
          <label for="password">password</label>
          <input :class="{ error: $v.password.$error}" id="password" v-model="password" @blur="$v.password.$touch()" type="password">
          <template v-if="$v.password.$error">
            <p class="error" v-if="!$v.password.required">空白ですよ！</p>
            <p class="error" v-if="!$v.password.minLength">6文字以上にしてください。</p>
          </template>
        </li>
        <li>
          <label for="repeat-password">repeat-password</label>
          <input :class="{ error: $v.repeatPassword.$error}" id="repeat-password" v-model="repeatPassword" @blur="$v.repeatPassword.$touch()" type="password">
          <template v-if="$v.repeatPassword.$error">
            <p class="error" v-if="!$v.repeatPassword.sameAsPassword">パスワード１と同じものを入力してください。</p>
          </template>
        </li>
        <li>
          <button @click="register">送信</button>
        </li>
      </ul>
          <!-- <pre>{{$v}}</pre> -->
    <!-- </form> -->
  </div>
</template>

<script>
import Vue from 'vue'
Vue.use(window.vuelidate.default);
const {required, email, minLength,sameAs} = window.validators;
// import axios from "axios";
// import axiosAuth from "../axios-auth";
export default {
  data: () => ({
    name: "",
    email: "",
    password: "",
    repeatPassword: '',
    active: false,
    isError: false
  }),
  validations: {
    name: {
        required, 
        minLength: minLength(4)
    },
    email: {
      email,
      required
      
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  } ,
  methods: {
    async register(){
      try {
        this.$v.$touch();

        if(this.$v.$invalid){

            console.log('バリデーションエラー');

        }else{

            // データ登録の処理をここに記述
            // console.log('submit');
        // await axios.post(`register`, {
        //   name: this.name,
        //   email: this.email,
        //   password: this.password,
        // });
        }
        // const hoge = await axiosAuth.post("/accounts:signUp?key=AIzaSyCyvXwicxaS0YIJYEBUhiNKqYLvVHf5ciI",{
        //   email: this.email,
        //   password: this.password,
        //   returnSecureToken: true
        // });
        

        // this.name = "";
        // this.password = "";
        // this.email = "";
        // this.repeatPassword = "";
      }catch(err){
        console.log(JSON.stringify(err));
      }
    }
  }
}
</script>

<style>
input.error {
	color: #8a0421;
	border-color: #dd0f3b;
	background-color: #ffd9d9;
}
</style>