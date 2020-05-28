<template>
  <div>
    <router-view></router-view>
    <h1>Users</h1>
    <router-link to="/users/1#next-user">ユーざー1</router-link>
    <router-link to="/users/2#next-user">ユーざー2</router-link>
    <p>ナンバー{{id}}</p>
    <router-link :to="{name: 'users-id-profile', params: {id: Number(id) - 1}}">前のユーザー</router-link>
    <router-link :to="{name: 'users-id-profile', params: {id: Number(id) + 1}, hash: '#next-user'}">次のユーザー</router-link>
    <div style="margin: 1000px 0">
      <router-link id="next-user" :to="{name: 'users-id-profile', params: {id: Number(id) + 1}, hash: '#next-user'}">次のユーザー</router-link>
    </div>
  </div>
</template>

<script>
export default {
  props: ["id"],
}
</script>

