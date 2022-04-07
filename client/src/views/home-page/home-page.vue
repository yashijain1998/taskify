<template src="./home-page.html">
</template>

<script>

export default {
  name: 'HomePage',
  created() {
    this.$store.commit('header/setShowSignButtons', true);
    this.$store.dispatch('pageLoader/hide');
  }
};
</script>

<style scoped lang="scss" src="./home-page.scss">
</style>
