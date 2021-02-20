<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
import { mapState } from "vuex";
export default {
  name: "app",
  computed: {
    ...mapState(["apiMessage"]),
  },
  watch: {
    apiMessage(val) {
      if (val && val.length > 0) {
        this.$message({
          message: val,
          type: "error",
        });
      }
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
