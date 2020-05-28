<template>
  <div class="login">
    <ul>
      <li>
        <label for="">email</label>
        <input type="email">
      </li>
      <li>
        <label for="">passeord</label>
        <input type="password">
      </li>
      <li>
        <button @click="login">送信</button>
      </li>
      
    </ul>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      name: "",
      password: ""
    }
  },
  method: {
    login(){

    }
  }
}
</script>