<template>
  <div>
    <input v-if="$route.path.split('/')[1] == 'library'" type="url" name="youtubeURL" class="songInput" placeholder="Search">
    <div v-if="$route.path.split('/')[1] == 'library'" id="submitLibrarySearch" style="display: none;"></div>
    <svg v-if="$route.path.split('/')[1] == 'library'" width="18" height="18" viewBox="0 0 28 28" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="search_icon">
      <path d="M20.01 17.61H18.75L18.3 17.178C19.87 15.353 20.8101 12.983 20.8101 10.406C20.8101 4.659 16.1499 0 10.4099 0C4.65991 0 0 4.659 0 10.406C0 16.153 4.65991 20.812 10.4099 20.812C12.9799 20.812 15.3499 19.867 17.1799 18.298L17.6101 18.747V20.011L25.6101 28L28 25.615L20.01 17.61ZM10.4099 17.61C6.41991 17.61 3.19995 14.392 3.19995 10.406C3.19995 6.42 6.41991 3.202 10.4099 3.202C14.3899 3.202 17.6101 6.42 17.6101 10.406C17.6101 14.392 14.3899 17.61 10.4099 17.61Z" fill="currentColor"></path>
    </svg>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
