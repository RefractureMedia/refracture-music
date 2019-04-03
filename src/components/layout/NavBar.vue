<template>
  <div class="nav-bar">
    <a :class="'sidebar_toggle sidebar_' + $parent.state" style="font-weight: normal; font-family: monospace; font-size: 4.5rem; line-height: 100%; margin-top: -.4rem;" v-on:click="$parent.sidebar_toggle">≡</a>
    <center class="nav-items" v-if="$parent.md().os() != 'AndroidOS' && $parent.md().os() != 'iOS'">
      <span style="display:inline;" v-for="page in $parent.pages" v-bind:key="page" v-on:click="$parent.currentPage = page">
        <router-link v-bind:class="'page ' + ($route.name == page) ? '' : 'currentPage'" v-bind:to="page">{{ page + ' ' }}</router-link>
      </span>
    </center>
    <div class="nav-items" v-if="$parent.md().os() == 'AndroidOS' || $parent.md().os() == 'iOS'">
      <span style="display:inline;" v-for="page in $parent.pages" v-bind:key="page" v-on:click="$parent.currentPage = page">
        <router-link v-bind:class="'page ' + ($route.name == page) ? '' : 'currentPage'" v-bind:to="page">{{ page + ' ' }}</router-link>
      </span>
    </div>
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
    }
  }
}
</script>