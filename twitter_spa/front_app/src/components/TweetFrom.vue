<template>
  <form>
    <div class="form-add">
      <div class="left">
        <p class="column text">
          <textarea name v-model="currentTweet" placeholder="今何してますか？"></textarea>
        </p>
      </div>

      <div class="right">
        <p class="column select">
          <select v-model="selected">
            <option value>--</option>
            <option
              v-for="category in categoryList"
              :value="category.id"
              :key="category.id"
            >{{category.name}}</option>
          </select>
        </p>
        <p class="column submit">
          <input type="button" value="add!" @click="createTweet" />
        </p>
      </div>
    </div>
    
    <div class="bottom">
      <div class="category"></div>
    </div>
  </form>
</template>

<script>
import axios from "axios";
export default {
  props: {
    categoryList: {
      type: Array,
      require: true,
    },
    loginUser: { //仮のデータログイン昨日の未実装のため
      type: Object,
      require: true,  
    }
  },
  data: ()=>({
    currentTweet: "",
    selected: "",
  }),
  methods: {
    async createTweet() {
      /* ツイート作成 */
      try {
        const tweet = await axios.post(`tweet`, {
          tweet: this.currentTweet,
          user_id: this.loginUser.user_id,
          category_id: this.selected
        });
        tweet.data.tweets.Category = {
          name: tweet.data.category_name[0].name
        }; /* カテゴリーの名前を入れている。 */
        tweet.data.tweets.Bookmarks = [
          { user_id: 0, tweet_id: 0, active: false }
        ]; /* bookaマークに初期のプロパティをセット */
        this.$emit("create-tweet", tweet.data.tweets)
        this.currentTweet = "";
        this.selected = "";
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    },
    async stateBookmark(id, tweet) { /* ブックマークの追加と削除 */
      try {
        const bookmark = await axios.post(`bookmark`, {
          /* 要素があったら削除なければ作成 */
          tweet_id: id,
          user_id: this.loginUser.user_id
        });
        if (bookmark.data.bookmark) {  /* ブックマークをセット */
          tweet.Bookmarks[0].tweet_id = id;
          tweet.Bookmarks[0].user_id = this.loginUser.user_id;
          tweet.Bookmarks[0].active = true;
        } else {
          tweet.Bookmarks[0].tweet_id = 0; /* ブックマークを外す */
          tweet.Bookmarks[0].user_id = 0;
          tweet.Bookmarks[0].active = false;
        }
        const bookmarks = await axios.get("bookmark");
        this.bookmarks = bookmarks.data.bookmarks;
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  },
  
}
</script>

<style scoped>
  
</style>