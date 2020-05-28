import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Users from './views/Users.vue'
import UsersProfile from './views/UsersProfile.vue'
import UsersPost from './views/UsersPost.vue'
import HeaderUsers from './views/HeaderUsers.vue'
import HeaderHome from './views/HeaderHome.vue'

Vue.use(Router)//プラグインを適用する

export default new Router({
  mode: "history",
  routes: [
    { 
      path: '/',
      components: {
      default: Home,
      header: HeaderHome,
      }
    },
   {
     path: '/users/:id',
     components: {
       default: Users,
       header: HeaderUsers,
     },
     props: {
       default: true,
       header: false
     },
     children: [
       {path: "post/",component: UsersPost, name: "user-id-post"}, 
       {path: "profile/", component: UsersProfile, name: "users-id-profile"}
      ]
    },
    {
      path: "/hello", //リダイレクト処理
      redirect: "/"
    }
  ],
  scrollBehavior(to, from, savedPos){
    return new Promise(resolve => {
      this.app.$root.$once("triggerScroll", () => {
        let pos = {x: 0, y: 0}
        if (savedPos){
          pos = savedPos;
        } 
        if (to.hash){
          pos = {
            selector: to.hash
          }          
        } 
        resolve(pos)
        // resolve({x: 0, y: 100})
      });
    });

  }
})