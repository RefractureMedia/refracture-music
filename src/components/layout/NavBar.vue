<template>
  <div class="nav-bar">
    <a :class="'sidebar_toggle sidebar_' + $parent.state" v-on:click="$parent.sidebar_toggle">≡</a>
    <center>
      <span style="display:inline;" v-for="page in $parent.pages" v-bind:key="page" v-on:click="$parent.currentPage = page">
        <router-link v-bind:class="'page ' + ($route.name == page) ? '' : 'currentPage'" v-bind:to="page">{{ page + ' ' }}</router-link>
      </span>
    </center>
  </div>
</template>

<script>
export default {
  name: "nav-bar",
  methods: {
    active(input) {
      if (this.$route.name == input) {
        return "currentCategory"
      } else {
        return ""
      }
    },
    test() {
      console.log("foo b")
    }
  }
}
</script>