<template>
  <div class="nav-bar">
    <center>
      <p
        style="display:inline;"
        v-for="page in $parent.pages"
        v-bind:key="page"
        v-on:click="$parent.currentPage = page"
      >
        <router-link
          v-bind:class="'page ' + ($route.name == page) ? '' : 'currentPage'"
          v-bind:to="page"
        >{{ page + ' ' }}</router-link>
      </p>
    </center>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  methods: {
    active(input) {
      if (this.$route.name == input) {
        return "currentCategory";
      } else {
        return "";
      }
    }
  }
};
</script>

<style lang="less">
@import "../../variables.less";
.nav-bar {
  font-size: 2rem;
  font-weight: bolder;
  margin-bottom: 1rem;
  & a {
    color: @accent-secondary;
    &:hover {
      text-decoration: none;
      color: @accent-primary;
    }
  }
  & .router-link-active {
    color: @accent-primary;
  }
  & .currentCategory {
    color: @accent-primary;
  }
}
</style>
