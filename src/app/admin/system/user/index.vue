<template>
  <div class="home">user</div>
</template>

<script>
export default {
  name: "UserMange",
  methods: {
    async getData() {
      console.log("satrt");
      await this.$wait(1000);
      console.log("end");
    },
  },
};
</script>
