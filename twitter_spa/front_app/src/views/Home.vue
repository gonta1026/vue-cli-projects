<template>
  <div class="all-box">
    <div class="main-box" id="main">

      <AppHeader :category-list="categories" :current-category="currentCategory" @category-change="changeCategoty"></AppHeader>

      <div id="fixed" class="fixed-area">

        <Tweetform :category-list="categories" :login-user="loginUser" @create-tweet="createTweet"></Tweetform>
        
        <TweetList :tweet-list="tweets" :filter-tweets="filterTweets" :bookmarks-list="bookmarks" :login-user="loginUser"></TweetList>

      </div>

    </div>
    <div class="left-nav-list" id="nav">
      <ul>
        <li>
          <router-link to="/">
            <i class="fab fa-twitter"></i>
          </router-link>
        </li>
        <li>
          <router-link to="/">
            <i class="fas fa-home"></i>ホーム
          </router-link>
        </li>
        <li>
          <router-link to="/bookmarks">
            <i class="far fa-bookmark"></i>ブックマーク
          </router-link>
          <span v-if="totalBookmarks.length !== 0">{{totalBookmarks.length}}</span>
        </li>
        <li>
          <router-link to="/profile">
            <i class="fas fa-user"></i>プロフィール
          </router-link>
        </li>
        <li>
          <router-link to="/logout">
            <i class="fas fa-sign-out-alt"></i>ログアウト
          </router-link>
        </li>
      </ul>
      <div class="free">
        <i class="fas fa-baby"></i>
      </div>
    </div>
  </div>
</template>
<script>
import Tweetform from "../components/TweetFrom"
import AppHeader from "../components/AppHeader"
import TweetList from "../components/TweetList"
import axios from "axios";
export default {
  components: {
    AppHeader,
    Tweetform,
    TweetList
  },
  name: "Home",
  data: () => ({
    tweets: [],//親
    categories: [],
    currentCategory: "all",
    bookmarks: [],
    loginUser: { //仮のユーザーデータ ログイン機能の未実装のため
      name: "田中 明",
      user_id: 1
    }
  }),

  async created() {
    try {
      const datas = await axios.get("");
      this.tweets = datas.data.tweet;
      this.categories = datas.data.category;
      this.tweets.forEach(tweet => {  /* ブックマークに仮で空の要素を入れている。 */
        if (!tweet.Bookmarks.length) {
          tweet.Bookmarks.push({ user_id: 0, tweet_id: 0, active: false });
        } else {
          tweet.Bookmarks[0].active = true;
        }
      });
      const bookmarks = await axios.get("bookmark");
      this.bookmarks = bookmarks.data.bookmarks;
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  },
  computed: {
    filterTweets() {
      return this.tweets.filter(function(tweet) {
        return this.currentCategory === "all"
          ? tweet.Category.name !== this.currentCategory /* allを返す */
          : tweet.Category.name ===
              this.currentCategory; /* 一致したカテゴリーを返す */
      }, this);
    },
    totalBookmarks() {
      return this.bookmarks;
    }
  },
  methods: {
    changeCategoty(eventValue){ //emitメソッド
    console.log(eventValue)
      this.currentCategory = eventValue;
    },
    createTweet(eventValue){
      this.tweets.unshift(eventValue);
    },

  }
};
</script>



<style lang="scss" scoped>

</style>