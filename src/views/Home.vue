<template>
  <div class="home">
    <SprawlingCity />
  </div>
</template>

<script>
// @ is an alias to /src
import SprawlingCity from "@/components/SprawlingCity.vue";

export default {
  name: "Home",
  components: {
    SprawlingCity
  }
};
</script>

<style lang="scss">
.home {
  height: 100%;
}
</style>
