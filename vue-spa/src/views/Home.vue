<template>
  <div>
    <router-view></router-view>
    <h1>Home</h1>
    <button @click="toUsers">toUsers</button>
  </div>
</template>

<script>
export default {
  methods: {
    toUsers(){
      this.$router.push({name: "users-id-profile", params: {id: 1}})
    }
  }
}
</script>