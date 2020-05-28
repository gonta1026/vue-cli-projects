<template>
  <div>
    <!-- <transition name="fade" mode="out-in"> -->
      <router-view name="header"></router-view>
    <!-- </transition> -->
    <transition name=slide mode="out-in" @before-enter="beforEnter">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
//   import Home from './views/Home'
// export default {
//   components: {
//     Home
//   }
// }
</script>

<style scoped>

.fade-enter, 
.fade-leave-to {
  opacity: 0;
}

.fade-enter-active, 
.fade-leave-active {
  transition: opacity 1s;
}

.slide-move {
  transition: transform .5s;
}
.slide-enter-active {
  animation: slide-in 0.5s;
}
.slide-leave-active {
  animation: slide-in 0.5s reverse;
}
@keyframes slide-in {
  from {
    transform: translate(-100px);
    opacity: 0;
  }
  to {
    transform: translate(0);
    opacity: 1;
  }
}

</style>

<script>
export default {
  methods: {
    beforEnter(){
      this.$root.$emit("triggerScroll");
    }
  }
}
</script>