<template>
  <header>
    <h1 class="animated tada">TODOS<span>remaining:{{remaining.length}}  /  total:{{todos.length}}</span></h1>
      <!-- 今日の日付を表示 -->        
    <div class="clock"><i class="far fa-clock"></i>{{calcDay("", "")}}</div>
  </header>
</template>

<script>
export default {
  // props: ["remaining", "calcDay" ,"todos"]/*これは通常の書き方* /
  props: {/*これはバリデーションを定義した書き方*/
    remaining: Array,
    calcDay: Function,
    todos: Array,
  }
}
</script>
