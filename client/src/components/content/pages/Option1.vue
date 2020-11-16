<template>
  <div>
    <h1>操作系统: {{os ? os.hostname : ''}}</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      os: null
    };
  },
  methods: {
    async fetchOs() {
      const res = await this.$http.get("/os");
      console.log('fetch os from server', res.data);
      this.os = res.data;
    }
  },
  created() {
    this.fetchOs();
  }
};
</script>

