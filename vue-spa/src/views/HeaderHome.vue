<template>
  <nav>
    <h2>Homeのヘッダーだよ</h2>
    <router-link
    to="/"
    active-class="link-active"
    exact
    class="link"
    >Home</router-link>
    <router-link
    to="/users/1"
    active-class="link-active"
    class="link"
    
    >Users</router-link>
  </nav>
  </template>

<style scoped>
  .link {
    margin-top: 30px;
  }
  .link-active{
    font-size: 30px;
  }
</style>