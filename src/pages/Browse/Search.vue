<template>
  <center>
    <input type="url" name="youtubeURL" class="browseSearch" placeholder="Search">
    <div id="submitBrowseSearch" v-on:click="$parent.browseSearch" style="display: none;"></div>
  </center>
</template>

<script>
export default {
  mounted() {
    document
      .getElementsByClassName("browseSearch")[0]
      .addEventListener("keyup", function(event) {
        if (event.keyCode === 13) {
          document.getElementById("submitBrowseSearch").click()
          event.preventDefault()
          return false
        }
      })
    document.getElementsByClassName("browseSearch")[0].preventDefault()
  }
}
</script>