<template>
  <section class="tweets">
    <p v-if="filterTweets.length === 0" class="no-tweet">ツイートがみつからないよ！</p>
    <ul v-if="filterTweets.length !== 0" class="list">
      <li :class="tweet.Category.name" v-for="tweet in filterTweets" :key="tweet.id">
        <p class="category">{{tweet.Category.name}}</p>
        <dl class="list-top">
          <dd class="name">
            <router-link to="/">{{loginUser.name}}</router-link>
          </dd>
          <dd class="date">4月3日</dd>
        </dl>
        <p>{{tweet.tweet}}</p>
        <dl class="list-btns">
          <dd>
            <i class="far fa-comment"></i>
          </dd>
          <dd @click="stateBookmark(tweet.id, tweet)" class="bookmark">
            <i v-if="loginUser.user_id === tweet.Bookmarks[0].user_id" class="fas fa-bookmark active"></i>
            <i v-else class="far fa-bookmark"></i>
          </dd>
          <dd @click="deleteTweet(tweet.id)">
            <i class="fas fa-trash-alt"></i>
          </dd>
        </dl>
      </li>
    </ul>
  </section>
</template>

<script>
import axios from "axios";
export default {
  props: {
    tweetList: {
      type: Array,
    },
    filterTweets: {
      type: Array,
    },    
    bookmarksList: {
      type: Array,
    },
    currentCategory: {
      type: String,
      require,
    },
    loginUser: { //仮のデータログイン昨日の未実装のため
      type: Object,
      require: true,  
    }
  },

  async mounted() {   
    this.fixedScrollPos(); /* tweetの表示エリアを固定 */
  },

  methods: {
    fixedScrollPos(){
      const fixed = document.getElementById("fixed");
      const header = document.getElementById("header"); 
      const headerHeight = header.clientHeight;
      fixed.style.height = `${window.innerHeight - headerHeight}px`; 
    },
    async deleteTweet(id) { /* ツイート削除 */
      try {
        await axios.delete(`tweet/${id}`);
        this.tweetList.forEach((tweet, index) => { /* ブックマークの追加と削除 */
          if (tweet.id === id) {
            this.tweetList.splice(index, 1);
          }
        });
        this.currentTweet = "";
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
        this.bookmarksList = bookmarks.data.bookmarks;
      } catch (err) {
        console.log(JSON.stringify(err));
      }
    }
  }
}
</script>
<style lang="scss" scoped>

</style>