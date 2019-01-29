<template>
  <div class="nav-bar">
    <center>
      <p style="display:inline;" v-for="page in $parent.pages" v-bind:key="page" v-on:click="$parent.currentPage = page">
        <router-link v-bind:class="'page ' + ($route.name == page) ? '' : 'currentPage'" v-bind:to="page">{{ page + ' ' }}</router-link>
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
        return "currentCategory"
      } else {
        return ""
      }
    }
  }
}
</script>